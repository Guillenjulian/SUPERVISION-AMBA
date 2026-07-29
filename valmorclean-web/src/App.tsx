import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { useReveal } from './lib/useReveal';

import { Home } from './pages/Home';
import { Nosotros } from './pages/Nosotros';
import { Servicios } from './pages/Servicios';
import { Cotizacion } from './pages/Cotizacion';
import { Faq } from './pages/Faq';
import { Trabaja } from './pages/Trabaja';
import { Privacidad } from './pages/Privacidad';
import { NotFound } from './pages/NotFound';

/** Al cambiar de ruta vuelve arriba, salvo que el link apunte a un ancla. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export function App() {
  const { pathname } = useLocation();
  useReveal(pathname);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <ScrollManager />
      <Header />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/preguntas-frecuentes" element={<Faq />} />
          <Route path="/trabaja-con-nosotros" element={<Trabaja />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
