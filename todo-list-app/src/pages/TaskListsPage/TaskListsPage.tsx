import React from 'react';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import TaskListModal from '../../components/TaskList/TaskListModal/TaskListModal';
import { TaskList } from '../../interfaces/TaskLists';
import './TaskListsPage.css';

interface TaskListsPageProps
{
    taskLists: TaskList[];
    onSelectList: (id: number) => void;
    onSaveTaskList: (taskListData: { id?: number; title: string; description: string }) => void;
    onDeleteTaskList: (id: number) => void;
    onEditTaskList: (id: number) => void;
    onAddTaskList: () => void;
    taskListToEdit: TaskList | null;
    isListModalOpen: boolean;
    closeListModal: () => void;
}

const TaskListsPage: React.FC<TaskListsPageProps> = ({
    taskLists,
    onSelectList,
    onSaveTaskList,
    onDeleteTaskList,
    onEditTaskList,
    onAddTaskList,
    taskListToEdit,
    isListModalOpen,
    closeListModal,
}) =>
{
    const handleDelete = (id: number) =>
    {
        onDeleteTaskList(id);
    };

    const handleSave = (taskListData: { id?: number; title: string; description: string }) =>
    {
        onSaveTaskList(taskListData);
    };

    const handleOpenEdit = (id: number) =>
    {
        onEditTaskList(id);
    };

    const handleClose = () =>
    {
        closeListModal();
    };

    const handleAddListClick = () =>
    {
        onAddTaskList();
    };

    return (
        <div className="task-list-page">
            <h1>Mis Listas de Tareas</h1>

            <div className="task-list-header">
                <button
                    className="add-task-list-button"
                    onClick={handleAddListClick}
                >
                    Añadir Nueva Lista
                </button>
            </div>

            {isListModalOpen && (
                <TaskListModal
                    isOpen={isListModalOpen}
                    onClose={handleClose}
                    onSave={handleSave}
                    initialTaskList={taskListToEdit}
                />
            )}

            <TaskListsContainer
                taskLists={taskLists}
                onSelect={onSelectList}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default TaskListsPage;