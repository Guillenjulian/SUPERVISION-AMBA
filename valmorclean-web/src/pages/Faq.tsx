import { useEffect } from 'react';
import { PageHero } from '../components/PageHero';
import { Accordion } from '../components/ui/Accordion';
import { Container, Section } from '../components/ui/Section';
import { CtaBand } from '../sections/CtaBand';
import { faqs } from '../data/faq';
import { useSeo } from '../lib/seo';

/**
 * Inyecta el structured data de FAQPage mientras esta ruta está montada.
 * Google lo usa para mostrar las preguntas desplegables en los resultados.
 */
function useFaqSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
}

export function Faq() {
  useSeo({
    title: 'Preguntas frecuentes',
    description:
      'Resolvemos las dudas más comunes sobre nuestros servicios de limpieza: insumos, frecuencias, seguros del personal, plazos de contrato, formas de pago y zonas de cobertura.',
    path: '/preguntas-frecuentes',
  });
  useFaqSchema();

  return (
    <>
      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Todo lo que suelen preguntarnos"
        lead="Si su duda no está en esta lista, escríbanos por WhatsApp y la respondemos en el momento."
      />

      <Section>
        <Container narrow>
          <Accordion items={faqs} />
        </Container>
      </Section>

      <CtaBand
        title="¿Le quedó alguna duda sin responder?"
        text="Un asesor comercial puede resolverla por WhatsApp o coordinar una visita al lugar, sin cargo ni compromiso."
      />
    </>
  );
}
