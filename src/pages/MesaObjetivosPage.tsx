import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../components/layout/LoginScreen';
import { MesaObjetivosApp } from '../components/mesa/MesaObjetivosApp';
import { colors, font } from '../styles/theme';

export function MesaObjetivosPage() {
  const { session, cargando, isAdmin, logout } = useAuth();

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: font, color: colors.textMuted }}>
        Cargando…
      </div>
    );
  }

  if (!session) {
    return <LoginScreen onStart={() => {}} />;
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 12,
          fontFamily: font,
          color: colors.text,
          textAlign: 'center',
          padding: 24,
        }}
      >
        <div style={{ fontSize: 32 }}>🔒</div>
        <p style={{ margin: 0, fontWeight: 700 }}>No tenés permiso para acceder a Mesa.</p>
        <p style={{ margin: 0, color: colors.textMuted, fontSize: 14 }}>
          Esta sección es solo para administradores.
        </p>
        <button
          onClick={logout}
          style={{
            marginTop: 8,
            padding: '10px 18px',
            borderRadius: 10,
            border: `1.5px solid ${colors.border}`,
            background: 'none',
            color: colors.textMuted,
            cursor: 'pointer',
            fontFamily: font,
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return <MesaObjetivosApp />;
}
