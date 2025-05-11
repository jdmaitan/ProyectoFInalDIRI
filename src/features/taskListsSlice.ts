import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TaskList } from '../interfaces/TaskLists';
import { Task } from '../interfaces/Task';
import { addTaskListToFirebase, addTaskToFirebase, deleteTaskFromFirebase, deleteTaskListFromFirebase, getTaskListsFromFirebase, updateTaskCompletionInFirebase, updateTaskInFirebase, updateTaskListInFirebase } from '../services/firebaseDatabaseTaskService';
import logger from '../services/logging';

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
  async (_, { rejectWithValue }) =>
  {
    try
    {
      const taskLists = await getTaskListsFromFirebase();
      return taskLists;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error fetching task lists:${error.message}`);
      return rejectWithValue(error.message || 'Error al obtener las listas de tareas');
    }
  }
);

export const addTaskListAsync = createAsyncThunk(
  'taskLists/addTaskList',
  async (payload: { title: string; description: string }, { rejectWithValue }) =>
  {
    try
    {
      const firebaseId = await addTaskListToFirebase(payload.title, payload.description);
      const newTaskList: TaskList = {
        id: firebaseId,
        title: payload.title,
        description: payload.description,
        tasks: [],
      };
      return newTaskList;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error adding task list: ${error.message}`);
      return rejectWithValue(error.message || 'Error al añadir la lista de tareas');
    }
  }
);

export const updateTaskListAsync = createAsyncThunk(
  'taskLists/updateTaskList',
  async (payload: { id: string; title: string; description: string }, { rejectWithValue }) =>
  {
    try
    {
      const { id, title, description } = payload;
      await updateTaskListInFirebase(id, title, description);
      return payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error updating task list: ${error.message}`);
      return rejectWithValue(error.message || 'Error al actualizar la lista de tareas');
    }
  }
);

export const deleteTaskListAsync = createAsyncThunk(
  'taskLists/deleteTaskList',
  async (id: string, { rejectWithValue }) =>
  {
    try
    {
      await deleteTaskListFromFirebase(id);
      return id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error deleting task list: ${error.message}`);
      return rejectWithValue(error.message || 'Error al eliminar la lista de tareas');
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  'taskLists/addTask',
  async (payload: { listId: string; title: string; description: string }, { rejectWithValue }) =>
  {
    try
    {
      const { listId, title, description } = payload;
      const taskId = await addTaskToFirebase(listId, title, description, false);
      const newTask: Task = { id: taskId, title, description, completed: false };
      return { ...newTask, listId };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error adding task: ${error.message}`);
      return rejectWithValue(error.message || 'Error al añadir la tarea');
    }
  },
);

export const updateTaskAsync = createAsyncThunk(
  'taskLists/updateTask',
  async (payload: { listId: string; taskId: string; title: string; description: string }, { rejectWithValue }) =>
  {
    try
    {
      const { listId, taskId, title, description } = payload;
      await updateTaskInFirebase(listId, taskId, title, description);
      return payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error updating task: ${error.message}`);
      return rejectWithValue(error.message || 'Error al actualizar la tarea');
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'taskLists/deleteTask',
  async (payload: { listId: string; taskId: string }, { rejectWithValue }) =>
  {
    try
    {
      const { listId, taskId } = payload;
      await deleteTaskFromFirebase(listId, taskId);
      return payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error deleting task: ${error.message}`);
      return rejectWithValue(error.message || 'Error al eliminar la tarea');
    }
  },
);

export const toggleTaskCompletionAsync = createAsyncThunk(
  'taskLists/toggleTaskCompletion',
  async (payload: { listId: string; taskId: string; completed: boolean }, { rejectWithValue }) =>
  {
    try
    {
      const { listId, taskId, completed } = payload;
      await updateTaskCompletionInFirebase(listId, taskId, completed);
      return payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any)
    {
      logger.error(`Error toggling task completion: ${error.message}`);
      return rejectWithValue(error.message || 'Error al cambiar el estado de la tarea');
    }
  },
);

export const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {},
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
        state.lists.push(action.payload);
      })
      .addCase(addTaskListAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al añadir la lista';
      })
      .addCase(fetchTaskLists.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchTaskLists.fulfilled, (state, action) =>
      {
        state.loading = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(fetchTaskLists.rejected, (state, action) =>
      {
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
        const { id, title, description, completed, listId } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list)
        {
          if (!Array.isArray(list.tasks))
          {
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
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) =>
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
        state.loading = 'succeeded';
      })
      .addCase(updateTaskAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al actualizar la tarea';
      })
      .addCase(updateTaskAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) =>
      {
        const { listId, taskId } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list)
        {
          list.tasks = list.tasks.filter(task => task.id !== taskId);
        }
        state.loading = 'succeeded';
      })
      .addCase(deleteTaskAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al eliminar la tarea';
      })
      .addCase(deleteTaskAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(toggleTaskCompletionAsync.fulfilled, (state, action) =>
      {
        const { listId, taskId, completed } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list)
        {
          const task = list.tasks.find(task => task.id === taskId);
          if (task)
          {
            task.completed = completed;
          }
        }
        state.loading = 'succeeded';

      })
      .addCase(toggleTaskCompletionAsync.rejected, (state, action) =>
      {
        state.loading = 'failed';
        state.error = action.error.message || 'Error al cambiar el estado de la tarea';
      })
      .addCase(toggleTaskCompletionAsync.pending, (state) =>
      {
        state.loading = 'pending';
        state.error = null;
      });
  },
});

export default taskListsSlice.reducer;