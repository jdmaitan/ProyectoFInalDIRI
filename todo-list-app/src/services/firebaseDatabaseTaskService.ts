import { database, taskListsRef } from '../firebaseConfig';
import { DataSnapshot, get, push, ref, remove, set, update } from 'firebase/database';
import { Task } from '../interfaces/Task';
import { TaskList } from '../interfaces/TaskLists';
import logger from './logging';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
        logger.error("Error getting task lists from Firebase");
        throw new Error("Failed to fetch task lists: " + error.message);
    }
};

export const addTaskListToFirebase = (title: string, description: string): Promise<string> =>
{
    return new Promise((resolve, reject) =>
    {
        const newListRef = push(taskListsRef);
        if (newListRef.key)
        {
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
                    logger.error("Error adding task list to Firebase");
                    reject(new Error("Failed to add task list: " + error.message));
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
            .catch((error) =>
            {
                logger.error(`Error updating task list with ID ${id} in Firebase`,);
                reject(new Error(`Failed to update task list with ID ${id}: ` + error.message));
            });
    });
};

export const deleteTaskListFromFirebase = (id: string): Promise<void> =>
{
    return new Promise((resolve, reject) =>
    {
        const taskListRef = ref(database, `taskLists/${id}`);
        remove(taskListRef)
            .then(() => resolve())
            .catch((error) =>
            {
                logger.error(`Error deleting task list with ID ${id} from Firebase`);
                reject(new Error(`Failed to delete task list with ID ${id}: ` + error.message));
            });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
        logger.error('Error adding task to Firebase:');
        throw new Error('Failed to add task: ' + error.message);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
        logger.error(`Error updating task with ID ${taskId} in list ${listId} in Firebase`);
        throw new Error(`Failed to update task with ID ${taskId}: ` + error.message);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
        logger.error(`Error deleting task with ID ${taskId} from list ${listId} in Firebase`);
        throw new Error(`Failed to delete task with ID ${taskId}: ` + error.message);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
        logger.error(`Error updating completion status for task with ID ${taskId} in list ${listId} in Firebase`);
        throw new Error(`Failed to update task completion status for task with ID ${taskId}: ` + error.message);
    }
};