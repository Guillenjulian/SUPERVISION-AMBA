import { useEffect } from 'react';
import { site } from './site';

type Seo = {
  title: string;
  description: string;
  /** Ruta canónica, ej: "/servicios". */
  path: string;
};

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Título, descripción y canonical por página.
 *
 * El sitio es una SPA, así que los meta se escriben en runtime. Alcanza para
 * Google (que ejecuta JS) y para navegación/compartidos internos. Si más
 * adelante se necesita preview correcto en WhatsApp o LinkedIn — que no
 * ejecutan JS — hay que pasar a pre-render (`vite-plugin-ssg` o similar).
 */
export function useSeo({ title, description, path }: Seo) {
  useEffect(() => {
    const full = path === '/' ? `${site.name} · ${site.tagline} en CABA y GBA` : `${title} · ${site.name}`;
    document.title = full;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${site.url}${path}`);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${site.url}${path}`;
  }, [title, description, path]);
}
