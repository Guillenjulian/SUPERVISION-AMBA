import { CLIENTES, SUCURSALES, SUPERVISORES } from '../../constants';
import type { SupervisionFormData } from '../../types/supervision';
import { Field, Section, StyledInput, StyledSelect } from '../ui';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  form: SupervisionFormData;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
  onClienteChange: (cliente: string) => void;
}

export function DatosGeneralesSection({ form, onUpdate, onClienteChange }: Props) {
  const { supervisor: authSupervisor } = useAuth();

  useEffect(() => {
    if (authSupervisor) onUpdate('supervisor', authSupervisor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSupervisor]);
  return (
    <Section icon="📋" title="Datos Generales" color="orange">
      <Field label="Supervisor" required>
        {authSupervisor ? (
          <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fff', border: '1px solid #e6e6e6' }}>{authSupervisor}</div>
        ) : (
          <StyledSelect
            value={form.supervisor}
            onChange={(v) => onUpdate('supervisor', v)}
            options={SUPERVISORES}
            placeholder="Elegí supervisor"
          />
        )}
      </Field>
      <Field label="Cliente" required>
        <StyledSelect
          value={form.cliente}
          onChange={onClienteChange}
          options={CLIENTES}
          placeholder="Elegí banco / cliente"
        />
      </Field>
      <Field label="Sucursal / Sede">
        <StyledSelect
          value={form.sucursal}
          onChange={(v) => onUpdate('sucursal', v)}
          options={SUCURSALES}
          placeholder="Elegí sucursal"
        />
      </Field>
      <div className="date-grid">
        <Field label="Fecha inicio" required>
          <StyledInput
            value={form.fechaInicio}
            onChange={(v) => onUpdate('fechaInicio', v)}
            placeholder="DD/MM/AAAA"
          />
        </Field>
        <Field label="Hora inicio" required>
          <StyledInput
            value={form.horaInicio}
            onChange={(v) => onUpdate('horaInicio', v)}
            placeholder="HH:MM"
          />
        </Field>
        <Field label="Fecha fin" required>
          <StyledInput
            value={form.fechaFin}
            onChange={(v) => onUpdate('fechaFin', v)}
            placeholder="DD/MM/AAAA"
          />
        </Field>
        <Field label="Hora fin" required>
          <StyledInput
            value={form.horaFin}
            onChange={(v) => onUpdate('horaFin', v)}
            placeholder="HH:MM"
          />
        </Field>
      </div>
    </Section>
  );
}
