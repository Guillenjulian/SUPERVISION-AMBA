import { font } from '../../styles/theme';

interface ToggleBtnProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function ToggleBtn({ label, active, onClick }: ToggleBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: 10,
        border: active ? 'none' : '1.5px solid #334155',
        background: active ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#1e293b',
        color: active ? '#fff' : '#94a3b8',
        fontFamily: font,
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all .18s',
        boxShadow: active ? '0 4px 14px rgba(249,115,22,.35)' : 'none',
      }}
    >
      {active ? '✓ ' : ''}
      {label}
    </button>
  );
}
