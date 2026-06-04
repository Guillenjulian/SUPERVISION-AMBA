import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StyledSelect, StyledInput } from '../ui';
import { colors } from '../../styles/theme';

export function LoginBar() {
  const { supervisor, login, logout, supervisorsList } = useAuth();
  const [choice, setChoice] = useState('');

  if (supervisor) {
    return (
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ color: colors.text, fontWeight: 700 }}>Supervisor: {supervisor}</div>
        <button
          style={{ background: 'transparent', border: `1px solid ${colors.border}`, color: colors.text, padding: '6px 10px', borderRadius: 8 }}
          onClick={() => logout()}
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ color: colors.text, fontSize: 13 }}>Entrar como:</div>
      <div style={{ width: 220 }}>
        <StyledSelect value={choice} onChange={(v) => setChoice(v)} options={supervisorsList} placeholder="Elegí supervisor" />
      </div>
      <button
        style={{ background: colors.accent, border: 'none', color: '#fff', padding: '8px 12px', borderRadius: 8 }}
        onClick={() => choice && login(choice)}
      >
        Entrar
      </button>
    </div>
  );
}

export default LoginBar;
