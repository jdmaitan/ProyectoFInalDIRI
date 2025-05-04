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
  isTaskModalOpen: boolean;
  openTaskModal: (id: number | undefined) => void;
  closeTaskModal: () => void;
  onSaveTask: (taskData: { id?: number; title: string; description: string }) => void;
  onDeleteTask: (id: number) => void;
  onCompletedToggleTask: (id: number) => void;
  taskToEdit: Task | null;
}

const TasksPage: React.FC<TasksPageProps> = ({
  taskList,
  onGoBack,
  isTaskModalOpen,
  openTaskModal,
  closeTaskModal,
  onSaveTask,
  onCompletedToggleTask,
  onDeleteTask,
  taskToEdit
}) =>
{
  const handleOpenAddTaskModal = () =>
  {
    openTaskModal(undefined);
  }

  const handleCloseTaskModal = () =>
  {
    closeTaskModal();
  };

  const handleSaveTask = (taskData: { id?: number; title: string; description: string }) =>
  {
    onSaveTask(taskData);
  };

  const handleCompletedToggle = (id: number) =>
  {
    onCompletedToggleTask(id);
  };

  const handleOpenEditTaskModal = (id: number) =>
  {
    openTaskModal(id);
  };

  const handleDeleteTask = (id: number) =>
  {
    onDeleteTask(id);
  };

  return (
    <div className="tasks-page">
      <h1>{taskList?.title || 'Tareas'}</h1>

      <div className="tasks-controls">
        <button className="back-button" onClick={onGoBack}>Volver a Listas</button>
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

      {taskList && (
        <TasksContainer
          tasks={taskList.tasks}
          onToggle={handleCompletedToggle}
          onEdit={handleOpenEditTaskModal}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TasksPage;