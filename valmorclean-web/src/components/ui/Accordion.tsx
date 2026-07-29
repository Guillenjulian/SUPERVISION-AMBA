import { useId, useState } from 'react';
import s from './Accordion.module.css';

type Item = { q: string; a: string };

export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={s.list}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} className={s.item} data-open={expanded ? '' : undefined}>
            <h3 className={s.head}>
              <button
                type="button"
                className={s.trigger}
                aria-expanded={expanded}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-trigger-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span>{item.q}</span>
                <svg className={s.icon} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M12 6v12M6 12h12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div
              className={s.panel}
              id={`${baseId}-panel-${i}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${i}`}
              hidden={!expanded}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
