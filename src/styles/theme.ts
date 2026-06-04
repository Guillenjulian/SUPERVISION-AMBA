import type { CSSProperties } from 'react';

// Body and heading fonts (Inter for body, Montserrat for headings)
export const font = "'Inter', sans-serif";
export const headingFont = "'Montserrat', sans-serif";

export const lightColors = {
  // Base light background
  bg: '#ffffff',
  surface: '#ffffff',
  surfaceAlt: '#f8f8f8',
  border: '#e6e6e6',
  // Text colors for light background
  text: '#0f172a',
  textMuted: '#6b7280',
  textDim: '#9aa4b2',
  // Brand / accent color (bordó)
  accent: '#C8102E',
  // Brand blues
  brandBlue: '#2B80D9',
  brandBlueDark: '#0F4A7A',
  success: '#16a34a',
  error: '#dc2626',
} as const;

export const darkColors = {
  // Original dark/blue-based palette
  bg: '#020617',
  surface: '#0f172a',
  surfaceAlt: '#1e293b',
  border: '#1e293b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  // Accent for dark theme (blue)
  accent: '#3b82f6',
  success: '#22c55e',
  error: '#ef4444',
  // keep brandBlue keys for type compatibility
  brandBlue: '#2B80D9',
  brandBlueDark: '#0F4A7A',
} as const;
type ThemeColors = Record<string, string>;
// Theme management (current colors stored here)
let currentTheme: 'light' | 'dark' = 'light';
let currentColors: ThemeColors = lightColors as unknown as ThemeColors;

export function setTheme(mode: 'light' | 'dark') {
  currentTheme = mode;
  currentColors = mode === 'dark' ? darkColors : lightColors;
  try {
    localStorage.setItem('theme', mode);
  } catch {}
}

export function getTheme() {
  return currentTheme;
}

// Proxy so components that import `colors` get dynamic values
export const colors: any = new Proxy(
  {},
  {
    get(_, prop: string) {
      return (currentColors as any)[prop];
    },
  }
);

export function getInputStyle(): CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
    background: colors.surfaceAlt,
    color: colors.text,
    fontFamily: font,
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
  };
}

export const sectionGradients = {
  brand: `linear-gradient(135deg,#960018,#660011)`,
  orange: `linear-gradient(135deg,#960018,#660011)`,
  blue: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
  green: 'linear-gradient(135deg,#16a34a,#0f8a33)',
  purple: 'linear-gradient(135deg,#a855f7,#7e22ce)',
  red: 'linear-gradient(135deg,#dc2626,#b91c1c)',
  // Default uses light background to brand accent
  default: `linear-gradient(135deg,#ffffff,#960018)`,
} as const;

export type SectionColor = keyof typeof sectionGradients;
