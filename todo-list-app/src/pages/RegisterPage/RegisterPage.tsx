import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import logger from '../../services/logging';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { FormattedMessage, useIntl } from 'react-intl';

const RegisterPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();
    const intl = useIntl();

    const handleRegister = async () =>
    {
        setError("");

        try
        {
            const userCredential = await authService.signUp(email, password);
            logger.info(`Usuario registrado: ${userCredential.user}`);
            await userService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: { admin: false }
            });
            setSuccess(
                intl.formatMessage({
                    id: "register.successMessage",
                    defaultMessage: "Registro exitoso. Redirigiendo a las listas..."
                })
            ); setTimeout(() =>
            {
                navigate('/taskLists');
            }, 2000);
        } catch (error: any)
        {
            logger.error(`Error al registrarse: ${error.message}`);
            setError(error.message);
        }
    };

    useEffect(() =>
    {
        logger.info("Entrando a RegisterPage");
    }, []);

    return (
        <div className="auth-container">
            <h2 className="auth-title">
                <FormattedMessage id="register.title" defaultMessage="Crear Cuenta" />
            </h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <div className="auth-form-group">
                    <label htmlFor="email">
                        <FormattedMessage id="register.emailLabel" defaultMessage="Correo Electrónico" />
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
                        <FormattedMessage id="register.passwordLabel" defaultMessage="Contraseña" />
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
                    <FormattedMessage id="register.submitButton" defaultMessage="Registrarse" />
                </button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <p className="auth-alt-text">
                <FormattedMessage id="register.alreadyAccount" defaultMessage="¿Ya tienes una cuenta? " />
                <Link to="/login">
                    <FormattedMessage id="register.loginLink" defaultMessage="Inicia sesión" />
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;