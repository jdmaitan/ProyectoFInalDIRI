import React, { useState, useEffect } from 'react';
import './TaskListModal.css';
import { TaskList } from '../../../interfaces/TaskLists';
import { useIntl, FormattedMessage } from 'react-intl';

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskListData: { id?: string; title: string; description: string }) => void;
  initialTaskList?: TaskList | null;
}

const TaskListModal: React.FC<TaskListModalProps> = ({ isOpen, onClose, onSave, initialTaskList }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const intl = useIntl();

  useEffect(() => {
    if (initialTaskList) {
      setTitle(initialTaskList.title);
      setDescription(initialTaskList.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialTaskList]);

  const handleSave = () => {
    setTitleError(null);
    if (title.trim() === '') {
      setTitleError(intl.formatMessage({ id: 'taskListModal.titleRequired', defaultMessage: 'El título es obligatorio.' }));
      return;
    } else {
      const taskListData: { title: string; description: string; id?: string } = {
        title,
        description,
      };
      if (initialTaskList) {
        taskListData.id = initialTaskList.id;
      }
      onSave(taskListData);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="task-list-modal-overlay">
      <div className="task-list-modal">
        <h2>{initialTaskList ? (
          <FormattedMessage id="taskListModal.editTitle" defaultMessage="Editar Lista" />
        ) : (
          <FormattedMessage id="taskListModal.newTitle" defaultMessage="Nueva Lista" />
        )}</h2>
        <div className="modal-content">
          <label htmlFor="title">
            <FormattedMessage id="taskListModal.titleLabel" defaultMessage="Título:" />
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={intl.formatMessage({ id: 'taskListModal.titlePlaceholder', defaultMessage: 'Título de la lista' })}
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <label htmlFor="description">
            <FormattedMessage id="taskListModal.descriptionLabel" defaultMessage="Descripción:" />
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={intl.formatMessage({ id: 'taskListModal.descriptionPlaceholder', defaultMessage: 'Descripción de la lista' })}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>
            <FormattedMessage id="taskListModal.saveButton" defaultMessage="Guardar" />
          </button>
          <button onClick={onClose}>
            <FormattedMessage id="taskListModal.cancelButton" defaultMessage="Cancelar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListModal;