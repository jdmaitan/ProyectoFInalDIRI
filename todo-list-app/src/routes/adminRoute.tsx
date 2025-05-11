import React from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '../services/interfaces/IAuthService';
import { useAuth } from '../contexts/auth/useAuth';

interface AdminRouteProps
{
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) =>
{
    const { user, roles } = useAuth(); // Obtiene el usuario y los roles del contexto.

    // Redirige al usuario a la página principal si no está autenticado o no es administrador.
    if (!user || !roles || !roles.includes(Role.ADMIN))
    {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>; // Renderiza el contenido si el usuario es administrador.
};

export default AdminRoute;