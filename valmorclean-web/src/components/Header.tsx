import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, site } from '../lib/site';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import s from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={s.header} data-stuck={stuck ? '' : undefined} data-open={open ? '' : undefined}>
      <div className={s.bar}>
        <Link to="/" className={s.brand} aria-label={`${site.name} — inicio`}>
          <img src="/logo-vc.png" alt="" className={s.logo} width="44" height="46" />
          <span className={s.brandText}>
            <span>
              <strong>Valmor</strong> Clean
            </span>
            <small>Limpieza y maestranza</small>
          </span>
        </Link>

        <nav className={s.desktopNav} aria-label="Navegación principal">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => [s.link, isActive ? s.active : ''].filter(Boolean).join(' ')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={s.actions}>
          <a className={s.phone} href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} />
            <span>{site.phoneDisplay}</span>
          </a>
          <Button to="/cotizacion" variant="accent" className={s.cta}>
            Pedir presupuesto
          </Button>
          <button
            type="button"
            className={s.burger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>

      <div className={s.mobilePanel} id="menu-movil" hidden={!open}>
        <nav className={s.mobileNav} aria-label="Navegación principal (móvil)">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => [s.mobileLink, isActive ? s.active : ''].filter(Boolean).join(' ')}
            >
              {item.label}
              <Icon name="arrow" size={18} />
            </NavLink>
          ))}
        </nav>
        <div className={s.mobileActions}>
          <Button to="/cotizacion" variant="accent" size="lg" block icon="badge">
            Pedir presupuesto
          </Button>
          <Button href={`https://wa.me/${site.whatsapp}`} variant="outline" size="lg" block icon="whatsapp">
            WhatsApp {site.phoneDisplay}
          </Button>
        </div>
      </div>
    </header>
  );
}
