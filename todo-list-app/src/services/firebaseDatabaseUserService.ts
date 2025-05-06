import { IUserService } from "./interfaces/IUserService";
import { getDatabase, ref, get, update, set } from "firebase/database";
import { app } from "../firebaseConfig";
import { Role } from "./interfaces/IAuthService";

export class FirebaseUserService implements IUserService
{
    private db;

    constructor()
    {
        this.db = getDatabase(app); // Obtiene la instancia de la base de datos de Firebase.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getAllUsers(): Promise<{ [uid: string]: any }>
    {
        const usersRef = ref(this.db, "users"); // Crea una referencia al nodo 'users' en la base de datos.
        const snapshot = await get(usersRef); // Obtiene los datos del nodo 'users'.

        if (snapshot.exists())
        {
            return snapshot.val(); // Retorna un objeto con todos los usuarios almacenados.
        }
        return {}; // Retorna un objeto vacío si no existen usuarios.
    }

    async updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void>
    {
        const userRolesRef = ref(this.db, `users/${uid}/roles`); // Crea referencia al nodo 'roles' del usuario específico.
        await update(userRolesRef, { admin: isAdmin }); // Actualiza el rol 'admin' del usuario.
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async setUserRoles(uid: string, data: any): Promise<void>
    {
        const userRef = ref(this.db, `users/${uid}`); // Crea referencia al nodo del usuario específico.
        const snapshot = await get(userRef); // Obtiene los datos del usuario.

        if (!snapshot.exists())
        {
            await set(userRef, data); // Si el usuario no existe, lo crea con los datos proporcionados.
        } else
        {
            await update(userRef, data); // Si el usuario existe, actualiza sus datos.
        }
    }

    async getUserRoles(uid: string): Promise<Role[]>
    {
        const rolesRef = ref(this.db, `users/${uid}/roles`); // Crea una referencia al nodo de roles del usuario.
        const snapshot = await get(rolesRef); // Obtiene los datos del nodo de roles.

        if (snapshot.exists())
        { // Verifica si existen datos en el snapshot.
            const rolesData = snapshot.val(); // Obtiene los datos de roles como un objeto.
            const roles: Role[] = []; // Inicializa un array para los roles.

            if (rolesData.admin === true)
            { // Verifica si el rol 'admin' es verdadero.
                roles.push(Role.ADMIN); // Agrega el rol ADMIN al array.
            }

            if (roles.length === 0)
            { // Si no se encontró ningún rol específico.
                roles.push(Role.USER); // Asigna el rol USER por defecto.
            }

            return roles; // Retorna el array de roles.
        }

        return [Role.USER]; // Retorna el rol USER por defecto si no existen datos.
    }

}