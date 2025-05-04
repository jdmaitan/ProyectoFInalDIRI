import React, { useState } from 'react';
import TaskListsContainer from '../../components/TaskList/TaskListContainer/TaskListContainer';
import TaskListModal from '../../components/TaskList/TaskListModal/TaskListModal';
import { TaskList } from '../../interfaces/TaskLists';
import './TaskListsPage.css';

const TaskListsPage: React.FC = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([
    { id: 1, title: 'Tareas del Hogar', description: 'Lista de tareas para la casa', tasks: [] },
    { id: 2, title: 'Proyectos Personales', description: 'Ideas y tareas para mis proyectos', tasks: [] },
  ]);
  const [taskListToEdit, setTaskListToEdit] = useState<TaskList | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);

  const handleDeleteTaskList = (id: number) => {
    setTaskLists(taskLists.filter((list) => list.id !== id));
  };

  const handleSaveTaskList = (taskListData: { id?: number; title: string; description: string }) => {
    if (taskListData.id) {
      // Editar lista existente
      setTaskLists(taskLists.map(list =>
        list.id === taskListData.id ? { ...list, title: taskListData.title, description: taskListData.description } : list
      ));
    } else {
      // Agregar nueva lista
      const newTaskList: TaskList = {
        id: Math.max(0, ...taskLists.map(list => list.id)) + 1,
        title: taskListData.title,
        description: taskListData.description,
        tasks: [],
      };
      setTaskLists([...taskLists, newTaskList]);
    }
    setIsListModalOpen(false);
    setTaskListToEdit(null);
  };

  const openEditListModal = (id: number) => {
    const taskList = taskLists.find(list => list.id === id);
    setTaskListToEdit(taskList || null);
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
    setTaskListToEdit(null);
  };

  // TODO: Implementar la lógica para seleccionar una lista y navegar a la vista de tareas
  const handleSelectList = (id: number) => {
    console.log(`Lista seleccionada con ID: ${id}`);
    // Aquí deberíamos cambiar la vista para mostrar las tareas de la lista seleccionada
  };

  return (
    <div className="task-list-page">
      <h1>Mis Listas de Tareas</h1>

      <div className="task-list-header">
        <div></div> {/* Espacio vacío para alinear el botón a la derecha */}
        <button
          className="add-task-list-button"
          onClick={() => { setTaskListToEdit(null); setIsListModalOpen(true); }}
        >
          Añadir Nueva Lista
        </button>
      </div>

      {isListModalOpen && (
        <TaskListModal
          isOpen={isListModalOpen}
          onClose={closeListModal}
          onSave={handleSaveTaskList}
          initialTaskList={taskListToEdit}
        />
      )}

      <TaskListsContainer
        taskLists={taskLists}
        onEdit={openEditListModal}
        onDelete={handleDeleteTaskList}
        onSelect={handleSelectList}
      />
    </div>
  );
};

export default TaskListsPage;