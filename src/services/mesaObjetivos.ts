import { supabase } from '../lib/supabase';
import type { ObjetivoMesa, VigiladorMesa, FeriadoMesa, TurnoMesa } from '../types/mesa';

export async function fetchObjetivosMesa(): Promise<ObjetivoMesa[]> {
  const [objetivosRes, rosterRes, turnosRes] = await Promise.all([
    supabase
      .from('objetivos')
      .select('id, nombre, lat, lng, activo, sucursales ( localidad, clientes ( nombre ) )')
      .order('nombre'),
    supabase.from('objetivo_vigiladores').select('objetivo_id, vigilador_id'),
    supabase.from('objetivo_turnos').select('id, objetivo_id, hora_inicio, hora_fin, dias, vigilador_id').order('hora_inicio'),
  ]);

  if (objetivosRes.error) throw objetivosRes.error;
  if (rosterRes.error) throw rosterRes.error;
  if (turnosRes.error) throw turnosRes.error;

  const rosterByObjetivo = new Map<string, string[]>();
  for (const r of rosterRes.data ?? []) {
    const list = rosterByObjetivo.get(r.objetivo_id) ?? [];
    list.push(r.vigilador_id);
    rosterByObjetivo.set(r.objetivo_id, list);
  }

  const turnosByObjetivo = new Map<string, TurnoMesa[]>();
  for (const t of turnosRes.data ?? []) {
    const list = turnosByObjetivo.get(t.objetivo_id) ?? [];
    list.push({
      id: t.id,
      horaInicio: (t.hora_inicio as string).slice(0, 5),
      horaFin: (t.hora_fin as string).slice(0, 5),
      dias: t.dias ?? [],
      vigiladorId: t.vigilador_id,
    });
    turnosByObjetivo.set(t.objetivo_id, list);
  }

  return (objetivosRes.data ?? []).map((o: any) => ({
    id: o.id,
    nombre: o.nombre,
    lat: o.lat,
    lng: o.lng,
    activo: o.activo,
    clienteNombre: o.sucursales?.clientes?.nombre ?? null,
    localidad: o.sucursales?.localidad ?? null,
    vigiladorIds: rosterByObjetivo.get(o.id) ?? [],
    turnos: turnosByObjetivo.get(o.id) ?? [],
  }));
}

export async function fetchVigiladores(): Promise<VigiladorMesa[]> {
  const { data, error } = await supabase
    .from('vigiladores')
    .select('id, nombre, apellido, legajo, empresa, es_propio')
    .order('apellido');
  if (error) throw error;
  return (data ?? []).map((v) => ({
    id: v.id,
    nombre: v.nombre,
    apellido: v.apellido,
    legajo: v.legajo,
    empresa: v.empresa,
    esPropio: v.es_propio,
  }));
}

export async function fetchFeriados(desde: string, cantidad = 4): Promise<FeriadoMesa[]> {
  const { data, error } = await supabase
    .from('feriados_ar')
    .select('id, fecha, nombre, trasladado_de')
    .gte('fecha', desde)
    .order('fecha')
    .limit(cantidad);
  if (error) throw error;
  return (data ?? []).map((f) => ({
    id: f.id,
    fecha: f.fecha,
    nombre: f.nombre,
    trasladadoDe: f.trasladado_de,
  }));
}

export async function fetchCobertura(): Promise<Record<string, boolean>> {
  const { data, error } = await supabase.from('objetivo_feriado_cobertura').select('objetivo_id, feriado_id, cubrir');
  if (error) throw error;
  const map: Record<string, boolean> = {};
  for (const c of data ?? []) {
    map[`${c.objetivo_id}:${c.feriado_id}`] = c.cubrir;
  }
  return map;
}

export async function updateObjetivoDatos(
  id: string,
  cambios: { nombre?: string; lat?: number; lng?: number; activo?: boolean }
): Promise<void> {
  const { error } = await supabase.from('objetivos').update(cambios).eq('id', id);
  if (error) throw error;
}

export async function agregarVigiladorRoster(objetivoId: string, vigiladorId: string): Promise<void> {
  const { error } = await supabase.from('objetivo_vigiladores').insert({ objetivo_id: objetivoId, vigilador_id: vigiladorId });
  if (error) throw error;
}

export async function quitarVigiladorRoster(objetivoId: string, vigiladorId: string): Promise<void> {
  const { error } = await supabase
    .from('objetivo_vigiladores')
    .delete()
    .eq('objetivo_id', objetivoId)
    .eq('vigilador_id', vigiladorId);
  if (error) throw error;
}

export async function agregarTurno(objetivoId: string): Promise<TurnoMesa> {
  const { data, error } = await supabase
    .from('objetivo_turnos')
    .insert({ objetivo_id: objetivoId, hora_inicio: '08:00', hora_fin: '16:00', dias: [1, 2, 3, 4, 5] })
    .select('id, hora_inicio, hora_fin, dias, vigilador_id')
    .single();
  if (error) throw error;
  return {
    id: data.id,
    horaInicio: data.hora_inicio.slice(0, 5),
    horaFin: data.hora_fin.slice(0, 5),
    dias: data.dias ?? [],
    vigiladorId: data.vigilador_id,
  };
}

export async function actualizarTurno(
  turnoId: string,
  cambios: { horaInicio?: string; horaFin?: string; dias?: number[]; vigiladorId?: string | null }
): Promise<void> {
  const payload: Record<string, unknown> = {};
  if (cambios.horaInicio !== undefined) payload.hora_inicio = cambios.horaInicio;
  if (cambios.horaFin !== undefined) payload.hora_fin = cambios.horaFin;
  if (cambios.dias !== undefined) payload.dias = cambios.dias;
  if (cambios.vigiladorId !== undefined) payload.vigilador_id = cambios.vigiladorId;
  const { error } = await supabase.from('objetivo_turnos').update(payload).eq('id', turnoId);
  if (error) throw error;
}

export async function eliminarTurno(turnoId: string): Promise<void> {
  const { error } = await supabase.from('objetivo_turnos').delete().eq('id', turnoId);
  if (error) throw error;
}

export async function setCoberturaFeriado(objetivoId: string, feriadoId: string, cubrir: boolean): Promise<void> {
  const { error } = await supabase
    .from('objetivo_feriado_cobertura')
    .upsert({ objetivo_id: objetivoId, feriado_id: feriadoId, cubrir }, { onConflict: 'objetivo_id,feriado_id' });
  if (error) throw error;
}
