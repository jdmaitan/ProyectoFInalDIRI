import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TaskList } from '../../../interfaces/TaskLists';
import './TaskListItem.css';

interface TaskListItemProps {
  taskList: TaskList;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ taskList, onEdit, onDelete, onSelect }) => {
  return (
    <li className="task-list-item" onClick={() => onSelect(taskList.id)}>
      <div className="task-list-item-content">
        <h2 className="task-list-item-title">{taskList.title}</h2>
        <p className="task-list-item-description">{taskList.description}</p>
      </div>
      <div className="task-list-item-actions">
        <FaTrash onClick={(e) => { e.stopPropagation(); onDelete(taskList.id); }} />
        <FaEdit onClick={(e) => { e.stopPropagation(); onEdit(taskList.id); }} />
      </div>
    </li>
  );
};

export default TaskListItem;