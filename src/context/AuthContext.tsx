import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

type AuthContextValue = {
  supervisor: string | null;
  session: Session | null;
  cargando: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supervisor, setSupervisor] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  // Cargar nombre del supervisor desde la tabla supervisores
  const cargarSupervisor = async (userId: string) => {
    const { data } = await supabase
      .from('supervisores')
      .select('nombre')
      .eq('id', userId)
      .single();
    if (data?.nombre) setSupervisor(data.nombre);
  };

  useEffect(() => {
    // Sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) cargarSupervisor(session.user.id);
      setCargando(false);
    });

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        cargarSupervisor(session.user.id);
      } else {
        setSupervisor(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSupervisor(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ supervisor, session, cargando, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
