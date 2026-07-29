import { PageHero } from '../components/PageHero';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { Icon, type IconName } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { CtaBand } from '../sections/CtaBand';
import { site } from '../lib/site';
import { useSeo } from '../lib/seo';
import s from './Nosotros.module.css';

const pillars: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'badge',
    title: 'Misión',
    text: 'Brindar servicios integrales de limpieza y mantenimiento para industrias, empresas y domicilios acorde a cada necesidad del cliente, con capacitaciones al personal e innovando continuamente nuestra tecnología para llegar a nuestro objetivo: la calidad y excelencia en el servicio.',
  },
  {
    icon: 'leaf',
    title: 'Visión',
    text: 'Ser líderes en el sector de la limpieza profesional, ofreciendo un servicio de la más alta calidad, innovando y utilizando tecnologías amigables con el medio ambiente y productos de aseo biodegradables.',
  },
  {
    icon: 'users',
    title: 'Valores',
    text: 'Una cultura basada en el respeto, la confianza, el liderazgo y la seguridad en nuestras operaciones. Es lo que sostiene la relación con cada cliente y con cada persona del equipo.',
  },
];

const milestones = [
  { year: String(site.foundedOperating), title: 'Primeros servicios', text: 'Arrancamos operando con equipos de limpieza para consorcios y oficinas en CABA.' },
  { year: '2020', title: 'Protocolos reforzados', text: 'Incorporamos procedimientos de desinfección y productos aptos para ámbitos sensibles.' },
  { year: String(site.foundedLegal), title: 'Constitución como SRL', text: `Formalizamos la empresa bajo CUIT ${site.cuit}, con personal en relación de dependencia.` },
  { year: 'Hoy', title: 'Cobertura CABA y GBA', text: 'Consorcios, oficinas, industrias, comercios, centros educativos y finales de obra.' },
];

export function Nosotros() {
  useSeo({
    title: 'Quiénes somos',
    description:
      'Valmor Clean SRL: trayectoria desde 2018, constitución formal en 2022. Personal con ART y seguros vigentes. Misión, visión y valores de la empresa.',
    path: '/nosotros',
  });

  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Una empresa formal, con equipo propio"
        lead={`Trabajamos desde ${site.foundedOperating} y en ${site.foundedLegal} constituimos la empresa como sociedad de responsabilidad limitada. Esa formalidad es la que le permite a nuestros clientes tercerizar sin cargar con la relación laboral.`}
      />

      {/* --- Historia + foto --- */}
      <Section>
        <Container>
          <div className={s.intro}>
            <div className={s.introCopy}>
              <SectionHeading
                eyebrow="Historia y solidez"
                title="De un equipo chico a un proveedor de servicios permanentes"
              />
              <p data-reveal>
                Empezamos en {site.foundedOperating} atendiendo consorcios y oficinas en la Ciudad de Buenos Aires. El
                crecimiento nos llevó a formalizar la estructura: en {site.foundedLegal} constituimos{' '}
                <strong>{site.legalName}</strong>, con personal en relación de dependencia, ART, seguros de accidentes
                personales y cargas sociales al día.
              </p>
              <p data-reveal data-reveal-delay="80">
                Hoy prestamos servicios permanentes y trabajos puntuales en {site.coverage}, con dotaciones asignadas a
                cada cuenta y supervisión periódica. Cada cliente tiene un responsable de contacto directo, sin call
                center de por medio.
              </p>

              <ul className={s.facts} data-reveal data-reveal-delay="140">
                <li>
                  <span>Razón social</span>
                  <strong>{site.legalName}</strong>
                </li>
                <li>
                  <span>CUIT</span>
                  <strong>{site.cuit}</strong>
                </li>
                <li>
                  <span>Operando desde</span>
                  <strong>{site.foundedOperating}</strong>
                </li>
                <li>
                  <span>Zona de cobertura</span>
                  <strong>{site.coverage}</strong>
                </li>
              </ul>
            </div>

            <div className={s.introVisual} data-reveal data-reveal-delay="100">
              <Photo
                src="/img/nosotros.jpg"
                alt="Equipo de Valmor Clean"
                placeholder="Foto grupal del equipo o de una jornada de trabajo"
                ratio="3 / 4"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Misión, visión, valores --- */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Lo que nos ordena"
            title="Misión, visión y valores"
            align="center"
            lead="Los tres pilares que guían cómo armamos cada equipo y cómo resolvemos cada servicio."
          />
          <div className={s.pillars}>
            {pillars.map((p, i) => (
              <article key={p.title} className={s.pillar} data-reveal data-reveal-delay={i * 90}>
                <span className={s.pillarIcon}>
                  <Icon name={p.icon} size={24} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Compromiso y seguridad --- */}
      <Section tone="deep">
        <Container>
          <div className={s.commitment}>
            <SectionHeading
              eyebrow="Compromiso y seguridad"
              title="Documentación al día, siempre"
              lead="La tercerización solo sirve si el proveedor está en regla. Al iniciar el servicio entregamos la documentación que su administración, su estudio contable o su área de compras necesite."
              invert
            />
            <ul className={s.checkList}>
              {[
                'ART vigente para todo el personal asignado',
                'Seguro de accidentes personales (AP)',
                'Cargas sociales y aportes al día',
                'Personal en relación de dependencia, uniformado e identificado',
                'Capacitación específica para trabajos en altura',
                'Elementos de protección personal provistos por la empresa',
              ].map((item, i) => (
                <li key={item} data-reveal data-reveal-delay={i * 60}>
                  <Icon name="check" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* --- Línea de tiempo --- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Trayectoria" title="Nuestro recorrido" align="center" />
          <ol className={s.timeline}>
            {milestones.map((m, i) => (
              <li key={m.year} data-reveal data-reveal-delay={i * 80}>
                <span className={s.year}>{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="¿Quiere trabajar con un proveedor formal?"
        text="Le enviamos la propuesta y la documentación respaldatoria en la misma respuesta, para que la evalúe con su administración."
      />
    </>
  );
}
