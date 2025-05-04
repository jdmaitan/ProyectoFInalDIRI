import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = () =>
    {
        // Aquí iría la lógica de registro con Firebase
        console.log('Registrarse', name, email, password);
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Crear Cuenta</h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <div className="auth-form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    Registrarse
                </button>
            </form>
            <p className="auth-alt-text">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default RegisterPage;