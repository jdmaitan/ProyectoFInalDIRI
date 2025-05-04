import { useState } from 'react';
import TasksPage from './pages/TasksPage/TasksPage';
import TaskListsPage from './pages/TaskListsPage/TaskListsPage';
import { TaskList } from './interfaces/TaskLists';
import { Task } from './interfaces/Task';
import './App.css';

function App()
{
  const [taskLists, setTaskLists] = useState<TaskList[]>([
    {
      id: 1, title: 'Tareas del Hogar', description: 'Lista de tareas para la casa', tasks: [
        { id: 1, title: 'Limpiar la cocina', description: 'Limpiar encimera y fregadero', completed: false },
        { id: 2, title: 'Hacer la compra', description: 'Comprar leche, pan y huevos', completed: false },
      ]
    },
    { id: 2, title: 'Proyectos Personales', description: 'Ideas y tareas para mis proyectos', tasks: [] },
  ]);

  const [currentView, setCurrentView] = useState<'taskLists' | 'tasks'>('taskLists');

  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const [taskListToEdit, setTaskListToEdit] = useState<TaskList | null>(null);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState<boolean>(false);

  ////Referentes a TaskList
  //Create
  const handleAddTaskList = () =>
  {
    setTaskListToEdit(null);
    setIsTaskListModalOpen(true);
  };

  //Create/Update
  const handleSaveTaskList = (taskListData: { id?: number; title: string; description: string }) =>
  {
    if (taskListData.id)
    {
      setTaskLists(taskLists.map(list =>
        list.id === taskListData.id ? { ...list, title: taskListData.title, description: taskListData.description } : list
      ));
    }
    else
    {
      const newTaskList: TaskList = {
        id: Math.max(0, ...taskLists.map(list => list.id)) + 1,
        title: taskListData.title,
        description: taskListData.description,
        tasks: [],
      };
      setTaskLists([...taskLists, newTaskList]);
    }
    setIsTaskListModalOpen(false);
    setTaskListToEdit(null);
  };

  //Nav
  const handleSelectTaskList = (id: number) =>
  {
    setSelectedTaskListId(id);
    setCurrentView('tasks');
  };

  const handleGoBackToTaskLists = () =>
  {
    setSelectedTaskListId(null);
    setCurrentView('taskLists');
  };

  //Delete
  const handleDeleteTaskList = (id: number) =>
  {
    setTaskLists(taskLists.filter((list) => list.id !== id));
  };

  //Modal
  const openEditTaskListModal = (id: number) =>
  {
    const taskList = taskLists.find(list => list.id === id);
    setTaskListToEdit(taskList || null);
    setIsTaskListModalOpen(true);
  };

  const closeTaskListModal = () =>
  {
    setIsTaskListModalOpen(false);
    setTaskListToEdit(null);
  };

  //Referentes a Task

  //Create/Update
  const handleSaveTask = (taskData: { id?: number; title: string; description: string }, listId: number) =>
  {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? {
        ...list,
        tasks: taskData.id
          ? list.tasks.map(task =>
            task.id === taskData.id ? { ...task, ...taskData } : task
          )
          : [
            ...list.tasks,
            {
              id: Math.max(0, ...list.tasks.map(t => t.id)) + 1,
              title: taskData.title,
              description: taskData.description,
              completed: false,
            },
          ],
      } : list
    ));
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  //Update
  const handleToggleTask = (taskId: number, listId: number) =>
  {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? {
        ...list,
        tasks: list.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      } : list
    ));
  };

  //Delete
  const handleDeleteTask = (taskId: number, listId: number) =>
  {
    setTaskLists(taskLists.map(list =>
      list.id === listId ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list
    ));
  };

  //Modal
  const openEditTaskModal = (taskId?: number, listId: number = selectedTaskListId!) =>
  {
    const taskList = taskLists.find(list => list.id === listId);
    const task = taskId !== undefined ? taskList?.tasks.find(t => t.id === taskId) : null;
    setTaskToEdit(task || null);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () =>
  {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="app">
      {currentView === 'taskLists' && (
        <TaskListsPage
          taskLists={taskLists}
          onSelectList={handleSelectTaskList}
          onSaveTaskList={handleSaveTaskList}
          onDeleteTaskList={handleDeleteTaskList}
          onEditTaskList={openEditTaskListModal}
          onAddTaskList={handleAddTaskList}
          taskListToEdit={taskListToEdit}
          isListModalOpen={isTaskListModalOpen}
          closeListModal={closeTaskListModal}
        />
      )}

      {currentView === 'tasks' && selectedTaskListId !== null && (
        <TasksPage
          taskList={taskLists.find(list => list.id === selectedTaskListId)}
          onGoBack={handleGoBackToTaskLists}
          onSaveTask={(taskData) => handleSaveTask(taskData, selectedTaskListId)}
          onDeleteTask={(taskId) => handleDeleteTask(taskId, selectedTaskListId)}
          onToggleTask={(taskId) => handleToggleTask(taskId, selectedTaskListId)}
          openEditModal={(taskId) => openEditTaskModal(taskId, selectedTaskListId)}
          taskToEdit={taskToEdit}
          isModalOpen={isTaskModalOpen}
          closeModal={closeTaskModal}
        />
      )}
    </div>
  );
}

export default App;