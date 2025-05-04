import React, { useState } from 'react';
import TasksContainer from '../../components/Task/TasksContainer/TasksContainer';
import TaskModal from '../../components/Task/TaskModal/TaskModal';
import { Task } from '../../interfaces/Task';
import './TasksPage.css'

const TasksPage: React.FC = () =>
{
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Aprender React', description: 'Repasar los conceptos básicos de React.', completed: false },
    { id: 2, title: 'Construir la app de TODO', description: 'Implementar la funcionalidad principal de la app.', completed: false },
    { id: 3, title: 'Añadir funcionalidades', description: 'Agregar características adicionales a la app.', completed: true },
  ]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleTaskCompleted = (id: number) =>
  {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) =>
  {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSaveTask = (taskData: { id?: number; title: string; description: string }) =>
  {
    if (taskData.id)
    {
      setTasks(tasks.map(task =>
        task.id === taskData.id ? { ...task, title: taskData.title, description: taskData.description } : task
      ));
    } else
    {
      const newTask: Task = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: taskData.title,
        description: taskData.description,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const openEditModal = (id: number) =>
  {
    const task = tasks.find(task => task.id === id);
    setTaskToEdit(task || null);
    setIsModalOpen(true);
  };

  const closeEditModal = () =>
  {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="tasks-page">
      <h1>Mi Lista de Tareas</h1>

      <div className="tasks-header">
        <div></div> {/* Espacio vacío para alinear el botón a la derecha */}
        <button
          className="add-task-button"
          onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }}
        >
          Añadir Nueva Tarea
        </button>
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSave={handleSaveTask}
          initialTask={taskToEdit}
        />
      )}

      <TasksContainer
        tasks={tasks}
        onToggle={toggleTaskCompleted}
        onDelete={deleteTask}
        onEdit={openEditModal}
      />
    </div>
  );
};

export default TasksPage;