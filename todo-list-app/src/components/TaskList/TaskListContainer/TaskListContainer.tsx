import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import { TaskList } from '../../../interfaces/TaskLists';

interface TaskListsContainerProps {
  taskLists: TaskList[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const TaskListsContainer: React.FC<TaskListsContainerProps> = ({ taskLists, onEdit, onDelete, onSelect }) => {
  return (
    <ul className="mt-8 w-full max-w-2xl mx-auto space-y-4 list-none p-0">
      {taskLists.map((taskList) => (
        <TaskListItem
          key={taskList.id}
          taskList={taskList}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default TaskListsContainer;