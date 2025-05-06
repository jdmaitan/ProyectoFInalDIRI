import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../../interfaces/Task';
import './TasksContainer.css';

interface TasksContainerProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
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