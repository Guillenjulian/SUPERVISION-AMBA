import { colors, font, sectionGradients } from '../../styles/theme';
import type { SupervisionFormData } from '../../types/supervision';

interface SuccessScreenProps {
  form: Pick<
    SupervisionFormData,
    'supervisor' | 'cliente' | 'nombreAgente' | 'legajo' | 'fechaInicio' | 'horaInicio' | 'fechaFin' | 'horaFin'
  >;
  onNew: () => void;
}

export function SuccessScreen({ form, onNew }: SuccessScreenProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font,
        padding: 24,
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <div style={{ color: colors.success, fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
        ¡Supervisión enviada!
      </div>
      <div style={{ color: colors.textDim, textAlign: 'center', marginBottom: 24 }}>
        Los datos fueron registrados correctamente.
      </div>
      <div
        style={{
          background: colors.surface,
          borderRadius: 14,
          padding: 18,
          width: '100%',
          maxWidth: 400,
          border: `1px solid ${colors.border}`,
          color: colors.textMuted,
          fontSize: 14,
          lineHeight: 1.8,
        }}
      >
        <div>
          <b style={{ color: colors.accent }}>Supervisor:</b> {form.supervisor}
        </div>
        <div>
          <b style={{ color: colors.accent }}>Cliente:</b> {form.cliente}
        </div>
        <div>
          <b style={{ color: colors.accent }}>Agente:</b> {form.nombreAgente} — Leg. {form.legajo}
        </div>
        <div>
          <b style={{ color: colors.accent }}>Inicio:</b> {form.fechaInicio} {form.horaInicio}
        </div>
        <div>
          <b style={{ color: colors.accent }}>Fin:</b> {form.fechaFin} {form.horaFin}
        </div>
      </div>
      <button
        type="button"
        onClick={onNew}
        style={{
          marginTop: 20,
          padding: '12px 28px',
          borderRadius: 10,
          border: 'none',
          background: sectionGradients.brand,
          color: '#fff',
          fontFamily: font,
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Nueva supervisión
      </button>
    </div>
  );
}
