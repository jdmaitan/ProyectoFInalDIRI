import { configureStore } from '@reduxjs/toolkit';
import taskListsReducer from './features/taskListsSlice';
import tasksReducer from './features/tasksSlice';

export const store = configureStore({
    reducer: {
        taskLists: taskListsReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;