import { useObjetivos, type Objetivo } from '../../hooks/useObjetivos';

interface Props {
  onSeleccionar: (objetivo: Objetivo) => void;
}

export function ObjetivosStep({ onSeleccionar }: Props) {
  const { cercanos, gpsError, cargando, posicion } = useObjetivos();

  const formatDistancia = (m: number) => {
    if (m < 1000) return `${Math.round(m)} m`;
    return `${(m / 1000).toFixed(2)} km`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.titulo}>📍 Objetivos cercanos</h2>
        <p style={styles.subtitulo}>
          {gpsError
            ? `⚠️ ${gpsError}`
            : !posicion
            ? 'Obteniendo tu ubicación...'
            : 'Objetivos dentro de 500m'}
        </p>
      </div>

      {cargando ? (
        <div style={styles.estado}>
          <div style={styles.spinner} />
          <p>Cargando objetivos...</p>
        </div>
      ) : gpsError ? (
        <div style={styles.estado}>
          <span style={{ fontSize: 48 }}>📵</span>
          <p style={{ color: '#c0392b', fontWeight: 600 }}>{gpsError}</p>
          <p style={{ color: '#888', fontSize: 14 }}>
            Habilitá el GPS para ver los objetivos cercanos
          </p>
        </div>
      ) : !posicion ? (
        <div style={styles.estado}>
          <div style={styles.spinner} />
          <p>Buscando ubicación GPS...</p>
        </div>
      ) : cercanos.length === 0 ? (
        <div style={styles.estado}>
          <span style={{ fontSize: 48 }}>🏦</span>
          <p style={{ fontWeight: 600, color: '#555' }}>
            No hay objetivos cerca
          </p>
          <p style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>
            Acercate a menos de 500m de un banco o sede para iniciar la supervisión
          </p>
        </div>
      ) : (
        <div style={styles.lista}>
          {cercanos.map((obj) => (
            <button
              key={obj.id}
              style={styles.card}
              onClick={() => onSeleccionar(obj)}
            >
              <div style={styles.cardInfo}>
                <span style={styles.cardNombre}>{obj.nombre}</span>
                <span style={styles.cardDistancia}>
                  📍 {formatDistancia(obj.distancia!)}
                </span>
              </div>
              <span style={styles.btnIniciar}>Iniciar →</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '24px 16px',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 800,
    color: '#7b1a2e',
    margin: 0,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    margin: '4px 0 0',
  },
  estado: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: '40px 16px',
    textAlign: 'center',
    color: '#555',
  },
  spinner: {
    width: 36,
    height: 36,
    border: '4px solid #eee',
    borderTop: '4px solid #7b1a2e',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    background: '#fff',
    border: '1.5px solid #e0e0e0',
    borderRadius: 12,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  cardNombre: {
    fontWeight: 700,
    fontSize: 16,
    color: '#222',
  },
  cardDistancia: {
    fontSize: 13,
    color: '#27ae60',
    fontWeight: 600,
  },
  btnIniciar: {
    background: '#7b1a2e',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
};
