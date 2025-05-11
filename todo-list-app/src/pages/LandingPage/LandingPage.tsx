import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logger from '../../services/logging';
import { useAuth } from '../../contexts/auth/useAuth';
import { FormattedMessage } from 'react-intl';

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    logger.info("Entrando a LandingPage");
  }, []);

  return (
    <div className="landing-page">
      <h1 className="landing-title">
        <FormattedMessage id="landing.title" defaultMessage="Mis Listas de Tareas" />
      </h1>
      <p className="landing-description">
        <FormattedMessage
          id="landing.description"
          defaultMessage="Bienvenido a tu organizador personal de tareas. ¡Comienza a gestionar tu productividad!"
        />
      </p>
      {!user && (
        <div className="landing-auth-buttons">
          <Link to="/login" className="landing-login-button">
            <FormattedMessage id="landing.loginButton" defaultMessage="Iniciar Sesión" />
          </Link>
          <Link to="/register" className="landing-register-button">
            <FormattedMessage id="landing.registerButton" defaultMessage="Registrarse" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;