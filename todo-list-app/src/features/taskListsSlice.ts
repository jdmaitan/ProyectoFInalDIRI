import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../interfaces/TaskLists';
import { Task } from '../interfaces/Task';
import { addTaskListToFirebase, addTaskToFirebase, deleteTaskListFromFirebase, getTaskListsFromFirebase, updateTaskListInFirebase } from '../services/firebaseService';

interface TaskListsState
{
  lists: TaskList[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskListsState = {
  lists: [],
  loading: 'idle',
  error: null,
};

export const fetchTaskLists = createAsyncThunk(
  'taskLists/fetchTaskLists',
  async () =>
  {
    try
    {
      const taskLists = await getTaskListsFromFirebase(); // Llamamos a la función para obtener las listas desde Firebase
      return taskLists; // Retornamos las listas obtenidas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      throw new Error(error.message || 'Error al obtener las listas de tareas');
    }
  }
);

export const addTaskListAsync = createAsyncThunk(
  'taskLists/addTaskList',
  async (payload: { title: string; description: string }) =>
  {
    const firebaseId = await addTaskListToFirebase(payload.title, payload.description);
    const newTaskList: TaskList = {
      id: firebaseId,
      title: payload.title,
      description: payload.description,
      tasks: [],
    };
    return newTaskList;
  }
);

export const updateTaskListAsync = createAsyncThunk(
  'taskLists/updateTaskList',
  async (payload: { id: string; title: string; description: string }) =>
  {
    try
    {
      const { id, title, description } = payload;
      await updateTaskListInFirebase(id, title, description); // Usamos la función del servicio
      return payload; // Retornamos el payload para actualizar el estado local
    } catch (error)
    {
      console.error("Error updating task list:", error);
      throw error;
    }
  }
);

export const deleteTaskListAsync = createAsyncThunk(
  'taskLists/deleteTaskList',
  async (id: string) =>
  {
    try
    {
      await deleteTaskListFromFirebase(id); // Usamos la función del servicio
      return id; // Retornamos el ID para actualizar el estado local
    } catch (error)
    {
      console.error('Error deleting task list:', error);
      throw error;
    }
  }
);

// Thunk para añadir una nueva tarea
export const addTaskAsync = createAsyncThunk(
  'taskLists/addTask',
  async (payload: { listId: string; title: string; description: string }) =>
  {
    try
    {
      const { listId, title, description } = payload;
      const taskId = await addTaskToFirebase(listId, title, description, false);
      const newTask: Task = { id: taskId, title, description, completed: false };
      return { ...newTask, listId }; // Devolvemos la tarea con el listId
    } catch (error)
    {
      console.error('Error adding task:', error);
      throw error;
    }
  },
);

export const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    deleteTaskList: (state, action: PayloadAction<string>) =>
    {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },

    // Operaciones con Tareas
    // addTask: (state, action: PayloadAction<{ listId: string; title: string; description: string }>) =>
    // {
    //   const { listId, title, description } = action.payload;
    //   const list = state.lists.find(list => list.id === listId);
    //   if (list)
    //   {
    //     const newTask: Task = {
    //       id: '',
    //       title,
    //       description,
    //       completed: false,
    //     };
    //     list.tasks.push(newTask);
    //   }
    // },

    updateTask: (state, action: PayloadAction<{ listId: string; taskId: string; title: string; description: string }>) =>
    {
      const { listId, taskId, title, description } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list)
      {
        const task = list.tasks.find(task => task.id === taskId);
        if (task)
        {
          task.title = title;
          task.description = description;
        }
      }
    },

    deleteTask: (state, action: PayloadAction<{ listId: string; taskId: string }>) =>
    {
      const { listId, taskId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list)
      {
        list.tasks = list.tasks.filter(task => task.id !== taskId);
      }
    },

    toggleTaskCompletion: (state, action: PayloadAction<{ listId: string; taskId: string }>) =>
    {
      const { listId, taskId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list)
      {
        const task = list.tasks.find(task => task.id === taskId);
        if (task)
        {
          task.completed = !task.completed;
        }
      }
    },


  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(addTaskListAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addTaskListAsync.fulfilled, (state, action) =>
      {
        state.loading = 'succeeded';
        state.lists.push(action.payload); // Añadimos la nueva lista al estado
      })
      .addCase(addTaskListAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al añadir la lista';
      })
      .addCase(fetchTaskLists.pending, (state) =>
      {  // Manejamos el estado 'pending' para fetchTaskLists
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchTaskLists.fulfilled, (state, action) =>
      { // Manejamos el estado 'fulfilled'
        state.loading = 'succeeded';
        state.lists = action.payload; // Asignamos las listas obtenidas al estado
      })
      .addCase(fetchTaskLists.rejected, (state, action) =>
      {  // Manejamos el estado 'rejected'
        state.loading = 'failed';
        state.error = action.error.message || 'Error al obtener las listas';
      })
      .addCase(updateTaskListAsync.fulfilled, (state, action) =>
      {
        const { id, title, description } = action.payload;
        const list = state.lists.find(list => list.id === id);
        if (list)
        {
          list.title = title;
          list.description = description;
        }
        state.loading = 'succeeded';
      })
      .addCase(updateTaskListAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al actualizar la lista';
      })
      .addCase(updateTaskListAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteTaskListAsync.fulfilled, (state, action) =>
      {
        const id = action.payload;
        state.lists = state.lists.filter(list => list.id !== id);
        state.loading = 'succeeded';
      })
      .addCase(deleteTaskListAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al eliminar la lista';
      })
      .addCase(deleteTaskListAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) =>
      {
        // const { id, title, description, completed, listId } = action.payload;
        // const list = state.lists.find(list => list.id === listId);
        // if (list)
        // {
        //   const newTask: Task = { id, title, description, completed };
        //   list.tasks.push(newTask);
        // }
        // state.loading = 'succeeded';
        const { id, title, description, completed, listId } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list) {
            // Verifica que tasks sea un array
            if (!Array.isArray(list.tasks)) {
                list.tasks = [];
            }
            const newTask: Task = { id, title, description, completed };
            list.tasks.push(newTask);
        }
        state.loading = 'succeeded';
      })
      .addCase(addTaskAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al añadir la tarea';
      })
      .addCase(addTaskAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      });
  },
});

export const {
  updateTask,
  deleteTask,
  toggleTaskCompletion
} = taskListsSlice.actions;

export default taskListsSlice.reducer;