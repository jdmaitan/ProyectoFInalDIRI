import React, { useState, useEffect } from 'react';
import './TaskListModal.css';
import { TaskList } from '../../../interfaces/TaskLists';

interface TaskListModalProps
{
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskListData: { id?: string; title: string; description: string }) => void;
  initialTaskList?: TaskList | null;
}

const TaskListModal: React.FC<TaskListModalProps> = ({ isOpen, onClose, onSave, initialTaskList }) =>
{
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);

  useEffect(() =>
  {
    if (initialTaskList)
    {
      setTitle(initialTaskList.title);
      setDescription(initialTaskList.description);
    } else
    {
      setTitle('');
      setDescription('');
    }
  }, [initialTaskList]);

  const handleSave = () =>
  {
    setTitleError(null);
    if (title.trim() === '')
    {

      setTitleError('El título es obligatorio.');
      return;
    }
    else
    {
      const taskListData: { title: string; description: string; id?: string } = {
        title,
        description,
      };
      if (initialTaskList)
      {
        taskListData.id = initialTaskList.id;
      }
      onSave(taskListData);
      onClose();
    }
  };

  if (!isOpen)
  {
    return null;
  }

  return (
    <div className="task-list-modal-overlay">
      <div className="task-list-modal">
        <h2>{initialTaskList ? 'Editar Lista' : 'Nueva Lista'}</h2>
        <div className="modal-content">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la lista"
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la lista"
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

export default TaskListModal;