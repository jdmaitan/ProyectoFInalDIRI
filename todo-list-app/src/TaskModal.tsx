import React, { useState, useEffect } from 'react';
import './TaskModal.css';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: { id?: number; title: string; description: string }) => void;
  initialTask?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialTask]);

  const handleSave = () => {
    if (title.trim() !== '') {
      const taskData: { id?: number; title: string; description: string } = { title, description };
      if (initialTask) {
        taskData.id = initialTask.id;
      }
      onSave(taskData);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <h2>{initialTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}</h2>
        <div className="modal-content">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;