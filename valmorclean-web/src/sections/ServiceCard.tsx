import { Link } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import type { Service } from '../data/services';
import s from './ServiceCard.module.css';

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <article className={s.card} data-reveal data-reveal-delay={delay}>
      <span className={s.icon}>
        <Icon name={service.icon} size={26} />
      </span>
      <h3 className={s.title}>{service.title}</h3>
      <p className={s.text}>{service.short}</p>
      <Link className={s.link} to={`/servicios#${service.slug}`}>
        Saber más
        <Icon name="arrow" size={18} />
      </Link>
    </article>
  );
}
