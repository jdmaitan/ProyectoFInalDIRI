import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { LanguageProvider } from '../contexts/language/LanguageProvider';
import { AuthContext } from '../contexts/auth/authContext';
import { Role } from '../services/interfaces/IAuthService';
import { Provider } from 'react-redux';
import { store } from '../store';
import { authService } from '../services/authService';

describe('Paginas sin login renderizan correctamente', () =>
{
    beforeEach(() =>
    {
        cleanup();
    });

    afterEach(() =>
    {
        cleanup();
    });

    it('Debería renderizar correctamente la pagina inicial (LandingPage)', async () =>
    {
        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: null, roles: null }}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        // Usamos findByText para esperar a que el elemento aparezca (es asíncrono)
        const h1 = await screen.findByText(/Mis Listas de Tareas/i);
        expect(h1).toBeInTheDocument();
    });

    it('Debería renderizar correctamente la pagina de login (LoginPage)', async () =>
    {
        const user = userEvent.setup();
        await authService.signOut();
        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: null, roles: null }}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        const button = await screen.queryByText('Login');
        await user.click(button as HTMLElement);


        const h2 = await screen.findByText(/Iniciar sesión/i);
        expect(h2).toBeInTheDocument();
    });

    it('Debería renderizar correctamente la pagina de registro (RegisterPage)', async () =>
    {
        const user = userEvent.setup();
        await authService.signOut();

        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: null, roles: null }}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        const button = await screen.queryByText('Registro');
        await user.click(button as HTMLElement);


        const h2 = await screen.findByText(/Crear cuenta/i);
        expect(h2).toBeInTheDocument();
    });
});

describe('Páginas con login renderizan correctamente', () =>
{
    beforeEach(() =>
    {
        cleanup();
    });

    afterEach(() =>
    {
        cleanup();
    });

    it('Debería navegar a la página de listas al hacer clic en el botón', async () =>
    {
        // Mock del usuario autenticado
        const mockUser = { uid: '123' };
        const mockRoles = [Role.USER];
        const user = userEvent.setup();

        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: mockUser, roles: mockRoles }}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        // Buscamos y hacemos clic en el botón de Listas
        const listsButton = await screen.findByText(/Listas/i);
        await user.click(listsButton);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const h1 = await screen.findByText(/Mis Listas de Tareas/i);

        // Verificamos que la página de listas se muestra
        expect(h1).toBeInTheDocument();
    });

    it('Debería mostrar el modal de agregar lista al apretar botón "Nueva Lista"', async () =>
    {
        // Mock del usuario autenticado
        const mockUser = { uid: '123' };
        const mockRoles = [Role.USER];
        const user = userEvent.setup();

        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: mockUser, roles: mockRoles }}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        // Buscamos y hacemos clic en el botón de Listas
        const listsButton = await screen.findByText(/Listas/i);
        await user.click(listsButton);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const newListButton = await screen.findByText(/Añadir Nueva Lista/i);
        await user.click(newListButton);

        const h2 = await screen.findByText(/Nueva Lista/i);
        expect(h2).toBeInTheDocument();
    });

    it('Debería mostrar la lista de tareas', async () =>
    {
        // Mock del usuario autenticado
        const mockUser = { uid: '123' };
        const mockRoles = [Role.USER];
        const user = userEvent.setup();

        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: mockUser, roles: mockRoles }}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        // Buscamos y hacemos clic en el botón de Listas
        const listsButton = await screen.findByText(/Listas/i);
        await user.click(listsButton);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const TaskList = await screen.findByText(/Esta es la lista 1 de tareas/i);
        await user.click(TaskList);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const button = await screen.findByText(/Volver a Listas/i);
        expect(button).toBeInTheDocument();
    });

    it('Debería mostrar el modal de agregar lista al apretar botón "Añadir Nueva Tarea"', async () =>
    {
        // Mock del usuario autenticado
        const mockUser = { uid: '123' };
        const mockRoles = [Role.USER];
        const user = userEvent.setup();

        render(
            <LanguageProvider>
                <AuthContext.Provider value={{ user: mockUser, roles: mockRoles }}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </BrowserRouter>
                </AuthContext.Provider>
            </LanguageProvider>
        );

        //Buscamos y hacemos clic en el botón de Listas
        const listsButton = await screen.findByText('Listas');
        await user.click(listsButton);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const TaskList = await screen.findByText(/Esta es la lista 1 de tareas/i);
        await user.click(TaskList);

        await waitFor(() =>
        {
            // Verificamos que el estado en el store ha cambiado
            const state = store.getState().taskLists;
            expect(state.loading).toBe('succeeded');
        }, { timeout: 3000 });

        const newTaskButton = await screen.findByText(/Añadir Nueva Tarea/i);
        await user.click(newTaskButton);

        const h2 = await screen.findByText(/Nueva Tarea/i);
        expect(h2).toBeInTheDocument();
    });
});