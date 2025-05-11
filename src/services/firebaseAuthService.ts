import { IAuthService, Role } from './interfaces/IAuthService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { userService } from './userService';
import logger from './logging';


export class FirebaseAuthService implements IAuthService
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn(email: string, password: string): Promise<any>
    {
        try
        {
            return await signInWithEmailAndPassword(auth, email, password);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error(`Error signing in:${error.message}`);
            // Re-lanza el error con un mensaje más amigable
            if (error.code === 'auth/user-not-found')
            {
                throw new Error("Usuario no encontrado. Verifica tu correo.");
            } else if (error.code === 'auth/wrong-password')
            {
                throw new Error("Contraseña incorrecta.");
            } else
            {
                throw new Error("Error al iniciar sesión: " + error.message);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signUp(email: string, password: string): Promise<any>
    {
        try
        {
            return await createUserWithEmailAndPassword(auth, email, password);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error(`Error signing up: ${error.message}`);
            // Re-lanza el error con un mensaje más amigable
            if (error.code === 'auth/email-already-in-use')
            {
                throw new Error("Este correo electrónico ya está en uso.");
            } else if (error.code === 'auth/invalid-email')
            {
                throw new Error("El correo electrónico no es válido.");
            } else if (error.code === 'auth/weak-password')
            {
                throw new Error("La contraseña es demasiado débil.");
            } else
            {
                throw new Error("Error al registrar el usuario: " + error.message);
            }
        }
    }

    signOut(): Promise<void>
    {
        try
        {
            return signOut(auth);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error(`Error signing out: ${error.message}`);
            throw new Error("Error al cerrar sesión: " + error.message);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAuthStateChanged(callback: (user: any) => void): () => void
    {
        return onAuthStateChanged(auth, callback);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCurrentUser(): any | null
    {
        return auth.currentUser;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getUserRoles(user: any): Promise<Role[]>
    {
        try
        {
            // Rol ADMIN por defecto para el usuario admin@admin.com.
            if (user?.email === 'admin@admin.com')
            {
                return [Role.ADMIN];
            }

            // Obtiene los roles del usuario desde la base de datos.
            return await userService.getUserRoles(user.uid);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error(`Error getting user roles: ${error.message}`);
            throw new Error("Error al obtener los roles del usuario: " + error.message);
        }
    }
}