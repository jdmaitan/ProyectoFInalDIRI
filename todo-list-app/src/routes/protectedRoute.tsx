import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/useAuth';

interface ProtectedRouteProps
{
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) =>
{
    const { user } = useAuth(); // Obtiene el usuario del contexto.

    // Redirige al usuario a la página de login si no está autenticado.
    if (!user)
    {
        return <Navigate to="/login" replace />;
    }

    return children; // Renderiza el contenido protegido si el usuario está autenticado.
};

export default ProtectedRoute;