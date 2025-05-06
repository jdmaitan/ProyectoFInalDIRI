import { Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage/TasksPage';
import TaskListsPage from './pages/TaskListsPage/TaskListsPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import ProtectedRoute from './routes/protectedRoute';
import NoMatchPage from './pages/NoMatchPage/NoMatchPage';

function App()
{
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/taskLists" element={<ProtectedRoute><TaskListsPage /></ProtectedRoute>} />
                <Route path="/taskLists/:taskListId" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
                <Route path="*" element={<NoMatchPage />} />
            </Routes>
        </>
    );
}

export default App;