import React, { useState } from 'react';
import { CLIENTES, SUCURSALES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { colors, font } from '../../styles/theme';
import { isGoogleBackendConfigured, loginWithSheetCredentials } from '../../services/googleSheets';

interface Props {
  onStart: (cliente: string, sucursal: string) => void;
}

export function LoginScreen({ onStart }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cliente, setCliente] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [error, setError] = useState('');

  const backendConfigured = isGoogleBackendConfigured();
  const canStart = email && password && cliente && sucursal;

  const handleSubmit = async () => {
    if (!canStart) return;
    if (!backendConfigured) {
      setError('Backend no configurado. Agregá VITE_GOOGLE_BACKEND_URL al archivo .env.');
      return;
    }

    setError('');
    const result = await loginWithSheetCredentials(email.trim().toLowerCase(), password);
    if (!result.success) {
      setError(result.error ?? 'Error al iniciar sesión');
      return;
    }

    login(result.supervisor ?? 'Supervisor');
    onStart(cliente, sucursal);
  };

  return (
    <div style={{ padding: 20, maxWidth: 560, margin: '40px auto 20px', fontFamily: font }}>
      <h2 style={{ margin: '0 0 12px', color: colors.text }}>Ingreso</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${colors.border}`, outline: 'none' }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${colors.border}`, outline: 'none' }}
        />

        <select value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${colors.border}` }}>
          <option value="">Elegí cliente</option>
          {CLIENTES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={sucursal} onChange={(e) => setSucursal(e.target.value)} style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${colors.border}` }}>
          <option value="">Elegí sucursal / sede</option>
          {SUCURSALES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {error ? <div style={{ color: colors.error, fontSize: 14 }}>{error}</div> : null}

        <button
          onClick={handleSubmit}
          style={{
            padding: '12px 16px',
            background: '#C8102E',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: canStart ? 'pointer' : 'not-allowed',
            opacity: canStart ? 1 : 0.6,
          }}
          disabled={!canStart}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
