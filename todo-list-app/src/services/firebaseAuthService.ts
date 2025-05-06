import { IAuthService, Role } from './interfaces/IAuthService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { userService } from './userService';


export class FirebaseAuthService implements IAuthService
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signIn(email: string, password: string): Promise<any>
    {
        return signInWithEmailAndPassword(auth, email, password); // Inicia sesión con email y contraseña.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signUp(email: string, password: string): Promise<any>
    {
        return createUserWithEmailAndPassword(auth, email, password); // Crea un nuevo usuario con email y contraseña.
    }

    signOut(): Promise<void>
    {
        return signOut(auth); // Cierra la sesión del usuario.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAuthStateChanged(callback: (user: any) => void): () => void
    {
        return onAuthStateChanged(auth, callback); // Escucha cambios en el estado de autenticación del usuario.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCurrentUser(): any | null
    {
        return auth.currentUser; // Obtiene el usuario autenticado actual.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getUserRoles(user: any): Promise<Role[]>
    {
        // Rol ADMIN por defecto para el usuario admin@admin.com.
        if (user.email === 'admin@admin.com')
        {
            return [Role.ADMIN];
        }

        // Obtiene los roles del usuario desde la base de datos.
        return userService.getUserRoles(user.uid);
    }
}