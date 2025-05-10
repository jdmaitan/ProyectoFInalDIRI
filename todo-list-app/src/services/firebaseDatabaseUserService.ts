import { IUserService } from "./interfaces/IUserService";
import { getDatabase, ref, get, update, set } from "firebase/database";
import { app } from "../firebaseConfig";
import { Role } from "./interfaces/IAuthService";
import logger from "./logging";

export class FirebaseDatabaseUserService implements IUserService
{
    private db;

    constructor()
    {
        this.db = getDatabase(app);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getAllUsers(): Promise<{ [uid: string]: any }>
    {
        try
        {
            const usersRef = ref(this.db, "users");
            const snapshot = await get(usersRef);

            if (snapshot.exists())
            {
                return snapshot.val();
            }

            return {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any)
        {
            logger.error("Error getting all users:");
            throw new Error("Failed to fetch all users: " + error.message);
        }
    }

    async updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void>
    {
        try
        {
            const userRolesRef = ref(this.db, `users/${uid}/roles`);
            await update(userRolesRef, { admin: isAdmin });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) 
        {
            logger.error("Error updating user admin role");
            throw new Error("Failed to update user admin role: " + error.message);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async setUserRoles(uid: string, data: any): Promise<void>
    {
        try
        {
            const userRef = ref(this.db, `users/${uid}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists())
            {
                await set(userRef, data);
            } else
            {
                await update(userRef, data);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error("Error setting user roles");
            throw new Error("Failed to set user roles: " + error.message);
        }
    }

    async getUserRoles(uid: string): Promise<Role[]>
    {
        try
        {
            const rolesRef = ref(this.db, `users/${uid}/roles`);
            const snapshot = await get(rolesRef);

            if (snapshot.exists())
            {
                const rolesData = snapshot.val();
                const roles: Role[] = [];

                if (rolesData.admin === true)
                {
                    roles.push(Role.ADMIN);
                }

                if (roles.length === 0)
                {
                    roles.push(Role.USER);
                }

                return roles;
            }

            return [Role.USER];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any)
        {
            logger.error("Error getting user roles");
            throw new Error("Failed to get user roles: " + error.message);
        }
    }
}