import { useState } from 'react';
import s from './Photo.module.css';

type Props = {
  /** Ruta dentro de /public, ej: "/img/hero.jpg" */
  src: string;
  alt: string;
  /** Texto que se muestra mientras la foto real no exista todavía. */
  placeholder: string;
  ratio?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * Imagen con reserva de espacio y respaldo de marca.
 *
 * El sitio se entrega sin fotos definitivas. El panel de marca se dibuja siempre
 * como fondo del `figure` y la imagen se apoya encima: si el archivo todavía no
 * está en `/public/img` —o si aún no se cargó por ser diferida— lo que se ve es
 * el panel, nunca un hueco en blanco ni un ícono de imagen rota.
 * Al subir la foto con ese nombre, aparece sola.
 */
export function Photo({ src, alt, placeholder, ratio = '4 / 3', className, loading = 'lazy' }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={[s.wrap, className ?? ''].filter(Boolean).join(' ')} style={{ aspectRatio: ratio }}>
      <figcaption className={s.fallback} aria-hidden="true">
        <span className={s.mark}>VC</span>
        <span className={s.label}>{placeholder}</span>
        <code className={s.path}>{src}</code>
      </figcaption>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={s.img}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}
