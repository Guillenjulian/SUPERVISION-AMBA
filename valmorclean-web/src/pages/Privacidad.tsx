import { PageHero } from '../components/PageHero';
import { Container, Section } from '../components/ui/Section';
import { site } from '../lib/site';
import { useSeo } from '../lib/seo';
import s from './Privacidad.module.css';

/**
 * ⚠️ Texto base, no asesoramiento legal.
 *
 * Cubre lo que exige la Ley 25.326 para un sitio que recolecta datos por
 * formularios (finalidad, destinatario, derechos del titular, contacto). Antes
 * de publicar conviene que lo revise el estudio contable o legal de la empresa,
 * y completar el domicilio legal donde está indicado.
 */
export function Privacidad() {
  useSeo({
    title: 'Política de privacidad y términos de uso',
    description:
      'Cómo trata Valmor Clean SRL los datos personales recolectados a través del sitio, conforme a la Ley 25.326 de Protección de Datos Personales.',
    path: '/privacidad',
  });

  return (
    <>
      <PageHero
        eyebrow="Legales"
        title="Privacidad y términos de uso"
        lead={`Cómo tratamos los datos que nos deja a través de este sitio, conforme a la Ley 25.326 de Protección de Datos Personales.`}
      />

      <Section>
        <Container narrow>
          <article className={s.doc}>
            <p className={s.updated}>Última actualización: julio de 2026</p>

            <h2 id="responsable">1. Responsable del tratamiento</h2>
            <p>
              El responsable de la base de datos es <strong>{site.legalName}</strong>, CUIT {site.cuit}, con domicilio
              legal en la Ciudad Autónoma de Buenos Aires, Argentina. Para cualquier consulta vinculada al tratamiento
              de sus datos puede escribirnos a <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2 id="datos">2. Qué datos recolectamos</h2>
            <p>Este sitio recolecta únicamente los datos que usted nos envía de forma voluntaria:</p>
            <ul>
              <li>
                <strong>Formulario de presupuesto:</strong> nombre, empresa o consorcio, correo electrónico, teléfono,
                tipo de servicio, frecuencia, tamaño y ubicación del lugar, y el detalle que agregue.
              </li>
              <li>
                <strong>Formulario de postulación:</strong> nombre, teléfono, correo electrónico, puesto de interés,
                zona, experiencia previa y el currículum que adjunte.
              </li>
            </ul>
            <p>
              No utilizamos cookies de seguimiento ni herramientas de publicidad de terceros. Si en el futuro se
              incorpora analítica web, esta política será actualizada antes de su puesta en funcionamiento.
            </p>

            <h2 id="finalidad">3. Para qué los usamos</h2>
            <ul>
              <li>Responder su consulta y elaborar la propuesta comercial solicitada.</li>
              <li>Mantener el contacto durante la prestación del servicio contratado.</li>
              <li>Evaluar postulaciones e incorporarlas a nuestra base de búsquedas laborales.</li>
            </ul>
            <p>
              No usamos sus datos con ninguna otra finalidad, no los comercializamos y no los cedemos a terceros, salvo
              obligación legal o requerimiento de autoridad competente.
            </p>

            <h2 id="conservacion">4. Cuánto tiempo los conservamos</h2>
            <p>
              Las consultas comerciales se conservan mientras dure la relación con el cliente y, luego, por el plazo
              necesario para cumplir obligaciones legales y contables. Los currículums de postulantes se conservan por
              un máximo de veinticuatro meses, salvo que usted solicite su eliminación antes.
            </p>

            <h2 id="derechos">5. Sus derechos</h2>
            <p>
              Usted puede solicitar en cualquier momento el acceso, la rectificación, la actualización o la supresión de
              sus datos personales, de forma gratuita, escribiendo a{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <p className={s.note}>
              El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
              gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto,
              conforme lo establecido en el artículo 14, inciso 3 de la Ley 25.326.
            </p>
            <p className={s.note}>
              La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene
              la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus
              derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
            </p>

            <h2 id="seguridad">6. Seguridad</h2>
            <p>
              Adoptamos medidas técnicas y organizativas razonables para proteger los datos que nos confía. El envío de
              los formularios se realiza sobre conexión cifrada (HTTPS). Ningún sistema es infalible, por lo que le
              recomendamos no incluir en los formularios información sensible que no sea necesaria para su consulta.
            </p>

            <h2 id="terminos">7. Términos de uso</h2>
            <p>
              El contenido de este sitio —textos, imágenes, logotipo e identidad visual— es propiedad de{' '}
              {site.legalName} y no puede ser reproducido sin autorización previa por escrito.
            </p>
            <p>
              La información publicada sobre servicios, coberturas y plazos tiene carácter informativo y no constituye
              una oferta contractual. Las condiciones definitivas de cada servicio son las que se establecen en el
              presupuesto y el contrato firmado entre las partes.
            </p>
            <p>
              Los presupuestos enviados tienen la vigencia indicada en cada propuesta. Ante cualquier discrepancia entre
              el contenido de este sitio y el de un presupuesto firmado, prevalece este último.
            </p>

            <h2 id="contacto">8. Contacto</h2>
            <p>
              Ante cualquier duda sobre esta política puede escribirnos a{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> o comunicarse al {site.phoneDisplay} en el horario de{' '}
              {site.hours.toLowerCase()}.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
