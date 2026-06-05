import { useState } from 'react';
import type { SupervisionFormData } from '../types/supervision';
import { now } from '../utils/datetime';

function createInitialForm(): SupervisionFormData {
  const t = now();
  return {
    supervisor: 'Guillen Julian',
    cliente: '',
    sucursal: '',
    fechaInicio: t.fecha,
    horaInicio: t.hora,
    fechaFin: t.fecha,
    horaFin: t.hora,
    nombreAgente: '',
    legajo: '',
    uniforme: '',
    credencial: '',
    aseo: '',
    supervisorEntrega: [],
    empleadoEntrega: [],
    entrevistaVigilador: '',
    eventos: [],
    eventoOtro: '',
    exito: '',
    novedad: '',
    descNovedad: '',
    foto: null,
    firma: null,
  };
}

export function useSupervisionForm() {
  const [form, setForm] = useState<SupervisionFormData>(createInitialForm);

  const update = <K extends keyof SupervisionFormData>(
    field: K,
    value: SupervisionFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setCliente = (cliente: string) => {
    setForm((prev) => ({ ...prev, cliente }));
  };

  const reset = () => setForm(createInitialForm());

  return { form, update, setCliente, reset };
}
