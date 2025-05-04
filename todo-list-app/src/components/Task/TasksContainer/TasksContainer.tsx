import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../../interfaces/Task';
import './TasksContainer.css';

interface TasksContainerProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <ul className="tasks-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TasksContainer;