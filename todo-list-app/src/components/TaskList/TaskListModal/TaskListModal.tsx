import React, { useState, useEffect } from 'react';
import { TaskList } from '../../../interfaces/TaskLists';
import { useIntl, FormattedMessage } from 'react-intl';

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
  const intl = useIntl();

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
      setTitleError(intl.formatMessage({ id: 'taskListModal.titleRequired', defaultMessage: 'El título es obligatorio.' }));
      return;
    } else
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialTaskList ? (
            <FormattedMessage id="taskListModal.editTitle" defaultMessage="Editar Lista" />
          ) : (
            <FormattedMessage id="taskListModal.newTitle" defaultMessage="Nueva Lista" />
          )}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            <FormattedMessage id="taskListModal.titleLabel" defaultMessage="Título:" />
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={intl.formatMessage({ id: 'taskListModal.titlePlaceholder', defaultMessage: 'Título de la lista' })}
          />
          {titleError && <p className="text-red-500 text-xs italic">{titleError}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            <FormattedMessage id="taskListModal.descriptionLabel" defaultMessage="Descripción:" />
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={intl.formatMessage({ id: 'taskListModal.descriptionPlaceholder', defaultMessage: 'Descripción de la lista' })}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={handleSave}
          >
            <FormattedMessage id="taskListModal.saveButton" defaultMessage="Guardar" />
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            <FormattedMessage id="taskListModal.cancelButton" defaultMessage="Cancelar" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListModal;