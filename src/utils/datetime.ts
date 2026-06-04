export function now() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    fecha: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
    hora: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}
