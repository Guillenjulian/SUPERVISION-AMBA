import { useState } from 'react';
import type { SupervisionFormData } from '../types/supervision';
import { submitSupervision } from '../services/web3forms';
import { isGoogleBackendConfigured, submitSupervisionToGoogle } from '../services/googleSheets';
import { submitSupervisionToSupabase } from '../services/supabaseSupervision';
import { buildSupervisionMessage } from '../utils/buildMessage';
import { now } from '../utils/datetime';

export function useSupervisionSubmit() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const submit = async (form: SupervisionFormData, supervisorId: string) => {
    setEnviando(true);
    setError('');
    // ensure the supervision end time is set to current datetime on submit
    const t = now();
    form = { ...form, fechaFin: t.fecha, horaFin: t.hora };

    // Respaldo en paralelo (no bloquea el resultado): mientras se termina de validar
    // la migración a Supabase, seguimos mandando una copia a Google Sheets.
    void backupToGoogle(form);

    const result = await submitSupervisionToSupabase(form, supervisorId);

    if (result.success) {
      setEnviado(true);
    } else {
      setError(result.error ?? 'Error al enviar');
    }
    setEnviando(false);
  };

  const backupToGoogle = async (form: SupervisionFormData) => {
    try {
      if (isGoogleBackendConfigured()) {
        await submitSupervisionToGoogle({
          ...form,
          foto: form.foto ? form.foto.name : '',
          firma: form.firma ?? '',
        });
        return;
      }
      const message = buildSupervisionMessage(form);
      await submitSupervision({
        subject: `Supervisión AMBA — ${form.cliente} — ${form.supervisor} — ${form.fechaInicio}`,
        message,
      });
    } catch {
      // El respaldo es best-effort: un fallo acá no afecta el envío principal a Supabase.
    }
  };

  const resetSubmit = () => {
    setEnviado(false);
    setError('');
  };

  return { enviado, enviando, error, submit, resetSubmit };
}
