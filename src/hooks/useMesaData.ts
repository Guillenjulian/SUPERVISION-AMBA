import { useCallback, useEffect, useState } from 'react';
import type { ObjetivoMesa, VigiladorMesa, FeriadoMesa } from '../types/mesa';
import { fetchObjetivosMesa, fetchVigiladores, fetchFeriados, fetchCobertura } from '../services/mesaObjetivos';

function hoyISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function useMesaData() {
  const [objetivos, setObjetivos] = useState<ObjetivoMesa[]>([]);
  const [vigiladores, setVigiladores] = useState<VigiladorMesa[]>([]);
  const [feriados, setFeriados] = useState<FeriadoMesa[]>([]);
  const [cobertura, setCobertura] = useState<Record<string, boolean>>({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    try {
      const [o, v, f, c] = await Promise.all([
        fetchObjetivosMesa(),
        fetchVigiladores(),
        fetchFeriados(hoyISO()),
        fetchCobertura(),
      ]);
      setObjetivos(o);
      setVigiladores(v);
      setFeriados(f);
      setCobertura(c);
      setError('');
    } catch (err: any) {
      setError(err?.message ?? 'No se pudo cargar la información de Mesa.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { objetivos, vigiladores, feriados, cobertura, cargando, error, recargar };
}
