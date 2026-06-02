export default function Hero({ setCurrentPage }) {
  const navItems = [
    {
      id: 'floor-plan',
      title: 'Interactive Layout Plan',
      description: 'Explore the architectural layout of Plot 769. Click directly on any suite (Bed Room 1, 2, 3) to view coordinates mapping.',
      icon: '🗺️',
      badge: 'Interactive'
    },
    {
      id: 'amenities',
      title: 'Land Records & Specs',
      description: 'Review complete detailed property parameters, Khasra numbers, regularization certificate, and official Punjab government clearances.',
      icon: '📜',
      badge: 'Legal & Specs'
    },
    {
      id: 'gallery',
      title: 'Media Gallery Showcase',
      description: 'Examine high-quality local photograph captures categorizing residential quarters, lobbies, and courts.',
      icon: '🖼️',
      badge: 'Gallery'
    },
    {
      id: 'calculator',
      title: 'Acquisition Calculator',
      description: 'Calculate real-time monthly interest payments, custom down payments, and amortization models in Indian Rupees.',
      icon: '🏦',
      badge: 'Calculator'
    },
    {
      id: 'contact',
      title: 'Sunrise Estate Inquiries',
      description: 'Directly schedule customized VIP site visits on-site in Amazon City with representational brokerage agents.',
      icon: '📞',
      badge: 'Inquire'
    }
  ];

  const handleCardClick = (pageId) => {
    if (setCurrentPage) {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section-white" style={{ paddingTop: '160px', paddingBottom: 'var(--space-16)' }}>
      <div className="container anim-fade-up">
        {/* Core Welcome Banner */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="section-subtitle">Exclusive Plotted Property</span>
          <h1 style={{ marginBottom: 'var(--space-6)', fontWeight: '400', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Plot No. 769, Amazon City
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto var(--space-8) auto', fontSize: 'var(--fs-md)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Sector 123, Jandpur, Mohali, Punjab. A prime residential plotted property with a final regularization certificate issued by the Punjab Local Government Kharar authority. Presented exclusively by <strong>Sunrise Estate</strong>.
          </p>

          {/* Quick Property Stats Panel */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 'var(--space-12)', 
              margin: 'var(--space-8) 0', 
              flexWrap: 'wrap',
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: 'var(--space-6) 0'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Owner</span>
              <strong style={{ fontSize: 'var(--fs-md)', color: 'var(--text-primary)', fontWeight: '500' }}>Shalini Aggarwal</strong>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Plot Size</span>
              <strong style={{ fontSize: 'var(--fs-md)', color: 'var(--accent-color)', fontWeight: '500' }}>167.22 m² (~200 Sq. Yards)</strong>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Revenue Estate</span>
              <strong style={{ fontSize: 'var(--fs-md)', color: 'var(--text-primary)', fontWeight: '500' }}>Jandpur, Kharar</strong>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</span>
              <strong style={{ fontSize: 'var(--fs-md)', color: 'var(--text-primary)', fontWeight: '500' }}>Fully Regularized</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Showcase Navigation Grid (Second Way to Access Pages) */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--fs-lg)', textAlign: 'center', marginBottom: 'var(--space-8)', fontWeight: '500' }}>
            Explore the Property Sections
          </h2>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: 'var(--space-6)' 
            }}
          >
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="skeleton-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: 'var(--space-6)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <span 
                      style={{ 
                        fontSize: '9px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        color: 'var(--accent-color)',
                        border: '1px solid var(--accent-border)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        backgroundColor: 'var(--bg-primary)'
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: '500', marginBottom: 'var(--space-2)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: 'var(--fs-xs)', fontWeight: '600', color: 'var(--accent-color)' }}>
                    Enter Section
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--accent-color)', transition: 'transform 0.2s ease' }}>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
