# Valmor Clean — sitio web institucional

Sitio corporativo de **Valmor Clean S.R.L.**, empresa de limpieza y maestranza
en CABA y Gran Buenos Aires. Construido a partir del *Mapa del Sitio y Contenido*
y del *Manual de Marca VC v1.0* entregados por el cliente.

Es un proyecto independiente dentro de este repositorio: no comparte código ni
dependencias con la app de supervisión que vive en `/src`.

## Stack

React 18 + TypeScript + Vite, con CSS Modules. Sin framework de estilos ni
librería de íconos: el sistema de diseño y el set de íconos SVG son propios, así
que el sitio no arrastra dependencias de UI y pesa ~78 kB gzip de JS.

## Desarrollo

```bash
cd valmorclean-web
npm install
cp .env.example .env      # opcional, ver "Formularios"
npm run dev               # http://localhost:5180
```

Otros comandos: `npm run build` (typecheck + build a `dist/`),
`npm run preview` (sirve el build), `npm run typecheck`.

## Estructura

```
valmorclean-web/
├── public/
│   ├── fonts/              Tipografías autoalojadas (woff2, subsets latin)
│   ├── img/                Fotos del sitio — ver public/img/README.md
│   ├── logo-vc.png         Logo color, extraído del manual de marca
│   ├── logo-vc-white.png   Versión negativa para fondos oscuros
│   ├── robots.txt · sitemap.xml · site.webmanifest
│   └── favicon.ico · icon-192 · icon-512 · apple-touch-icon
└── src/
    ├── styles/
    │   ├── tokens.css      Colores de marca, tipografía, espaciado, sombras
    │   ├── fonts.css       @font-face de las tipografías autoalojadas
    │   └── base.css        Reset y estilos base
    ├── lib/
    │   ├── site.ts         Datos de contacto, CUIT, redes, navegación
    │   ├── forms.ts        Envío de formularios y respaldo por WhatsApp
    │   ├── seo.ts          Título, descripción y canonical por página
    │   └── useReveal.ts    Animación de entrada al hacer scroll
    ├── data/               Servicios, FAQ y testimonios (contenido editable)
    ├── components/         Header, Footer, WhatsApp flotante, primitivas de UI
    ├── sections/           Bloques del Home (hero, garantías, CTA, etc.)
    └── pages/              Una por ruta
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/nosotros` | Quiénes somos |
| `/servicios` | Servicios (8 fichas + galería antes/después) |
| `/cotizacion` | Formulario de presupuesto |
| `/preguntas-frecuentes` | FAQ |
| `/trabaja-con-nosotros` | Bolsa de empleo |
| `/privacidad` | Política de privacidad y términos |

Es una SPA con `BrowserRouter`: **el hosting tiene que redirigir todas las rutas
a `index.html`**, o al recargar `/servicios` el servidor va a devolver un 404.
En Vercel y Netlify esto es automático para proyectos Vite; en Nginx o Apache
hay que configurar el *fallback* a mano.

## Dónde se edita el contenido

Casi todo el texto está separado del código:

- **Datos de contacto, CUIT, redes, horarios** → `src/lib/site.ts`
- **Servicios** (título, descripción, viñetas) → `src/data/services.ts`
- **Preguntas frecuentes** → `src/data/faq.ts`
- **Testimonios** → `src/data/testimonials.ts`
- **Fotos** → `public/img/`, ver el README de esa carpeta

## Formularios

Los formularios de presupuesto y de postulación se envían con
[Web3Forms](https://web3forms.com), que reenvía cada consulta por mail. Para
activarlo hay que crear una clave gratuita con el mail de la empresa y ponerla
en `.env`:

```
VITE_WEB3FORMS_KEY=tu-access-key
```

Sin esa variable el sitio **no** simula un envío exitoso: avisa que el envío por
mail no está configurado y ofrece mandar los mismos datos por WhatsApp. El
adjunto de CV requiere un plan de Web3Forms que admita archivos; si se queda en
el plan gratuito, conviene sacar el campo de CV o dejarlo solo como respaldo por
WhatsApp.

## Marca

Los seis colores oficiales están en `src/styles/tokens.css` bajo el prefijo
`--vc-*` y **no deben modificarse**: salen del capítulo 05 del manual de marca.
Los tokens semánticos (`--brand`, `--accent`, `--ink`…) sí se pueden reasignar.

El logo se extrajo del PDF del manual y se recortó con transparencia. El manual
prohíbe rotarlo, deformarlo, recolorearlo, aplicarle efectos y ubicarlo sobre
fondos de bajo contraste: por eso en fondos oscuros se usa `logo-vc-white.png`.

## Pendientes antes de publicar

- [ ] **Testimonios reales.** Los de `src/data/testimonials.ts` son texto de
      relleno y están marcados como tales. Publicar testimonios inventados como
      reales es engañoso y riesgoso frente a la Ley 24.240.
- [ ] **Fotos.** Ver `public/img/README.md`. Sin fotos el sitio funciona, pero
      muestra paneles de marca en su lugar.
- [ ] **Data Fiscal.** Descargar el Formulario 960/D de AFIP a
      `public/img/data-fiscal.png` y actualizar el enlace del QR en
      `src/components/Footer.tsx`.
- [ ] **Confirmar el teléfono institucional.** El número surge del Instagram
      oficial (@valmorclean); si el de la empresa es otro, corregir
      `src/lib/site.ts` (campos `phoneDisplay` y `whatsapp`).
- [ ] **Revisión legal de la política de privacidad** y completar el domicilio
      legal en `src/pages/Privacidad.tsx`.
- [ ] **Revisar las respuestas de la FAQ** con el cliente: las condiciones
      comerciales (plazos, formas de pago) son un borrador operativo.
- [ ] **URL de LinkedIn.** La de `src/lib/site.ts` es una suposición; si la
      empresa no tiene perfil corporativo, sacar el bloque de la página de RRHH.
- [ ] **Dominio.** El canonical y el sitemap apuntan a
      `https://www.valmorclean.com.ar`. Si el dominio final es otro, actualizar
      `site.url` en `src/lib/site.ts`, `public/sitemap.xml` y `public/robots.txt`.

## Fase 2 (fuera de alcance de esta entrega)

El blog quedó fuera, como estaba previsto en el mapa de contenido. Cuando se
haga, conviene evaluar el paso a *pre-render* o SSG: hoy los meta tags se
escriben con JavaScript, lo cual alcanza para Google pero no para las vistas
previas de WhatsApp o LinkedIn, que no ejecutan JS.
