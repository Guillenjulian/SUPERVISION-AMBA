import type { IconName } from '../components/ui/Icon';

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  icon: IconName;
  /** Los 4 principales se destacan en el Home. */
  featured: boolean;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: 'consorcios',
    title: 'Consorcios y edificios',
    short:
      'Mantenimiento diario o programado de palieres, pasillos, cocheras y amenities. Nos adaptamos a las necesidades de cada administración.',
    long: 'Cubrimos la totalidad de las áreas comunes con una rutina acordada con la administración: palieres, escaleras, ascensores, cocheras, SUM, terrazas y amenities. El encargado y el administrador reciben un cronograma claro y un responsable de contacto directo.',
    icon: 'building',
    featured: true,
    bullets: [
      'Rutinas diarias, semanales o a demanda',
      'Higiene de cocheras y espacios comunes',
      'Coordinación directa con la administración',
    ],
  },
  {
    slug: 'vidrios-en-altura',
    title: 'Limpieza de vidrios en altura',
    short:
      'Personal capacitado y equipado con sistemas de seguridad homologados para fachadas y ventanales corporativos.',
    long: 'Trabajos en altura sobre fachadas vidriadas, curtain wall y ventanales corporativos. El equipo cuenta con capacitación específica, arneses y líneas de vida, y trabaja bajo procedimiento de seguridad documentado.',
    icon: 'window',
    featured: true,
    bullets: [
      'Equipos de protección homologados',
      'Personal capacitado para trabajo en altura',
      'Fachadas, curtain wall y ventanales',
    ],
  },
  {
    slug: 'final-de-obra',
    title: 'Finales de obra técnicos',
    short:
      'Eliminación de restos de pintura, polvo de obra y terminaciones finas para dejar la propiedad lista para habitar.',
    long: 'Limpieza profunda posterior a la construcción o refacción: retiro de restos de pintura, cementicios y adhesivos, aspirado de polvo fino, detallado de carpinterías, griferías y vidrios. Entregamos la unidad en condiciones de escritura o mudanza.',
    icon: 'sparkle',
    featured: true,
    bullets: [
      'Retiro de restos de obra y pintura',
      'Detallado fino de carpinterías y griferías',
      'Coordinación con el cronograma de la obra',
    ],
  },
  {
    slug: 'oficinas',
    title: 'Oficinas y corporativos',
    short:
      'Servicios de maestranza flexibles diseñados para mantener la higiene de su espacio de trabajo sin interrumpir su actividad.',
    long: 'Planes de maestranza diaria, por turnos o fuera del horario laboral. Incluye puestos de trabajo, salas de reunión, cocinas, sanitarios y reposición de insumos, con personal fijo asignado que conoce su edificio.',
    icon: 'briefcase',
    featured: true,
    bullets: [
      'Turnos dentro o fuera del horario laboral',
      'Personal fijo asignado a su cuenta',
      'Reposición de insumos opcional',
    ],
  },
  {
    slug: 'comercios',
    title: 'Comercios y showrooms',
    short: 'Mantenimiento de locales comerciales, salones de venta y showrooms.',
    long: 'Higiene de salones de venta, vidrieras, probadores y depósitos, con frecuencias pensadas para no interferir con la atención al público. Ideal para locales a la calle, showrooms y locales en centros comerciales.',
    icon: 'store',
    featured: false,
    bullets: ['Limpieza de vidrieras y salón', 'Horarios de apertura o cierre', 'Frecuencias flexibles'],
  },
  {
    slug: 'industrias',
    title: 'Industrias y depósitos',
    short: 'Limpieza industrial adaptada a plantas, depósitos y galpones.',
    long: 'Limpieza de plantas productivas, depósitos y galpones, con protocolos adaptados a la operación y a las normas de seguridad e higiene de cada planta. Incluye sectores productivos, oficinas anexas, vestuarios y comedores.',
    icon: 'factory',
    featured: false,
    bullets: ['Adaptado al protocolo de cada planta', 'Sectores productivos y de apoyo', 'Personal con EPP completo'],
  },
  {
    slug: 'centros-educativos-y-medicos',
    title: 'Centros educativos y médicos',
    short: 'Protocolos de higiene reforzada para colegios, jardines, clínicas y consultorios.',
    long: 'Higiene reforzada con productos y procedimientos aptos para ámbitos sensibles: colegios, jardines maternales, clínicas, centros de diagnóstico y consultorios. Desinfección de superficies de alto contacto y manejo diferenciado de residuos.',
    icon: 'health',
    featured: false,
    bullets: ['Desinfección de superficies de contacto', 'Productos aptos para ámbitos sensibles', 'Turnos fuera de actividad'],
  },
  {
    slug: 'complejos-habitacionales',
    title: 'Complejos habitacionales',
    short: 'Mantenimiento de barrios cerrados y conjuntos de vivienda.',
    long: 'Mantenimiento integral de barrios cerrados y conjuntos habitacionales: espacios comunes, SUM, casas de guardia, sanitarios y áreas recreativas, con dotación estable y supervisión periódica.',
    icon: 'home',
    featured: false,
    bullets: ['Dotación estable en el predio', 'Espacios comunes y recreativos', 'Supervisión periódica'],
  },
];

export const featuredServices = services.filter((s) => s.featured);
