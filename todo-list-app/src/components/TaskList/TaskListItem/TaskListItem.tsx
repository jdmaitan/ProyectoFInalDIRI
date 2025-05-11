import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TaskList } from '../../../interfaces/TaskLists';

interface TaskListItemProps {
  taskList: TaskList;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ taskList, onEdit, onDelete, onSelect }) => {
  return (
    <li
      className="flex items-center py-2 px-4 bg-white rounded-md shadow-sm hover:shadow-md transition duration-150 ease-in-out cursor-pointer mb-2"
      onClick={() => onSelect(taskList.id)}
    >
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{taskList.title}</h2>
        <p className="text-sm text-gray-600">{taskList.description}</p>
      </div>
      <div className="ml-4 flex space-x-2">
        <FaTrash
          className="text-red-500 hover:text-red-700 cursor-pointer text-lg transition duration-150 ease-in-out"
          onClick={(e) => { e.stopPropagation(); onDelete(taskList.id); }}
          aria-label="Eliminar lista de tareas"
          role="button"
        />
        <FaEdit
          className="text-blue-500 hover:text-blue-700 cursor-pointer text-lg transition duration-150 ease-in-out"
          onClick={(e) => { e.stopPropagation(); onEdit(taskList.id); }}
          aria-label="Editar lista de tareas"
          role="button"
        />
      </div>
    </li>
  );
};

export default TaskListItem;