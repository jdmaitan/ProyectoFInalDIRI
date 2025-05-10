import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import ProtectedRoute from './routes/protectedRoute';
import { lazy, Suspense } from 'react';
import './App.css';

const TasksPage = lazy(() => import('./pages/TasksPage/TasksPage'));
const TaskListsPage = lazy(() => import('./pages/TaskListsPage/TaskListsPage'));
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const NoMatchPage = lazy(() => import('./pages/NoMatchPage/NoMatchPage'));

function App()
{
    return (
        <>
            <Navbar />
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/taskLists" element={<ProtectedRoute><TaskListsPage /></ProtectedRoute>} />
                    <Route path="/taskLists/:taskListId" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
                    <Route path="*" element={<NoMatchPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;