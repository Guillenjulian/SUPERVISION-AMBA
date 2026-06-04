import { useEffect, useState } from 'react';
import { SupervisionForm } from '../components/form';
import { ConfigWarning } from '../components/feedback/ConfigWarning';
import { FormError } from '../components/feedback/FormError';
import { SubmitButton } from '../components/feedback/SubmitButton';
import { SuccessScreen } from '../components/feedback/SuccessScreen';
import { AppLayout } from '../components/layout/AppLayout';
import { useSupervisionForm } from '../hooks/useSupervisionForm';
import { useSupervisionSubmit } from '../hooks/useSupervisionSubmit';
import { CLIENTES, SUCURSALES, SUPERVISORES } from '../constants';

export function SupervisionPage() {
  const [ready, setReady] = useState(false);
  const { form, update, setCliente, reset } = useSupervisionForm();
  const { enviado, enviando, error, submit, resetSubmit } = useSupervisionSubmit();
  

  useEffect(() => {
    setReady(true);
  }, []);

  // Prefill demo values so the login screen is skipped for quick backend testing
  useEffect(() => {
    if (!form.supervisor) {
      update('supervisor', SUPERVISORES && SUPERVISORES.length ? SUPERVISORES[0] : 'Demo');
    }
    if (!form.cliente) {
      setCliente(CLIENTES && CLIENTES.length ? CLIENTES[0] : 'Demo Cliente');
    }
    if (!form.sucursal) {
      update('sucursal', SUCURSALES && SUCURSALES.length ? SUCURSALES[0] : 'Demo Sucursal');
    }
  }, []);

  const handleNewSupervision = () => {
    resetSubmit();
    reset();
  };

  if (enviado) {
    return <SuccessScreen form={form} onNew={handleNewSupervision} />;
  }
  return (
    <AppLayout visible={ready}>
      <SupervisionForm form={form} onUpdate={update} onClienteChange={setCliente} />
      <ConfigWarning />
      <FormError message={error} />
      <SubmitButton enviando={enviando} onClick={() => submit(form)} />
    </AppLayout>
  );
}
