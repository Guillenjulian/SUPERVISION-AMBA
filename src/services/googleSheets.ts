const GOOGLE_BACKEND_URL = import.meta.env.VITE_GOOGLE_BACKEND_URL ?? '';

export function isGoogleBackendConfigured(): boolean {
  return Boolean(GOOGLE_BACKEND_URL);
}

export async function loginWithSheetCredentials(email: string, password: string): Promise<{ success: boolean; supervisor?: string; email?: string; error?: string }> {
  if (!isGoogleBackendConfigured()) {
    return { success: false, error: 'Falta configurar VITE_GOOGLE_BACKEND_URL' };
  }

  try {
    const response = await fetch(GOOGLE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    const data = await response.json();
    if (data.success) {
      return { success: true, supervisor: data.supervisor, email: data.email };
    }
    return { success: false, error: data.error || 'Login fallido' };
  } catch (err) {
    return { success: false, error: 'Error de conexión con el backend.' };
  }
}

export async function submitSupervisionToGoogle(data: Record<string, any>): Promise<{ success: boolean; error?: string }> {
  if (!isGoogleBackendConfigured()) {
    return { success: false, error: 'Falta configurar VITE_GOOGLE_BACKEND_URL' };
  }

  try {
    const response = await fetch(GOOGLE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'submit', data }),
    });
    const result = await response.json();
    if (result.success) {
      return { success: true };
    }
    return { success: false, error: result.error || 'Error al enviar la supervisión.' };
  } catch (err) {
    return { success: false, error: 'Error de conexión con el backend.' };
  }
}
