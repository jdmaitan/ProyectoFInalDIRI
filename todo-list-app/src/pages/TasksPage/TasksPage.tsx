import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import
  {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  } from '../../features/taskListsSlice';
import { RootState } from '../../store';
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
  const dispatch = useDispatch();

  // Obtener la lista específica y sus tareas
  const taskList = useSelector((state: RootState) =>
    state.taskLists.lists.find(list => list.id === parseInt(taskListId!, 10))
  );

  const tasks = taskList?.tasks || [];
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

  const handleSaveTask = (taskData: { id?: number; title: string; description: string }) =>
  {
    if (taskData.id)
    {
      dispatch(
        updateTask({
          listId: parseInt(taskListId!, 10),
          taskId: taskData.id,
          title: taskData.title,
          description: taskData.description,
        })
      );
    } else
    {
      dispatch(
        addTask({
          listId: parseInt(taskListId!, 10),
          title: taskData.title,
          description: taskData.description,
        })
      );
    }
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleCompletedToggle = (id: number) =>
  {
    dispatch(
      toggleTaskCompletion({
        listId: parseInt(taskListId!, 10),
        taskId: id,
      })
    );
  };

  const handleOpenEditTaskModal = (id: number) =>
  {
    const task = tasks.find(t => t.id === id);
    setTaskToEdit(task || null);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (id: number) =>
  {
    dispatch(
      deleteTask({
        listId: parseInt(taskListId!, 10),
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