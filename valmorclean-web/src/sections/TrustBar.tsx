import { Container } from '../components/ui/Section';
import { Icon, type IconName } from '../components/ui/Icon';
import { site } from '../lib/site';
import s from './TrustBar.module.css';

const items: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'shield',
    title: 'Personal 100% asegurado',
    text: 'Todo nuestro equipo cuenta con ART y seguros de accidentes personales (AP) vigentes.',
  },
  {
    icon: 'badge',
    title: 'Respaldo legal',
    text: `Empresa constituida como SRL (CUIT ${site.cuit}), sin riesgos laborales para su empresa.`,
  },
  {
    icon: 'pin',
    title: 'Cobertura total',
    text: 'Atendemos en la Ciudad Autónoma de Buenos Aires (CABA) y Gran Buenos Aires (GBA).',
  },
];

export function TrustBar() {
  return (
    <section className={s.band} aria-label="Nuestras garantías">
      <Container>
        <ul className={s.list}>
          {items.map((item, i) => (
            <li key={item.title} className={s.item} data-reveal data-reveal-delay={i * 90}>
              <span className={s.icon}>
                <Icon name={item.icon} size={24} />
              </span>
              <div>
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
