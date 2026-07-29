import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui/Button';
import { Container, Section } from '../components/ui/Section';
import { Icon } from '../components/ui/Icon';
import { Checkbox, ChoiceField, SelectField, TextArea, TextField } from '../components/ui/Field';
import { services } from '../data/services';
import { site, waLink } from '../lib/site';
import { isFormBackendReady, submitForm, toWhatsAppMessage, type SubmitState } from '../lib/forms';
import { useSeo } from '../lib/seo';
import s from './Cotizacion.module.css';

const frecuencias = [
  { value: 'Diaria', label: 'Diaria' },
  { value: 'Semanal', label: 'Semanal' },
  { value: 'Quincenal', label: 'Quincenal' },
  { value: 'Mensual', label: 'Mensual' },
  { value: 'Una sola vez', label: 'Una sola vez' },
];

const ubicaciones = [
  { value: 'CABA', label: 'CABA' },
  { value: 'GBA Norte', label: 'GBA Norte' },
  { value: 'GBA Oeste', label: 'GBA Oeste' },
  { value: 'GBA Sur', label: 'GBA Sur' },
];

type Form = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  frecuencia: string;
  tamano: string;
  ubicacion: string;
  mensaje: string;
};

const empty: Form = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  frecuencia: '',
  tamano: '',
  ubicacion: '',
  mensaje: '',
};

export function Cotizacion() {
  useSeo({
    title: 'Solicitar presupuesto',
    description:
      'Pedí un presupuesto sin cargo para tu consorcio, oficina, industria o final de obra. Respondemos con una propuesta personalizada en 24 horas hábiles.',
    path: '/cotizacion',
  });

  const [params] = useSearchParams();
  const preselected = params.get('servicio') ?? '';

  const [form, setForm] = useState<Form>({
    ...empty,
    servicio: services.some((sv) => sv.slug === preselected) ? preselected : '',
  });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof Form | 'consent', string>>>({});

  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /** Nombres legibles para el mail y el mensaje de WhatsApp. */
  const readable = () => {
    const servicio = services.find((sv) => sv.slug === form.servicio)?.title ?? form.servicio;
    return {
      Nombre: form.nombre,
      Empresa: form.empresa,
      Email: form.email,
      Teléfono: form.telefono,
      Servicio: servicio,
      Frecuencia: form.frecuencia,
      'Tamaño estimado': form.tamano,
      Ubicación: form.ubicacion,
      Detalle: form.mensaje,
    };
  };

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.nombre.trim()) next.nombre = 'Necesitamos un nombre para responderle.';
    if (!form.email.trim() && !form.telefono.trim()) {
      next.email = 'Dejanos un mail o un teléfono para poder contestarte.';
    } else if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      next.email = 'Revisá el formato del correo.';
    }
    if (!form.servicio) next.servicio = 'Elegí el servicio que necesitás.';
    if (!form.frecuencia) next.frecuencia = 'Indicá con qué frecuencia lo necesitás.';
    if (!form.ubicacion) next.ubicacion = 'Indicá la zona.';
    if (!consent) next.consent = 'Necesitamos tu conformidad para tratar los datos.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setState('sending');
    const result = await submitForm({
      subject: `Nuevo pedido de presupuesto — ${form.nombre}`,
      fields: readable(),
    });
    setState(result);
    if (result === 'sent') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const waFallback = waLink(toWhatsAppMessage('Pedido de presupuesto', readable()));

  if (state === 'sent') {
    return (
      <Section>
        <Container narrow>
          <div className={s.success}>
            <span className={s.successIcon}>
              <Icon name="check" size={34} />
            </span>
            <h1>Recibimos su consulta</h1>
            <p>
              Gracias por escribirnos, <strong>{form.nombre}</strong>. Le vamos a responder con una propuesta
              personalizada dentro de las <strong>24 horas hábiles</strong>.
            </p>
            <p className={s.successNote}>
              Si necesita una respuesta más rápida, escribanos directamente por WhatsApp al {site.phoneDisplay}.
            </p>
            <div className={s.successActions}>
              <Button href={waLink(`Hola ${site.name}, acabo de enviar una solicitud de presupuesto.`)} icon="whatsapp">
                Abrir WhatsApp
              </Button>
              <Button to="/" variant="outline">
                Volver al inicio
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Presupuesto sin cargo"
        title="Contános qué necesitás"
        lead="Completá el formulario con los datos básicos del lugar. Con eso podemos dimensionar la dotación y enviarte una propuesta concreta en 24 horas hábiles."
      />

      <Section>
        <Container>
          <div className={s.layout}>
            <form className={s.form} onSubmit={onSubmit} noValidate>
              <fieldset className={s.group}>
                <legend className={s.legend}>
                  <span className={s.legendNum}>1</span> Sobre el servicio
                </legend>

                <SelectField
                  id="servicio"
                  label="Tipo de servicio requerido"
                  required
                  value={form.servicio}
                  onChange={set('servicio')}
                  error={errors.servicio}
                  placeholder="Elegí un servicio"
                  options={services.map((sv) => ({ value: sv.slug, label: sv.title }))}
                />

                <ChoiceField
                  id="frecuencia"
                  label="Frecuencia deseada"
                  required
                  value={form.frecuencia}
                  onChange={set('frecuencia')}
                  error={errors.frecuencia}
                  options={frecuencias}
                />

                <TextField
                  id="tamano"
                  label="Tamaño estimado del lugar"
                  hint="Metros cuadrados, cantidad de pisos, oficinas o unidades. Un número aproximado alcanza."
                  value={form.tamano}
                  onChange={set('tamano')}
                  placeholder="Ej.: 450 m² · 3 pisos · 12 unidades"
                />

                <ChoiceField
                  id="ubicacion"
                  label="Ubicación"
                  required
                  value={form.ubicacion}
                  onChange={set('ubicacion')}
                  error={errors.ubicacion}
                  options={ubicaciones}
                />
              </fieldset>

              <fieldset className={s.group}>
                <legend className={s.legend}>
                  <span className={s.legendNum}>2</span> Cómo te contactamos
                </legend>

                <div className={s.row2}>
                  <TextField
                    id="nombre"
                    label="Nombre y apellido"
                    required
                    autoComplete="name"
                    value={form.nombre}
                    onChange={set('nombre')}
                    error={errors.nombre}
                  />
                  <TextField
                    id="empresa"
                    label="Empresa o consorcio"
                    autoComplete="organization"
                    value={form.empresa}
                    onChange={set('empresa')}
                    placeholder="Opcional"
                  />
                </div>

                <div className={s.row2}>
                  <TextField
                    id="email"
                    type="email"
                    label="Correo electrónico"
                    autoComplete="email"
                    value={form.email}
                    onChange={set('email')}
                    error={errors.email}
                  />
                  <TextField
                    id="telefono"
                    type="tel"
                    label="Teléfono / WhatsApp"
                    autoComplete="tel"
                    value={form.telefono}
                    onChange={set('telefono')}
                  />
                </div>

                <TextArea
                  id="mensaje"
                  label="Detalle adicional"
                  value={form.mensaje}
                  onChange={set('mensaje')}
                  placeholder="Horarios preferidos, particularidades del lugar, fecha de inicio estimada…"
                  rows={4}
                />
              </fieldset>

              <div className={s.consent} data-error={errors.consent ? '' : undefined}>
                <Checkbox id="consent" checked={consent} onChange={(v) => { setConsent(v); setErrors((e) => ({ ...e, consent: undefined })); }}>
                  Autorizo a {site.legalName} a tratar mis datos con el fin de responder esta consulta, conforme a la{' '}
                  <a href="/privacidad">política de privacidad</a> y a la Ley 25.326.
                </Checkbox>
                {errors.consent && (
                  <p className={s.consentError} role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              {state === 'error' && (
                <p className={s.alert} role="alert">
                  No pudimos enviar la consulta. Probá de nuevo o escribinos directamente por WhatsApp.
                </p>
              )}

              {state === 'unconfigured' && (
                <p className={s.alert} role="alert">
                  El envío por mail todavía no está configurado en este sitio. Podés enviarnos los mismos datos por
                  WhatsApp con el botón de abajo.
                </p>
              )}

              <div className={s.submitRow}>
                <Button type="submit" variant="accent" size="lg" icon="badge" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
                </Button>
                <Button href={waFallback} variant="outline" size="lg" icon="whatsapp">
                  Enviar por WhatsApp
                </Button>
              </div>

              {!isFormBackendReady() && (
                <p className={s.devNote}>
                  Nota para el desarrollador: configurá <code>VITE_WEB3FORMS_KEY</code> en <code>.env</code> para
                  habilitar el envío por mail.
                </p>
              )}
            </form>

            <aside className={s.aside}>
              <div className={s.asideCard}>
                <h2>Preferís hablar</h2>
                <p>Si es más cómodo, escribinos o llamanos y lo resolvemos en el momento.</p>
                <ul className={s.contactList}>
                  <li>
                    <Icon name="whatsapp" size={19} />
                    <a href={waLink()} target="_blank" rel="noopener noreferrer">
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <Icon name="mail" size={19} />
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <Icon name="clock" size={19} />
                    <span>{site.hours}</span>
                  </li>
                </ul>
              </div>

              <div className={s.asideList}>
                <h2>Qué pasa después</h2>
                <ol>
                  <li>
                    <strong>Revisamos su consulta</strong>
                    <span>Un asesor comercial la analiza el mismo día hábil.</span>
                  </li>
                  <li>
                    <strong>Coordinamos una visita</strong>
                    <span>Sin cargo, para servicios permanentes.</span>
                  </li>
                  <li>
                    <strong>Enviamos la propuesta</strong>
                    <span>Con dotación, frecuencia y precio detallados.</span>
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
