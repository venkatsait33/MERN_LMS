import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './redux/store'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from './components/DarkMode'
import { useLoadUserQuery } from './redux/rtkApi/authApi'
import LoadingSpinner from './components/LoadingSpinner'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return (
    <>
      {
        isLoading ? <><LoadingSpinner /></> : <> {children}</>
      }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Custom>
          <App />
          <Toaster />
        </Custom>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
