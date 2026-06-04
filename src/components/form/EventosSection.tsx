import { EVENTOS } from '../../constants';
import type { SupervisionFormData } from '../../types/supervision';
import { CheckGroup, Field, RadioGroup, Section, StyledInput } from '../ui';

interface Props {
  form: Pick<SupervisionFormData, 'eventos' | 'eventoOtro' | 'exito'>;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
}

export function EventosSection({ form, onUpdate }: Props) {
  return (
    <Section icon="⚡" title="Eventos" color="red">
      <Field label="Tipo de evento" required>
        <CheckGroup
          options={EVENTOS}
          values={form.eventos}
          onChange={(v) => onUpdate('eventos', v)}
        />
        <div style={{ marginTop: 10 }}>
          <StyledInput
            value={form.eventoOtro}
            onChange={(v) => onUpdate('eventoOtro', v)}
            placeholder="Otro (especificá)"
          />
        </div>
      </Field>
      <Field label="¿Con éxito?" required>
        <RadioGroup
          options={['Sí', 'No', 'No, dejó vigilancia']}
          value={form.exito}
          onChange={(v) => onUpdate('exito', v)}
        />
      </Field>
    </Section>
  );
}
