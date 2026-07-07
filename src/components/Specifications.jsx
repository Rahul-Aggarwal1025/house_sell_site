import { useState, useEffect } from 'react';
import impMapPdf from '../assets/Imp_map.pdf';

export default function Specifications() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const quickSpecs = [
    { label: 'House Number', value: 'House No. 769', icon: '📍' },
    { label: 'Project Name', value: 'Amazon City', icon: '🏗️' },
    { label: 'Sector Location', value: 'Sector 123 (Mohali)', icon: '🗺️' },
    { label: 'Registered Owner', value: 'Shalini Aggarwal', icon: '👤' },
    { label: 'Nominee / Co-Owner', value: 'Munish Aggarwal', icon: '👥' },
    { label: 'House Area', value: '167.22 sqm (~200 Gaz)', icon: '📐' },
    { label: 'Vasika Reg. No.', value: '749', icon: '📝' },
    { label: 'Clearance Status', value: 'Paid & Regularized', icon: '✅' }
  ];

  return (
    <section id="specifications" className="section-cream" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="section-subtitle">Sunrise Estate Mapping</span>
          <h2>Official Sanctioned Map &amp; Specs</h2>
          <p>
            Review the high-resolution sanctioned layout map and certified legal clearances for House No. 769.
          </p>
        </div>

        {/* Premium Split Layout Visual Board */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)', alignItems: 'stretch' }}>
          
          {/* Left Column: Premium Dark Contrast Specifications Card */}
          <div 
            className="form-card" 
            style={{ 
              flex: '1 1 380px', 
              backgroundColor: '#1E252D', 
              borderColor: 'rgba(255,255,255,0.05)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div>
              <h3 
                style={{ 
                  fontSize: 'var(--fs-lg)', 
                  fontWeight: '500', 
                  fontFamily: 'var(--font-serif)', 
                  color: '#FAF9F6',
                  marginBottom: 'var(--space-6)', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
                  paddingBottom: '14px' 
                }}
              >
                Certified House Parameters
              </h3>
              
              {/* Premium Luxury Checklist / Parameters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {quickSpecs.map((spec, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '14px', 
                      paddingBottom: '12px', 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)' 
                    }}
                  >
                    <span style={{ fontSize: '18px', opacity: 0.95 }}>{spec.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {spec.label}
                      </span>
                      <span style={{ fontSize: 'var(--fs-sm)', fontWeight: '500', color: '#FAF9F6', marginTop: '2px' }}>
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Download Action Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
              <a 
                href={impMapPdf} 
                download="House_769_Sanctioned_Map.pdf"
                className="btn"
                style={{ 
                  backgroundColor: 'var(--accent-color)', 
                  color: '#FFF', 
                  textAlign: 'center', 
                  padding: '15px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                  boxShadow: '0 4px 14px rgba(197,155,39,0.35)',
                  transition: 'all 0.3s ease',
                  borderRadius: 'var(--radius-sm)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                📥 Download Sanctioned Map PDF
              </a>
              <a 
                href={impMapPdf} 
                target="_blank" 
                rel="noreferrer"
                className="btn"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#FAF9F6', 
                  border: '1px solid rgba(255,255,255,0.15)',
                  textAlign: 'center', 
                  padding: '13px 20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  borderRadius: 'var(--radius-sm)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#FAF9F6'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                🔍 Open Fullscreen Map
              </a>
            </div>
          </div>

          {/* Right Column: Premium CAD Blueprint Reader Workbench */}
          <div 
            style={{ 
              flex: '1.4 1 55%', 
              backgroundColor: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '10px', 
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Workbench Top status bar */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderBottom: '1px solid var(--border-color)', 
                padding: '14px 20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-pulse-dot" style={{ backgroundColor: 'var(--accent-color)' }} />
                <span>Sanctioned Layout Blueprint (Imp_map.pdf)</span>
              </div>
              <span style={{ color: 'var(--accent-color)', fontSize: '10px' }}>HOUSE NO. 769</span>
            </div>

            {/* PDF Embedded Viewport / Mobile Blueprint Dashboard */}
            {isMobile ? (
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: 'var(--space-10) var(--space-6)', 
                  backgroundColor: 'var(--bg-secondary)', 
                  textAlign: 'center',
                  gap: 'var(--space-4)',
                  borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
                  borderTop: '1px solid var(--border-color)',
                  flexGrow: 1
                }}
              >
                <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.06))' }}>📐</span>
                <div>
                  <h4 style={{ fontSize: 'var(--fs-md)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 6px 0', fontFamily: 'var(--font-serif)' }}>
                    Municipal Sanction Blueprint
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                    Document Format: PDF (3.26 MB)
                  </span>
                </div>
                
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto' }}>
                  Mobile browsers restrict direct PDF embedding. Tap below to download the official municipal approved blueprint or open it in full resolution directly on your device.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '280px', gap: '10px', marginTop: 'var(--space-2)' }}>
                  <a 
                    href={impMapPdf} 
                    download="House_769_Sanctioned_Map.pdf"
                    className="btn btn-primary"
                    style={{ 
                      textAlign: 'center', 
                      padding: '13px 20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    📥 Download PDF Map
                  </a>
                  <a 
                    href={impMapPdf} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-outline"
                    style={{ 
                      textAlign: 'center', 
                      padding: '12px 20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    🔍 View Fullscreen Map
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ position: 'relative', width: '100%', height: '78vh', minHeight: '580px', backgroundColor: '#5D5650' }}>
                <iframe 
                  src={`${impMapPdf}#toolbar=1`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', display: 'block' }}
                  title="Sanctioned Site Layout Map and Specifications"
                />
              </div>
            )}
          </div>

        </div>

        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: 'var(--space-6)' }}>
          * Note: If the interactive PDF viewer does not display automatically on your mobile device, please click the "Download" or "Open Fullscreen" buttons inside the details panel to view the high-resolution files.
        </div>

      </div>
    </section>
  );
}
