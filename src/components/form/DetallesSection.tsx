import { font } from '../../styles/theme';
import type { SupervisionFormData } from '../../types/supervision';
import { Field, RadioGroup, Section, SignaturePad } from '../ui';

interface Props {
  form: Pick<SupervisionFormData, 'novedad' | 'descNovedad' | 'foto' | 'firma'>;
  onUpdate: <K extends keyof SupervisionFormData>(field: K, value: SupervisionFormData[K]) => void;
}

export function DetallesSection({ form, onUpdate }: Props) {
  return (
    <Section icon="📝" title="Detalles" color="green">
      <Field label="Novedad" required>
        <RadioGroup
          options={['Sin novedad', 'Con novedad']}
          value={form.novedad}
          onChange={(v) => onUpdate('novedad', v)}
        />
      </Field>
      {form.novedad === 'Con novedad' && (
        <Field label="Describa la novedad">
          <textarea
            value={form.descNovedad}
            onChange={(e) => onUpdate('descNovedad', e.target.value)}
            placeholder="Describí la novedad..."
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #334155',
              background: '#1e293b',
              color: '#f1f5f9',
              fontFamily: font,
              fontSize: 15,
              outline: 'none',
              minHeight: 90,
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </Field>
      )}
      <Field label="Foto (opcional)">
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            borderRadius: 10,
            border: '1.5px dashed #334155',
            cursor: 'pointer',
            color: form.foto ? '#22c55e' : '#64748b',
            background: '#1e293b',
          }}
        >
          <span style={{ fontSize: 22 }}>📷</span>
          <span style={{ fontFamily: font, fontSize: 14 }}>
            {form.foto ? `✓ ${form.foto.name}` : 'Sacar foto o adjuntar archivo'}
          </span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={(e) => onUpdate('foto', e.target.files?.[0] ?? null)}
          />
        </label>
      </Field>
      <Field label="Firma del empleado (opcional)">
        <SignaturePad
          value={form.firma}
          onChange={(signature) => onUpdate('firma', signature)}
        />
      </Field>
    </Section>
  );
}
