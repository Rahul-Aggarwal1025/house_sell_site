import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy-load heavy pages — their JS only downloads when the user navigates there
const Specifications = lazy(() => import('./components/Specifications'));
const InteractiveMap = lazy(() => import('./components/InteractiveMap'));
const Gallery       = lazy(() => import('./components/Gallery'));
const ContactForm   = lazy(() => import('./components/ContactForm'));

// Minimal inline fallback — no flash, matches bg color
const PageFallback = () => (
  <div style={{ minHeight: '80vh', backgroundColor: 'var(--bg-primary)' }} />
);

export default function App() {
  
  // Resolve current page view from URL hash on initialization
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'floor-plan', 'specifications', 'gallery', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  // Synchronize state when the user triggers browser Back / Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize URL hash whenever the local state changes
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentPage === 'home') {
      if (window.location.hash !== '') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else if (currentHash !== currentPage) {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  // Prefetch adjacent pages on hover so navigation feels instant
  const prefetch = (page) => {
    if (page === 'gallery')        import('./components/Gallery');
    if (page === 'floor-plan')     import('./components/InteractiveMap');
    if (page === 'specifications') import('./components/Specifications');
    if (page === 'contact')        import('./components/ContactForm');
  };

  // Helper function to render the active view/page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} prefetch={prefetch} />;
      case 'floor-plan':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Suspense fallback={<PageFallback />}>
              <InteractiveMap />
            </Suspense>
          </div>
        );
      case 'specifications':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Suspense fallback={<PageFallback />}>
              <Specifications />
            </Suspense>
          </div>
        );
      case 'gallery':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Suspense fallback={<PageFallback />}>
              <Gallery />
            </Suspense>
          </div>
        );
      case 'contact':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Suspense fallback={<PageFallback />}>
              <ContactForm />
            </Suspense>
          </div>
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} prefetch={prefetch} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} prefetch={prefetch} />
      
      <main style={{ minHeight: '80vh' }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
