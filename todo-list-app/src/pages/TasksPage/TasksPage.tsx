import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAsync, updateTaskAsync, deleteTaskAsync, toggleTaskCompletionAsync } from '../../features/taskListsSlice';
import { AppDispatch, RootState } from '../../store';
import TasksContainer from '../../components/Task/TasksContainer/TasksContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces/Task';
import logger from '../../services/logging';
import { FormattedMessage } from 'react-intl';

const TaskModal = lazy(() => import('../../components/Task/TaskModal/TaskModal'));

const TasksPage: React.FC = () => {
  const { taskListId } = useParams<{ taskListId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const taskList = useSelector((state: RootState) =>
    state.taskLists.lists.find(list => list.id === taskListId!)
  );
  const { loading, error } = useSelector((state: RootState) => state.taskLists);

  const tasks = taskList?.tasks || [];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenAddTaskModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = (taskData: { id?: string; title: string; description: string }) => {
    if (taskData.id) {
      dispatch(
        updateTaskAsync({
          listId: taskListId!,
          taskId: taskData.id,
          title: taskData.title,
          description: taskData.description,
        })
      );
    } else {
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

  const handleCompletedToggle = (id: string, completed: boolean) => {
    dispatch(
      toggleTaskCompletionAsync({
        listId: taskListId!,
        taskId: id,
        completed: !completed
      })
    );
  };

  const handleOpenEditTaskModal = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTaskToEdit(task || null);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(
      deleteTaskAsync({
        listId: taskListId!,
        taskId: id,
      })
    );
  };

  const handleGoBack = () => {
    navigate('/taskLists');
  };

  useEffect(() => {
    logger.info("Entrando a TasksPage");
  }, []);

  if (loading === 'pending') {
    return <div className="p-4"><FormattedMessage id="tasksPage.loading" /></div>;
  }

  if (loading === 'failed') {
    return <div className="p-4 text-red-500"><FormattedMessage id="tasksPage.error" values={{ error: error || 'Ocurrió un error al realizar la operación.' }} /></div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto mb-4 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          {taskList?.title || <FormattedMessage id="tasksPage.defaultTitle" />}
        </h1>
      </div>
      <div className="max-w-xl mx-auto flex justify-between mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline transition duration-150 ease-in-out"
          onClick={handleGoBack}
        >
          <FormattedMessage id="tasksPage.goBack" />
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline transition duration-150 ease-in-out"
          onClick={handleOpenAddTaskModal}
        >
          <FormattedMessage id="tasksPage.addTaskButton" />
        </button>
      </div>

      {isTaskModalOpen && (
        <Suspense fallback={<div className="p-4"><FormattedMessage id="tasksPage.loadingModal" /></div>}>
          <TaskModal
            isTaskModalOpen={isTaskModalOpen}
            onClose={handleCloseTaskModal}
            onSave={handleSaveTask}
            initialTask={taskToEdit}
          />
        </Suspense>
      )}

      <div className="max-w-xl mx-auto">
        <TasksContainer
          tasks={tasks}
          onToggle={handleCompletedToggle}
          onEdit={handleOpenEditTaskModal}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;