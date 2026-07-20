import { supabase } from '../lib/supabase';
import type { SupervisionFormData } from '../types/supervision';
import { combinarFechaHora } from '../utils/datetime';

// La UI muestra textos en español; las columnas tienen CHECK constraints
// que solo aceptan estos códigos normalizados (ver supervisiones_novedad_check,
// vigilador_auditado_uniforme_check, etc. en la base).
const CODIGO_NOVEDAD: Record<string, string> = {
  'Sin novedad': 'sin_novedad',
  'Con novedad': 'con_novedad',
};
const CODIGO_UNIFORME: Record<string, string> = {
  Correcto: 'correcto',
  Incorrecto: 'incorrecto',
};
const CODIGO_CREDENCIAL: Record<string, string> = {
  Sí: 'si',
  No: 'no',
  Vencida: 'vencida',
};
const CODIGO_ASEO: Record<string, string> = {
  Correcto: 'correcto',
  Incorrecto: 'incorrecto',
  'Con barba': 'con_barba',
};
const CODIGO_EXITO: Record<string, string> = {
  Sí: 'si',
  No: 'no',
  'No, dejó vigilancia': 'dejo_vigilancia',
};

async function resolverSucursalId(clienteNombre: string, sucursalNombre: string): Promise<string | null> {
  if (!clienteNombre || !sucursalNombre) return null;

  const { data: cliente } = await supabase
    .from('clientes')
    .select('id')
    .ilike('nombre', clienteNombre)
    .maybeSingle();
  if (!cliente) return null;

  const { data: sucursal } = await supabase
    .from('sucursales')
    .select('id')
    .eq('cliente_id', cliente.id)
    .ilike('nombre', sucursalNombre)
    .maybeSingle();

  return sucursal?.id ?? null;
}

function obtenerPosicionActual(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    const timer = setTimeout(() => resolve(null), 6000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timer);
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        clearTimeout(timer);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );
  });
}

async function subirArchivo(blob: Blob, carpeta: string, ext: string): Promise<string | null> {
  try {
    const path = `${carpeta}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from('evidencias')
      .upload(path, blob, { contentType: blob.type, upsert: false });
    if (error) throw error;
    return supabase.storage.from('evidencias').getPublicUrl(path).data.publicUrl;
  } catch {
    return null;
  }
}

async function subirFoto(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop() || 'jpg';
  return subirArchivo(file, 'fotos', ext);
}

async function subirFirma(dataUrl: string): Promise<string | null> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return subirArchivo(blob, 'firmas', 'png');
}

export async function guardarSupervision(
  form: SupervisionFormData,
  supervisorId: string
): Promise<{ success: boolean; error?: string }> {
  const sucursalId = await resolverSucursalId(form.cliente, form.sucursal);
  if (!sucursalId) {
    return { success: false, error: 'No se encontró la sucursal seleccionada. Verificá el cliente y la sucursal.' };
  }

  const [posicion, fotoUrl, firmaUrl] = await Promise.all([
    obtenerPosicionActual(),
    form.foto ? subirFoto(form.foto) : Promise.resolve(null),
    form.firma ? subirFirma(form.firma) : Promise.resolve(null),
  ]);

  const { data: supervision, error: errorSupervision } = await supabase
    .from('supervisiones')
    .insert({
      supervisor_id: supervisorId,
      sucursal_id: sucursalId,
      fecha_inicio: combinarFechaHora(form.fechaInicio, form.horaInicio) ?? new Date().toISOString(),
      fecha_fin: combinarFechaHora(form.fechaFin, form.horaFin),
      lat_inicio: posicion?.lat ?? null,
      lng_inicio: posicion?.lng ?? null,
      hay_vigilador: true,
      tipo_visita: 'auditoria',
      novedad: CODIGO_NOVEDAD[form.novedad] ?? null,
      observaciones: form.descNovedad || null,
      foto_url: fotoUrl,
    })
    .select('id')
    .single();

  if (errorSupervision || !supervision) {
    return { success: false, error: errorSupervision?.message ?? 'No se pudo guardar la supervisión.' };
  }

  const supervisionId = supervision.id as string;

  const { error: errorVigilador } = await supabase.from('vigilador_auditado').insert({
    supervision_id: supervisionId,
    es_propio: form.entrevistaVigilador === 'Sí',
    legajo: form.legajo || null,
    nombre: form.nombreAgente || '—',
    uniforme: CODIGO_UNIFORME[form.uniforme] ?? null,
    credencial: CODIGO_CREDENCIAL[form.credencial] ?? null,
    aseo: CODIGO_ASEO[form.aseo] ?? null,
    firma_url: firmaUrl,
  });
  if (errorVigilador) {
    return { success: false, error: errorVigilador.message };
  }

  const codigoExito = CODIGO_EXITO[form.exito] ?? null;
  const filasEventos = [
    ...form.eventos.map((tipo) => ({
      supervision_id: supervisionId,
      tipo,
      con_exito: codigoExito,
    })),
    ...(form.eventoOtro.trim()
      ? [{ supervision_id: supervisionId, tipo: 'Otro', con_exito: codigoExito, descripcion: form.eventoOtro.trim() }]
      : []),
  ];
  if (filasEventos.length > 0) {
    const { error } = await supabase.from('eventos').insert(filasEventos);
    if (error) return { success: false, error: error.message };
  }

  const filasEntregas = [
    ...form.supervisorEntrega.map((item) => ({ supervision_id: supervisionId, item, entregado_por: 'supervisor' })),
    ...form.empleadoEntrega.map((item) => ({ supervision_id: supervisionId, item, entregado_por: 'empleado' })),
  ];
  if (filasEntregas.length > 0) {
    const { error } = await supabase.from('entregas').insert(filasEntregas);
    if (error) return { success: false, error: error.message };
  }

  return { success: true };
}
