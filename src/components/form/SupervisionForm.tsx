import { TIPOS_SOLO_NOVEDAD } from '../../constants';
import type { SupervisionFormData } from '../../types/supervision';
import { AuditoriaSection } from './AuditoriaSection';
import { DatosGeneralesSection } from './DatosGeneralesSection';
import { DetallesSection } from './DetallesSection';
import { EventosSection } from './EventosSection';
import { PersonalAuditadoSection } from './PersonalAuditadoSection';
import { TipoSupervisionSection } from './TipoSupervisionSection';

interface Props {
  form: SupervisionFormData;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
  onClienteChange: (cliente: string) => void;
}

export function SupervisionForm({ form, onUpdate, onClienteChange }: Props) {
  // Apertura / Cierre de lobby: se salta la auditoría y va directo a la novedad.
  const soloNovedad = TIPOS_SOLO_NOVEDAD.includes(form.tipoSupervision);

  return (
    <>
      <TipoSupervisionSection form={form} onUpdate={onUpdate} />
      <DatosGeneralesSection form={form} onUpdate={onUpdate} onClienteChange={onClienteChange} />
      {!soloNovedad && (
        <>
          <PersonalAuditadoSection form={form} onUpdate={onUpdate} />
          <AuditoriaSection
            entrevistaVigilador={form.entrevistaVigilador}
            onUpdate={(v) => onUpdate('entrevistaVigilador', v)}
          />
          <EventosSection form={form} onUpdate={onUpdate} />
        </>
      )}
      <DetallesSection form={form} onUpdate={onUpdate} />
    </>
  );
}
