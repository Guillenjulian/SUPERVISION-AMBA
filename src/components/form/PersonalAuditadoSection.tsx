import { ENTREGAS } from '../../constants';
import type { SupervisionFormData } from '../../types/supervision';
import { CheckGroup, Field, RadioGroup, Section, StyledInput } from '../ui';

interface Props {
  form: SupervisionFormData;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
}

export function PersonalAuditadoSection({ form, onUpdate }: Props) {
  return (
    <Section icon="👤" title="Personal Auditado" color="purple">
      <Field label="Apellido y nombre" required>
        <StyledInput
          value={form.nombreAgente}
          onChange={(v) => onUpdate('nombreAgente', v)}
          placeholder="Ej: García Roberto"
        />
      </Field>
      <Field label="Legajo" required>
        <StyledInput
          value={form.legajo}
          onChange={(v) => onUpdate('legajo', v)}
          placeholder="Nº de legajo"
        />
      </Field>
      <Field label="Uniforme completo" required>
        <RadioGroup
          options={['Correcto', 'Incorrecto']}
          value={form.uniforme}
          onChange={(v) => onUpdate('uniforme', v)}
        />
      </Field>
      <Field label="Credencial" required>
        <RadioGroup
          options={['Sí', 'No', 'Vencida']}
          value={form.credencial}
          onChange={(v) => onUpdate('credencial', v)}
        />
      </Field>
      <Field label="Aseo" required>
        <RadioGroup
          options={['Correcto', 'Incorrecto', 'Con barba']}
          value={form.aseo}
          onChange={(v) => onUpdate('aseo', v)}
        />
      </Field>
      <Field label="Supervisor entrega">
        <CheckGroup
          options={ENTREGAS}
          values={form.supervisorEntrega}
          onChange={(v) => onUpdate('supervisorEntrega', v)}
        />
      </Field>
      <Field label="Empleado entrega">
        <CheckGroup
          options={ENTREGAS}
          values={form.empleadoEntrega}
          onChange={(v) => onUpdate('empleadoEntrega', v)}
        />
      </Field>
    </Section>
  );
}
