import heroMansion from '../assets/hero_mansion.png';

export default function Hero({ setCurrentPage }) {
  const navItems = [
    {
      id: 'floor-plan',
      title: 'Interactive Layout Plan',
      icon: '🗺️',
      badge: 'Blueprints',
      bullets: [
        'Interactive SVG Hotspots',
        'Ground Floor Mapping',
        'First Floor Coordinates',
        'Tap-to-Expand Gallery'
      ]
    },
    {
      id: 'specifications',
      title: 'Land Records & Specs',
      icon: '📜',
      badge: 'NOC & Registry',
      bullets: [
        'Punjab Government NOC',
        'Certified Plot Size (200 Gaz)',
        'SAS Nagar Land Records',
        'Regularization Receipt Paid'
      ]
    },
    {
      id: 'gallery',
      title: 'Media Gallery Showcase',
      icon: '🖼️',
      badge: 'Media Log',
      bullets: [
        'Plot Front Boundary View',
        'Sector 123 Approach Road',
        'High-Res Room Photos',
        'Interactive Lightbox Set'
      ]
    },
    {
      id: 'contact',
      title: 'Sunrise Estate Inquiries',
      icon: '📞',
      badge: 'Direct Connect',
      bullets: [
        'Direct Owner WhatsApp Line',
        'aggarwal.munish@gmail.com',
        'Phone: +91 93180 51550',
        'Daily Site Visit Booking'
      ]
    }
  ];

  const handleCardClick = (pageId) => {
    if (setCurrentPage) {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section-white" style={{ paddingTop: '150px', paddingBottom: 'var(--space-16)' }}>
      <div className="container anim-fade-up" style={{ maxWidth: '1200px' }}>
        
        {/* Core Split Hero Section */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-12)', 
            alignItems: 'center',
            marginBottom: 'var(--space-16)'
          }}
        >
          {/* Left Side: Presentation Copy */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <span className="section-subtitle" style={{ letterSpacing: '0.25em', display: 'inline-block', marginBottom: '8px' }}>
                Exclusive Plotted Property
              </span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: '500', fontFamily: 'var(--font-serif)', lineHeight: '1.1', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Plot No. 769,<br />Amazon City
              </h1>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  padding: '6px 12px', 
                  borderRadius: '2px', 
                  fontSize: 'var(--fs-xs)', 
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                📍 Sector 123, Mohali, Punjab
              </div>
            </div>

            <p style={{ fontSize: 'var(--fs-md)', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0' }}>
              A prime residential plotted property with a final regularization certificate issued by the Punjab Local Government Kharar authority. Perfectly flat, north-facing, and ready for immediate bespoke luxury construction.
            </p>

            {/* Premium Button Action Group */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
              <button 
                onClick={() => handleCardClick('floor-plan')}
                className="btn btn-primary"
                style={{ padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                🗺️ Explore Floor Plan
              </button>
              <button 
                onClick={() => handleCardClick('specifications')}
                className="btn btn-outline"
                style={{ padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                📄 View Land Records
              </button>
            </div>
          </div>

          {/* Right Side: Magnificent Architectural Visual Frame */}
          <div 
            style={{ 
              flex: '1 1 450px',
              position: 'relative',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '6px'
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
              <img 
                src={heroMansion} 
                alt="Luxury Mansion Architectural Blueprint Visual" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  transition: 'transform 0.5s ease',
                  borderRadius: 'var(--radius-sm)'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              />
              
              {/* Premium Floating Overlay Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#1E252D',
                  color: '#FAF9F6',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: 'var(--shadow-sm)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                ✓ Certified & NOC Approved
              </div>
            </div>
          </div>

        </div>

        {/* Floating Property Statistics strip */}
        <div 
          style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-sm)', 
            padding: 'var(--space-6) var(--space-8)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: 'var(--space-8)', 
            flexWrap: 'wrap',
            marginBottom: 'var(--space-24)',
            position: 'relative'
          }}
        >
          <div style={{ flex: '1 1 180px', borderLeft: '2px solid var(--accent-color)', paddingLeft: '16px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>Registered Owner</span>
            <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', fontWeight: '600', display: 'block', marginTop: '2px' }}>Shalini Aggarwal</strong>
          </div>
          <div style={{ flex: '1 1 180px', borderLeft: '2px solid var(--accent-color)', paddingLeft: '16px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>Plot Size Metric</span>
            <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--accent-color)', fontWeight: '600', display: 'block', marginTop: '2px' }}>167.22 m² (~200 Gaz)</strong>
          </div>
          <div style={{ flex: '1 1 180px', borderLeft: '2px solid var(--accent-color)', paddingLeft: '16px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>Sector / Zone</span>
            <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', fontWeight: '600', display: 'block', marginTop: '2px' }}>Sector 123, Mohali</strong>
          </div>
          <div style={{ flex: '1 1 180px', borderLeft: '2px solid var(--accent-color)', paddingLeft: '16px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>Clearance / NOC</span>
            <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', fontWeight: '600', display: 'block', marginTop: '2px' }}>Kharar Authority</strong>
          </div>
        </div>

        {/* ==========================================================================
            REDESIGNED PORTAL: Clean Asymmetric Horizontal Showcases (No dark grid boxes)
            ========================================================================== */}
        <div style={{ position: 'relative', marginTop: 'var(--space-12)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <span className="section-subtitle">Property Portal</span>
            <h2 style={{ fontSize: 'var(--fs-3xl)', fontWeight: '500', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
              Explore the Sections
            </h2>
            <p style={{ fontSize: 'var(--fs-md)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Select a specialized portal department below to explore interactive blueprints, government clearance NOC records, site photograph captures, or direct owner inquiries.
            </p>
          </div>

          {/* Staggered Alternating Rows List Stack */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--space-4)',
              maxWidth: '950px',
              margin: '0 auto'
            }}
          >
            {navItems.map((item, idx) => {
              const cardIndexString = `0${idx + 1}`;

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-6) var(--space-8)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    position: 'relative',
                    gap: 'var(--space-6)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Part 1: Index Number and Emblem Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flex: '0 0 auto' }}>
                    <span 
                      style={{ 
                        fontSize: 'var(--fs-xl)', 
                        fontWeight: '600', 
                        fontFamily: 'var(--font-serif)', 
                        color: 'var(--accent-color)',
                        opacity: 0.8,
                        minWidth: '32px'
                      }}
                    >
                      {cardIndexString}
                    </span>
                    
                    {/* Vertical Divider Row */}
                    <div style={{ height: '36px', width: '1px', backgroundColor: 'var(--border-color)' }} />
                    
                    <span style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                  </div>

                  {/* Part 2: Department Title & Parameters tag pills */}
                  <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: '600', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0' }}>
                        {item.title}
                      </h3>
                      <span 
                        style={{ 
                          fontSize: '8px', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.08em', 
                          color: 'var(--accent-color)',
                          fontWeight: '700',
                          backgroundColor: 'var(--bg-secondary)',
                          padding: '2px 6px',
                          borderRadius: '2px'
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    
                    {/* Horizontal Pill Tags row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.bullets.map((bullet, bulletIdx) => (
                        <span 
                          key={bulletIdx} 
                          style={{ 
                            fontSize: '9px', 
                            color: 'var(--text-secondary)', 
                            backgroundColor: 'var(--bg-secondary)', 
                            padding: '4px 10px', 
                            borderRadius: '12px',
                            fontWeight: '500',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            border: '1px solid rgba(17, 21, 26, 0.04)'
                          }}
                        >
                          <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>✓</span>
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Part 3: Interactive CTA Action Link */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      flex: '0 0 auto',
                      backgroundColor: 'rgba(166, 125, 30, 0.05)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(166, 125, 30, 0.1)',
                      transition: 'all 0.2s ease',
                      fontSize: '10px', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em', 
                      color: 'var(--accent-color)'
                    }}
                  >
                    <span>Enter Department</span>
                    <span style={{ fontSize: '12px' }}>&rarr;</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
