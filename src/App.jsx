import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specifications from './components/Specifications';
import InteractiveMap from './components/InteractiveMap';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

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

  // Helper function to render the active view/page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} />;
      case 'floor-plan':
        return (
          <div style={{ paddingTop: '100px' }}>
            <InteractiveMap />
          </div>
        );
      case 'specifications':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Specifications />
          </div>
        );
      case 'gallery':
        return (
          <div style={{ paddingTop: '100px' }}>
            <Gallery />
          </div>
        );
      case 'contact':
        return (
          <div style={{ paddingTop: '100px' }}>
            <ContactForm />
          </div>
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main style={{ minHeight: '80vh' }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
