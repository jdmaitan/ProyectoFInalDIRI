import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList, updateTaskList, deleteTaskList, } from '../../features/taskListsSlice';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import TaskListModal from '../../components/TaskList/TaskListModal/TaskListModal';
import { TaskList } from '../../interfaces/TaskLists';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

import './TaskListsPage.css';
import logger from '../../services/logging';

const TaskListsPage: React.FC = () =>
{
    const taskLists = useSelector((state: RootState) => state.taskLists.lists);
    const dispatch = useDispatch();
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

    const handleSaveTaskList = (taskListData: { id?: number; title: string; description: string }) =>
    {
        if (taskListData.id)
        {
            dispatch(updateTaskList({ id: taskListData.id, title: taskListData.title, description: taskListData.description }));
        }
        else
        {
            dispatch(addTaskList({ title: taskListData.title, description: taskListData.description }));
        }
        setIsTaskListModalOpen(false);
        setTaskListToEdit(null);
    };

    const handleOpenEditTaskListModal = (id: number) =>
    {
        const taskList = taskLists.find(list => list.id === id);
        setTaskListToEdit(taskList || null);
        setIsTaskListModalOpen(true);
    };

    const handleDeleteTaskList = (id: number) =>
    {
        dispatch(deleteTaskList(id));
    };

    const handleSelectTaskList = (id: number) =>
    {
        navigate(`/taskLists/${id}`);
    };

    useEffect(() =>
    {
        logger.info("Entrando a TaskListsPage");
    }, []);

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