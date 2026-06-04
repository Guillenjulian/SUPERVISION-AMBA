import type { ReactNode } from 'react';
import { font, sectionGradients, type SectionColor, colors } from '../../styles/theme';

interface SectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  color?: SectionColor;
}

export function Section({ icon, title, children, color = 'default' }: SectionProps) {
  return (
      <div
        style={{
          background: colors.surface,
          borderRadius: 16,
          marginBottom: 16,
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 4px 24px rgba(0,0,0,.06)',
        }}
      >
      <div
        style={{
          background: sectionGradients[color],
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span
          style={{
            color: '#fff',
            fontFamily: font,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ padding: '18px 16px' }}>{children}</div>
    </div>
  );
}
