import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, envFaltantes } from './env';

const faltantes = envFaltantes();
if (faltantes.length > 0) {
  throw new Error(`Faltan variables de entorno: ${faltantes.join(', ')}`);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
