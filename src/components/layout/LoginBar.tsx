import { useAuth } from '../../context/AuthContext';
import { colors } from '../../styles/theme';

export function LoginBar() {
  const { supervisor, logout } = useAuth();

  if (!supervisor) return null;

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ color: colors.text, fontWeight: 700, fontSize: 13 }}>
        {supervisor.split(' ')[0]}
      </div>
      <button
        style={{ background: 'transparent', border: `1px solid ${colors.border}`, color: colors.text, padding: '6px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
        onClick={() => logout()}
      >
        Salir
      </button>
    </div>
  );
}

export default LoginBar;
