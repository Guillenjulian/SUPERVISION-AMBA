const GOOGLE_BACKEND_URL = import.meta.env.VITE_GOOGLE_BACKEND_URL ?? '';

export function isGoogleBackendConfigured(): boolean {
  return Boolean(GOOGLE_BACKEND_URL);
}

export async function submitSupervisionToGoogle(data: Record<string, any>): Promise<{ success: boolean; error?: string }> {
  if (!isGoogleBackendConfigured()) {
    return { success: false, error: 'Falta configurar VITE_GOOGLE_BACKEND_URL' };
  }

  try {
    // Preparar payload
    const payload: any = {
      tipoSupervision: data.tipoSupervision || '',
      supervisor: data.supervisor || '',
      cliente: data.cliente || '',
      sucursal: data.sucursal || '',
      fechaInicio: data.fechaInicio || '',
      horaInicio: data.horaInicio || '',
      fechaFin: data.fechaFin || '',
      horaFin: data.horaFin || '',
      nombreAgente: data.nombreAgente || '',
      legajo: data.legajo || '',
      uniforme: data.uniforme || '',
      credencial: data.credencial || '',
      aseo: data.aseo || '',
      novedad: data.novedad || '',
      descNovedad: data.descNovedad || '',
      foto: data.foto ? data.foto.name : '',
      firma: data.firma ?? '', // Aquí va la firma en base64
    };

    const response = await fetch(GOOGLE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload }),
    });
    
    const result = await response.json();
    if (result.result === 'success') {
      return { success: true };
    }
    return { success: false, error: result.error || 'Error al enviar la supervisión.' };
  } catch (err) {
    return { success: false, error: 'Error de conexión con el backend.' };
  }
}

// Función de login (si la necesitas mantener, sino puede removerse)
export async function loginWithSheetCredentials(email: string, password: string): Promise<{ success: boolean; supervisor?: string; email?: string; error?: string }> {
  // Por ahora sin login con backend
  return { success: false, error: 'Login no configurado con este backend' };
}
