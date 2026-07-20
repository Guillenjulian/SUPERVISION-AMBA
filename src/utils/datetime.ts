export function now() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    fecha: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
    hora: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

// Combina "DD/MM/AAAA" + "HH:MM" en un timestamp ISO. Devuelve null si el
// formato no es el esperado (evita mandar una fecha inválida a la base).
export function combinarFechaHora(fecha: string, hora: string): string | null {
  const [dd, mm, yyyy] = fecha.split('/');
  if (!dd || !mm || !yyyy || !/^\d{2}:\d{2}$/.test(hora)) return null;
  const d = new Date(`${yyyy}-${mm}-${dd}T${hora}:00`);
  return isNaN(d.getTime()) ? null : d.toISOString();
}
