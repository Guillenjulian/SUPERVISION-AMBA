import type { ReactNode } from 'react';
import s from './Field.module.css';

type BaseProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function Shell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: BaseProps & { children: ReactNode }) {
  return (
    <div className={[s.field, className ?? ''].filter(Boolean).join(' ')} data-error={error ? '' : undefined}>
      <label className={s.label} htmlFor={id}>
        {label}
        {required && (
          <span className={s.req} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className={s.error} id={`${id}-msg`} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className={s.hint} id={`${id}-msg`}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

type InputProps = BaseProps & {
  type?: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
};

export function TextField({ type = 'text', value, onChange, placeholder, autoComplete, ...rest }: InputProps) {
  return (
    <Shell {...rest}>
      <input
        id={rest.id}
        name={rest.id}
        className={s.input}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={rest.required}
        aria-describedby={rest.hint || rest.error ? `${rest.id}-msg` : undefined}
        aria-invalid={rest.error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </Shell>
  );
}

type TextAreaProps = BaseProps & {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
};

export function TextArea({ value, onChange, placeholder, rows = 4, ...rest }: TextAreaProps) {
  return (
    <Shell {...rest}>
      <textarea
        id={rest.id}
        name={rest.id}
        className={[s.input, s.textarea].join(' ')}
        value={value}
        rows={rows}
        placeholder={placeholder}
        required={rest.required}
        aria-describedby={rest.hint || rest.error ? `${rest.id}-msg` : undefined}
        aria-invalid={rest.error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </Shell>
  );
}

type SelectProps = BaseProps & {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({ value, onChange, options, placeholder, ...rest }: SelectProps) {
  return (
    <Shell {...rest}>
      <div className={s.selectWrap}>
        <select
          id={rest.id}
          name={rest.id}
          className={[s.input, s.select].join(' ')}
          value={value}
          required={rest.required}
          aria-describedby={rest.hint || rest.error ? `${rest.id}-msg` : undefined}
          aria-invalid={rest.error ? true : undefined}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder ?? 'Seleccioná una opción'}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg className={s.caret} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Shell>
  );
}

type ChoiceProps = BaseProps & {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
};

/** Grupo de opciones tipo "chips": más rápido de completar en móvil que un select. */
export function ChoiceField({ value, onChange, options, ...rest }: ChoiceProps) {
  return (
    <fieldset className={[s.field, s.fieldset, rest.className ?? ''].filter(Boolean).join(' ')}>
      <legend className={s.label}>
        {rest.label}
        {rest.required && (
          <span className={s.req} aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className={s.chips}>
        {options.map((o) => (
          <label key={o.value} className={s.chip} data-checked={value === o.value ? '' : undefined}>
            <input
              type="radio"
              name={rest.id}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className={s.chipInput}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {rest.error ? (
        <p className={s.error} role="alert">
          {rest.error}
        </p>
      ) : (
        rest.hint && <p className={s.hint}>{rest.hint}</p>
      )}
    </fieldset>
  );
}

type FileProps = BaseProps & {
  accept?: string;
  fileName?: string;
  onChange: (file: File | null) => void;
};

export function FileField({ accept, fileName, onChange, ...rest }: FileProps) {
  return (
    <Shell {...rest}>
      <label className={s.file} htmlFor={rest.id}>
        <input
          id={rest.id}
          name={rest.id}
          type="file"
          accept={accept}
          required={rest.required}
          className={s.fileInput}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 16V4M7.5 8.5L12 4l4.5 4.5M4 15v3.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V15" />
        </svg>
        <span className={s.fileText}>{fileName || 'Elegir archivo'}</span>
      </label>
    </Shell>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className={s.check} htmlFor={id}>
      <input id={id} name={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}
