export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e, page) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-logo" style={{ letterSpacing: '0.15em', fontWeight: '600' }}>SUNRISE ESTATE</div>
        
        {/* Simple Footer Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '15px 0', flexWrap: 'wrap' }}>
          <a 
            href="#home" 
            onClick={(e) => handleLink(e, 'home')}
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            Home
          </a>
          <a 
            href="#floor-plan" 
            onClick={(e) => handleLink(e, 'floor-plan')}
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            Floor Plan
          </a>
          <a 
            href="#specifications" 
            onClick={(e) => handleLink(e, 'specifications')}
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            Specifications
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => handleLink(e, 'gallery')}
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            Gallery
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleLink(e, 'contact')}
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            Inquire
          </a>
        </div>

        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: 'var(--space-2) 0' }}>
          Sector 123, Mohali, Punjab | aggarwal.munish@gmail.com | +91 9318051550
        </p>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0' }}>
          &copy; {currentYear} Sunrise Estate. All Rights Reserved. RERA Registered Brokerage.
        </p>
      </div>
    </footer>
  );
}
