import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask, toggleTaskCompletion } from '../../features/tasksSlice';
import { RootState } from '../../store';
import TasksContainer from '../../components/Task/TasksContainer/TasksContainer';
import TaskModal from '../../components/Task/TaskModal/TaskModal';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces/Task';
import './TasksPage.css';

const TasksPage: React.FC = () =>
{
  const { taskListId } = useParams<{ taskListId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter(task => task.taskListId === parseInt(taskListId!, 10))
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // // Filtrar las tareas para obtener solo las de la lista actual
  // const currentTasks = tasks.filter(task => task.taskListId === parseInt(taskListId!, 10));

  // useEffect(() =>
  // {
  //   // Esto asegura que el slice de tareas tenga solo las tareas de la lista actual
  //   // Es importante limpiar el slice cuando se cambia de lista para evitar que se acumulen tareas de otras listas
  //   dispatch(setTasks(tasks.filter(task => task.taskListId === parseInt(taskListId!, 10))));
  // }, [taskListId, dispatch]);

  const handleOpenAddTaskModal = () =>
  {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  }

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
          taskData: { id: taskData.id, title: taskData.title, description: taskData.description },
          listId: parseInt(taskListId!, 10),
        })
      );
    }
    else
    {
      dispatch(
        addTask({
          taskData: { title: taskData.title, description: taskData.description },
          listId: parseInt(taskListId!, 10),
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
        taskId: id,
        listId: parseInt(taskListId!, 10),
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
        taskId: id,
        listId: parseInt(taskListId!, 10),
      })
    );
  };

  const handleGoBack = () =>
  {
    navigate('/taskLists');
  };

  return (
    <div className="tasks-page">
      <h1>{/*taskList?.title || 'Tareas'*/}Tareas</h1>

      <div className="tasks-controls">
        <button className="back-button" onClick={handleGoBack}>Volver a Listas</button>
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

      {tasks && (
        <TasksContainer
          tasks={tasks}
          onToggle={handleCompletedToggle}
          onEdit={handleOpenEditTaskModal}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TasksPage;