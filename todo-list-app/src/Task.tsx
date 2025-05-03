import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Task.css'; // Importa el archivo CSS

interface TaskProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, description, completed, onToggle, onDelete, onEdit }) => {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <div className="task-content">
        <h3 className={`task-title ${completed ? 'task-title--completed' : ''}`}>
          {title}
        </h3>
        <p className="task-description">{description}</p>
      </div>
      <div className="task-actions">
        <FaTrash onClick={() => onDelete(id)} />
        <FaEdit onClick={() => onEdit(id)} />
      </div>
    </li>
  );
};

export default Task;