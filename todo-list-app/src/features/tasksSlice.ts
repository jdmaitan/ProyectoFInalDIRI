import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../interfaces/Task';

interface TasksState
{
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ taskData: { title: string; description: string }; listId: number }>) =>
        {
            const { taskData, listId } = action.payload;
            const newTask: Task = {
                id: Math.max(0, ...state.tasks.map(t => t.id)) + 1,
                title: taskData.title,
                description: taskData.description,
                completed: false,
                taskListId: listId, // Asignamos taskListId
            };
            state.tasks.push(newTask);
        },
        updateTask: (state, action: PayloadAction<{ taskData: { id: number; title: string; description: string }; listId: number }>) =>
        {
            const { taskData, listId } = action.payload;
            const existingTask = state.tasks.find(task => task.id === taskData.id && task.taskListId === listId); // Verificamos taskListId
            if (existingTask)
            {
                existingTask.title = taskData.title;
                existingTask.description = taskData.description;
            }
        },
        deleteTask: (state, action: PayloadAction<{ taskId: number; listId: number }>) =>
        {
            const { taskId, listId } = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId || task.taskListId !== listId); // Verificamos taskListId
        },
        toggleTaskCompletion: (state, action: PayloadAction<{ taskId: number; listId: number }>) =>
        {
            const { taskId, listId } = action.payload;
            const existingTask = state.tasks.find(task => task.id === taskId && task.taskListId === listId); // Verificamos taskListId
            if (existingTask)
            {
                existingTask.completed = !existingTask.completed;
            }
        },
        setTasks: (state, action: PayloadAction<Task[]>) =>
        {
            state.tasks = action.payload;
        },
    },
});

export const { addTask, updateTask, deleteTask, toggleTaskCompletion, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;