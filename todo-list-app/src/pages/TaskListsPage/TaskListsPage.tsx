import React from 'react';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import TaskListModal from '../../components/TaskList/TaskListModal/TaskListModal';
import { TaskList } from '../../interfaces/TaskLists';
import './TaskListsPage.css';

interface TaskListsPageProps
{
    taskLists: TaskList[];
    onSelectTaskList: (id: number) => void;
    onSaveTaskList: (taskListData: { id?: number; title: string; description: string }) => void;
    onDeleteTaskList: (id: number) => void;
    onOpenEditTaskListModal: (id: number) => void;
    onOpenAddTaskListModal: () => void;
    taskListToEdit: TaskList | null;
    isTaskListModalOpen: boolean;
    closeTaskListModal: () => void;
}

const TaskListsPage: React.FC<TaskListsPageProps> = ({
    taskLists,
    onOpenAddTaskListModal,
    closeTaskListModal,
    onSaveTaskList,
    onOpenEditTaskListModal,
    onDeleteTaskList,
    onSelectTaskList,
    taskListToEdit,
    isTaskListModalOpen,
}) =>
{
    const handleOpenAddTaskListModal = () =>
    {
        onOpenAddTaskListModal();
    };

    const handleCloseTaskListModal = () =>
    {
        closeTaskListModal();
    };

    const handleSaveTaskList = (taskListData: { id?: number; title: string; description: string }) =>
    {
        onSaveTaskList(taskListData);
    };

    const handleOpenEditTaskListModal = (id: number) =>
    {
        onOpenEditTaskListModal(id);
    };

    const handleDeleteTaskList = (id: number) =>
    {
        onDeleteTaskList(id);
    };

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
                onSelect={onSelectTaskList}
                onEdit={handleOpenEditTaskListModal}
                onDelete={handleDeleteTaskList}
            />
        </div>
    );
};

export default TaskListsPage;