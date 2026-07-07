import { useState } from 'react';
import RoomLightbox from './RoomLightbox';
import heroMansion from '../assets/hero_mansion.png';

const CATEGORIES = ['All', 'Site Photos', 'Layout Plans', 'Legal NOC Documents'];

// Eagerly scan directories for files
const siteImagesGlob = import.meta.glob('/src/assets/property_main/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const randomImagesGlob = import.meta.glob('/src/assets/random/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const roomImagesGlob = import.meta.glob('/src/assets/rooms/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const floorplanImagesGlob = import.meta.glob('/src/assets/floorplan/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const docImagesGlob = import.meta.glob('/src/assets/docs/**/*.{png,jpg,jpeg,webp,pdf,PNG,JPG,JPEG,WEBP,PDF}', { eager: true });

const formatGlob = (globObj, category, defaultTitlePrefix) => {
  return Object.keys(globObj)
    .filter(path => !path.toLowerCase().endsWith('.txt')) // ignore placeholder text files
    .map((path, idx) => {
      const module = globObj[path];
      const url = module ? (module.default || module) : '';
      const isPdf = path.toLowerCase().endsWith('.pdf');
      
      // Clean filename for the title
      const filename = path.split('/').pop();
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
      
      let cleanTitle = '';
      
      // Special treatment for room images to make their titles descriptive
      if (category === 'Site Photos' && path.toLowerCase().includes('/rooms/')) {
        const parts = path.split('/');
        const roomFolder = parts[parts.length - 2];
        const cleanFolder = roomFolder
          .split(/[_-]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        const cleanFileName = nameWithoutExt.startsWith('WhatsApp')
          ? 'Site Photo'
          : nameWithoutExt.replace(/_/g, ' ');
          
        cleanTitle = `${cleanFolder} - ${cleanFileName}`;
      } else {
        cleanTitle = nameWithoutExt
          .split(/[_-]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      return {
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${category === 'Site Photos' && path.toLowerCase().includes('/rooms/') ? 'room-' : ''}${idx}`,
        url,
        title: cleanTitle || `${defaultTitlePrefix} ${idx + 1}`,
        category,
        type: isPdf ? 'pdf' : 'image',
        path // retain for internal filtering
      };
    });
};

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Format dynamically loaded assets
  const mainSiteImages = formatGlob(siteImagesGlob, 'Site Photos', 'Site Photo');
  const randomSiteImages = formatGlob(randomImagesGlob, 'Site Photos', 'Site Photo');
  
  // Format room images
  const rawRoomImages = formatGlob(roomImagesGlob, 'Site Photos', 'Room Photo');
  
  // Exclude all but one bathroom/toilet photo
  const toiletRoomImages = rawRoomImages.filter(img => img.path.toLowerCase().includes('toilet'));
  const nonToiletRoomImages = rawRoomImages.filter(img => !img.path.toLowerCase().includes('toilet'));
  
  const filteredRoomImages = [
    ...nonToiletRoomImages,
    ...(toiletRoomImages.length > 0 ? [toiletRoomImages[0]] : [])
  ];

  // Combine property_main, random, and rooms into Site Photos
  const siteImages = [...mainSiteImages, ...randomSiteImages, ...filteredRoomImages];
  
  const floorplanImages = formatGlob(floorplanImagesGlob, 'Layout Plans', 'Layout Plan');
  const docImages = formatGlob(docImagesGlob, 'Legal NOC Documents', 'Document');

  // Build the media array with dynamic assets, falling back to placeholders if empty
  let plotMedia = [];

  if (siteImages.length > 0) {
    plotMedia = [...plotMedia, ...siteImages];
  } else {
    plotMedia = [
      ...plotMedia,
      { id: 'site-fallback-1', url: heroMansion, title: 'Plot 769 Front Boundary View', category: 'Site Photos', type: 'image' },
      { id: 'site-fallback-2', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', title: 'Amazon City Sector 123 Approach Road', category: 'Site Photos', type: 'image' }
    ];
  }

  if (floorplanImages.length > 0) {
    plotMedia = [...plotMedia, ...floorplanImages];
  } else {
    plotMedia = [
      ...plotMedia,
      { id: 'floor-fallback-1', url: '', title: 'Official Ground Layout Plan', category: 'Layout Plans', type: 'image' },
      { id: 'floor-fallback-2', url: '', title: 'Revenue Estate Jandpur cadastral map segment', category: 'Layout Plans', type: 'image' }
    ];
  }

  if (docImages.length > 0) {
    plotMedia = [...plotMedia, ...docImages];
  } else {
    plotMedia = [
      ...plotMedia,
      { id: 'doc-fallback-1', url: '', title: 'Punjab Govt Regularization Approval', category: 'Legal NOC Documents', type: 'image' },
      { id: 'doc-fallback-2', url: '', title: 'Final regularized certificate registry copy', category: 'Legal NOC Documents', type: 'image' }
    ];
  }

  // Filter visible items
  const visibleMedia = plotMedia.filter(
    item => filter === 'All' || item.category === filter
  );

  // Filter list of images specifically for the lightbox (excluding PDFs and empty placeholders)
  const lightboxImages = visibleMedia
    .filter(item => item.url && item.type !== 'pdf')
    .map(item => ({
      url: item.url,
      caption: item.title
    }));

  const handleCardClick = (item) => {
    if (item.type === 'pdf' && item.url) {
      window.open(item.url, '_blank');
      return;
    }
    if (!item.url) {
      alert(`To replace this placeholder with your own file, please paste it in the correct project folder:\n\n` +
            `- Site Photos: src/assets/property_main/\n` +
            `- Layout Plans: src/assets/floorplan/\n` +
            `- Legal Documents: src/assets/docs/\n\n` +
            `Then refresh the page!`);
      return;
    }

    // Find the index of this item in the lightbox list
    const index = lightboxImages.findIndex(img => img.url === item.url);
    if (index !== -1) {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    }
  };

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
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              {/* Image / Icon Frame */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  aspectRatio: '16/10', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--bg-secondary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                {item.url ? (
                  item.type === 'pdf' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '3rem' }}>📄</span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>PDF Document</span>
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      loading="lazy"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.5s ease' 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />
                  )
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}>
                      {item.category === 'Layout Plans' ? '📐' : '📜'}
                    </span>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-color)', fontWeight: '600' }}>
                      Add file to see preview
                    </span>
                  </div>
                )}
                
                {/* Category Pill */}
                <div 
                  style={{ 
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
                    border: '1px solid rgba(255,255,255,0.05)' 
                  }}
                >
                  {item.category}
                </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Lightbox for Gallery */}
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
