import type { SupervisionFormData } from '../../types/supervision';
import { Field, Section, StyledInput, StyledSelect } from '../ui';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClientesSucursales } from '../../hooks/useClientesSucursales';

interface Props {
  form: SupervisionFormData;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
  onClienteChange: (cliente: string) => void;
}

export function DatosGeneralesSection({ form, onUpdate, onClienteChange }: Props) {
  const { supervisor: authSupervisor } = useAuth();
  const { clientesNombres, sucursalesNombres, cargando } = useClientesSucursales(form.cliente);

  useEffect(() => {
    if (authSupervisor) onUpdate('supervisor', authSupervisor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSupervisor]);

  const handleClienteChange = (nuevoCliente: string) => {
    onClienteChange(nuevoCliente);
    // Limpiar sucursal solo si no vino pre-cargada del GPS
    if (!form.sucursal) onUpdate('sucursal', '');
  };

  return (
    <Section icon="📋" title="Datos Generales" color="orange">
      <Field label="Supervisor" required>
        {authSupervisor ? (
          <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fff', border: '1px solid #e6e6e6' }}>
            {authSupervisor}
          </div>
        ) : (
          <StyledSelect
            value={form.supervisor}
            onChange={(v) => onUpdate('supervisor', v)}
            options={[]}
            placeholder="Supervisor"
          />
        )}
      </Field>

      <Field label="Cliente" required>
        {cargando ? (
          <div style={{ padding: '10px 12px', color: '#999', fontSize: 14 }}>
            Cargando clientes...
          </div>
        ) : (
          <StyledSelect
            value={form.cliente}
            onChange={handleClienteChange}
            options={clientesNombres}
            placeholder="Elegí banco / cliente"
          />
        )}
      </Field>

      <Field label="Sucursal / Sede" required>
        {!form.cliente ? (
          <div style={{ padding: '10px 12px', color: '#bbb', fontSize: 14, border: '1px solid #e6e6e6', borderRadius: 8, background: '#fafafa' }}>
            Primero seleccioná un cliente
          </div>
        ) : sucursalesNombres.length === 0 ? (
          <div style={{ padding: '10px 12px', color: '#999', fontSize: 14 }}>
            Cargando sucursales...
          </div>
        ) : (
          <StyledSelect
            value={form.sucursal}
            onChange={(v) => onUpdate('sucursal', v)}
            options={sucursalesNombres}
            placeholder="Elegí sucursal"
          />
        )}
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
