import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import { Task } from '../../../interfaces/Task';

interface TaskModalProps {
  isTaskModalOpen: boolean;
  onClose: () => void;
  onSave: (taskData: { id?: string; title: string; description: string }) => void;
  initialTask?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isTaskModalOpen: isOpen, onClose, onSave, initialTask }) => {
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
      const taskData: { title: string; description: string; id?: string } = { 
        title, 
        description 
      };
      if (initialTask) {
        taskData.id = initialTask.id;
      }
      onSave(taskData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        
        <div className="modal-content">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
          />
          
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción detallada"
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