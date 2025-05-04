import { Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage/TasksPage';
import TaskListsPage from './pages/TaskListsPage/TaskListsPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import './App.css';

function App() {
 return (
  <>
   <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/taskLists" element={<TaskListsPage />} />
    <Route path="/tasks/:taskListId" element={<TasksPage />} />
   </Routes>
  </>
 );
}

export default App;