import { useEffect } from 'react';

/**
 * Anima la entrada de los elementos marcados con `data-reveal` cuando aparecen
 * en pantalla. Se re-observa en cada cambio de ruta (por eso recibe una clave).
 * Si el usuario pidió menos movimiento, se muestran directamente visibles.
 */
export function useReveal(key: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    nodes.forEach((n) => {
      n.classList.remove('is-visible');
      io.observe(n);
    });

    return () => io.disconnect();
  }, [key]);
}
