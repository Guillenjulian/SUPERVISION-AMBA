export type FaqItem = { q: string; a: string };

/**
 * Respuestas redactadas como borrador operativo a partir del mapa de contenido.
 * Revisar con el cliente antes de publicar: condiciones comerciales concretas
 * (plazos y formas de pago) pueden variar según el tipo de contrato.
 */
export const faqs: FaqItem[] = [
  {
    q: '¿Trabajan fines de semana o feriados?',
    a: 'Sí. Coordinamos servicios de sábados, domingos y feriados cuando la operación del cliente lo requiere, por ejemplo en oficinas, comercios y finales de obra con fecha de entrega. Se acuerda al momento de armar el plan de trabajo y queda reflejado en el presupuesto.',
  },
  {
    q: '¿Proveen los insumos y productos de limpieza?',
    a: 'Trabajamos de las dos formas. Podemos incluir insumos, productos y maquinaria dentro del abono mensual, o utilizar los que ya provee el cliente. En ambos casos aportamos siempre la maquinaria específica y los elementos de protección personal del equipo.',
  },
  {
    q: '¿Cuál es el plazo mínimo de contrato?',
    a: 'Para servicios permanentes —consorcios, oficinas, industrias— trabajamos con contratos mensuales renovables. Los finales de obra y las limpiezas profundas son trabajos puntuales, sin permanencia mínima.',
  },
  {
    q: '¿Cómo se realiza el pago del servicio?',
    a: 'Emitimos factura y el pago se realiza por transferencia bancaria. En servicios permanentes la facturación es mensual; en trabajos puntuales se acuerda un anticipo y el saldo contra entrega del trabajo terminado.',
  },
  {
    q: '¿Qué pasa si necesito cambiar la frecuencia del servicio?',
    a: 'La frecuencia se puede ajustar avisando con anticipación razonable. Recalculamos el abono según la nueva carga horaria y le enviamos la propuesta actualizada antes de aplicar cualquier cambio.',
  },
  {
    q: '¿El personal está asegurado?',
    a: 'Sí. Todo el equipo cuenta con ART y seguro de accidentes personales vigentes, y con las cargas sociales al día. Al iniciar el servicio entregamos la documentación respaldatoria a la administración o al área de compras que la requiera.',
  },
  {
    q: '¿En qué zonas prestan servicio?',
    a: 'Cubrimos la Ciudad Autónoma de Buenos Aires y el Gran Buenos Aires. Si su edificio o planta está fuera de esa zona, escribanos igual: evaluamos la logística caso por caso.',
  },
  {
    q: '¿Cuánto tardan en enviar el presupuesto?',
    a: 'Respondemos con una propuesta personalizada dentro de las 24 horas hábiles. En servicios permanentes coordinamos previamente una visita al lugar, sin costo ni compromiso, para dimensionar correctamente la dotación.',
  },
];
