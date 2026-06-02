import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('I am highly interested in scheduling a site visit or requesting legal files regarding Plot No. 769, Sector 123, Amazon City, Mohali...');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out Name and Email.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="section-white" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="section-header" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="section-subtitle">Request Information</span>
          <h2>Inquire About Plot 769</h2>
          <p>
            Site visits are arranged daily in Sector 123, Mohali. Fill out the contact form below or reach out to us directly via phone, WhatsApp, or email.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', 
          gap: 'var(--space-10)', 
          alignItems: 'stretch' 
        }}>
          
          {/* Column 1: Direct Contacts & Inquiry Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Quick Action Contact Bar */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)'
              }}
            >
              <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: '600', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', margin: '0' }}>
                📞 Connect Instantly
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                {/* Phone details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Phone & WhatsApp Support
                  </span>
                  <a 
                    href="tel:+919318051550" 
                    style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    📞 +91 93180 51550
                  </a>
                </div>

                {/* Email details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Official Email Inbox
                  </span>
                  <a 
                    href="mailto:aggarwal.munish@gmail.com" 
                    style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', wordBreak: 'break-all' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    ✉️ aggarwal.munish@gmail.com
                  </a>
                </div>
              </div>

              {/* Direct Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <a 
                  href="https://wa.me/919318051550" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn" 
                  style={{ 
                    flex: '1',
                    backgroundColor: '#25D366', 
                    color: '#FFF', 
                    display: 'flex', 
                    gap: '8px', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 8px rgba(37,211,102,0.15)',
                    padding: '12px 0'
                  }}
                >
                  💬 WhatsApp Chat
                </a>
                <a 
                  href="mailto:aggarwal.munish@gmail.com" 
                  className="btn btn-outline" 
                  style={{ 
                    flex: '1',
                    display: 'flex', 
                    gap: '8px', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '12px 0'
                  }}
                >
                  ✉️ Send Direct Email
                </a>
              </div>
            </div>

            {/* Inquiry Form Card */}
            <div className="form-card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: '500', fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', margin: '0 0 var(--space-6) 0' }}>
                ✉️ Send Secure Inquiry
              </h3>
              
              {isSubmitted ? (
                <div 
                  style={{ 
                    textAlign: 'center', 
                    padding: 'var(--space-8) var(--space-4)', 
                    borderColor: 'var(--accent-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>✉️</div>
                  <h3 style={{ marginBottom: 'var(--space-2)' }}>Inquiry Submitted</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', margin: '0', maxWidth: '350px' }}>
                    Thank you for contacting us. Your details have been dispatched to **aggarwal.munish@gmail.com**. A representative from **Sunrise Estate** will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      placeholder="Rahul Aggarwal" 
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="rahul@example.com" 
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        placeholder="+91 93180-51550" 
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-2)' }}>
                    <label>Inquiry Message</label>
                    <textarea 
                      value={msg} 
                      onChange={e => setMsg(e.target.value)}
                      style={{ minHeight: '120px', resize: 'vertical' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: 'var(--space-2)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry to Sunrise Estate'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Premium Map Showcase (BIGGER MAP) */}
          <div 
            className="form-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)',
              padding: 'var(--space-8)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: '500', fontFamily: 'var(--font-serif)', margin: '0' }}>
                  Property Location
                </h3>
                <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--accent-color)', letterSpacing: '0.08em' }}>
                  📍 sector 123, mohali
                </span>
              </div>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>
                Plot No. 769 is perfectly situated within Sector 123, Mohali—a fast-developing, highly integrated residential hub offering swift connectivity to major transit highways and central Chandigarh markets.
              </p>

              {/* Styled Maps Block */}
              <div 
                style={{ 
                  borderRadius: 'var(--radius-sm)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-color)', 
                  height: '480px', /* Massive Map Height */
                  position: 'relative',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.9532904113078!2d76.6745708209788!3d30.765628853876095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff100041ef019%3A0x158b6db2d792eb2!2sMunish%20Aggarwal%20769!5e1!3m2!1sen!2sin!4v1780382639260!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="Sunrise Estate Location Map"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'var(--space-6)' }}>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Munish+Aggarwal+769" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary" 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                🗺️ Get Directions on Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
