import { useState } from 'react';
import type { SupervisionFormData } from '../types/supervision';
import { submitSupervision } from '../services/web3forms';
import { isGoogleBackendConfigured, submitSupervisionToGoogle } from '../services/googleSheets';
import { buildSupervisionMessage } from '../utils/buildMessage';
import { now } from '../utils/datetime';

export function useSupervisionSubmit() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const submit = async (form: SupervisionFormData) => {
    setEnviando(true);
    setError('');
    // ensure the supervision end time is set to current datetime on submit
    const t = now();
    form = { ...form, fechaFin: t.fecha, horaFin: t.hora };

    let message = buildSupervisionMessage(form);
    if (form.foto) {
      message += `\n\n📷 Foto adjunta: ${form.foto.name} (enviar por otro canal si aplica)`;
    }
    if (form.firma) {
      message += `\n\n✍️ Firma digital capturada`;
    }

    const result = isGoogleBackendConfigured()
      ? await submitSupervisionToGoogle({
          ...form,
          foto: form.foto ? form.foto.name : '',
          firma: form.firma ?? '',
        })
      : await submitSupervision({
      subject: `Supervisión AMBA — ${form.cliente} — ${form.supervisor} — ${form.fechaInicio}`,
      message,
    });

    if (result.success) {
      setEnviado(true);
    } else {
      setError(result.error ?? 'Error al enviar');
    }
    setEnviando(false);
  };

  const resetSubmit = () => {
    setEnviado(false);
    setError('');
  };

  return { enviado, enviando, error, submit, resetSubmit };
}
