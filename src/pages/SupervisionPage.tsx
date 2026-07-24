import { useState } from 'react';
import { SupervisionForm } from '../components/form';
import { ConfigWarning } from '../components/feedback/ConfigWarning';
import { FormError } from '../components/feedback/FormError';
import { SubmitButton } from '../components/feedback/SubmitButton';
import { SuccessScreen } from '../components/feedback/SuccessScreen';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginScreen } from '../components/layout/LoginScreen';
import { ObjetivosStep } from '../components/objetivos/ObjetivosStep';
import { InicioTurnoScreen } from '../components/turno/InicioTurnoScreen';
import { useAuth } from '../context/AuthContext';
import { useJornada } from '../hooks/useJornada';
import { useSupervisionForm } from '../hooks/useSupervisionForm';
import { useSupervisionSubmit } from '../hooks/useSupervisionSubmit';
import type { Objetivo } from '../hooks/useObjetivos';

type Paso = 'objetivos' | 'formulario';

export function SupervisionPage() {
  const { session, cargando: cargandoAuth, supervisor } = useAuth();
  const { jornadaActiva, cargando: cargandoJornada, iniciarJornada } = useJornada(session?.user?.id);
  const [paso, setPaso] = useState<Paso>('objetivos');
  const { form, update, setCliente, reset } = useSupervisionForm();
  const { enviado, enviando, error, submit, resetSubmit } = useSupervisionSubmit();

  // 1. Cargando sesión
  if (cargandoAuth || (session && cargandoJornada)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🛡️</div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // 2. Sin sesión → login
  if (!session) {
    return <LoginScreen onStart={() => setPaso('objetivos')} />;
  }

  // 3. Con sesión pero sin turno iniciado → pantalla de inicio de turno
  if (!jornadaActiva) {
    return (
      <AppLayout>
        <InicioTurnoScreen
          nombreSupervisor={supervisor ?? 'Supervisor'}
          onIniciar={iniciarJornada}
        />
      </AppLayout>
    );
  }

  // 4. Supervisión enviada → pantalla de éxito
  if (enviado) {
    return (
      <AppLayout>
        <SuccessScreen form={form} onNew={() => { resetSubmit(); reset(); setPaso('objetivos'); }} />
      </AppLayout>
    );
  }

  // 5. Flujo normal: objetivos → formulario
  return (
    <AppLayout>
      {paso === 'objetivos' ? (
        <ObjetivosStep
          onSeleccionar={(objetivo: Objetivo) => {
            update('sucursal', objetivo.nombre);
            update('sucursalId', objetivo.sucursal_id);
            update('latInicio', objetivo.lat);
            update('lngInicio', objetivo.lng);
            if (supervisor) update('supervisor', supervisor);
            const n = objetivo.nombre.toLowerCase();
            if (n.includes('credicoop')) setCliente('Banco Credicoop');
            else if (n.includes('columbia')) setCliente('Banco Columbia');
            else if (n.includes('galicia')) setCliente('Banco Galicia');
            else if (n.includes('patagonia')) setCliente('Banco Patagonia');
            else if (n.includes('coinag')) setCliente('Banco Coinag');
            setPaso('formulario');
          }}
        />
      ) : (
        <>
          <button
            onClick={() => setPaso('objetivos')}
            style={{ margin: '16px 0 0', padding: '10px 16px', background: 'transparent', border: '1.5px solid #ccc', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#555', fontWeight: 600 }}
          >
            ← Volver a objetivos
          </button>
          <SupervisionForm form={form} onUpdate={update} onClienteChange={setCliente} />
          <ConfigWarning />
          <FormError message={error} />
          <SubmitButton
            enviando={enviando}
            onClick={() => session?.user?.id && submit(form, session.user.id)}
          />
        </>
      )}
    </AppLayout>
  );
}
