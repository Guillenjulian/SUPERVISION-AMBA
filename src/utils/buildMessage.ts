import type { SupervisionFormData } from '../types/supervision';

export function buildSupervisionMessage(data: SupervisionFormData): string {
  return `
SUPERVISIÓN AMBA — ${data.fechaInicio} ${data.horaInicio}
═══════════════════════════════════════

📋 DATOS GENERALES
• Supervisor: ${data.supervisor}
• Cliente: ${data.cliente}
• Sucursal: ${data.sucursal || '—'}
• Inicio: ${data.fechaInicio} ${data.horaInicio}
• Fin: ${data.fechaFin} ${data.horaFin}

👤 PERSONAL AUDITADO
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
• ¿Con éxito?: ${data.exito || '—'}

📝 DETALLES
• Novedad: ${data.novedad || '—'}
• Descripción: ${data.descNovedad || '—'}
  `.trim();
}
