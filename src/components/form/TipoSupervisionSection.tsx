import { TIPOS_SUPERVISION } from '../../constants';
import type { SupervisionFormData } from '../../types/supervision';
import { Field, RadioGroup, Section } from '../ui';

interface Props {
  form: Pick<SupervisionFormData, 'tipoSupervision'>;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
}

export function TipoSupervisionSection({ form, onUpdate }: Props) {
  return (
    <Section icon="🗂️" title="Tipo de supervisión" color="orange">
      <Field label="Tipo" required>
        <RadioGroup
          options={TIPOS_SUPERVISION}
          value={form.tipoSupervision}
          onChange={(v) => onUpdate('tipoSupervision', v)}
        />
      </Field>
    </Section>
  );
}
