import { useEffect, useState } from 'react';
import { site, waLink } from '../lib/site';
import { Icon } from './ui/Icon';
import s from './WhatsAppFab.module.css';

const MESSAGE = `Hola ${site.name}, quisiera consultar por un servicio de limpieza.`;

/** Botón flotante de WhatsApp, presente en todas las páginas (escritorio y móvil). */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 340);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={s.fab}
      href={waLink(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      data-visible={visible ? '' : undefined}
      aria-label={`Escribinos por WhatsApp al ${site.phoneDisplay}`}
    >
      <Icon name="whatsapp" size={28} />
      <span className={s.label}>Escribinos</span>
    </a>
  );
}
