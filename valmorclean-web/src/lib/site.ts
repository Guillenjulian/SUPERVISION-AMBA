/**
 * Configuración central del sitio.
 *
 * Datos de contacto verificados sobre el Instagram oficial (@valmorclean) y el
 * mapa de contenido entregado por el cliente. Si cambia el número institucional
 * o el CUIT, se edita únicamente acá.
 */

export const site = {
  name: 'Valmor Clean',
  legalName: 'Valmor Clean S.R.L.',
  cuit: '30-71926883-4',
  foundedOperating: 2018,
  foundedLegal: 2022,
  url: 'https://www.valmorclean.com.ar',
  tagline: 'Limpieza y maestranza profesional',
  email: 'valmorclean@gmail.com',
  phoneDisplay: '15-3864-4829',
  /** Formato internacional sin signos, requerido por wa.me */
  whatsapp: '5491138644829',
  hours: 'Lunes a viernes de 9:00 a 18:00 hs',
  coverage: 'CABA y Gran Buenos Aires',
  social: {
    instagram: 'https://www.instagram.com/valmorclean/',
    facebook: 'https://www.facebook.com/valmorclean',
    linkedin: 'https://www.linkedin.com/company/valmorclean',
  },
} as const;

/** Arma un link de WhatsApp con mensaje pre-cargado. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { to: '/trabaja-con-nosotros', label: 'Trabajá con nosotros' },
] as const;
