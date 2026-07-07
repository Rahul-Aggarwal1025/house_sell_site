export default function ContactForm() {
  return (
    <section id="contact" className="section-white" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Hover Styles */}
        <style>{`
          .cta-wa { background-color: #25D366; color: #fff; transition: all 0.25s ease; }
          .cta-wa:hover { background-color: #1da851 !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.25) !important; }
          .cta-email { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-primary); transition: all 0.25s ease; }
          .cta-email:hover { background-color: var(--accent-color) !important; border-color: var(--accent-color) !important; color: #fff !important; transform: translateY(-2px); }
          .cta-maps { transition: all 0.25s ease; }
          .cta-maps:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(166,125,30,0.2) !important; }
        `}</style>

        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="section-subtitle">Request Information</span>
          <h2>Inquire About House 769</h2>
          <p>
            Site visits arranged daily in Sector 123, Mohali. Connect with us directly via phone, WhatsApp, or email.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 'var(--space-8)',
          alignItems: 'start'
        }}>

          {/* ── Column 1: Direct Contact Card ── */}
          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)'
          }}>

            {/* Card Title */}
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontWeight: '500', fontSize: 'var(--fs-lg)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Connect Instantly
              </h3>
              <p style={{ margin: '6px 0 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Reach out directly to the owner for details, registry papers, or to schedule an on-site visit.
              </p>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-color)' }}>
                Phone &amp; WhatsApp
              </span>
              <a
                href="tel:+919318051550"
                style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                📞 +91 93180 51550
              </a>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-color)' }}>
                Official Email
              </span>
              <a
                href="mailto:aggarwal.munish@gmail.com"
                style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-all' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-color)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                ✉️ aggarwal.munish@gmail.com
              </a>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <a
                href="https://wa.me/919318051550"
                target="_blank"
                rel="noreferrer"
                className="btn cta-wa"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', padding: '14px 0',
                  fontSize: '11px', fontWeight: '600',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                💬 Open WhatsApp Chat
              </a>
              <a
                href="mailto:aggarwal.munish@gmail.com"
                className="btn cta-email"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', padding: '13px 0',
                  fontSize: '11px', fontWeight: '600',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                ✉️ Send Email Inquiry
              </a>
            </div>
          </div>

          {/* ── Column 2: Map Card ── */}
          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)'
          }}>

            {/* Map Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontWeight: '500', fontSize: 'var(--fs-lg)', color: 'var(--text-primary)' }}>
                Property Location
              </h3>
              <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-color)' }}>
                📍 Sector 123, Mohali
              </span>
            </div>

            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              House No. 769 is situated within Sector 123, Mohali — offering swift connectivity to Chandigarh and major transit highways.
            </p>

            {/* Google Map */}
            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)', height: '400px', boxShadow: 'var(--shadow-md)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.9532904113078!2d76.6745708209788!3d30.765628853876095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff100041ef019%3A0x158b6db2d792eb2!2sMunish%20Aggarwal%20769!5e1!3m2!1sen!2sin!4v1780382639260!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
                title="Sunrise Estate Location Map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions Button */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Munish+Aggarwal+769"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary cta-maps"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '14px 0',
                fontSize: '11px', fontWeight: '600',
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }}
            >
              🗺️ Get Directions on Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
