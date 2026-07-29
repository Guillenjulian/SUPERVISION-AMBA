import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon';
import s from './Button.module.css';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'white';
type Size = 'md' | 'lg';

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  block?: boolean;
};

type Props =
  | (Common & { to: string; href?: never; type?: never; onClick?: never; disabled?: never })
  | (Common & { href: string; to?: never; type?: never; onClick?: never; disabled?: never })
  | (Common & {
      to?: never;
      href?: never;
      type?: 'button' | 'submit';
      onClick?: () => void;
      disabled?: boolean;
    });

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', icon, iconRight, className, block } = props;

  const cls = [s.btn, s[variant], s[size], block ? s.block : '', className ?? ''].filter(Boolean).join(' ');

  const inner = (
    <>
      {icon && <Icon name={icon} size={size === 'lg' ? 21 : 19} className={s.icon} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 21 : 19} className={s.iconRight} />}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const external = props.href.startsWith('http');
    return (
      <a
        href={props.href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={('type' in props && props.type) || 'button'}
      className={cls}
      onClick={'onClick' in props ? props.onClick : undefined}
      disabled={'disabled' in props ? props.disabled : undefined}
    >
      {inner}
    </button>
  );
}
