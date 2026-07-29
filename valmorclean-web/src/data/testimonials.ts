export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/**
 * ⚠️ CONTENIDO PROVISORIO — reemplazar antes de publicar.
 *
 * Estos testimonios son ejemplos de estructura y extensión, no citas reales.
 * Publicar testimonios inventados como si fueran de clientes reales es engañoso
 * y, además, riesgoso frente a la Ley 24.240 de Defensa del Consumidor.
 * Pedirle al cliente 3 o 4 citas reales con nombre, rol y autorización de uso.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Texto de ejemplo pendiente de reemplazo. Acá va la cita real de la administración sobre el servicio en áreas comunes.',
    author: 'Nombre y apellido',
    role: 'Administración de consorcios',
  },
  {
    quote:
      'Texto de ejemplo pendiente de reemplazo. Acá va la cita real de la constructora sobre el final de obra entregado.',
    author: 'Nombre y apellido',
    role: 'Jefe de obra',
  },
  {
    quote:
      'Texto de ejemplo pendiente de reemplazo. Acá va la cita real del responsable de facilities sobre la maestranza diaria.',
    author: 'Nombre y apellido',
    role: 'Facilities · oficinas corporativas',
  },
];
