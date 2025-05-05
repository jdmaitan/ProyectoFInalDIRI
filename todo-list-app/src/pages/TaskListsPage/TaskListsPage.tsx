import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskListAsync, updateTaskListAsync, deleteTaskListAsync, fetchTaskLists, } from '../../features/taskListsSlice';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import TaskListModal from '../../components/TaskList/TaskListModal/TaskListModal';
import { TaskList } from '../../interfaces/TaskLists';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import logger from '../../services/logging';
import './TaskListsPage.css';

const TaskListsPage: React.FC = () =>
{
    const taskLists = useSelector((state: RootState) => state.taskLists.lists);
    const { loading, error } = useSelector((state: RootState) => state.taskLists);
    const dispatch = useDispatch<AppDispatch>();
    const [taskListToEdit, setTaskListToEdit] = useState<TaskList | null>(null);
    const [isTaskListModalOpen, setIsTaskListModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOpenAddTaskListModal = () =>
    {
        setTaskListToEdit(null);
        setIsTaskListModalOpen(true);
    };

    const handleCloseTaskListModal = () =>
    {
        setIsTaskListModalOpen(false);
        setTaskListToEdit(null);
    };

    const handleSaveTaskList = (taskListData: { id?: string; title: string; description: string }) =>
    {
        if (taskListData.id)
        {
            dispatch(updateTaskListAsync({ id: taskListData.id, title: taskListData.title, description: taskListData.description }));
        }
        else
        {
            dispatch(addTaskListAsync({ title: taskListData.title, description: taskListData.description }));
        }
        setIsTaskListModalOpen(false);
        setTaskListToEdit(null);
    };

    const handleOpenEditTaskListModal = (id: string) =>
    {
        const taskList = taskLists.find(list => list.id === id);
        setTaskListToEdit(taskList || null);
        setIsTaskListModalOpen(true);
    };

    const handleDeleteTaskList = (id: string) =>
    {
        dispatch(deleteTaskListAsync(id));
    };

    const handleSelectTaskList = (id: string) =>
    {
        navigate(`/taskLists/${id}`);
    };

    useEffect(() =>
    {
        dispatch(fetchTaskLists()); // Despachamos fetchTaskLists al montar el componente
        logger.info("Entrando a TaskListsPage");
    }, [dispatch]);

    if (loading === 'pending')
    {
        return <div>Cargando...</div>;
    }

    if (loading === 'failed')
    {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="task-list-page">
            <h1>Mis Listas de Tareas</h1>

            <div className="task-list-header">
                <button
                    className="add-task-list-button"
                    onClick={handleOpenAddTaskListModal}
                >
                    Añadir Nueva Lista
                </button>
                {error && <p className="error-message">Error: {error}</p>}
            </div>

            {isTaskListModalOpen && (
                <TaskListModal
                    isOpen={isTaskListModalOpen}
                    onClose={handleCloseTaskListModal}
                    onSave={handleSaveTaskList}
                    initialTaskList={taskListToEdit}
                />
            )}

            <TaskListsContainer
                taskLists={taskLists}
                onSelect={handleSelectTaskList}
                onEdit={handleOpenEditTaskListModal}
                onDelete={handleDeleteTaskList}
            />
        </div>
    );
};

export default TaskListsPage;