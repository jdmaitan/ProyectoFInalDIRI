import { database, taskListsRef } from '../firebaseConfig';
import { DataSnapshot, get, push, ref, remove, set, update } from 'firebase/database';
import { Task } from '../interfaces/Task';
import { TaskList } from '../interfaces/TaskLists';

type NewTaskListData = {
    title: string;
    description: string;
    tasks: Task[];
};

export const getTaskListsFromFirebase = async (): Promise<TaskList[]> =>
{
    try
    {
        const snapshot: DataSnapshot = await get(taskListsRef);
        const data = snapshot.val();

        const taskLists: TaskList[] = data
            ? Object.entries(data).map(([id, value]) =>
            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const tasksData = (value as any).tasks || {};
                // Convertir el objeto de tareas a array
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const tasksArray = tasksData ? Object.entries(tasksData).map(([taskId, task]: [string, any]) => ({
                    id: taskId,
                    title: task.title,
                    description: task.description,
                    completed: task.completed || false,
                })) : [];

                return {
                    id: id,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    title: (value as any).title || '',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    description: (value as any).description || '',
                    tasks: tasksArray,
                };
            })
            : [];

        return taskLists;
    } catch (error)
    {
        console.error("Error getting task lists from Firebase:", error);
        throw error;
    }
};

export const addTaskListToFirebase = (title: string, description: string): Promise<string> =>
{
    return new Promise((resolve, reject) =>
    {
        const newListRef = push(taskListsRef);
        if (newListRef.key)
        {
            // Si newListRef.key existe, significa que se generó el ID
            const newListData: NewTaskListData = {
                title: title,
                description: description,
                tasks: []
            };
            set(newListRef, newListData)
                .then(() =>
                {
                    resolve(newListRef.key!);
                })
                .catch((error) =>
                {
                    reject(error);
                });
        } else
        {
            reject(new Error("No se pudo generar un ID único para la lista."));
        }
    });
};

export const updateTaskListInFirebase = (
    id: string,
    title: string,
    description: string,
): Promise<void> =>
{
    return new Promise((resolve, reject) =>
    {
        const taskListRef = ref(database, `taskLists/${id}`);
        update(taskListRef, { title, description })
            .then(() => resolve())
            .catch(reject);
    });
};

export const deleteTaskListFromFirebase = (id: string): Promise<void> =>
{
    return new Promise((resolve, reject) =>
    {
        const taskListRef = ref(database, `taskLists/${id}`);
        remove(taskListRef)
            .then(() => resolve())
            .catch(reject);
    });
};

export const addTaskToFirebase = async (
    listId: string,
    title: string,
    description: string,
    completed: boolean,
): Promise<string> =>
{
    try
    {
        const tasksRef = ref(database, `taskLists/${listId}/tasks`);
        const newTaskRef = push(tasksRef);
        if (!newTaskRef.key)
        {
            throw new Error('No se pudo generar un ID único para la tarea.');
        }

        const newTask: Task = {
            id: newTaskRef.key,
            title,
            description,
            completed,
        };

        await set(newTaskRef, newTask);
        return newTask.id;
    } catch (error)
    {
        console.error('Error adding task to Firebase:', error);
        throw error;
    }
};

export const updateTaskInFirebase = async (
    listId: string,
    taskId: string,
    title: string,
    description: string,
): Promise<void> =>
{
    try
    {
        const taskRef = ref(database, `taskLists/${listId}/tasks/${taskId}`);
        await update(taskRef, { title, description });
    } catch (error)
    {
        console.error('Error updating task in Firebase:', error);
        throw error;
    }
};

export const deleteTaskFromFirebase = async (
    listId: string,
    taskId: string,
): Promise<void> =>
{
    try
    {
        const taskRef = ref(database, `taskLists/${listId}/tasks/${taskId}`);
        await remove(taskRef);
    } catch (error)
    {
        console.error('Error deleting task from Firebase:', error);
        throw error;
    }
};

export const updateTaskCompletionInFirebase = async (
    listId: string,
    taskId: string,
    completed: boolean,
): Promise<void> =>
{
    try
    {
        const taskRef = ref(database, `taskLists/${listId}/tasks/${taskId}`);
        await update(taskRef, { completed });
    } catch (error)
    {
        console.error('Error updating task completion in Firebase:', error);
        throw error;
    }
};