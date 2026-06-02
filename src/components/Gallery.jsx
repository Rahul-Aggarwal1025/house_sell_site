import { useState } from 'react';

const CATEGORIES = ['All', 'Site Photos', 'Layout Plans', 'Legal NOC Documents'];

const PLOT_MEDIA = [
  { id: 1, title: 'Plot 769 Front Boundary View', category: 'Site Photos' },
  { id: 2, title: 'Official Ground Layout Plan', category: 'Layout Plans' },
  { id: 3, title: 'Punjab Govt Regularization Approval', category: 'Legal NOC Documents' },
  { id: 4, title: 'Amazon City Sector 123 Approach Road', category: 'Site Photos' },
  { id: 5, title: 'Final regularized certificate registry copy', category: 'Legal NOC Documents' },
  { id: 6, title: 'Revenue Estate Jandpur cadastral map segment', category: 'Layout Plans' }
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');

  const visibleMedia = PLOT_MEDIA.filter(
    item => filter === 'All' || item.category === filter
  );

  return (
    <section id="gallery" className="section-white" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Visual Showcase</span>
          <h2>Media & Layout Registry</h2>
          <p>
            An interactive media display showcasing the actual site photos, official sector layouts, and verified Punjab government regularized certificate credentials for Plot No. 769.
          </p>
        </div>

        {/* Tab Filters */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: 'var(--space-4)', 
            marginBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: 'var(--space-4)'
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: 'transparent',
                border: 'none',
                color: filter === cat ? 'var(--accent-color)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--fs-xs)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                padding: '4px 8px',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
              {filter === cat && (
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '-17px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-color)'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Placeholder Visual Cards */}
        <div className="grid grid-3">
          {visibleMedia.map(item => (
            <div 
              key={item.id}
              className="skeleton-card"
              style={{
                aspectRatio: '4/3',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed'
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🖼️</div>
              <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', margin: '0 0 var(--space-1) 0', fontWeight: '500', textAlign: 'center', padding: '0 10px' }}>
                {item.title}
              </h4>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
