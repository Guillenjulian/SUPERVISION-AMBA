import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Section';
import { site, waLink } from '../lib/site';
import s from './CtaBand.module.css';

type Props = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = '¿Busca un presupuesto a la medida de su presupuesto operativo?',
  text = 'Escríbanos hoy mismo por WhatsApp o complete nuestro formulario. Le responderemos con una propuesta personalizada antes de las 24 horas hábiles.',
}: Props) {
  return (
    <section className={s.band}>
      <Container>
        <div className={s.box} data-reveal>
          <div className={s.copy}>
            <h2 className={s.title}>{title}</h2>
            <p className={s.text}>{text}</p>
          </div>
          <div className={s.actions}>
            <Button
              href={waLink(`Hola ${site.name}, quisiera hablar con un asesor comercial.`)}
              variant="accent"
              size="lg"
              icon="whatsapp"
            >
              Chatear con un asesor
            </Button>
            <Button to="/cotizacion" variant="ghost" size="lg" iconRight="arrow">
              Completar formulario
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
