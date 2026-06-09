import { useEffect, useState } from 'react';
import { SupervisionForm } from '../components/form';
import { ConfigWarning } from '../components/feedback/ConfigWarning';
import { FormError } from '../components/feedback/FormError';
import { SubmitButton } from '../components/feedback/SubmitButton';
import { SuccessScreen } from '../components/feedback/SuccessScreen';
import { AppLayout } from '../components/layout/AppLayout';
import { ObjetivosStep } from '../components/objetivos/ObjetivosStep';
import { useSupervisionForm } from '../hooks/useSupervisionForm';
import { useSupervisionSubmit } from '../hooks/useSupervisionSubmit';
import type { Objetivo } from '../hooks/useObjetivos';

type Paso = 'objetivos' | 'formulario';

export function SupervisionPage() {
  const [ready, setReady] = useState(false);
  const [paso, setPaso] = useState<Paso>('objetivos');
  const { form, update, setCliente, reset } = useSupervisionForm();
  const { enviado, enviando, error, submit, resetSubmit } = useSupervisionSubmit();

  useEffect(() => { setReady(true); }, []);

  const handleSeleccionarObjetivo = (objetivo: Objetivo) => {
    // Pre-llenar el objetivo seleccionado en el form
    update('sucursal', objetivo.nombre);
    // Intentar detectar el cliente desde el nombre
    const nombre = objetivo.nombre.toLowerCase();
    if (nombre.includes('credicoop')) setCliente('Banco Credicoop');
    else if (nombre.includes('columbia')) setCliente('Banco Columbia');
    else if (nombre.includes('galicia')) setCliente('Banco Galicia');
    else if (nombre.includes('patagonia')) setCliente('Banco Patagonia');
    else if (nombre.includes('coinag')) setCliente('Banco Coinag');
    setPaso('formulario');
  };

  const handleVolver = () => {
    setPaso('objetivos');
  };

  const handleNewSupervision = () => {
    resetSubmit();
    reset();
    setPaso('objetivos');
  };

  if (enviado) {
    return <SuccessScreen form={form} onNew={handleNewSupervision} />;
  }

  return (
    <AppLayout visible={ready}>
      {paso === 'objetivos' ? (
        <ObjetivosStep onSeleccionar={handleSeleccionarObjetivo} />
      ) : (
        <>
          <button onClick={handleVolver} style={styles.btnVolver}>
            ← Volver a objetivos
          </button>
          <SupervisionForm form={form} onUpdate={update} onClienteChange={setCliente} />
          <ConfigWarning />
          <FormError message={error} />
          <SubmitButton enviando={enviando} onClick={() => submit(form)} />
        </>
      )}
    </AppLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  btnVolver: {
    margin: '16px 16px 0',
    padding: '10px 16px',
    background: 'transparent',
    border: '1.5px solid #ccc',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    color: '#555',
    fontWeight: 600,
  },
};
