import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { colors, font } from '../../styles/theme';
import { DIAS_SEMANA } from '../../types/mesa';
import type { ObjetivoMesa, VigiladorMesa, FeriadoMesa } from '../../types/mesa';
import {
  updateObjetivoDatos,
  agregarVigiladorRoster,
  quitarVigiladorRoster,
  agregarTurno,
  actualizarTurno,
  eliminarTurno,
  setCoberturaFeriado,
} from '../../services/mesaObjetivos';

interface Props {
  objetivo: ObjetivoMesa;
  vigiladores: VigiladorMesa[];
  feriados: FeriadoMesa[];
  cobertura: Record<string, boolean>;
  query: string;
  isOpen: boolean;
  onToggle: () => void;
  onChanged: () => void;
}

function vigNombre(v: VigiladorMesa) {
  return `${v.nombre} ${v.apellido}`.trim();
}

function iniciales(texto: string) {
  const partes = texto.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '')).toUpperCase();
}

function highlight(texto: string, q: string) {
  if (!q) return texto;
  const idx = texto.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return texto;
  return (
    <>
      {texto.slice(0, idx)}
      <mark style={{ background: colors.accent + '33', color: colors.accent, borderRadius: 3 }}>
        {texto.slice(idx, idx + q.length)}
      </mark>
      {texto.slice(idx + q.length)}
    </>
  );
}

function isoDiaSemana(fechaISO: string): number {
  const d = new Date(fechaISO + 'T00:00:00');
  const dia = d.getDay();
  return dia === 0 ? 7 : dia;
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ position: 'relative', width: 38, height: 22, display: 'inline-block', flex: 'none', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'pointer' }}
      />
      <span
        style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: checked ? colors.success : colors.border,
          transition: 'background .15s',
        }}
      />
      <span
        style={{
          position: 'absolute', top: 2, left: checked ? 18 : 2,
          width: 18, height: 18, borderRadius: '50%', background: colors.surface,
          boxShadow: '0 1px 2px rgba(0,0,0,.3)', transition: 'left .15s',
        }}
      />
    </label>
  );
}

export function ObjetivoRow({ objetivo, vigiladores, feriados, cobertura, query, isOpen, onToggle, onChanged }: Props) {
  const [tab, setTab] = useState<'datos' | 'horarios'>('datos');
  const [nombre, setNombre] = useState(objetivo.nombre);
  const [lat, setLat] = useState(String(objetivo.lat));
  const [lng, setLng] = useState(String(objetivo.lng));
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const [pickerQuery, setPickerQuery] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState('');

  const vigiladoresAsignados = useMemo(
    () => objetivo.vigiladorIds.map((id) => vigiladores.find((v) => v.id === id)).filter(Boolean) as VigiladorMesa[],
    [objetivo.vigiladorIds, vigiladores]
  );

  const disponibles = useMemo(
    () =>
      vigiladores
        .filter((v) => !objetivo.vigiladorIds.includes(v.id))
        .filter((v) => `${vigNombre(v)} ${v.legajo}`.toLowerCase().includes(pickerQuery.toLowerCase())),
    [vigiladores, objetivo.vigiladorIds, pickerQuery]
  );

  const huboEdicion = nombre !== objetivo.nombre || lat !== String(objetivo.lat) || lng !== String(objetivo.lng);

  async function guardarDatos() {
    setGuardando(true);
    setErrorLocal('');
    try {
      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (Number.isNaN(latNum) || Number.isNaN(lngNum)) throw new Error('Latitud/longitud inválidas');
      await updateObjetivoDatos(objetivo.id, { nombre: nombre.trim(), lat: latNum, lng: lngNum });
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo guardar');
    } finally {
      setGuardando(false);
    }
  }

  async function toggleActivo(activo: boolean) {
    try {
      await updateObjetivoDatos(objetivo.id, { activo });
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo actualizar');
    }
  }

  async function agregarVigilador(vigiladorId: string) {
    try {
      await agregarVigiladorRoster(objetivo.id, vigiladorId);
      setPickerQuery('');
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo asignar el vigilador');
    }
  }

  async function quitarVigilador(vigiladorId: string) {
    try {
      await quitarVigiladorRoster(objetivo.id, vigiladorId);
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo quitar el vigilador');
    }
  }

  async function handleAgregarTurno() {
    try {
      await agregarTurno(objetivo.id);
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo crear el turno');
    }
  }

  async function toggleDiaTurno(turnoId: string, diaActual: number[], dia: number) {
    const nuevo = diaActual.includes(dia) ? diaActual.filter((d) => d !== dia) : [...diaActual, dia].sort();
    try {
      await actualizarTurno(turnoId, { dias: nuevo });
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo actualizar el turno');
    }
  }

  async function asignarVigiladorTurno(turnoId: string, vigiladorId: string) {
    try {
      await actualizarTurno(turnoId, { vigiladorId: vigiladorId || null });
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo asignar el turno');
    }
  }

  async function quitarTurno(turnoId: string) {
    try {
      await eliminarTurno(turnoId);
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo eliminar el turno');
    }
  }

  async function cambiarCobertura(feriadoId: string, cubrir: boolean) {
    try {
      await setCoberturaFeriado(objetivo.id, feriadoId, cubrir);
      onChanged();
    } catch (err: any) {
      setErrorLocal(err?.message ?? 'No se pudo guardar la cobertura');
    }
  }

  return (
    <div
      style={{
        background: colors.surface,
        border: `1.5px solid ${isOpen ? colors.accent : colors.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: isOpen ? '0 6px 20px -8px rgba(15,23,42,.2)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 14px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', fontFamily: font, color: colors.text,
        }}
      >
        <div style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: colors.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: colors.accent }}>
          {iniciales(objetivo.clienteNombre ?? objetivo.nombre)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {highlight(objetivo.nombre, query)}
            {!objetivo.activo && <span style={{ color: colors.textDim, fontWeight: 600 }}> (inactivo)</span>}
          </div>
          <div style={{ fontSize: 12.5, color: colors.textMuted }}>
            {highlight(objetivo.clienteNombre ?? 'Sin cliente', query)}
            {objetivo.localidad ? <> · {highlight(objetivo.localidad, query)}</> : null}
          </div>
        </div>
        <span
          style={{
            flex: 'none', fontSize: 11.5, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
            background: vigiladoresAsignados.length === 0 ? colors.error + '22' : colors.surfaceAlt,
            color: vigiladoresAsignados.length === 0 ? colors.error : colors.textMuted,
            border: vigiladoresAsignados.length === 0 ? 'none' : `1px solid ${colors.border}`,
          }}
        >
          👤 {vigiladoresAsignados.length}
        </span>
        <span style={{ color: colors.textDim, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
      </button>

      {isOpen && (
        <div style={{ padding: '4px 16px 18px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', gap: 4, padding: 2, background: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: 10, width: 'fit-content', margin: '12px 0 16px' }}>
            <button
              onClick={() => setTab('datos')}
              style={{
                border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, fontWeight: 700, fontFamily: font, cursor: 'pointer',
                background: tab === 'datos' ? colors.surface : 'none', color: tab === 'datos' ? colors.accent : colors.textMuted,
              }}
            >
              Datos y vigiladores
            </button>
            <button
              onClick={() => setTab('horarios')}
              style={{
                border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, fontWeight: 700, fontFamily: font, cursor: 'pointer',
                background: tab === 'horarios' ? colors.surface : 'none', color: tab === 'horarios' ? colors.accent : colors.textMuted,
              }}
            >
              Turnos y feriados
            </button>
          </div>

          {errorLocal && (
            <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: colors.error + '15', color: colors.error, fontSize: 13 }}>
              {errorLocal}
            </div>
          )}

          {tab === 'datos' ? (
            <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Nombre del objetivo</label>
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Latitud</label>
                    <input value={lat} onChange={(e) => setLat(e.target.value)} style={{ ...inputStyle, fontFamily: 'monospace' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Longitud</label>
                    <input value={lng} onChange={(e) => setLng(e.target.value)} style={{ ...inputStyle, fontFamily: 'monospace' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 11px', background: colors.surfaceAlt, border: `1.5px solid ${colors.border}`, borderRadius: 9 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>Objetivo activo</span>
                  <Switch checked={objetivo.activo} onChange={toggleActivo} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={labelStyle}>Vigiladores asignados</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {vigiladoresAsignados.length === 0 && (
                    <div style={{ fontSize: 13, color: colors.textDim, fontStyle: 'italic', padding: '4px 0' }}>
                      Todavía no hay vigiladores asignados a este objetivo.
                    </div>
                  )}
                  {vigiladoresAsignados.map((v) => (
                    <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 9px', background: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: 10 }}>
                      <div style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', background: v.esPropio ? colors.brandBlue + '22' : colors.accent + '22', color: v.esPropio ? colors.brandBlue : colors.accent, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {iniciales(vigNombre(v))}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vigNombre(v)}</div>
                        <div style={{ fontSize: 11.5, color: colors.textDim }}>Legajo {v.legajo} · {v.empresa ?? '—'}</div>
                      </div>
                      <button onClick={() => quitarVigilador(v.id)} style={{ flex: 'none', border: 'none', background: 'none', color: colors.textDim, cursor: 'pointer', width: 22, height: 22 }} title="Quitar" aria-label={`Quitar ${vigNombre(v)}`}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPickerAbierto(!pickerAbierto)}
                  style={{ padding: '8px 10px', borderRadius: 9, border: `1.5px dashed ${colors.border}`, background: 'none', color: colors.textMuted, fontSize: 13, fontWeight: 700, fontFamily: font, cursor: 'pointer' }}
                >
                  + Agregar vigilador
                </button>
                {pickerAbierto && (
                  <div style={{ background: colors.surfaceAlt, border: `1.5px solid ${colors.border}`, borderRadius: 10, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input
                      autoFocus
                      value={pickerQuery}
                      onChange={(e) => setPickerQuery(e.target.value)}
                      placeholder="Buscar por nombre o legajo…"
                      style={{ ...inputStyle, padding: '7px 9px', fontSize: 13 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 160, overflowY: 'auto' }}>
                      {disponibles.length === 0 ? (
                        <div style={{ fontSize: 12.5, color: colors.textDim, padding: 8, textAlign: 'center' }}>No quedan vigiladores por asignar</div>
                      ) : (
                        disponibles.map((v) => (
                          <div
                            key={v.id}
                            onClick={() => agregarVigilador(v.id)}
                            style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '7px 8px', borderRadius: 7, cursor: 'pointer', fontSize: 13 }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = colors.accent + '15')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                          >
                            <span style={{ fontWeight: 600 }}>{vigNombre(v)}</span>
                            <span style={{ color: colors.textDim, fontSize: 11 }}>{v.legajo} · {v.empresa ?? '—'}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 4, borderTop: `1px dashed ${colors.border}` }}>
                <button
                  onClick={() => { setNombre(objetivo.nombre); setLat(String(objetivo.lat)); setLng(String(objetivo.lng)); }}
                  disabled={!huboEdicion}
                  style={{ padding: '8px 16px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, fontFamily: font, cursor: huboEdicion ? 'pointer' : 'default', border: `1.5px solid ${colors.border}`, background: 'none', color: colors.textMuted, opacity: huboEdicion ? 1 : 0.5 }}
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarDatos}
                  disabled={!huboEdicion || guardando}
                  style={{ padding: '8px 16px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, fontFamily: font, cursor: huboEdicion ? 'pointer' : 'default', border: 'none', background: colors.accent, color: '#fff', opacity: huboEdicion ? 1 : 0.5 }}
                >
                  {guardando ? 'Guardando…' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: colors.textDim, background: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: 9, padding: '8px 10px' }}>
                  <span>ℹ️</span>
                  <span>Los turnos se repiten por día de semana. Si un feriado cae en un día habitualmente cubierto, se avisa a la derecha para decidir si se cubre o no.</span>
                </div>

                {objetivo.turnos.length === 0 && (
                  <div style={{ fontSize: 13, color: colors.textDim, fontStyle: 'italic' }}>Este objetivo todavía no tiene turnos configurados.</div>
                )}

                {objetivo.turnos.map((t) => (
                  <div key={t.id} style={{ border: `1.5px solid ${colors.border}`, borderRadius: 12, padding: '10px 12px', background: colors.surfaceAlt, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>🕐 {t.horaInicio} – {t.horaFin}</div>
                      <button onClick={() => quitarTurno(t.id)} style={{ border: 'none', background: 'none', color: colors.textDim, cursor: 'pointer', width: 22, height: 22 }} title="Eliminar turno">✕</button>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {DIAS_SEMANA.map((d) => {
                        const on = t.dias.includes(d.n);
                        return (
                          <div
                            key={d.n}
                            onClick={() => toggleDiaTurno(t.id, t.dias, d.n)}
                            role="button"
                            tabIndex={0}
                            style={{
                              flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', userSelect: 'none',
                              border: `1.5px ${d.weekend ? 'dashed' : 'solid'} ${on ? colors.brandBlue : colors.border}`,
                              background: on ? colors.brandBlue + '18' : colors.surface,
                              color: on ? colors.brandBlue : colors.textDim,
                            }}
                          >
                            {d.corta}
                          </div>
                        );
                      })}
                    </div>
                    <select
                      value={t.vigiladorId ?? ''}
                      onChange={(e) => asignarVigiladorTurno(t.id, e.target.value)}
                      style={{ ...inputStyle, padding: '7px 9px', fontSize: 13 }}
                    >
                      <option value="">Sin vigilador asignado</option>
                      {vigiladoresAsignados.map((v) => (
                        <option key={v.id} value={v.id}>{vigNombre(v)} · {v.legajo}</option>
                      ))}
                    </select>
                    {vigiladoresAsignados.length === 0 && (
                      <div style={{ fontSize: 11.5, color: colors.textDim }}>Agregá vigiladores en la otra pestaña para poder asignarlos a un turno.</div>
                    )}
                  </div>
                ))}

                <button
                  onClick={handleAgregarTurno}
                  style={{ alignSelf: 'flex-start', padding: '8px 10px', borderRadius: 9, border: `1.5px dashed ${colors.border}`, background: 'none', color: colors.textMuted, fontSize: 13, fontWeight: 700, fontFamily: font, cursor: 'pointer' }}
                >
                  + Agregar turno
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={labelStyle}>Próximos feriados nacionales</label>
                {feriados.map((f) => {
                  const diaSemana = isoDiaSemana(f.fecha);
                  const enCobertura = objetivo.turnos.some((t) => t.dias.includes(diaSemana));
                  const key = `${objetivo.id}:${f.id}`;
                  const [anio, mes, dia] = f.fecha.split('-');
                  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
                  return (
                    <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: `1.5px solid ${colors.border}`, borderRadius: 10, background: colors.surfaceAlt }}>
                      <div style={{ flex: 'none', width: 42, textAlign: 'center', padding: '5px 2px', borderRadius: 8, background: colors.surface, border: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: 15, fontWeight: 800, fontFamily: 'monospace' }}>{Number(dia)}</div>
                        <div style={{ fontSize: 9.5, textTransform: 'uppercase', color: colors.textDim }}>{meses[Number(mes) - 1]}</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{f.nombre}</div>
                        <div style={{ fontSize: 11.5, color: colors.textDim }}>
                          {DIAS_SEMANA[diaSemana - 1].corta}
                          {f.trasladadoDe && <span style={{ color: colors.accent }}> · trasladado del {f.trasladadoDe.split('-').slice(1).reverse().join('/')}</span>}
                        </div>
                      </div>
                      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                        {enCobertura ? (
                          <>
                            <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: colors.accent + '18', color: colors.accent, whiteSpace: 'nowrap' }}>cae en cobertura</span>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 10.5, color: colors.textDim, fontWeight: 600 }}>Cubrir igual</span>
                              <Switch checked={Boolean(cobertura[key])} onChange={(v) => cambiarCobertura(f.id, v)} />
                            </label>
                          </>
                        ) : (
                          <span style={{ fontSize: 10.5, color: colors.textDim, fontWeight: 600 }}>sin cobertura habitual</span>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontSize: 11, color: colors.textDim, lineHeight: 1.5, paddingTop: 4, borderTop: `1px dashed ${colors.border}` }}>
                  No incluye puentes turísticos por decreto — se sincronizan por separado cada año.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: colors.textDim,
  marginBottom: 5,
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  borderRadius: 9,
  border: `1.5px solid ${colors.border}`,
  background: colors.surfaceAlt,
  color: colors.text,
  fontSize: 14,
  fontFamily: font,
  outline: 'none',
  boxSizing: 'border-box',
};
