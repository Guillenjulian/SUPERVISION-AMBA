import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { envFaltantes } from './lib/env';

const root = document.getElementById('root')!;

function mostrarErrorConfig(detalle: string) {
  root.innerHTML = `
    <div style="font-family:system-ui,sans-serif;max-width:520px;margin:48px auto;padding:24px;text-align:center;color:#333">
      <div style="font-size:40px">⚠️</div>
      <h1 style="font-size:20px;margin:12px 0 8px">La app no está configurada</h1>
      <p style="margin:0 0 12px;color:#666;font-size:15px">
        Faltan datos de configuración para conectarse al servidor.
        Avisale a un administrador con este detalle:
      </p>
      <code style="display:block;padding:12px;background:#f5f5f5;border-radius:8px;font-size:13px;word-break:break-word"></code>
    </div>`;
  const code = root.querySelector('code');
  if (code) code.textContent = detalle;
}

// Las variables de entorno se compilan dentro del bundle: si falta alguna, la app
// entera queda en pantalla blanca. Chequeamos antes de cargar App para dar un
// mensaje entendible en vez de un error mudo en la consola.
const faltantes = envFaltantes();
if (faltantes.length > 0) {
  mostrarErrorConfig(`Faltan variables de entorno: ${faltantes.join(', ')}`);
} else {
  import('./App')
    .then(({ default: App }) => {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    })
    .catch((err) => mostrarErrorConfig(String(err?.message ?? err)));
}
