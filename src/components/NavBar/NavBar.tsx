import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Role } from '../../services/interfaces/IAuthService';
import logger from '../../services/logging';
import { useAuth } from '../../contexts/auth/useAuth';
import { useLanguage } from '../../contexts/language/useLanguage';
import { FormattedMessage } from 'react-intl';

const Navbar: React.FC = () =>
{
  const { user, roles } = useAuth();
  const navigate = useNavigate();
  const { locale, setLocale } = useLanguage();

  const handleLogout = async () =>
  {
    try
    {
      await authService.signOut();
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error al cerrar sesión: ${error.message}`);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
  {
    const newLocale = event.target.value;
    setLocale(newLocale);
  };

  return (
    <nav className="bg-gray-800 text-white py-2 flex justify-center items-center font-sans">
      <ul className="flex justify-center items-center list-none m-0 p-0">
        <li className="ml-4 first:ml-0"><Link to="/" className="text-white no-underline px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ease-in-out"><FormattedMessage id="nav.home" defaultMessage="Inicio" /></Link></li>
        {user && roles && (roles.includes(Role.USER) || roles.includes(Role.ADMIN)) && (
          <li className="ml-4"><Link to="/taskLists" className="text-white no-underline px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ease-in-out"><FormattedMessage id="nav.lists" defaultMessage="Listas" /></Link></li>
        )}
        {!user && <li className="ml-4"><Link to="/login" className="text-white no-underline px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ease-in-out"><FormattedMessage id="nav.login" defaultMessage="Login" /></Link></li>}
        {!user && <li className="ml-4"><Link to="/register" className="text-white no-underline px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ease-in-out"><FormattedMessage id="nav.register" defaultMessage="Registro" /></Link></li>}
        {user && <li className="ml-4"><button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out h-fit"><FormattedMessage id="nav.logout" defaultMessage="Logout" /></button></li>}
        <li className="ml-4">
          <select value={locale} onChange={handleLanguageChange} className="bg-gray-700 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;