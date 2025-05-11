import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './navbar.css';
import { Role } from '../../services/interfaces/IAuthService';
import logger from '../../services/logging';
import { useAuth } from '../../contexts/auth/useAuth';
import { useLanguage } from '../../contexts/language/useLanguage';
import { FormattedMessage } from 'react-intl';

const Navbar: React.FC = () => {
  const { user, roles } = useAuth();
  const navigate = useNavigate();
  const { locale, setLocale } = useLanguage();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(`Error al cerrar sesión: ${error.message}`);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    setLocale(newLocale);
  };

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li><Link to="/"><FormattedMessage id="nav.home" defaultMessage="Inicio" /></Link></li>
        {user && roles && (roles.includes(Role.USER) || roles.includes(Role.ADMIN)) && (
          <li><Link to="/taskLists"><FormattedMessage id="nav.lists" defaultMessage="Listas" /></Link></li>
        )}
        {!user && <li><Link to="/login"><FormattedMessage id="nav.login" defaultMessage="Login" /></Link></li>}
        {!user && <li><Link to="/register"><FormattedMessage id="nav.register" defaultMessage="Registro" /></Link></li>}
        {user && <li><button onClick={handleLogout}><FormattedMessage id="nav.logout" defaultMessage="Logout" /></button></li>}
        <li>
          <select value={locale} onChange={handleLanguageChange}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;