import { ToggleBtn } from './ToggleBtn';

interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => (
        <ToggleBtn key={opt} label={opt} active={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  );
}
