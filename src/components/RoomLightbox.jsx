import { useState, useEffect, useCallback } from 'react';

export default function RoomLightbox({ isOpen, onClose, images, activeIndex, setActiveIndex, roomTitle }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, setActiveIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, setActiveIndex]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;  // Swipe left -> Next image
    const isRightSwipe = distance < -50; // Swipe right -> Previous image

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(26, 23, 20, 0.96)',
        backdropFilter: 'blur(15px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6) 0',
        animation: 'fadeIn 0.3s ease-out',
        userSelect: 'none'
      }}
    >
      {/* CSS Animation Keyframes for Lightbox */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Top bar */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 var(--space-8)',
          color: '#FFF'
        }}
      >
        <div>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Sunrise Estate Showcase
          </span>
          <h3 style={{ fontSize: 'var(--fs-md)', color: '#FFF', fontWeight: '400', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
            {roomTitle} Gallery Set
          </h3>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFF',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '10px',
            lineHeight: '1',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
          onMouseLeave={(e) => e.target.style.color = '#FFF'}
        >
          &times;
        </button>
      </div>

      {/* Center Image Carousel Container */}
      <div 
        style={{ 
          position: 'relative', 
          flex: '1', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0 var(--space-16)',
          margin: 'var(--space-4) 0'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: 'var(--space-8)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#FFF',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'var(--transition-fast)',
            zIndex: 100
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-color)';
            e.currentTarget.style.borderColor = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          &#8592;
        </button>

        {/* Display Image Card */}
        <div 
          style={{ 
            maxWidth: '80%', 
            maxHeight: '65vh', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            backgroundColor: '#1A1D20',
            animation: 'scaleIn 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <img 
            src={images[activeIndex].url} 
            alt={`Photo ${activeIndex + 1}`}
            loading="lazy"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '65vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: 'var(--space-8)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#FFF',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'var(--transition-fast)',
            zIndex: 100
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-color)';
            e.currentTarget.style.borderColor = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          &#8594;
        </button>
      </div>

      {/* Bottom: counter pill + dot indicators + thumbnails */}
      <div style={{ padding: '0 var(--space-8) var(--space-2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>

        {/* Counter pill */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '10px',
          fontWeight: '600',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          {activeIndex + 1} / {images.length}
        </div>

        {/* Dot indicators — show max 12 dots, rest hidden */}
        {images.length <= 20 && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: idx === activeIndex ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: idx === activeIndex ? 'var(--accent-color)' : 'rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25,1,0.5,1)'
                }}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip — only when > 1 image */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px' }}>
            {images.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    flexShrink: 0,
                    width: '56px',
                    height: '38px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive ? '2px solid var(--accent-color)' : '2px solid transparent',
                    opacity: isActive ? 1 : 0.45,
                    transition: 'all 0.2s ease',
                    backgroundColor: '#000'
                  }}
                >
                  <img
                    src={img.url}
                    alt=""
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
