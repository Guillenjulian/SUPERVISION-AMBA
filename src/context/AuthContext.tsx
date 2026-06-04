import React, { createContext, useContext, useEffect, useState } from 'react';
import { SUPERVISORES } from '../constants';

type AuthContextValue = {
  supervisor: string | null;
  login: (name: string) => void;
  logout: () => void;
  supervisorsList: string[];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supervisor, setSupervisor] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('supervisor');
    if (saved) setSupervisor(saved);
  }, []);

  const login = (name: string) => {
    setSupervisor(name);
    localStorage.setItem('supervisor', name);
  };

  const logout = () => {
    setSupervisor(null);
    localStorage.removeItem('supervisor');
  };

  return (
    <AuthContext.Provider value={{ supervisor, login, logout, supervisorsList: SUPERVISORES }}>
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
