import { useState } from 'react';
import type { SupervisionFormData } from '../types/supervision';
import { guardarSupervision } from '../services/supervisionRepo';
import { now } from '../utils/datetime';

export function useSupervisionSubmit() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const submit = async (form: SupervisionFormData, supervisorId: string) => {
    setEnviando(true);
    setError('');
    // la hora de fin de la supervisión es el momento del envío
    const t = now();
    const formFinal = { ...form, fechaFin: t.fecha, horaFin: t.hora };

    const result = await guardarSupervision(formFinal, supervisorId);

    if (result.success) {
      setEnviado(true);
    } else {
      setError(result.error ?? 'Error al guardar la supervisión');
    }
    setEnviando(false);
  };

  const resetSubmit = () => {
    setEnviado(false);
    setError('');
  };

  return { enviado, enviando, error, submit, resetSubmit };
}
