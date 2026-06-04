const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export function isWeb3FormsConfigured(): boolean {
  return Boolean(WEB3FORMS_KEY && WEB3FORMS_KEY !== 'tu_clave_aqui');
}

export async function submitSupervision(params: {
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isWeb3FormsConfigured()) {
    return { success: false, error: 'Falta configurar VITE_WEB3FORMS_KEY en .env' };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: params.subject,
        from_name: 'App Supervisión AMBA',
        message: params.message,
      }),
    });
    const data = await res.json();
    if (data.success) {
      return { success: true };
    }
    return { success: false, error: 'No se pudo enviar. Verificá la clave de Web3Forms.' };
  } catch {
    return { success: false, error: 'Sin conexión. Revisá tu internet e intentá de nuevo.' };
  }
}
