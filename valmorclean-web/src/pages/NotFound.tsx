import { Button } from '../components/ui/Button';
import { Container, Section } from '../components/ui/Section';
import { useSeo } from '../lib/seo';
import s from './NotFound.module.css';

export function NotFound() {
  useSeo({
    title: 'Página no encontrada',
    description: 'La página que buscás no existe o cambió de dirección.',
    path: '/404',
  });

  return (
    <Section>
      <Container narrow>
        <div className={s.box}>
          <p className={s.code}>404</p>
          <h1>No encontramos esta página</h1>
          <p className={s.text}>
            Puede que el enlace esté desactualizado o que la dirección tenga un error. Desde el inicio vas a poder
            llegar a todo lo demás.
          </p>
          <div className={s.actions}>
            <Button to="/" icon="arrow">
              Volver al inicio
            </Button>
            <Button to="/servicios" variant="outline">
              Ver servicios
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
