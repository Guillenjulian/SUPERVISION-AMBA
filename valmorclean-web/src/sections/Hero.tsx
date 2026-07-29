import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Section';
import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { site, waLink } from '../lib/site';
import s from './Hero.module.css';

export function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.glow} aria-hidden="true" />
      <Container className={s.inner}>
        <div className={s.copy}>
          <p className={s.badge} data-reveal>
            <Icon name="shield" size={17} />
            SRL constituida · Personal 100% asegurado
          </p>

          <h1 data-reveal data-reveal-delay="60">
            Soluciones integrales de <span className={s.hl}>limpieza y maestranza</span> profesional
          </h1>

          <p className={s.lead} data-reveal data-reveal-delay="120">
            Tercerice el mantenimiento de su empresa, consorcio o final de obra con el respaldo legal y operativo de una
            SRL constituida. Ahorre costos y delegue en expertos.
          </p>

          <div className={s.actions} data-reveal data-reveal-delay="180">
            <Button to="/cotizacion" variant="accent" size="lg" icon="badge">
              Solicitar presupuesto sin cargo
            </Button>
            <Button
              href={waLink(`Hola ${site.name}, quisiera pedir un presupuesto.`)}
              variant="outline"
              size="lg"
              icon="whatsapp"
            >
              Hablar por WhatsApp
            </Button>
          </div>

          <dl className={s.stats} data-reveal data-reveal-delay="240">
            <div>
              <dt>Desde</dt>
              <dd>{site.foundedOperating}</dd>
            </div>
            <div>
              <dt>Cobertura</dt>
              <dd>CABA + GBA</dd>
            </div>
            <div>
              <dt>Respuesta</dt>
              <dd>24 h hábiles</dd>
            </div>
          </dl>
        </div>

        <div className={s.visual} data-reveal data-reveal-delay="140">
          <Photo
            src="/img/hero-equipo.jpg"
            alt="Personal uniformado de Valmor Clean trabajando en un edificio"
            placeholder="Foto del equipo uniformado en acción"
            ratio="4 / 5"
            loading="eager"
            className={s.photo}
          />

          <div className={s.floatCard}>
            <span className={s.floatIcon}>
              <Icon name="badge" size={22} />
            </span>
            <div>
              <strong>ART + Seguro AP vigentes</strong>
              <span>Documentación al día para su administración</span>
            </div>
          </div>

          <div className={s.floatChip}>
            <Icon name="pin" size={17} />
            CABA y Gran Buenos Aires
          </div>
        </div>
      </Container>
    </section>
  );
}
