import { createContext } from 'react';
import { Role } from '../../services/interfaces/IAuthService';

export interface AuthContextProps
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    roles: Role[] | null;
}

// Crea el contexto de autenticación.
export const AuthContext = createContext<AuthContextProps>(
    {
        user: null,
        roles: null
    }
);