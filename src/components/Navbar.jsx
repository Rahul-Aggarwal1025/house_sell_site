import { useState, useEffect } from 'react';
import logoIcon from '../assets/logo_icon.png';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menu drawer when viewport expands beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close mobile drawer
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'floor-plan', label: 'Floor Plan' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Inquire' }
  ];

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container navbar">
          {/* Logo Branding */}
          <a 
            href="#home" 
            className="logo" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img 
              src={logoIcon} 
              alt="Sunrise Estate Logo" 
              style={{ 
                height: scrolled ? '56px' : '74px', 
                width: 'auto',
                transition: 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                display: 'block',
                mixBlendMode: 'multiply'
              }} 
            />
          </a>

          {/* Desktop Navigation Links (Hidden on mobile via CSS) */}
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={currentPage === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger Button Trigger (Visible only on mobile screens) */}
          <button 
            className={`nav-hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop Layer */}
      <div 
        className={`mobile-nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className={currentPage === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
