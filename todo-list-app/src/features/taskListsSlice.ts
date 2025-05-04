import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../interfaces/TaskLists';
import { Task } from '../interfaces/Task';

interface TaskListsState {
  lists: TaskList[];
}

const initialState: TaskListsState = {
  lists: [
    { 
      id: 1, 
      title: 'Tareas del Hogar', 
      description: 'Lista de tareas para la casa', 
      tasks: [] 
    },
    { 
      id: 2, 
      title: 'Proyectos Personales', 
      description: 'Ideas y tareas para mis proyectos', 
      tasks: [] 
    },
  ],
};

export const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    // Operaciones con Listas
    addTaskList: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTaskList: TaskList = {
        id: Math.max(0, ...state.lists.map(list => list.id)) + 1,
        title: action.payload.title,
        description: action.payload.description,
        tasks: [],
      };
      state.lists.push(newTaskList);
    },

    updateTaskList: (state, action: PayloadAction<{ id: number; title: string; description: string }>) => {
      const { id, title, description } = action.payload;
      const list = state.lists.find(list => list.id === id);
      if (list) {
        list.title = title;
        list.description = description;
      }
    },

    deleteTaskList: (state, action: PayloadAction<number>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },

    // Operaciones con Tareas
    addTask: (state, action: PayloadAction<{ listId: number; title: string; description: string }>) => {
      const { listId, title, description } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const newTask: Task = {
          id: Math.max(0, ...list.tasks.map(task => task.id)) + 1,
          title,
          description,
          completed: false,
        };
        list.tasks.push(newTask);
      }
    },

    updateTask: (state, action: PayloadAction<{ listId: number; taskId: number; title: string; description: string }>) => {
      const { listId, taskId, title, description } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const task = list.tasks.find(task => task.id === taskId);
        if (task) {
          task.title = title;
          task.description = description;
        }
      }
    },

    deleteTask: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
      const { listId, taskId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== taskId);
      }
    },

    toggleTaskCompletion: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
      const { listId, taskId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const task = list.tasks.find(task => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
  },
});

export const { 
  addTaskList, 
  updateTaskList, 
  deleteTaskList,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} = taskListsSlice.actions;

export default taskListsSlice.reducer;