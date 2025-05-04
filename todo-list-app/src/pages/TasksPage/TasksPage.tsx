import React from 'react';
import TasksContainer from '../../components/Task/TasksContainer/TasksContainer';
import TaskModal from '../../components/Task/TaskModal/TaskModal';
import { Task } from '../../interfaces/Task';
import { TaskList } from '../../interfaces/TaskLists';
import './TasksPage.css';

interface TasksPageProps
{
  taskList: TaskList | undefined;
  onGoBack: () => void;
  onSaveTask: (taskData: { id?: number; title: string; description: string }) => void;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  openEditModal: (id: number | undefined) => void;
  taskToEdit: Task | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

const TasksPage: React.FC<TasksPageProps> = ({
  taskList,
  onGoBack,
  onSaveTask,
  onDeleteTask,
  onToggleTask,
  openEditModal,
  taskToEdit,
  isModalOpen,
  closeModal,
}) =>
{

  const handleToggle = (id: number) =>
  {
    onToggleTask(id);
  };

  const handleDelete = (id: number) =>
  {
    onDeleteTask(id);
  };

  const handleSave = (taskData: { id?: number; title: string; description: string }) =>
  {
    onSaveTask(taskData);
  };

  const handleOpenEdit = (id: number) =>
  {
    openEditModal(id);
  };

  const handleClose = () =>
  {
    closeModal();
  };

  return (
    <div className="tasks-page">
      <h1>{taskList?.title || 'Tareas'}</h1>

      <div className="tasks-controls">
        <button className="back-button" onClick={onGoBack}>Volver a Listas</button>
        <button
          className="add-task-button"
          onClick={() => { openEditModal(undefined); }}
        >
          Añadir Nueva Tarea
        </button>
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
          initialTask={taskToEdit}
        />
      )}

      {taskList && (
        <TasksContainer
          tasks={taskList.tasks}
          onToggle={handleToggle}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TasksPage;