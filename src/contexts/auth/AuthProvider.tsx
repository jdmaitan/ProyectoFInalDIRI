import React, { useEffect, useState, ReactNode } from 'react';
import { authService } from '../../services/authService';
import { Role } from '../../services/interfaces/IAuthService';
import logger from '../../services/logging';
import { AuthContext } from './authContext';

interface AuthProviderProps
{
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) =>
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);

    // Efecto para la suscripción al cambio de estado de autenticación.
    useEffect(() =>
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = authService.onAuthStateChanged(async (currentUser: any) =>
        {
            setUser(currentUser); // Establece el usuario.

            if (currentUser)
            {
                try
                {
                    const userRoles = await authService.getUserRoles(currentUser); // Obtiene los roles.
                    setRoles(userRoles); // Establece los roles.
                } 
                catch (error)
                {
                    logger.error(`Error al obtener los roles: ${error}`);
                    setRoles(null); // Maneja el error.
                }
            } 
            else
            {
                setRoles(null); // Limpia los roles si no hay usuario.
            }
        });

        return unsubscribe; // Función de cancelación de la suscripción.
    }, []);

    // Proveedor del contexto con valores de usuario y roles.
    return (
        <AuthContext.Provider value={{ user, roles }}>
            {children}
        </AuthContext.Provider>
    );
};