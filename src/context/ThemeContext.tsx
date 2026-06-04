import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme as _getTheme, setTheme as _setTheme } from '../styles/theme';

type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem('theme') as 'light' | 'dark' | null;
      return s ?? _getTheme();
    } catch {
      return _getTheme();
    }
  });

  useEffect(() => {
    _setTheme(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;
