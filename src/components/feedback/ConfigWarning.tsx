import { isWeb3FormsConfigured } from '../../services/web3forms';
import { colors, font } from '../../styles/theme';

export function ConfigWarning() {
  if (isWeb3FormsConfigured()) return null;

  return (
    <div
      style={{
        background: colors.surfaceAlt,
        border: `1.5px solid ${colors.accent}`,
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 16,
        fontFamily: font,
      }}
    >
      <div style={{ color: colors.accent, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
        ⚙️ Activar envío por correo
      </div>
      <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.7 }}>
        Creá <code style={{ color: colors.text }}>apps/supervision-amba/.env</code> con{' '}
        <code style={{ color: colors.text }}>VITE_WEB3FORMS_KEY</code> (clave de web3forms.com).
      </div>
    </div>
  );
}
