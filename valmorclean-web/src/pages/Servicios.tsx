import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui/Button';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { CtaBand } from '../sections/CtaBand';
import { services } from '../data/services';
import { site, waLink } from '../lib/site';
import { useSeo } from '../lib/seo';
import s from './Servicios.module.css';

/** Galería antes/después: pares muy visuales (final de obra y vidrios en altura). */
const gallery = [
  { slug: 'final-de-obra', label: 'Final de obra · departamento a estrenar' },
  { slug: 'vidrios-en-altura', label: 'Fachada vidriada · trabajo en altura' },
  { slug: 'consorcios', label: 'Palier y áreas comunes de consorcio' },
];

export function Servicios() {
  useSeo({
    title: 'Servicios',
    description:
      'Limpieza de consorcios, vidrios en altura, finales de obra, oficinas, comercios, industrias, centros educativos y complejos habitacionales en CABA y GBA.',
    path: '/servicios',
  });

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Todo lo que podemos resolver"
        lead="Ocho líneas de servicio, con planes permanentes o trabajos puntuales. Cada una se cotiza según metros, frecuencia y complejidad del lugar."
      >
        <div className={s.heroActions}>
          <Button to="/cotizacion" variant="accent" size="lg" icon="badge">
            Pedir presupuesto
          </Button>
          <Button href={waLink(`Hola ${site.name}, quisiera consultar por un servicio.`)} variant="ghost" size="lg" icon="whatsapp">
            Consultar por WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* --- Índice rápido --- */}
      <nav className={s.jump} aria-label="Ir a un servicio">
        <Container>
          <ul>
            {services.map((sv) => (
              <li key={sv.slug}>
                <a href={`#${sv.slug}`}>
                  <Icon name={sv.icon} size={17} />
                  {sv.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* --- Detalle de cada servicio --- */}
      <Section>
        <Container>
          <div className={s.list}>
            {services.map((sv, i) => (
              <article key={sv.slug} id={sv.slug} className={s.row} data-reveal>
                <div className={s.rowMedia}>
                  <Photo
                    src={`/img/servicios/${sv.slug}.jpg`}
                    alt={sv.title}
                    placeholder={`Foto de ${sv.title.toLowerCase()}`}
                    ratio="4 / 3"
                  />
                  <span className={s.rowIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={s.rowCopy}>
                  <span className={s.rowIcon}>
                    <Icon name={sv.icon} size={24} />
                  </span>
                  <h2>{sv.title}</h2>
                  <p className={s.rowLead}>{sv.short}</p>
                  <p className={s.rowText}>{sv.long}</p>

                  <ul className={s.bullets}>
                    {sv.bullets.map((b) => (
                      <li key={b}>
                        <Icon name="check" size={16} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className={s.rowActions}>
                    <Button to={`/cotizacion?servicio=${sv.slug}`} icon="badge">
                      Cotizar este servicio
                    </Button>
                    <Button
                      href={waLink(`Hola ${site.name}, quisiera consultar por el servicio de ${sv.title}.`)}
                      variant="outline"
                      icon="whatsapp"
                    >
                      Consultar
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Galería antes / después --- */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Galería de trabajos"
            title="Antes y después"
            lead="Resultados reales de finales de obra, vidrios en altura y mantenimiento de áreas comunes."
            align="center"
          />
          <div className={s.gallery}>
            {gallery.map((g, i) => (
              <figure key={g.slug} className={s.pair} data-reveal data-reveal-delay={i * 90}>
                <div className={s.pairImages}>
                  <div className={s.pairSide}>
                    <Photo
                      src={`/img/galeria/${g.slug}-antes.jpg`}
                      alt={`${g.label} — antes`}
                      placeholder="Foto ANTES"
                      ratio="1 / 1"
                    />
                    <span className={s.tagBefore}>Antes</span>
                  </div>
                  <div className={s.pairSide}>
                    <Photo
                      src={`/img/galeria/${g.slug}-despues.jpg`}
                      alt={`${g.label} — después`}
                      placeholder="Foto DESPUÉS"
                      ratio="1 / 1"
                    />
                    <span className={s.tagAfter}>Después</span>
                  </div>
                </div>
                <figcaption>{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="¿No encuentra su caso en la lista?"
        text="Escríbanos igual. Armamos planes a medida para propiedades y operaciones que no entran en un servicio estándar."
      />
    </>
  );
}
