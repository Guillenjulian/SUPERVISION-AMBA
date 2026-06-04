import { font } from '../../styles/theme';

interface SubmitButtonProps {
  enviando: boolean;
  onClick: () => void;
}

export function SubmitButton({ enviando, onClick }: SubmitButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={enviando}
        style={{
          width: '100%',
          padding: 18,
          borderRadius: 14,
          border: 'none',
          background: enviando
            ? 'linear-gradient(135deg,#78350f,#92400e)'
            : 'linear-gradient(135deg,#f97316,#c2410c)',
          color: '#fff',
          fontFamily: font,
          fontWeight: 800,
          fontSize: 17,
          cursor: enviando ? 'not-allowed' : 'pointer',
          boxShadow: '0 6px 24px rgba(249,115,22,.45)',
          letterSpacing: 0.3,
          opacity: enviando ? 0.8 : 1,
        }}
      >
        {enviando ? '⏳ Enviando...' : '🚀 Enviar Supervisión'}
      </button>
      <div
        style={{
          textAlign: 'center',
          color: '#334155',
          fontSize: 12,
          fontFamily: font,
          marginTop: 16,
        }}
      >
        Supervisión AMBA · Grupo Plus · SeGuVIP
      </div>
    </>
  );
}
