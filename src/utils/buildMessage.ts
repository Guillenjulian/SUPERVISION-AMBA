import type { SupervisionFormData } from '../types/supervision';

import { TIPOS_SOLO_NOVEDAD } from '../constants';

export function buildSupervisionMessage(data: SupervisionFormData): string {
  const soloNovedad = TIPOS_SOLO_NOVEDAD.includes(data.tipoSupervision);

  const datosGenerales = `
📋 DATOS GENERALES
• Tipo: ${data.tipoSupervision || '—'}
• Supervisor: ${data.supervisor}
• Cliente: ${data.cliente}
• Sucursal: ${data.sucursal || '—'}
• Inicio: ${data.fechaInicio} ${data.horaInicio}
• Fin: ${data.fechaFin} ${data.horaFin}`;

  const auditoria = `
👤 PERSONAL AUDITADO
• Agente: ${data.nombreAgente}
• Legajo: ${data.legajo}
• Uniforme: ${data.uniforme || '—'}
• Credencial: ${data.credencial || '—'}
• Aseo: ${data.aseo || '—'}
• Supervisor entrega: ${data.supervisorEntrega.join(', ') || '—'}
• Empleado entrega: ${data.empleadoEntrega.join(', ') || '—'}

🔍 AUDITORÍA
• Entrevista con vigilador propio: ${data.entrevistaVigilador || '—'}

⚡ EVENTOS
• Tipo: ${[...data.eventos, data.eventoOtro].filter(Boolean).join(', ') || '—'}
• ¿Con éxito?: ${data.exito || '—'}`;

  const detalles = `
📝 DETALLES
• Novedad: ${data.novedad || '—'}
• Descripción: ${data.descNovedad || '—'}`;

  return `
SUPERVISIÓN AMBA — ${data.fechaInicio} ${data.horaInicio}
═══════════════════════════════════════
${datosGenerales}
${soloNovedad ? '' : `${auditoria}\n`}${detalles}
  `.trim();
}
