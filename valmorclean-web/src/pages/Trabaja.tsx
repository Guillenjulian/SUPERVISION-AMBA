import { useState, type FormEvent } from 'react';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/ui/Button';
import { Container, Section, SectionHeading } from '../components/ui/Section';
import { Icon, type IconName } from '../components/ui/Icon';
import { Checkbox, FileField, SelectField, TextArea, TextField } from '../components/ui/Field';
import { site, waLink } from '../lib/site';
import { isFormBackendReady, submitForm, toWhatsAppMessage, type SubmitState } from '../lib/forms';
import { useSeo } from '../lib/seo';
import s from './Trabaja.module.css';

const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'badge',
    title: 'Trabajo en blanco',
    text: 'Relación de dependencia, ART, seguro de accidentes personales y aportes al día desde el primer día.',
  },
  {
    icon: 'clock',
    title: 'Horarios previsibles',
    text: 'Objetivos fijos y turnos estables. Sabés dónde y en qué horario trabajás cada semana.',
  },
  {
    icon: 'users',
    title: 'Capacitación continua',
    text: 'Formación en uso de productos, maquinaria y seguridad, incluida la habilitación para trabajo en altura.',
  },
];

const puestos = [
  { value: 'Operario/a de limpieza', label: 'Operario/a de limpieza' },
  { value: 'Encargado/a de edificio', label: 'Encargado/a de edificio' },
  { value: 'Vidrios en altura', label: 'Especialista en vidrios en altura' },
  { value: 'Final de obra', label: 'Final de obra' },
  { value: 'Supervisor/a', label: 'Supervisor/a' },
  { value: 'Administración', label: 'Administración' },
];

const zonas = ['CABA', 'GBA Norte', 'GBA Oeste', 'GBA Sur'];

type Form = {
  nombre: string;
  email: string;
  telefono: string;
  puesto: string;
  zona: string;
  experiencia: string;
};

export function Trabaja() {
  useSeo({
    title: 'Trabajá con nosotros',
    description:
      'Sumate al equipo de Valmor Clean. Trabajo en blanco, con ART y seguros vigentes, en CABA y GBA. Enviá tu CV y te contactamos.',
    path: '/trabaja-con-nosotros',
  });

  const [form, setForm] = useState<Form>({
    nombre: '',
    email: '',
    telefono: '',
    puesto: '',
    zona: '',
    experiencia: '',
  });
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof Form | 'consent' | 'cv', string>>>({});

  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const readable = () => ({
    Nombre: form.nombre,
    Email: form.email,
    Teléfono: form.telefono,
    'Puesto de interés': form.puesto,
    Zona: form.zona,
    Experiencia: form.experiencia,
  });

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.nombre.trim()) next.nombre = 'Ingresá tu nombre y apellido.';
    if (!form.telefono.trim()) next.telefono = 'Necesitamos un teléfono para contactarte.';
    if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      next.email = 'Revisá el formato del correo.';
    }
    if (!form.puesto) next.puesto = 'Elegí el puesto que te interesa.';
    if (!form.zona) next.zona = 'Indicá en qué zona podés trabajar.';
    if (cv && cv.size > 5 * 1024 * 1024) next.cv = 'El archivo supera los 5 MB.';
    if (!consent) next.consent = 'Necesitamos tu conformidad para tratar los datos.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState('sending');
    const result = await submitForm({
      subject: `Postulación — ${form.nombre} (${form.puesto})`,
      fields: readable(),
      file: cv ? { field: 'cv', value: cv } : null,
    });
    setState(result);
    if (result === 'sent') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <PageHero
        eyebrow="Recursos humanos"
        title="Trabajá con nosotros"
        lead="Buscamos personas responsables y con ganas de crecer dentro de un equipo formal. Si te interesa sumarte, dejanos tus datos."
      />

      {/* --- Cultura y beneficios --- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Por qué trabajar acá"
            title="Un equipo formal, con condiciones claras"
            lead="Somos una empresa constituida como SRL: eso significa contrato, cobertura y estabilidad reales, no changas."
            align="center"
          />
          <div className={s.benefits}>
            {benefits.map((b, i) => (
              <article key={b.title} data-reveal data-reveal-delay={i * 90}>
                <span className={s.benefitIcon}>
                  <Icon name={b.icon} size={24} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Formulario de postulación --- */}
      <Section tone="alt" id="postulacion">
        <Container narrow>
          {state === 'sent' ? (
            <div className={s.success}>
              <span className={s.successIcon}>
                <Icon name="check" size={32} />
              </span>
              <h2>Recibimos tu postulación</h2>
              <p>
                Gracias, <strong>{form.nombre}</strong>. Guardamos tus datos en nuestra base y te contactamos cuando se
                abra una búsqueda que coincida con tu perfil.
              </p>
              <Button to="/" variant="outline">
                Volver al inicio
              </Button>
            </div>
          ) : (
            <>
              <SectionHeading eyebrow="Bolsa de empleo" title="Dejanos tus datos" align="center" />

              <form className={s.form} onSubmit={onSubmit} noValidate>
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
                    id="telefono"
                    type="tel"
                    label="Teléfono / WhatsApp"
                    required
                    autoComplete="tel"
                    value={form.telefono}
                    onChange={set('telefono')}
                    error={errors.telefono}
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
                    placeholder="Opcional"
                  />
                  <SelectField
                    id="zona"
                    label="Zona en la que podés trabajar"
                    required
                    value={form.zona}
                    onChange={set('zona')}
                    error={errors.zona}
                    options={zonas.map((z) => ({ value: z, label: z }))}
                  />
                </div>

                <SelectField
                  id="puesto"
                  label="Puesto de interés"
                  required
                  value={form.puesto}
                  onChange={set('puesto')}
                  error={errors.puesto}
                  options={puestos}
                />

                <TextArea
                  id="experiencia"
                  label="Experiencia previa"
                  value={form.experiencia}
                  onChange={set('experiencia')}
                  placeholder="Contanos brevemente dónde trabajaste y qué tareas hacías."
                  rows={4}
                />

                <FileField
                  id="cv"
                  label="Currículum (PDF o Word, hasta 5 MB)"
                  accept=".pdf,.doc,.docx"
                  fileName={cv?.name}
                  onChange={(f) => {
                    setCv(f);
                    setErrors((e) => ({ ...e, cv: undefined }));
                  }}
                  error={errors.cv}
                  hint="Opcional. Si no tenés CV a mano, completá el campo de experiencia."
                />

                <div className={s.consent} data-error={errors.consent ? '' : undefined}>
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onChange={(v) => {
                      setConsent(v);
                      setErrors((e) => ({ ...e, consent: undefined }));
                    }}
                  >
                    Autorizo a {site.legalName} a incorporar mis datos y mi CV a su base de postulantes, conforme a la{' '}
                    <a href="/privacidad">política de privacidad</a> y a la Ley 25.326.
                  </Checkbox>
                  {errors.consent && (
                    <p className={s.consentError} role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {(state === 'error' || state === 'unconfigured') && (
                  <p className={s.alert} role="alert">
                    {state === 'unconfigured'
                      ? 'El envío por mail todavía no está configurado en este sitio. Escribinos por WhatsApp y te pedimos el CV por ahí.'
                      : 'No pudimos enviar la postulación. Probá de nuevo o escribinos por WhatsApp.'}
                  </p>
                )}

                <div className={s.submitRow}>
                  <Button type="submit" variant="accent" size="lg" icon="upload" disabled={state === 'sending'}>
                    {state === 'sending' ? 'Enviando…' : 'Enviar postulación'}
                  </Button>
                  <Button
                    href={waLink(toWhatsAppMessage('Postulación', readable()))}
                    variant="outline"
                    size="lg"
                    icon="whatsapp"
                  >
                    Postularme por WhatsApp
                  </Button>
                </div>

                {!isFormBackendReady() && (
                  <p className={s.devNote}>
                    Nota para el desarrollador: configurá <code>VITE_WEB3FORMS_KEY</code> en <code>.env</code>. El
                    adjunto de CV requiere un plan de Web3Forms que admita archivos.
                  </p>
                )}
              </form>
            </>
          )}
        </Container>
      </Section>

      {/* --- LinkedIn --- */}
      <Section tone="deep" tight>
        <Container>
          <div className={s.linkedin}>
            <div>
              <h2>Seguinos en LinkedIn</h2>
              <p>Publicamos ahí nuestras búsquedas abiertas y novedades de la empresa.</p>
            </div>
            <Button href={site.social.linkedin} variant="white" size="lg" icon="linkedin">
              Ver perfil corporativo
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
