/**
 * Envío de formularios.
 *
 * El sitio es estático (no tiene backend propio), así que los formularios se
 * envían a Web3Forms, que reenvía cada consulta al mail de la empresa.
 * La clave se configura en `.env` como VITE_WEB3FORMS_KEY — ver README.
 *
 * Si la clave no está configurada, `submitForm` devuelve `unconfigured` y la
 * pantalla ofrece el envío por WhatsApp como alternativa, de modo que el sitio
 * nunca queda con un formulario que se traga los datos en silencio.
 */

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export type SubmitState = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

export function isFormBackendReady(): boolean {
  return Boolean(ACCESS_KEY && ACCESS_KEY.trim());
}

type Payload = {
  subject: string;
  fields: Record<string, string>;
  file?: { field: string; value: File } | null;
};

export async function submitForm({ subject, fields, file }: Payload): Promise<SubmitState> {
  if (!isFormBackendReady()) return 'unconfigured';

  const body = new FormData();
  body.append('access_key', ACCESS_KEY as string);
  body.append('subject', subject);
  body.append('from_name', 'Sitio web Valmor Clean');
  // Honeypot antispam propio de Web3Forms.
  body.append('botcheck', '');

  Object.entries(fields).forEach(([k, v]) => body.append(k, v));
  if (file?.value) body.append(file.field, file.value);

  try {
    const res = await fetch(ENDPOINT, { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean };
    return res.ok && data.success ? 'sent' : 'error';
  } catch {
    return 'error';
  }
}

/** Convierte los datos del formulario en un mensaje legible para WhatsApp. */
export function toWhatsAppMessage(title: string, fields: Record<string, string>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`);
  return [`*${title}*`, '', ...lines].join('\n');
}
