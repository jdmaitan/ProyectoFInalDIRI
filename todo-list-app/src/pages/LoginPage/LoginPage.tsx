import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () =>
    {
        // Aquí iría la lógica de inicio de sesión con Firebase
        console.log('Iniciar sesión', email, password);
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Iniciar Sesión</h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="auth-form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">
                    Iniciar Sesión
                </button>
            </form>
            <p className="auth-alt-text">
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
        </div>
    );
};

export default LoginPage;