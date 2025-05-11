import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from './middleware/loggerMiddleware';
import taskListsReducer from '../features/taskListsSlice';

export const store = configureStore({
    reducer: {
        taskLists: taskListsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;