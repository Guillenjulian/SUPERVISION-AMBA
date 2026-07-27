import { useMemo, useState } from 'react';
import { colors, font, headingFont } from '../../styles/theme';
import { useMesaData } from '../../hooks/useMesaData';
import { ObjetivoRow } from './ObjetivoRow';

export function MesaObjetivosApp() {
  const { objetivos, vigiladores, feriados, cobertura, cargando, error, recargar } = useMesaData();
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return objetivos;
    return objetivos.filter((o) =>
      `${o.nombre} ${o.clienteNombre ?? ''} ${o.localidad ?? ''}`.toLowerCase().includes(q)
    );
  }, [objetivos, query]);

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, fontFamily: font, color: colors.text }}>
      <header
        style={{
          background: colors.surfaceAlt,
          borderBottom: `1px solid ${colors.border}`,
          padding: '18px 20px',
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: colors.accent }}>
          Mesa · Objetivos
        </div>
        <h1 style={{ margin: '4px 0 2px', fontFamily: headingFont, fontSize: 24, fontWeight: 800 }}>Objetivos</h1>
        <p style={{ margin: 0, color: colors.textMuted, fontSize: 14 }}>
          Buscá un objetivo para editarlo, asignarle vigiladores o configurar sus turnos.
        </p>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 60px' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: colors.bg,
            padding: '4px 0 14px',
            zIndex: 5,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: colors.surfaceAlt,
              border: `1.5px solid ${colors.border}`,
              borderRadius: 12,
              padding: '11px 14px',
            }}
          >
            <span style={{ color: colors.textDim }}>🔍</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenId(null);
              }}
              placeholder="Buscar por nombre, cliente o localidad…"
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                outline: 'none',
                color: colors.text,
                fontSize: 15,
                fontFamily: font,
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ border: 'none', background: 'none', color: colors.textDim, cursor: 'pointer', fontSize: 12.5, fontFamily: font }}
              >
                Limpiar
              </button>
            )}
          </div>
          <div style={{ padding: '8px 2px 0', fontSize: 12.5, color: colors.textDim }}>
            <strong style={{ color: colors.textMuted }}>{filtrados.length}</strong> de {objetivos.length} objetivos
          </div>
        </div>

        {error && (
          <div style={{ padding: '14px 16px', borderRadius: 12, background: colors.surfaceAlt, border: `1.5px solid ${colors.error}`, color: colors.error, marginBottom: 14, fontSize: 14 }}>
            {error}
          </div>
        )}

        {cargando ? (
          <div style={{ textAlign: 'center', padding: 60, color: colors.textDim }}>Cargando objetivos…</div>
        ) : filtrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: colors.textDim }}>
            No hay objetivos que coincidan con la búsqueda.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtrados.map((o) => (
              <ObjetivoRow
                key={o.id}
                objetivo={o}
                vigiladores={vigiladores}
                feriados={feriados}
                cobertura={cobertura}
                query={query}
                isOpen={openId === o.id}
                onToggle={() => setOpenId(openId === o.id ? null : o.id)}
                onChanged={recargar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
