import { colors, getInputStyle } from '../../styles/theme';

interface StyledInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}

export function StyledInput({ value, onChange, placeholder, type = 'text' }: StyledInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={getInputStyle()}
    />
  );
}
