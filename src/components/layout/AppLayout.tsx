import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { font, colors } from '../../styles/theme';

interface AppLayoutProps {
  children: ReactNode;
  visible?: boolean;
}

export function AppLayout({ children, visible = true }: AppLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
        fontFamily: font,
        opacity: visible ? 1 : 0,
        transition: 'opacity .4s',
      }}
    >
      <AppHeader />
      <main style={{ padding: '16px 12px 40px', maxWidth: 520, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
