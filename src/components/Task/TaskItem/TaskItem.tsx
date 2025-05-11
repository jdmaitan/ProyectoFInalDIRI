import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Task } from '../../../interfaces/Task';

interface TaskItemProps
{
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) =>
{
  return (
    <li className="flex items-center py-2 px-4 bg-white rounded-md shadow-sm hover:shadow-md transition duration-150 ease-in-out">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
      />
      <div className="flex-grow ml-4">
        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="ml-4 flex space-x-2">
        <FaTrash
          className="text-red-500 hover:text-red-700 cursor-pointer text-lg transition duration-150 ease-in-out"
          onClick={() => onDelete(task.id)}
          aria-label="Eliminar tarea"
          role="button"
        />
        <FaEdit
          className="text-blue-500 hover:text-blue-700 cursor-pointer text-lg transition duration-150 ease-in-out"
          onClick={() => onEdit(task.id)}
          aria-label="Editar tarea"
          role="button"
        />
      </div>
    </li>
  );
};

export default TaskItem;