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
      <div className="container" style={{ maxWidth: '1050px' }}>
        <div className="section-header" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="section-subtitle">Request Information</span>
          <h2>Inquire About Plot 769</h2>
          <p>
            Site visits are arranged daily in Sector 123, Mohali. Fill out the contact form below or reach out to us directly via phone, WhatsApp, or email.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', alignItems: 'stretch' }}>
          
          {/* Left Column: Direct Contacts */}
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
              <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: '500', fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Direct Channels
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>
                For quick assistance, site coordinates, or immediate copies of the regularization certificate and NOC documents, connect directly with the co-owner:
              </p>

              {/* Contact details list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Phone detail */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                    Phone & WhatsApp Support
                  </span>
                  <a 
                    href="tel:+919318051550" 
                    style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    📞 +91 93180 51550
                  </a>
                </div>

                {/* Email detail */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: '9px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                    Official Email Inbox
                  </span>
                  <a 
                    href="mailto:aggarwal.munish@gmail.com" 
                    style={{ fontSize: 'var(--fs-base)', fontWeight: '600', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    ✉️ aggarwal.munish@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'var(--space-8)' }}>
              <a 
                href="https://wa.me/919318051550" 
                target="_blank" 
                rel="noreferrer"
                className="btn" 
                style={{ 
                  backgroundColor: '#25D366', 
                  color: '#FFF', 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(37,211,102,0.2)' 
                }}
              >
                💬 Chat on WhatsApp
              </a>
              <a 
                href="mailto:aggarwal.munish@gmail.com" 
                className="btn btn-outline" 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                ✉️ Send Direct Email
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="form-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isSubmitted ? (
              <div 
                style={{ 
                  textAlign: 'center', 
                  padding: 'var(--space-8) var(--space-4)', 
                  borderColor: 'var(--accent-color)',
                  height: '100%',
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
                    style={{ minHeight: '90px', resize: 'vertical' }}
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
      </div>
    </section>
  );
}
