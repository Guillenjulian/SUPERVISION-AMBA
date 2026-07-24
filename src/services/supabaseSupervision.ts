import { supabase } from '../lib/supabase';
import { TIPOS_SOLO_NOVEDAD } from '../constants';
import type { SupervisionFormData } from '../types/supervision';
import { toISOTimestamp } from '../utils/datetime';

const BUCKET = 'supervisiones';

const UNIFORME_MAP: Record<string, string> = {
  Correcto: 'correcto',
  Incorrecto: 'incorrecto',
};

const CREDENCIAL_MAP: Record<string, string> = {
  Sí: 'si',
  No: 'no',
  Vencida: 'vencida',
};

const ASEO_MAP: Record<string, string> = {
  Correcto: 'correcto',
  Incorrecto: 'incorrecto',
  'Con barba': 'con_barba',
};

const NOVEDAD_MAP: Record<string, string> = {
  'Sin novedad': 'sin_novedad',
  'Con novedad': 'con_novedad',
};

const EXITO_MAP: Record<string, string> = {
  Sí: 'si',
  No: 'no',
  'No, dejó vigilancia': 'dejo_vigilancia',
};

function mapTipoVisita(tipoSupervision: string): string {
  return tipoSupervision === 'Supervisión completa' ? 'auditoria' : 'intervencion';
}

async function uploadDataUrl(path: string, dataUrl: string): Promise<string | null> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type || 'image/png',
    upsert: true,
  });
  if (error) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

async function uploadFile(path: string, file: File): Promise<string | null> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: true,
  });
  if (error) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function submitSupervisionToSupabase(
  form: SupervisionFormData,
  supervisorId: string
): Promise<{ success: boolean; error?: string }> {
  if (!form.sucursalId) {
    return { success: false, error: 'El objetivo seleccionado no tiene una sucursal asociada. Avisá a un administrador.' };
  }

  const soloNovedad = TIPOS_SOLO_NOVEDAD.includes(form.tipoSupervision);

  let fotoUrl: string | null = null;
  if (form.foto) {
    fotoUrl = await uploadFile(`fotos/${supervisorId}-${Date.now()}-${form.foto.name}`, form.foto);
  }

  const { data: supervision, error: supervisionError } = await supabase
    .from('supervisiones')
    .insert({
      supervisor_id: supervisorId,
      sucursal_id: form.sucursalId,
      fecha_inicio: toISOTimestamp(form.fechaInicio, form.horaInicio),
      fecha_fin: toISOTimestamp(form.fechaFin, form.horaFin),
      lat_inicio: form.latInicio,
      lng_inicio: form.lngInicio,
      hay_vigilador: soloNovedad ? null : form.entrevistaVigilador === 'Sí',
      tipo_visita: mapTipoVisita(form.tipoSupervision),
      novedad: NOVEDAD_MAP[form.novedad] ?? null,
      observaciones: form.descNovedad || null,
      foto_url: fotoUrl,
    })
    .select('id')
    .single();

  if (supervisionError || !supervision) {
    return { success: false, error: supervisionError?.message ?? 'No se pudo guardar la supervisión.' };
  }

  const supervisionId = supervision.id as string;

  if (soloNovedad) {
    return { success: true };
  }

  let firmaUrl: string | null = null;
  if (form.firma) {
    firmaUrl = await uploadDataUrl(`firmas/${supervisionId}.png`, form.firma);
  }

  const { error: vigiladorError } = await supabase.from('vigilador_auditado').insert({
    supervision_id: supervisionId,
    es_propio: form.entrevistaVigilador === 'Sí',
    legajo: form.legajo || null,
    nombre: form.nombreAgente,
    uniforme: UNIFORME_MAP[form.uniforme] ?? null,
    credencial: CREDENCIAL_MAP[form.credencial] ?? null,
    aseo: ASEO_MAP[form.aseo] ?? null,
    firma_url: firmaUrl,
  });
  if (vigiladorError) {
    return { success: false, error: vigiladorError.message };
  }

  const eventosRows = [
    ...form.eventos.map((tipo) => ({
      supervision_id: supervisionId,
      tipo,
      con_exito: EXITO_MAP[form.exito] ?? null,
    })),
    ...(form.eventoOtro
      ? [{ supervision_id: supervisionId, tipo: form.eventoOtro, con_exito: EXITO_MAP[form.exito] ?? null }]
      : []),
  ];
  if (eventosRows.length > 0) {
    const { error: eventosError } = await supabase.from('eventos').insert(eventosRows);
    if (eventosError) {
      return { success: false, error: eventosError.message };
    }
  }

  const entregasRows = [
    ...form.supervisorEntrega.map((item) => ({ supervision_id: supervisionId, item, entregado_por: 'supervisor' })),
    ...form.empleadoEntrega.map((item) => ({ supervision_id: supervisionId, item, entregado_por: 'empleado' })),
  ];
  if (entregasRows.length > 0) {
    const { error: entregasError } = await supabase.from('entregas').insert(entregasRows);
    if (entregasError) {
      return { success: false, error: entregasError.message };
    }
  }

  return { success: true };
}
