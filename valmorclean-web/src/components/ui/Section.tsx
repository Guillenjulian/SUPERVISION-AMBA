import type { ReactNode } from 'react';
import s from './Section.module.css';

type ContainerProps = {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
};

export function Container({ children, narrow, className }: ContainerProps) {
  return <div className={[s.container, narrow ? s.narrow : '', className ?? ''].filter(Boolean).join(' ')}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: 'default' | 'alt' | 'brand' | 'deep';
  className?: string;
  tight?: boolean;
};

export function Section({ children, id, tone = 'default', className, tight }: SectionProps) {
  return (
    <section
      id={id}
      className={[s.section, s[tone], tight ? s.tight : '', className ?? ''].filter(Boolean).join(' ')}
    >
      {children}
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  invert?: boolean;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ eyebrow, title, lead, align = 'left', invert, as = 'h2' }: HeadingProps) {
  const Tag = as;
  return (
    <header
      className={[s.heading, align === 'center' ? s.center : '', invert ? s.invert : ''].filter(Boolean).join(' ')}
    >
      {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
      <Tag className={s.title}>{title}</Tag>
      {lead && <p className={s.lead}>{lead}</p>}
    </header>
  );
}
