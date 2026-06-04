import { ToggleBtn } from './ToggleBtn';

interface CheckGroupProps {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function CheckGroup({ options, values, onChange }: CheckGroupProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <ToggleBtn
            key={opt}
            label={opt}
            active={active}
            onClick={() =>
              onChange(active ? values.filter((v) => v !== opt) : [...values, opt])
            }
          />
        );
      })}
    </div>
  );
}
