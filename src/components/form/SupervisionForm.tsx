import type { SupervisionFormData } from '../../types/supervision';
import { AuditoriaSection } from './AuditoriaSection';
import { DatosGeneralesSection } from './DatosGeneralesSection';
import { DetallesSection } from './DetallesSection';
import { EventosSection } from './EventosSection';
import { PersonalAuditadoSection } from './PersonalAuditadoSection';

interface Props {
  form: SupervisionFormData;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
  onClienteChange: (cliente: string) => void;
}

export function SupervisionForm({ form, onUpdate, onClienteChange }: Props) {
  return (
    <>
      <DatosGeneralesSection form={form} onUpdate={onUpdate} onClienteChange={onClienteChange} />
      <PersonalAuditadoSection form={form} onUpdate={onUpdate} />
      <AuditoriaSection
        entrevistaVigilador={form.entrevistaVigilador}
        onUpdate={(v) => onUpdate('entrevistaVigilador', v)}
      />
      <EventosSection form={form} onUpdate={onUpdate} />
      <DetallesSection form={form} onUpdate={onUpdate} />
    </>
  );
}
