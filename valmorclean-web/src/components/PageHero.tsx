import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Section';
import { Icon } from './ui/Icon';
import s from './PageHero.module.css';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className={s.hero}>
      <div className={s.glow} aria-hidden="true" />
      <Container className={s.inner}>
        <nav className={s.crumbs} aria-label="Migas de pan">
          <Link to="/">Inicio</Link>
          <Icon name="chevron" size={15} />
          <span aria-current="page">{title}</span>
        </nav>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1 className={s.title}>{title}</h1>
        {lead && <p className={s.lead}>{lead}</p>}
        {children && <div className={s.extra}>{children}</div>}
      </Container>
    </section>
  );
}
