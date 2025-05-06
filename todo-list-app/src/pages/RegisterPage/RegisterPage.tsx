import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import logger from '../../services/logging';
import { authService } from '../../services/authService';
import { userService } from '../../services/UserService';

const RegisterPage: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>(""); // Estado para mensajes de error.
    const [success, setSuccess] = useState<string>(""); // Estado para mensajes de éxito.
    const navigate = useNavigate(); // Hook para la navegación.

    const handleRegister = async () =>
    {
        setError(""); // Limpia mensajes de error anteriores.

        try
        {
            const userCredential = await authService.signUp(email, password); // Registra al usuario.
            console.log("Usuario registrado:", userCredential.user); // Muestra mensaje en consola.
            await userService.setUserRoles(userCredential.user.uid, { // Asigna roles al usuario.
                email: userCredential.user.email,
                roles: { admin: false }
            });
            setSuccess('Registro exitoso. Redirigiendo a las listas...'); // Mensaje de éxito.
            setTimeout(() =>
            {
                navigate('/taskLists'); // Redirige al menú tras un breve tiempo.
            }, 2000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            console.error("Error al registrarse:", error); // Muestra mensaje de error en la consola.
            setError(error.message); // Establece el mensaje de error.
        }
    };

    useEffect(() =>
    {
        logger.info("Entrando a RegisterPage");
    }, []);

    return (
        <div className="auth-container">
            <h2 className="auth-title">Crear Cuenta</h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error (condicional). */}
                {success && <p className="success-message">{success}</p>} {/* Mensaje de éxito (condicional). */}
            </form>
            <p className="auth-alt-text">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default RegisterPage;