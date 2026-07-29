import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nav, site, waLink } from '../lib/site';
import { services } from '../data/services';
import { Icon } from './ui/Icon';
import s from './Footer.module.css';

/**
 * Data Fiscal (Formulario 960/D de AFIP).
 *
 * Para activarlo: descargar la imagen desde el portal de Data Fiscal, guardarla
 * como `/public/img/data-fiscal.png` y reemplazar el `href` de abajo por la URL
 * propia del QR que entrega el mismo trámite. Mientras el archivo no exista se
 * muestra un recuadro de aviso en vez de una imagen rota.
 */
function DataFiscal() {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <p className={s.qrPending}>
        Espacio reservado para el<span>QR de Data Fiscal (AFIP)</span>
      </p>
    );
  }

  return (
    <a
      className={s.qr}
      href="https://www.afip.gob.ar/fe/qr/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Data Fiscal AFIP"
    >
      <img
        src="/img/data-fiscal.png"
        alt="Data Fiscal — AFIP"
        width="70"
        height="98"
        onError={() => setMissing(true)}
      />
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.grid}>
          <div className={s.brandCol}>
            <Link to="/" className={s.brand}>
              <img src="/logo-vc-white.png" alt="" width="46" height="48" />
              <span>
                <strong>Valmor</strong> Clean
              </span>
            </Link>
            <p className={s.about}>
              {site.legalName} — servicios integrales de limpieza y maestranza para consorcios, empresas, industrias y
              finales de obra en {site.coverage}.
            </p>
            <div className={s.social}>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={20} />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="facebook" size={20} />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={20} />
              </a>
            </div>
          </div>

          <nav className={s.col} aria-label="Secciones del sitio">
            <h2 className={s.colTitle}>Sitio</h2>
            <ul>
              {nav.map((i) => (
                <li key={i.to}>
                  <Link to={i.to}>{i.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/cotizacion">Pedir presupuesto</Link>
              </li>
            </ul>
          </nav>

          <nav className={s.col} aria-label="Servicios">
            <h2 className={s.colTitle}>Servicios</h2>
            <ul>
              {services.slice(0, 6).map((sv) => (
                <li key={sv.slug}>
                  <Link to={`/servicios#${sv.slug}`}>{sv.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.col}>
            <h2 className={s.colTitle}>Contacto</h2>
            <ul className={s.contact}>
              <li>
                <Icon name="whatsapp" size={18} />
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span>{site.hours}</span>
              </li>
              <li>
                <Icon name="pin" size={18} />
                <span>{site.coverage}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={s.fiscal}>
          <div className={s.fiscalData}>
            <p className={s.cuit}>
              <strong>{site.legalName}</strong> · CUIT {site.cuit}
            </p>
            <p className={s.fiscalNote}>
              Inscripta ante AFIP. Personal con ART y seguro de accidentes personales vigentes.
            </p>
          </div>
          <DataFiscal />
        </div>

        <div className={s.legal}>
          <p>
            © {year} {site.legalName} · Todos los derechos reservados.
          </p>
          <ul>
            <li>
              <Link to="/privacidad">Política de privacidad</Link>
            </li>
            <li>
              <Link to="/privacidad#terminos">Términos de uso</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
