import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logger from '../../services/logging';
import { authService } from '../../services/authService';
import { FormattedMessage } from 'react-intl';

const LoginPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async () =>
    {
        setError("");

        try
        {
            const userCredential = await authService.signIn(email, password);
            logger.info(`Usuario autenticado: ${userCredential.user}`);
            navigate('/taskLists');
        } catch (error: any)
        {
            logger.error(`Error al iniciar sesión: ${error.message}`);
            setError(error.message);
        }
    };

    useEffect(() =>
    {
        logger.info("Entrando a LoginPage");
    }, []);

    return (
        <div className="auth-container">
            <h2 className="auth-title">
                <FormattedMessage id="login.title" defaultMessage="Iniciar Sesión" />
            </h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="auth-form-group">
                    <label htmlFor="email">
                        <FormattedMessage id="login.emailLabel" defaultMessage="Correo Electrónico" />
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password">
                        <FormattedMessage id="login.passwordLabel" defaultMessage="Contraseña" />
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">
                    <FormattedMessage id="login.submitButton" defaultMessage="Iniciar Sesión" />
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="auth-alt-text">
                <FormattedMessage id="login.noAccount" defaultMessage="¿No tienes una cuenta? " />
                <Link to="/register">
                    <FormattedMessage id="login.registerLink" defaultMessage="Regístrate" />
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;