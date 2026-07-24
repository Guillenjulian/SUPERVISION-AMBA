import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Objetivo {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  sucursal_id: string | null;
  distancia?: number; // en metros
}

const RADIO_METROS = 500; // mostrar solo dentro de 500m

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useObjetivos() {
  const [todos, setTodos] = useState<Objetivo[]>([]);
  const [cercanos, setCercanos] = useState<Objetivo[]>([]);
  const [posicion, setPosicion] = useState<GeolocationCoordinates | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  // Cargar objetivos desde Supabase
  useEffect(() => {
    supabase
      .from('objetivos')
      .select('id, nombre, lat, lng, sucursal_id')
      .eq('activo', true)
      .then(({ data, error }) => {
        if (!error && data) setTodos(data);
        setCargando(false);
      });
  }, []);

  // Función para calcular cercanos
  const calcularCercanos = useCallback(
    (coords: GeolocationCoordinates, objetivos: Objetivo[]) => {
      const resultado = objetivos
        .map((o) => ({
          ...o,
          distancia: haversine(coords.latitude, coords.longitude, o.lat, o.lng),
        }))
        .filter((o) => o.distancia <= RADIO_METROS)
        .sort((a, b) => a.distancia - b.distancia);
      setCercanos(resultado);
    },
    []
  );

  // GPS watch
  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError('Tu dispositivo no soporta GPS');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosicion(pos.coords);
        setGpsError(null);
        calcularCercanos(pos.coords, todos);
      },
      (err) => {
        setGpsError(
          err.code === 1
            ? 'Permiso de ubicación denegado'
            : 'No se pudo obtener tu ubicación'
        );
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [todos, calcularCercanos]);

  return { cercanos, posicion, gpsError, cargando };
}
