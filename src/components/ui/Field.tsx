import type { ReactNode } from 'react';
import { colors, font } from '../../styles/theme';

interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export function Field({ label, children, required }: FieldProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
          color: colors.accent,
          textTransform: 'uppercase',
          fontFamily: font,
          marginBottom: 8,
        }}
      >
        {label}
        {required && <span style={{ color: colors.error }}> *</span>}
      </div>
      {children}
    </div>
  );
}
