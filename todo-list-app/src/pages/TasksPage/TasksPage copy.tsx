import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import
{
  addTaskAsync,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} from '../../features/taskListsSlice';
import { AppDispatch, RootState } from '../../store';
import TasksContainer from '../../components/Task/TasksContainer/TasksContainer';
import TaskModal from '../../components/Task/TaskModal/TaskModal';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces/Task';
import './TasksPage.css';
import logger from '../../services/logging';

const TasksPage: React.FC = () =>
{
  const { taskListId } = useParams<{ taskListId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Obtener la lista específica y sus tareas
  const taskLists = useSelector((state: RootState) => state.taskLists.lists);

  const { loading, error } = useSelector((state: RootState) => state.taskLists);
  const taskList = taskLists.find(list => list.id === taskListId);

  const tasks = Array.isArray(taskList?.tasks) ? taskList?.tasks || [] : [];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenAddTaskModal = () =>
  {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () =>
  {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = (taskData: { id?: string; title: string; description: string }) =>
  {
    if (taskData.id)
    {
      dispatch(
        updateTask({
          listId: taskListId!,
          taskId: taskData.id,
          title: taskData.title,
          description: taskData.description,
        })
      );
    } else
    {
      dispatch(
        addTaskAsync({
          listId: taskListId!,
          title: taskData.title,
          description: taskData.description,
        })
      );
    }
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleCompletedToggle = (id: string) =>
  {
    dispatch(
      toggleTaskCompletion({
        listId: taskListId!,
        taskId: id,
      })
    );
  };

  const handleOpenEditTaskModal = (id: string) =>
  {
    const task = tasks.find(t => t.id === id);
    setTaskToEdit(task || null);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (id: string) =>
  {
    dispatch(
      deleteTask({
        listId: taskListId!,
        taskId: id,
      })
    );
  };

  const handleGoBack = () =>
  {
    navigate('/taskLists');
  };

  useEffect(() =>
  {
    logger.info("Entrando a TasksPage");
  }, []);

  if (loading === 'pending')
  {
    return <div>Cargando...</div>;
  }

  if (loading === 'failed')
  {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="tasks-page">
      <h1>{taskList?.title || 'Tareas'}</h1>

      <div className="tasks-controls">
        <button className="back-button" onClick={handleGoBack}>
          Volver a Listas
        </button>
        <button
          className="add-task-button"
          onClick={handleOpenAddTaskModal}
        >
          Añadir Nueva Tarea
        </button>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          isTaskModalOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          onSave={handleSaveTask}
          initialTask={taskToEdit}
        />
      )}

      <TasksContainer
        tasks={tasks}
        onToggle={handleCompletedToggle}
        onEdit={handleOpenEditTaskModal}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TasksPage;