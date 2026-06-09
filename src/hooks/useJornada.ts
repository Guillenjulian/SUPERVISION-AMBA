import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Jornada {
  id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string | null;
  modo: string;
  auto_codigo: string | null;
}

export function useJornada(userId: string | undefined) {
  const [jornadaActiva, setJornadaActiva] = useState<Jornada | null>(null);
  const [cargando, setCargando] = useState(true);

  // Buscar jornada activa de hoy (sin hora_fin)
  useEffect(() => {
    if (!userId) {
      setCargando(false);
      return;
    }
    const hoy = new Date().toISOString().split('T')[0];
    supabase
      .from('jornadas')
      .select('id, fecha, hora_inicio, hora_fin, modo, auto_codigo')
      .eq('supervisor_id', userId)
      .eq('fecha', hoy)
      .is('hora_fin', null)
      .order('hora_inicio', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        setJornadaActiva(data && data.length > 0 ? data[0] : null);
        setCargando(false);
      });
  }, [userId]);

  const iniciarJornada = async (modo: 'a_pie' | 'auto', autoCodigo?: string) => {
    if (!userId) return { error: 'Sin sesión' };
    const ahora = new Date();
    const { data, error } = await supabase
      .from('jornadas')
      .insert({
        supervisor_id: userId,
        fecha: ahora.toISOString().split('T')[0],
        hora_inicio: ahora.toISOString(),
        modo,
        auto_codigo: modo === 'auto' ? autoCodigo ?? null : null,
      })
      .select()
      .single();

    if (error) return { error: error.message };
    setJornadaActiva(data);
    return { error: null };
  };

  const finalizarJornada = async () => {
    if (!jornadaActiva) return;
    await supabase
      .from('jornadas')
      .update({ hora_fin: new Date().toISOString() })
      .eq('id', jornadaActiva.id);
    setJornadaActiva(null);
  };

  return { jornadaActiva, cargando, iniciarJornada, finalizarJornada };
}
