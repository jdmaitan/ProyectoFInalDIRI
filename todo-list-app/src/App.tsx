import React, { useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';
import './App.css';

interface Task
{
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function App()
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
      // Editar tarea existente
      setTasks(tasks.map(task =>
        task.id === taskData.id ? { ...task, title: taskData.title, description: taskData.description } : task
      ));
    } else
    {
      // Agregar nueva tarea
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
    <div className="app">
      <h1>Mi Lista de Tareas</h1>

      <button className="add-new-task-button" onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }}>
        Añadir Nueva Tarea
      </button>
      
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSave={handleSaveTask} // Usamos una única función para guardar
          initialTask={taskToEdit}
        />
      )}

      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onToggle={toggleTaskCompleted}
            onDelete={deleteTask}
            onEdit={openEditModal}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;