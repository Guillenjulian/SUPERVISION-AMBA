// Variables de entorno que la app necesita para arrancar.
// Se leen acá (y no directo en cada módulo) para poder avisar con un mensaje
// legible cuando falta alguna, en vez de romper con una pantalla en blanco.

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

/** Nombres de las variables obligatorias que no están definidas. */
export function envFaltantes(): string[] {
  const faltantes: string[] = [];
  if (!SUPABASE_URL) faltantes.push('VITE_SUPABASE_URL');
  if (!SUPABASE_ANON_KEY) faltantes.push('VITE_SUPABASE_ANON_KEY');
  return faltantes;
}
