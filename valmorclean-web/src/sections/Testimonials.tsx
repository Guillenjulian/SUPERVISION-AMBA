import { Container, Section, SectionHeading } from '../components/ui/Section';
import { testimonials } from '../data/testimonials';
import s from './Testimonials.module.css';

export function Testimonials() {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeading
          eyebrow="Confían en nosotros"
          title="Administraciones, constructoras y empresas"
          lead="Trabajamos con consorcios, estudios de administración, constructoras y áreas de facilities que necesitan un proveedor formal y previsible."
          align="center"
        />

        <ul className={s.grid}>
          {testimonials.map((t, i) => (
            <li key={t.author + i} className={s.card} data-reveal data-reveal-delay={i * 90}>
              <span className={s.quoteMark} aria-hidden="true">
                &rdquo;
              </span>
              <blockquote className={s.quote}>{t.quote}</blockquote>
              <footer className={s.author}>
                <span className={s.avatar} aria-hidden="true">
                  {t.author.charAt(0)}
                </span>
                <span>
                  <strong>{t.author}</strong>
                  <small>{t.role}</small>
                </span>
              </footer>
            </li>
          ))}
        </ul>

        <p className={s.logosNote}>
          {/*
            Zona de logos de clientes. Colocar los archivos en /public/img/clientes/
            y reemplazar este bloque por una fila de <img>. Publicar un logo requiere
            autorización previa del cliente en cuestión.
          */}
          ¿Es cliente de Valmor Clean y quiere aparecer acá? Escribanos y sumamos su logo.
        </p>
      </Container>
    </Section>
  );
}
