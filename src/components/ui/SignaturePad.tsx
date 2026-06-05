import { useRef, useState, useEffect } from 'react';
import { colors, font } from '../../styles/theme';

interface SignaturePadProps {
  value: string | null;
  onChange: (signature: string | null) => void;
}

export function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    onChange(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: `2px solid ${colors.border}`,
          borderRadius: 10,
          cursor: 'crosshair',
          background: '#0f172a',
          display: 'block',
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
        }}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={clearSignature}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#ef4444',
            color: 'white',
            fontFamily: font,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#dc2626';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#ef4444';
          }}
        >
          Borrar
        </button>
        {value && (
          <div style={{ color: '#22c55e', fontSize: 14, fontFamily: font, alignSelf: 'center' }}>
            ✓ Firma capturada
          </div>
        )}
      </div>
    </div>
  );
}
