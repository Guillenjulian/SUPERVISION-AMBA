import { SupervisionPage } from './pages/SupervisionPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SupervisionPage />
      </AuthProvider>
    </ThemeProvider>
  );
}
