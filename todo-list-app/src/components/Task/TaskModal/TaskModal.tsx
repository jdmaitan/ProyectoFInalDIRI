import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import { Task } from '../../../interfaces/Task';
import { useIntl, FormattedMessage } from 'react-intl';

interface TaskModalProps
{
  isTaskModalOpen: boolean;
  onClose: () => void;
  onSave: (taskData: { id?: string; title: string; description: string }) => void;
  initialTask?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isTaskModalOpen: isOpen, onClose, onSave, initialTask }) =>
{
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const intl = useIntl();

  useEffect(() =>
  {
    if (initialTask)
    {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
    } else
    {
      setTitle('');
      setDescription('');
    }
    setTitleError(null);
  }, [initialTask]);

  const handleSave = () =>
  {
    if (title.trim() === '')
    {
      setTitleError(intl.formatMessage({ id: "taskModal.titleRequired", defaultMessage: "El título es obligatorio." }));
      return;
    }

    const taskData: { title: string; description: string; id?: string } = {
      title,
      description
    };
    if (initialTask)
    {
      taskData.id = initialTask.id;
    }
    onSave(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          {initialTask ? (
            <FormattedMessage id="taskModal.editTitle" defaultMessage="Editar Tarea" />
          ) : (
            <FormattedMessage id="taskModal.newTitle" defaultMessage="Nueva Tarea" />
          )}
        </h2>

        <div className="modal-content">
          <label htmlFor="task-title">
            <FormattedMessage id="taskModal.titleLabel" defaultMessage="Título:" />
          </label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={intl.formatMessage({ id: "taskModal.titlePlaceholder", defaultMessage: "Título de la tarea" })}
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <label htmlFor="task-description">
            <FormattedMessage id="taskModal.descriptionLabel" defaultMessage="Descripción:" />
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={intl.formatMessage({ id: "taskModal.descriptionPlaceholder", defaultMessage: "Descripción detallada" })}
          />
        </div>

        <div className="modal-actions">
          <button onClick={handleSave}>
            <FormattedMessage id="taskModal.saveButton" defaultMessage="Guardar" />
          </button>
          <button onClick={onClose}>
            <FormattedMessage id="taskModal.cancelButton" defaultMessage="Cancelar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;