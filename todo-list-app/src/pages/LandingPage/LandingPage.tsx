import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logger from '../../services/logging';

const LandingPage: React.FC = () =>
{
    useEffect(() =>
    {
        logger.info("Entrando a LandingPage");
    }, []);

    return (
        <div className="landing-page">
            <h1 className="landing-title">Mis Listas de Tareas</h1>
            <p className="landing-description">
                Bienvenido a tu organizador personal de tareas. ¡Comienza a gestionar tu
                productividad!
            </p>
            <div className="landing-auth-buttons">
                <Link to="/login" className="landing-login-button">
                    Iniciar Sesión
                </Link>
                <Link to="/register" className="landing-register-button">
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;