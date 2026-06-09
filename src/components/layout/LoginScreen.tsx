import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { colors, font } from '../../styles/theme';

interface Props {
  onStart: () => void;
}

type Modo = 'login' | 'registro';

export function LoginScreen({ onStart }: Props) {
  const [modo, setModo] = useState<Modo>('login');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setCargando(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    setCargando(false);
    if (error) {
      setError('Email o contraseña incorrectos');
      return;
    }
    onStart();
  };

  const handleRegistro = async () => {
    if (!nombre || !email || !password) return;
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setCargando(true);
    setError('');

    // Crear usuario en auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signUpError || !data.user) {
      setCargando(false);
      setError(signUpError?.message ?? 'Error al registrarse');
      return;
    }

    // Crear registro en tabla supervisores
    const { error: insertError } = await supabase
      .from('supervisores')
      .insert({ id: data.user.id, nombre: nombre.trim(), email: email.trim().toLowerCase(), activo: true });

    setCargando(false);
    if (insertError) {
      setError('Error al guardar el perfil: ' + insertError.message);
      return;
    }
    onStart();
  };

  const input: React.CSSProperties = {
    padding: 12,
    borderRadius: 10,
    border: `1.5px solid ${colors.border}`,
    fontSize: 16,
    outline: 'none',
    fontFamily: font,
  };

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '40px auto', fontFamily: font }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40 }}>🛡️</div>
        <h2 style={{ margin: '8px 0 4px', color: colors.primary, fontSize: 22 }}>Supervisión AMBA</h2>
        <p style={{ margin: 0, color: '#888', fontSize: 14 }}>Grupo Plus · SeGuVIP</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: 20, borderRadius: 10, overflow: 'hidden', border: `1.5px solid ${colors.border}` }}>
        {(['login', 'registro'] as Modo[]).map((m) => (
          <button
            key={m}
            onClick={() => { setModo(m); setError(''); }}
            style={{
              flex: 1,
              padding: '10px 0',
              background: modo === m ? colors.primary : '#fff',
              color: modo === m ? '#fff' : '#888',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
              fontFamily: font,
            }}
          >
            {m === 'login' ? 'Ingresar' : 'Registrarme'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {modo === 'registro' && (
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            style={input}
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={input}
          onKeyDown={(e) => e.key === 'Enter' && (modo === 'login' ? handleLogin() : handleRegistro())}
        />

        {error && <div style={{ color: colors.error, fontSize: 14, padding: '8px 12px', background: '#fff0f0', borderRadius: 8 }}>{error}</div>}

        <button
          onClick={modo === 'login' ? handleLogin : handleRegistro}
          disabled={cargando || !email || !password || (modo === 'registro' && !nombre)}
          style={{
            padding: '14px 16px',
            background: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 16,
            opacity: cargando ? 0.7 : 1,
            fontFamily: font,
          }}
        >
          {cargando ? 'Procesando...' : modo === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
