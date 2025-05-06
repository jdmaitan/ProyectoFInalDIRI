import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { authService } from '../../services/authService';
import './navbar.css';
import { Role } from '../../services/interfaces/IAuthService';

const Navbar: React.FC = () =>
{
    const { user, roles } = useContext(AuthContext); // Obtiene usuario y roles del contexto.
    const navigate = useNavigate(); // Hook para la navegación.

    const handleLogout = async () =>
    { // Función para cerrar sesión.
        try
        {
            await authService.signOut(); // Llama al servicio de autenticación para cerrar sesión.
            navigate('/'); // Redirige al usuario a la página principal.
        } catch (error)
        {
            console.error("Error al cerrar sesión:", error); // Maneja errores de cierre de sesión.
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li><Link to="/">Inicio</Link></li>
                {user && roles && (roles.includes(Role.USER) || roles.includes(Role.ADMIN)) && (
                    <li><Link to="/taskLists">Listas</Link></li>
                )}
                {!user && <li><Link to="/login">Login</Link></li>}
                {!user && <li><Link to="/register">Registro</Link></li>}
                {user && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;