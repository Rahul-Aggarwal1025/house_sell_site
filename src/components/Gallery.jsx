import { useState } from 'react';
import RoomLightbox from './RoomLightbox';
import heroMansion from '../assets/hero_mansion.png';
import impMapPdf from '../assets/Imp_map.pdf';

const CATEGORIES = ['All', 'Site Photos', 'Layout Plans', 'Legal NOC Documents'];

// Eagerly scan directories for files
const siteImagesGlob     = import.meta.glob('/src/assets/property_main/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const randomImagesGlob   = import.meta.glob('/src/assets/random/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const roomImagesGlob     = import.meta.glob('/src/assets/rooms/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const floorplanImagesGlob = import.meta.glob('/src/assets/floorplan/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const docImagesGlob      = import.meta.glob('/src/assets/docs/**/*.{png,jpg,jpeg,webp,pdf,PNG,JPG,JPEG,WEBP,PDF}', { eager: true });

const formatGlob = (globObj, category, defaultTitlePrefix) => {
  return Object.keys(globObj)
    .filter(path => {
      const lower = path.toLowerCase();
      return !lower.endsWith('.txt') && !lower.endsWith('.md');
    })
    .map((path, idx) => {
      const module = globObj[path];
      const url = module ? (module.default || module) : '';
      const isPdf = path.toLowerCase().endsWith('.pdf');
      const filename = path.split('/').pop();
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

      return {
        id: path,
        url,
        title: nameWithoutExt || `${defaultTitlePrefix} ${idx + 1}`,
        category,
        type: isPdf ? 'pdf' : 'image',
        path,
      };
    });
};

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ── Site Photos ──────────────────────────────────────────────────────────
  const mainSiteImages   = formatGlob(siteImagesGlob,   'Site Photos', 'Site Photo');
  const randomSiteImages = formatGlob(randomImagesGlob, 'Site Photos', 'Site Photo');
  const rawRoomImages    = formatGlob(roomImagesGlob,   'Site Photos', 'Room Photo');

  // Keep only one toilet image
  const toiletImages    = rawRoomImages.filter(img => img.path.toLowerCase().includes('toilet'));
  const nonToiletImages = rawRoomImages.filter(img => !img.path.toLowerCase().includes('toilet'));
  const roomImages      = [...nonToiletImages, ...(toiletImages.length > 0 ? [toiletImages[0]] : [])];

  const siteImages = [...mainSiteImages, ...randomSiteImages, ...roomImages];

  // ── Layout Plans ─────────────────────────────────────────────────────────
  const floorplanImages = formatGlob(floorplanImagesGlob, 'Layout Plans', 'Layout Plan');

  // ── Legal NOC Documents ──────────────────────────────────────────────────
  const docImages = formatGlob(docImagesGlob, 'Legal NOC Documents', 'Document');

  // Imp_map.pdf lives in src/assets root — always show it as a real legal entry
  const impMapEntry = {
    id: 'legal-imp-map',
    url: impMapPdf,
    title: 'Municipal Sanctioned Layout Map — House 769',
    category: 'Legal NOC Documents',
    type: 'pdf',
    path: '/src/assets/Imp_map.pdf',
  };

  // ── Assemble full media list ──────────────────────────────────────────────
  const plotMedia = [
    // Site Photos (fall back to hero if none uploaded)
    ...(siteImages.length > 0
      ? siteImages
      : [{ id: 'site-fallback-1', url: heroMansion, title: 'House 769 View', category: 'Site Photos', type: 'image' }]),

    // Layout Plans (show nothing if no files)
    ...floorplanImages,

    // Legal NOC: always the sanctioned map + any extra docs uploaded
    impMapEntry,
    ...docImages,
  ];

  // ── Filter for active tab ─────────────────────────────────────────────────
  const visibleMedia = plotMedia.filter(
    item => filter === 'All' || item.category === filter
  );

  // Lightbox only gets real images (no PDFs, no blanks)
  const lightboxImages = visibleMedia
    .filter(item => item.url && item.type !== 'pdf')
    .map(item => ({ url: item.url, caption: item.title }));

  const handleCardClick = (item) => {
    if (item.type === 'pdf' && item.url) {
      window.open(item.url, '_blank');
      return;
    }
    const index = lightboxImages.findIndex(img => img.url === item.url);
    if (index !== -1) {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    }
  };

  return (
    <section id="gallery" className="section-white" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Visual Showcase</span>
          <h2>Media &amp; Layout Registry</h2>
          <p>
            An interactive media display showcasing actual site photos, official sector layouts,
            and verified Punjab government regularized certificate credentials for House No. 769.
          </p>
        </div>

        {/* Tab Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-12)',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: 'var(--space-4)'
        }}>
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
                transition: 'var(--transition-fast)',
              }}
            >
              {cat}
              {filter === cat && (
                <span style={{
                  position: 'absolute',
                  bottom: '-17px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--accent-color)',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-3">
          {visibleMedia.map(item => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              {/* Image / PDF frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

                {/* PDF card */}
                {item.type === 'pdf' && (
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: '12px', width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, #1a1d22 0%, #2a2e36 100%)',
                  }}>
                    <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>📄</span>
                    <div style={{ textAlign: 'center', padding: '0 var(--space-4)' }}>
                      <span style={{
                        fontSize: '11px', display: 'block', fontWeight: '600',
                        color: '#FFF', marginBottom: '6px', fontFamily: 'var(--font-serif)'
                      }}>{item.title}</span>
                      <span style={{
                        fontSize: '8px', color: 'rgba(255,255,255,0.4)',
                        display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em'
                      }}>Tap to open</span>
                    </div>
                  </div>
                )}

                {/* Image card */}
                {item.type === 'image' && item.url && (
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                )}

                {/* Category pill — always on top */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(26, 32, 40, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: 'var(--accent-color)',
                  fontSize: '8px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {item.category}
                </div>

              </div>{/* end image frame */}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {isLightboxOpen && lightboxImages.length > 0 && (
        <RoomLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={lightboxImages}
          activeIndex={lightboxIndex}
          setActiveIndex={setLightboxIndex}
          roomTitle={filter === 'All' ? 'Gallery' : filter}
        />
      )}
    </section>
  );
}
