export function now() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    fecha: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
    hora: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

// Convierte fecha "DD/MM/YYYY" + hora "HH:mm" (horario local) a un ISO timestamp.
export function toISOTimestamp(fecha: string, hora: string): string {
  const [dia, mes, anio] = fecha.split('/').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);
  return new Date(anio, mes - 1, dia, horas, minutos).toISOString();
}
