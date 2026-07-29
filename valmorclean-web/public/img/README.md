# Fotos del sitio

El sitio funciona sin fotos: mientras un archivo no exista, se muestra un panel
con los colores de marca y el nombre de la foto que falta. Apenas se sube el
archivo con el nombre exacto de esta lista, aparece solo — no hay que tocar código.

## Formato recomendado

- **Formato:** `.jpg` (calidad 80). Para fotos con transparencia, `.png`.
- **Ancho máximo:** 1600 px. Más grande solo suma peso.
- **Peso objetivo:** menos de 300 KB por foto.
- **Encuadre:** personal uniformado, lugares ordenados, buena luz natural.
  Evitar fotos con caras identificables sin autorización escrita de la persona.

## Archivos esperados

### Portada

| Archivo | Dónde aparece | Proporción |
|---|---|---|
| `hero-equipo.jpg` | Bloque principal del Inicio | vertical 4:5 |
| `equipo-trabajo.jpg` | Bloque "La ventaja de tercerizar" | cuadrada 1:1 |
| `nosotros.jpg` | Página Quiénes somos | vertical 3:4 |

### Servicios (`/img/servicios/`)

Una foto por servicio, horizontal 4:3:

- `consorcios.jpg`
- `vidrios-en-altura.jpg`
- `final-de-obra.jpg`
- `oficinas.jpg`
- `comercios.jpg`
- `industrias.jpg`
- `centros-educativos-y-medicos.jpg`
- `complejos-habitacionales.jpg`

### Galería antes / después (`/img/galeria/`)

Pares cuadrados (1:1), **tomados desde el mismo ángulo** para que la comparación
funcione:

- `final-de-obra-antes.jpg` / `final-de-obra-despues.jpg`
- `vidrios-en-altura-antes.jpg` / `vidrios-en-altura-despues.jpg`
- `consorcios-antes.jpg` / `consorcios-despues.jpg`

### Data fiscal

- `data-fiscal.png` — imagen del Formulario 960/D que descarga AFIP desde el
  portal de Data Fiscal. Va en el pie de página. Junto con la imagen, actualizar
  el `href` del enlace en `src/components/Footer.tsx` con la URL propia del QR.

### Logos de clientes (opcional, `/img/clientes/`)

Logos en `.png` con fondo transparente, alto uniforme de 60 px. Publicar el logo
de un cliente requiere su autorización previa.
