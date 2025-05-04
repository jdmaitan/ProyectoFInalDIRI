import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../interfaces/TaskLists';

interface TaskListsState
{
    lists: TaskList[];
}

const initialState: TaskListsState = {
    lists: [
        { id: 1, title: 'Tareas del Hogar', description: 'Lista de tareas para la casa', tasks: [] },
        { id: 2, title: 'Proyectos Personales', description: 'Ideas y tareas para mis proyectos', tasks: [] },
    ],
};

export const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTaskList: (state, action: PayloadAction<{ title: string; description: string }>) =>
        {
            const newTaskList: TaskList = {
                id: Math.max(0, ...state.lists.map(list => list.id)) + 1,
                title: action.payload.title,
                description: action.payload.description,
                tasks: [],
            };
            state.lists.push(newTaskList);
        },
        updateTaskList: (state, action: PayloadAction<{ id: number; title: string; description: string }>) =>
        {
            const { id, title, description } = action.payload;
            const existingTaskList = state.lists.find(list => list.id === id);
            if (existingTaskList)
            {
                existingTaskList.title = title;
                existingTaskList.description = description;
            }
        },
        deleteTaskList: (state, action: PayloadAction<number>) =>
        {
            state.lists = state.lists.filter(list => list.id !== action.payload);
        },
        setTaskLists: (state, action: PayloadAction<TaskList[]>) =>
        {
            state.lists = action.payload;
        },
    },
});

export const { addTaskList, updateTaskList, deleteTaskList, setTaskLists } = taskListsSlice.actions;

export default taskListsSlice.reducer;