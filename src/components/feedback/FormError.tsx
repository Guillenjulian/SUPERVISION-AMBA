import { font, colors } from '../../styles/theme';

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      style={{
        background: colors.surfaceAlt,
        border: `1.5px solid ${colors.error}`,
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 16,
        color: colors.error,
        fontFamily: font,
        fontSize: 14,
      }}
    >
      ❌ {message}
    </div>
  );
}
