import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Task } from '../../interfaces/Task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <h3 className={`task-title ${task.completed ? 'task-title--completed' : ''}`}>
          {task.title}
        </h3>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <FaTrash onClick={() => onDelete(task.id)} />
        <FaEdit onClick={() => onEdit(task.id)} />
      </div>
    </li>
  );
};

export default TaskItem;