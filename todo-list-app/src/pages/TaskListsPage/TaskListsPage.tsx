import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskListAsync, updateTaskListAsync, deleteTaskListAsync, fetchTaskLists } from '../../features/taskListsSlice';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import { TaskList } from '../../interfaces/TaskLists';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import logger from '../../services/logging';
import { FormattedMessage } from 'react-intl';

const TaskListModal = lazy(() => import('../../components/TaskList/TaskListModal/TaskListModal'));

const TaskListsPage: React.FC = () => {
  const taskLists = useSelector((state: RootState) => state.taskLists.lists);
  const { loading, error } = useSelector((state: RootState) => state.taskLists);
  const dispatch = useDispatch<AppDispatch>();
  const [taskListToEdit, setTaskListToEdit] = useState<TaskList | null>(null);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenAddTaskListModal = () => {
    setTaskListToEdit(null);
    setIsTaskListModalOpen(true);
  };

  const handleCloseTaskListModal = () => {
    setIsTaskListModalOpen(false);
    setTaskListToEdit(null);
  };

  const handleSaveTaskList = (taskListData: { id?: string; title: string; description: string }) => {
    if (taskListData.id) {
      dispatch(updateTaskListAsync({ id: taskListData.id, title: taskListData.title, description: taskListData.description }));
    } else {
      dispatch(addTaskListAsync({ title: taskListData.title, description: taskListData.description }));
    }
    setIsTaskListModalOpen(false);
    setTaskListToEdit(null);
  };

  const handleOpenEditTaskListModal = (id: string) => {
    const taskList = taskLists.find(list => list.id === id);
    setTaskListToEdit(taskList || null);
    setIsTaskListModalOpen(true);
  };

  const handleDeleteTaskList = (id: string) => {
    dispatch(deleteTaskListAsync(id));
  };

  const handleSelectTaskList = (id: string) => {
    navigate(`/taskLists/${id}`);
  };

  useEffect(() => {
    dispatch(fetchTaskLists());
    logger.info("Entrando a TaskListsPage");
  }, [dispatch]);

  if (loading === 'pending') {
    return <div className="p-4"><FormattedMessage id="taskLists.loading" /></div>;
  }

  if (loading === 'failed') {
    return <div className="p-4 text-red-500"><FormattedMessage id="taskLists.error" values={{ error: error || 'Hubo un error durante la ejecución de la operación' }} /></div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto mb-2">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          <FormattedMessage id="taskLists.title" />
        </h1>
      </div>
      <div className="max-w-xl mx-auto mb-4 flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline transition duration-150 ease-in-out"
          onClick={handleOpenAddTaskListModal}
        >
          <FormattedMessage id="taskLists.addTaskListButton" />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm italic mb-4 max-w-xl mx-auto"><FormattedMessage id="taskLists.errorMessage" values={{ error: error }} /></p>}

      {isTaskListModalOpen && (
        <Suspense fallback={<div className="p-4"><FormattedMessage id="taskLists.loadingModal" /></div>}>
          <TaskListModal
            isOpen={isTaskListModalOpen}
            onClose={handleCloseTaskListModal}
            onSave={handleSaveTaskList}
            initialTaskList={taskListToEdit}
          />
        </Suspense>
      )}

      <div className="max-w-xl mx-auto">
        <TaskListsContainer
          taskLists={taskLists}
          onSelect={handleSelectTaskList}
          onEdit={handleOpenEditTaskListModal}
          onDelete={handleDeleteTaskList}
        />
      </div>
    </div>
  );
};

export default TaskListsPage;