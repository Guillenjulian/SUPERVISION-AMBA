import type { SupervisionFormData } from '../../types/supervision';
import { Field, RadioGroup, Section } from '../ui';

interface Props {
  entrevistaVigilador: SupervisionFormData['entrevistaVigilador'];
  onUpdate: (value: string) => void;
}

export function AuditoriaSection({ entrevistaVigilador, onUpdate }: Props) {
  return (
    <Section icon="🔍" title="Auditoría de Vigilancia" color="blue">
      <Field label="¿Se entrevista con vigilador propio?" required>
        <RadioGroup options={['Sí', 'No']} value={entrevistaVigilador} onChange={onUpdate} />
      </Field>
    </Section>
  );
}
