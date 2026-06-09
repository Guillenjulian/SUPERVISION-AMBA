import { useState } from 'react';
import { colors, font, headingFont } from '../../styles/theme';

interface Props {
  nombreSupervisor: string;
  onIniciar: (modo: 'a_pie' | 'auto', autoCodigo?: string) => Promise<{ error: string | null }>;
}

export function InicioTurnoScreen({ nombreSupervisor, onIniciar }: Props) {
  const [modo, setModo] = useState<'a_pie' | 'auto' | null>(null);
  const [autoCodigo, setAutoCodigo] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const saludo = () => {
    const h = new Date().getHours();
    if (h < 13) return 'Buen día';
    if (h < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const puedeIniciar = modo === 'a_pie' || (modo === 'auto' && autoCodigo.trim());

  const handleIniciar = async () => {
    if (!puedeIniciar || !modo) return;
    setCargando(true);
    setError('');
    const result = await onIniciar(modo, autoCodigo.trim() || undefined);
    setCargando(false);
    if (result.error) setError(result.error);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 440, margin: '0 auto', fontFamily: font, display: 'flex', flexDirection: 'column', gap: 24, minHeight: '70vh', justifyContent: 'center' }}>
      {/* Saludo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 52 }}>👮</div>
        <h1 style={{ fontFamily: headingFont, fontSize: 26, color: colors.primary, margin: '12px 0 4px' }}>
          {saludo()}, {nombreSupervisor.split(' ')[0]}
        </h1>
        <p style={{ color: '#888', fontSize: 15, margin: 0 }}>
          ¿Listo para iniciar tu turno?
        </p>
      </div>

      {/* Selección de modo */}
      <div>
        <p style={{ fontWeight: 700, fontSize: 14, color: colors.text, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          ¿Cómo arrancás hoy?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button
            onClick={() => setModo('a_pie')}
            style={{
              padding: '24px 12px',
              borderRadius: 14,
              border: modo === 'a_pie' ? `2.5px solid ${colors.primary}` : '2px solid #e0e0e0',
              background: modo === 'a_pie' ? '#fdf0f3' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontFamily: font,
            }}
          >
            <span style={{ fontSize: 36 }}>🚶</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: modo === 'a_pie' ? colors.primary : '#555' }}>A pie</span>
          </button>
          <button
            onClick={() => setModo('auto')}
            style={{
              padding: '24px 12px',
              borderRadius: 14,
              border: modo === 'auto' ? `2.5px solid ${colors.primary}` : '2px solid #e0e0e0',
              background: modo === 'auto' ? '#fdf0f3' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              fontFamily: font,
            }}
          >
            <span style={{ fontSize: 36 }}>🚗</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: modo === 'auto' ? colors.primary : '#555' }}>En auto</span>
          </button>
        </div>
      </div>

      {/* Código de auto */}
      {modo === 'auto' && (
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: colors.text, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Código del móvil
          </p>
          <input
            type="text"
            value={autoCodigo}
            onChange={(e) => setAutoCodigo(e.target.value)}
            placeholder="Ej: 911"
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              border: `1.5px solid ${colors.border}`,
              fontSize: 18,
              fontWeight: 700,
              textAlign: 'center',
              outline: 'none',
              fontFamily: font,
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {error && (
        <div style={{ color: colors.error, fontSize: 14, padding: '10px 14px', background: '#fff0f0', borderRadius: 10 }}>
          {error}
        </div>
      )}

      {/* Botón iniciar */}
      <button
        onClick={handleIniciar}
        disabled={!puedeIniciar || cargando}
        style={{
          padding: '16px',
          background: puedeIniciar ? colors.primary : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 17,
          fontWeight: 800,
          cursor: puedeIniciar ? 'pointer' : 'not-allowed',
          fontFamily: font,
          opacity: cargando ? 0.7 : 1,
        }}
      >
        {cargando ? 'Iniciando...' : '▶️ Iniciar turno'}
      </button>
    </div>
  );
}
