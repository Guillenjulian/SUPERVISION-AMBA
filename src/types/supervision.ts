export interface SupervisionFormData {
  tipoSupervision: string;
  supervisor: string;
  cliente: string;
  sucursal: string;
  fechaInicio: string;
  horaInicio: string;
  fechaFin: string;
  horaFin: string;
  nombreAgente: string;
  legajo: string;
  uniforme: string;
  credencial: string;
  aseo: string;
  supervisorEntrega: string[];
  empleadoEntrega: string[];
  entrevistaVigilador: string;
  eventos: string[];
  eventoOtro: string;
  exito: string;
  novedad: string;
  descNovedad: string;
  foto: File | null;
  firma: string | null;
}

export type SupervisionFormField = keyof SupervisionFormData;

export interface SubmitState {
  enviado: boolean;
  enviando: boolean;
  error: string;
}
