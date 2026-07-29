import { Button } from '../components/ui/Button';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { Accordion } from '../components/ui/Accordion';
import { Hero } from '../sections/Hero';
import { TrustBar } from '../sections/TrustBar';
import { ServiceCard } from '../sections/ServiceCard';
import { Testimonials } from '../sections/Testimonials';
import { CtaBand } from '../sections/CtaBand';
import { featuredServices } from '../data/services';
import { faqs } from '../data/faq';
import { useSeo } from '../lib/seo';
import s from './Home.module.css';

const advantages = [
  {
    title: 'Menos costo operativo',
    text: 'Un abono previsible en lugar de sueldos, cargas sociales, reemplazos por ausencias y compra de insumos.',
  },
  {
    title: 'Sin gestión de personal',
    text: 'Nosotros seleccionamos, capacitamos, uniformamos y supervisamos al equipo. Usted supervisa resultados.',
  },
  {
    title: 'Continuidad garantizada',
    text: 'Vacaciones, licencias o ausencias se cubren con personal de reemplazo, sin interrumpir el servicio.',
  },
  {
    title: 'Documentación en regla',
    text: 'ART, seguro de accidentes personales y cargas sociales al día, con la documentación disponible cuando la pidan.',
  },
];

const steps = [
  { n: '01', title: 'Nos contacta', text: 'Por WhatsApp o formulario. Nos cuenta qué necesita y dónde.' },
  { n: '02', title: 'Visitamos el lugar', text: 'Sin cargo y sin compromiso, para dimensionar la dotación real.' },
  { n: '03', title: 'Recibe la propuesta', text: 'Presupuesto detallado dentro de las 24 horas hábiles.' },
  { n: '04', title: 'Arranca el servicio', text: 'Equipo asignado, cronograma acordado y un responsable de contacto.' },
];

export function Home() {
  useSeo({
    title: 'Inicio',
    description:
      'Servicios integrales de limpieza y maestranza para consorcios, oficinas, industrias y finales de obra en CABA y GBA. Personal con ART, respaldo de SRL. Presupuesto sin cargo.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <TrustBar />

      {/* --- Servicios destacados --- */}
      <Section id="servicios">
        <Container>
          <div className={s.servicesHead}>
            <SectionHeading
              eyebrow="Qué hacemos"
              title="Servicios pensados para cada tipo de propiedad"
              lead="Cuatro líneas principales de trabajo, más servicios específicos para comercios, industrias, centros educativos y complejos habitacionales."
            />
            <Button to="/servicios" variant="outline" iconRight="arrow" className={s.servicesHeadCta}>
              Ver todos los servicios
            </Button>
          </div>

          <div className={s.serviceGrid}>
            {featuredServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={i * 80} />
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Por qué tercerizar --- */}
      <Section tone="alt">
        <Container>
          <div className={s.split}>
            <div className={s.splitVisual} data-reveal>
              <Photo
                src="/img/equipo-trabajo.jpg"
                alt="Equipo de Valmor Clean realizando mantenimiento en áreas comunes"
                placeholder="Foto del equipo en un edificio o planta"
                ratio="1 / 1"
              />
              <div className={s.badgeCard}>
                <Icon name="users" size={22} />
                <div>
                  <strong>Personal propio</strong>
                  <span>Capacitado, uniformado y supervisado</span>
                </div>
              </div>
            </div>

            <div className={s.splitCopy}>
              <SectionHeading
                eyebrow="La ventaja de tercerizar"
                title="Delegue la limpieza y recupere horas de gestión"
                lead="Tercerizar con una SRL constituida traslada la relación laboral y su carga administrativa a un proveedor formal."
              />
              <ul className={s.advantages}>
                {advantages.map((a, i) => (
                  <li key={a.title} data-reveal data-reveal-delay={i * 80}>
                    <span className={s.check}>
                      <Icon name="check" size={16} />
                    </span>
                    <div>
                      <h3>{a.title}</h3>
                      <p>{a.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button to="/nosotros" variant="outline" iconRight="arrow" className={s.advantagesCta}>
                Conocer la empresa
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Cómo trabajamos --- */}
      <Section tone="deep">
        <Container>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="De la consulta al primer día de servicio"
            lead="Un proceso corto y sin vueltas, pensado para administraciones y áreas de compras que necesitan definir rápido."
            align="center"
            invert
          />
          <ol className={s.steps}>
            {steps.map((step, i) => (
              <li key={step.n} data-reveal data-reveal-delay={i * 90}>
                <span className={s.stepNum}>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Testimonials />

      {/* --- FAQ resumida --- */}
      <Section>
        <Container narrow>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Las dudas que más nos consultan"
            align="center"
          />
          <Accordion items={faqs.slice(0, 5)} />
          <div className={s.faqFoot}>
            <Button to="/preguntas-frecuentes" variant="outline" iconRight="arrow">
              Ver todas las preguntas
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
