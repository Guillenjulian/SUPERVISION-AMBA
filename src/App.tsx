import { SupervisionPage } from './pages/SupervisionPage';
import { MesaObjetivosPage } from './pages/MesaObjetivosPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const esMesa = window.location.pathname.startsWith('/mesa');

  return (
    <ThemeProvider>
      <AuthProvider>
        {esMesa ? <MesaObjetivosPage /> : <SupervisionPage />}
      </AuthProvider>
    </ThemeProvider>
  );
}
