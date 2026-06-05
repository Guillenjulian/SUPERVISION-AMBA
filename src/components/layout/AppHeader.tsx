import { colors, font, headingFont } from '../../styles/theme';
import { AppLogo } from './AppLogo';
import { LoginBar } from './LoginBar';

export function AppHeader() {
  return (
    <header
      style={{
        background: colors.surfaceAlt,
        padding: '20px 16px 16px',
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 6px rgba(16,24,40,.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AppLogo size={42} />
        <div>
          <div style={{ color: colors.text, fontFamily: headingFont, fontWeight: 800, fontSize: 18, letterSpacing: 0.3 }}>
            Supervisión AMBA
          </div>
          <div style={{ color: colors.accent, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>
            GRUPO PLUS · SEGUVIP
          </div>
        </div>
        <LoginBar />
      </div>
    </header>
  );
}
