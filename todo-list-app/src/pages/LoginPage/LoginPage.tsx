import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logger from '../../services/logging';
import { authService } from '../../services/authService';
import { FormattedMessage } from 'react-intl';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const userCredential = await authService.signIn(email, password);
      logger.info(`Usuario autenticado: ${userCredential.user}`);
      navigate('/taskLists');
    } catch (error: any) {
      logger.error(`Error al iniciar sesión: ${error.message}`);
      setError(error.message);
    }
  };

  useEffect(() => {
    logger.info("Entrando a LoginPage");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          <FormattedMessage id="login.title" defaultMessage="Iniciar Sesión" />
        </h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <FormattedMessage id="login.emailLabel" defaultMessage="Correo Electrónico" />
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <FormattedMessage id="login.passwordLabel" defaultMessage="Contraseña" />
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline w-full"
          >
            <FormattedMessage id="login.submitButton" defaultMessage="Iniciar Sesión" />
          </button>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          <FormattedMessage id="login.noAccount" defaultMessage="¿No tienes una cuenta? " />
          <Link to="/register" className="text-blue-500 hover:text-blue-700 focus:outline-none focus-shadow-outline">
            <FormattedMessage id="login.registerLink" defaultMessage="Regístrate" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;