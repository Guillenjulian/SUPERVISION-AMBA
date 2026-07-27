export interface VigiladorMesa {
  id: string;
  nombre: string;
  apellido: string;
  legajo: string;
  empresa: string | null;
  esPropio: boolean;
}

export interface TurnoMesa {
  id: string;
  horaInicio: string;
  horaFin: string;
  dias: number[];
  vigiladorId: string | null;
}

export interface FeriadoMesa {
  id: string;
  fecha: string;
  nombre: string;
  trasladadoDe: string | null;
}

export interface ObjetivoMesa {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  activo: boolean;
  clienteNombre: string | null;
  localidad: string | null;
  vigiladorIds: string[];
  turnos: TurnoMesa[];
}

export const DIAS_SEMANA: { n: number; corta: string; weekend: boolean }[] = [
  { n: 1, corta: 'Lun', weekend: false },
  { n: 2, corta: 'Mar', weekend: false },
  { n: 3, corta: 'Mié', weekend: false },
  { n: 4, corta: 'Jue', weekend: false },
  { n: 5, corta: 'Vie', weekend: false },
  { n: 6, corta: 'Sáb', weekend: true },
  { n: 7, corta: 'Dom', weekend: true },
];
