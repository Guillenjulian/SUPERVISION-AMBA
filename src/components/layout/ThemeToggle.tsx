import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../styles/theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        marginLeft: 8,
        padding: '6px 10px',
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        background: theme === 'light' ? '#fff' : colors.surface,
        color: colors.text,
        cursor: 'pointer',
      }}
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
