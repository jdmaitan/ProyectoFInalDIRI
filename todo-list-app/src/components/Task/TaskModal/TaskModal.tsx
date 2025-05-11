import React, { useState, useEffect } from 'react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialTask ? (
            <FormattedMessage id="taskModal.editTitle" defaultMessage="Editar Tarea" />
          ) : (
            <FormattedMessage id="taskModal.newTitle" defaultMessage="Nueva Tarea" />
          )}
        </h2>

        <div className="mb-4">
          <label htmlFor="task-title" className="block text-gray-700 text-sm font-bold mb-2">
            <FormattedMessage id="taskModal.titleLabel" defaultMessage="Título:" />
          </label>
          <input
            type="text"
            id="task-title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={intl.formatMessage({ id: "taskModal.titlePlaceholder", defaultMessage: "Título de la tarea" })}
          />
          {titleError && <p className="text-red-500 text-xs italic">{titleError}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="task-description" className="block text-gray-700 text-sm font-bold mb-2">
            <FormattedMessage id="taskModal.descriptionLabel" defaultMessage="Descripción:" />
          </label>
          <textarea
            id="task-description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={intl.formatMessage({ id: "taskModal.descriptionPlaceholder", defaultMessage: "Descripción detallada" })}
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={handleSave}
          >
            <FormattedMessage id="taskModal.saveButton" defaultMessage="Guardar" />
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            <FormattedMessage id="taskModal.cancelButton" defaultMessage="Cancelar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;