import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logger from '../../services/logging';
import { useAuth } from '../../contexts/auth/useAuth';
import { FormattedMessage } from 'react-intl';

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    logger.info("Entrando a LandingPage");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        <FormattedMessage id="landing.title" defaultMessage="Mis Listas de Tareas" />
      </h1>
      <p className="mt-2 text-lg text-gray-700 text-center">
        <FormattedMessage
          id="landing.description"
          defaultMessage="Bienvenido a tu organizador personal de tareas. ¡Comienza a gestionar tu productividad!"
        />
      </p>
      {!user && (
        <div className="mt-8 space-x-4">
          <Link
            to="/login"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition duration-150 ease-in-out"
          >
            <FormattedMessage id="landing.loginButton" defaultMessage="Iniciar Sesión" />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition duration-150 ease-in-out"
          >
            <FormattedMessage id="landing.registerButton" defaultMessage="Registrarse" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;