import { useState, type CSSProperties } from 'react';
import { colors } from '../../styles/theme';

/** Rutas en public/ — reemplazá logo.png con tu imagen */
const LOGO_CANDIDATES = ['/logo.png', '/logo.webp', '/logo.jpg', '/logo.svg'];

interface AppLogoProps {
  size?: number;
}

export function AppLogo({ size = 42 }: AppLogoProps) {
  const [failed, setFailed] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  const tryNext = () => {
    if (srcIndex < LOGO_CANDIDATES.length - 1) {
      setSrcIndex((i) => i + 1);
    } else {
      setFailed(true);
    }
  };

  const boxStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: failed ? `linear-gradient(135deg,${colors.accent},#c2410c)` : 'transparent',
    boxShadow: '0 6px 18px rgba(16,24,40,.06)',
  };

  if (failed) {
    return (
      <div style={boxStyle}>
        <span style={{ fontSize: size * 0.45 }}>🛡️</span>
      </div>
    );
  }

  return (
    <div style={boxStyle}>
      <img
        src={LOGO_CANDIDATES[srcIndex]}
        alt="SeGuVIP"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block',
        }}
        onError={tryNext}
      />
    </div>
  );
}
