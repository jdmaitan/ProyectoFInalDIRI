import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { AuthProvider } from './contexts/auth/AuthProvider.tsx'
import { LanguageProvider } from './contexts/language/LanguageProvider.tsx'

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter basename={basename}>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
)
