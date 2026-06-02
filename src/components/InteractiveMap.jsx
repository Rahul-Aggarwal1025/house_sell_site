import { useState, useRef, useEffect } from 'react';
import floorPlanImage from '../assets/floorplan/Floor_plan_Ground.png';
import RoomLightbox from './RoomLightbox';

// Eagerly scan all files inside src/assets/rooms and src/assets/floorplan to dynamically fetch user-pasted local assets
const localImagesGlob = import.meta.glob('/src/assets/rooms/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
const floorplanImagesGlob = import.meta.glob('/src/assets/floorplan/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });

// Shared Curated Unsplash Luxury Real Estate fallbacks
const FALLBACK_ROOM_PHOTOS = {
  courtyard: [
    { url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1200&q=80', caption: 'Lush landscaped courtyard approach and pathway' },
    { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', caption: 'Premium exterior facade layout near the main entrance point' }
  ],
  kitchen: [
    { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', caption: 'Custom minimalist cabinets and quartz island countertops' },
    { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', caption: 'Integrated modern brass fixtures and luxury gas burner setup' }
  ],
  drawing_room: [
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', caption: 'Formal parlor detailing custom low-profile lounge sofas' },
    { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', caption: 'Italian natural marble mantelpiece accentuating minimalist panels' }
  ],
  lobby: [
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', caption: 'Central double-height entry hall looking upward' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', caption: 'Sleek stone staircase ascending toward secondary floor sectors' }
  ],
  bedroom: [
    { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', caption: 'Primary master bedroom suite styled in warm timber panel details' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', caption: 'Custom built-in walk-in dressing system with elegant LED backlights' }
  ],
  toilet: [
    { url: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&w=1200&q=80', caption: 'Premium walk-in rain shower panel in fluted stone' },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', caption: 'Floating double stone vanity basin under circular mirrors' }
  ],
  ots: [
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', caption: 'Direct overhead vertical skylight shaft view' },
    { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80', caption: 'Natural breeze intake channel with climbing ivy planter frames' }
  ],
  store: [
    { url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80', caption: 'Modular customized shelving stacks designed for optimal pantry storage' }
  ],
  pooja: [
    { url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80', caption: 'Serene backlit alcove detailed in teakwood paneling for puja setups' }
  ],
  porch: [
    { url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80', caption: 'Polished micro-concrete stairs ascending to the first floor porch area' }
  ]
};

// Config for Floor 1, Floor 2
const FLOOR_CONFIGS = {
  '1': {
    title: 'Ground Floor',
    defaultRoom: 'Lobby',
    areas: [
      { key: 'Courtyard', coords: [106, 1258, 896, 1470], title: 'Front Court Yard', icon: '🪴', folder: 'courtyard', fallbackType: 'courtyard', description: 'An expansive open-air front courtyard positioned near the main gate entrance.' },
      { key: 'Kitchen', coords: [414, 983, 617, 1234], title: 'Kitchen', icon: '🍳', folder: 'kitchen', fallbackType: 'kitchen', description: 'Modern open kitchen space designed for high-end culinary preparation.' },
      { key: 'DrawingRoom', coords: [635, 948, 899, 1235], title: 'DRG. Room', icon: '🛋️', folder: 'drawing_room', fallbackType: 'drawing_room', description: 'Elegant drawing room / reception parlor overlooking the front entrance.' },
      { key: 'Lobby', coords: [415, 577, 897, 946], title: 'Lobby', icon: '🏢', folder: 'lobby', fallbackType: 'lobby', description: 'The spacious central core lobby coordinating smooth passage to all residential quarters.' },
      { key: 'Bedroom3', coords: [111, 703, 394, 891], title: 'Bed Room 3', icon: '🛌', folder: 'bedroom_3', fallbackType: 'bedroom', description: 'Comfortable guest suite positioned along the left residential wing.' },
      { key: 'Toilet3', coords: [109, 575, 257, 681], title: 'Toilet 3', icon: '🚿', folder: 'toilet_3', fallbackType: 'toilet', description: 'Functional washroom suite situated near the third bedroom quarter.' },
      { key: 'Toilet1', coords: [111, 69, 250, 241], title: 'Toilet 1', icon: '🚿', folder: 'toilet_1', fallbackType: 'toilet', description: 'Private bathroom suite adjoining Bed Room 1.' },
      { key: 'Toilet2', coords: [763, 71, 899, 240], title: 'Toilet 2', icon: '🚿', folder: 'toilet_2', fallbackType: 'toilet', description: 'Deluxe private bathroom set adjacent to Bed Room 2.' },
      { key: 'Bedroom1', coords: [111, 260, 412, 557], title: 'Bed Room 1', icon: '🛌', folder: 'bedroom_1', fallbackType: 'bedroom', description: 'Secluded primary bedroom located at the top left sector of the residence.' },
      { key: 'Ots', coords: [269, 71, 744, 240], title: 'O.T.S', icon: '☀️', folder: 'ots', fallbackType: 'ots', description: 'An open ventilation shaft channelling clean air and vertical sunlight.' },
      { key: 'Bedroom2', coords: [586, 260, 898, 556], title: 'Bed Room 2', icon: '🛌', folder: 'bedroom_2', fallbackType: 'bedroom', description: 'Spacious secondary master suite situated at the top right sector.' },
      { key: 'Store', coords: [431, 259, 568, 446], title: 'Store', icon: '📦', folder: 'store', fallbackType: 'store', description: 'Climate-balanced dedicated storage vault located next to the puja area.' },
      { key: 'Pooja', coords: [431, 459, 567, 560], title: 'Puja', icon: '🕉️', folder: 'pooja', fallbackType: 'pooja', description: 'A serene, peaceful sanctuary designed for meditation and daily spiritual offerings.' },
      { key: 'Porch', coords: [197, 910, 395, 1257], title: 'Porch', icon: '🪵', folder: 'porch', fallbackType: 'porch', description: 'Covered porch area housing the main stairs ascending upward.' }
    ]
  },
  '2': {
    title: 'First Floor',
    defaultRoom: 'Lobby_floor_2',
    // Floor 2 mapped from user's image-map.net coords against 4793x7200 Floor_2.png
    areas: [
      { key: 'BalconyFront_floor_2', shape: 'rect', coords: [525, 5863, 4251, 6189], title: 'Balcony Front', icon: '🌅', folder: 'balcony_front_floor_2', fallbackType: 'porch', description: 'Open-air front balcony on the first floor overlooking the main courtyard and entrance.' },
      { key: 'Kitchen_floor_2', shape: 'rect', coords: [1952, 4597, 2900, 5791], title: 'Kitchen 2', icon: '🍳', folder: 'kitchen_floor_2', fallbackType: 'kitchen', description: 'First floor kitchen layout tailored for convenient culinary setups.' },
      { key: 'DrawingRoom_floor_2', shape: 'rect', coords: [2972, 4440, 4247, 5787], title: 'DRG. Room 2', icon: '🛋️', folder: 'drawing_room_floor_2', fallbackType: 'drawing_room', description: 'First floor drawing lounge parlor overlooking Sector 123 roadways.' },
      { key: 'Bedroom3_floor_2', shape: 'rect', coords: [525, 3301, 1867, 4199], title: 'Bed Room 3 (Floor 2)', icon: '🛌', folder: 'bedroom_3_floor_2', fallbackType: 'bedroom', description: 'Comfortable mid-wing bedroom on the first floor.' },
      { key: 'Toilet3_floor_2', shape: 'rect', coords: [521, 2725, 1867, 3225], title: 'Toilet 3 (Floor 2)', icon: '🚿', folder: 'toilet_3_floor_2', fallbackType: 'toilet', description: 'Washroom suite serving bedroom 3 on the first floor.' },
      { key: 'Bedroom1_floor_2', shape: 'rect', coords: [521, 1227, 1952, 2637], title: 'Bed Room 1 (Floor 2)', icon: '🛌', folder: 'bedroom_1_floor_2', fallbackType: 'bedroom', description: 'Primary master suite located on the first floor, top-left sector.' },
      { key: 'Toilet1_floor_2', shape: 'rect', coords: [529, 370, 1207, 1149], title: 'Toilet 1 (Floor 2)', icon: '🚿', folder: 'toilet_1_floor_2', fallbackType: 'toilet', description: 'Adjoining bathroom suite for Bed Room 1 on Floor 2.' },
      { key: 'Toilet2_floor_2', shape: 'rect', coords: [3586, 361, 4251, 1153], title: 'Toilet 2 (Floor 2)', icon: '🚿', folder: 'toilet_2_floor_2', fallbackType: 'toilet', description: 'Bathroom suite adjoining Bed Room 2 on the first floor.' },
      { key: 'Bedroom2_floor_2', shape: 'rect', coords: [2769, 1231, 4247, 2629], title: 'Bed Room 2 (Floor 2)', icon: '🛌', folder: 'bedroom_2_floor_2', fallbackType: 'bedroom', description: 'Secondary master suite located on the first floor, top-right sector.' },
      { key: 'Store_floor_2', shape: 'rect', coords: [2028, 1231, 2697, 2095], title: 'Store 2', icon: '📦', folder: 'store_floor_2', fallbackType: 'store', description: 'First floor storage vault for balancing equipment and supplies.' },
      { key: 'BalconyBack_floor_2', shape: 'poly', polygon: '1279,370 1503,370 1503,963 3290,971 3290,366 3497,370 3519,1149 1283,1149', title: 'Balcony Back', icon: '🌄', folder: 'balcony_back_floor_2', fallbackType: 'porch', description: 'Rear-facing balcony on the first floor providing serene backyard views.' },
      { key: 'Lobby_floor_2', shape: 'poly', polygon: '2032,2177 2693,2177 2693,2715 4247,2719 4251,4405 2032,4413', title: 'Lobby 2', icon: '🏢', folder: 'lobby_floor_2', fallbackType: 'lobby', description: 'The central lobby hall on the first floor connecting all chambers.' }
    ]
  }
};

export default function InteractiveMap() {
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [activeSection, setActiveSection] = useState('Lobby');
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgNatural, setImgNatural] = useState({ w: 1, h: 1 });
  
  // Slideshow state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Full Screen Lightbox System State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Dynamic Detail Card Drawer State (Mobile screens only)
  const [showDetailCard, setShowDetailCard] = useState(false);

  // Custom Dropdown Open/Closed State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Responsive Screen Detection State
  const [isMobile, setIsMobile] = useState(false);

  const imgRef = useRef(null);
  const mapContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close custom dropdown when clicking anywhere else outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgNatural({
        w: imgRef.current.naturalWidth,
        h: imgRef.current.naturalHeight
      });
    }
  };

  // Also attempt to read dimensions on mount in case image is cached
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgNatural({
        w: imgRef.current.naturalWidth,
        h: imgRef.current.naturalHeight
      });
    }
  }, []);

  const activeFloorConfig = FLOOR_CONFIGS[selectedFloor] || FLOOR_CONFIGS['1'];
  
  // Find current room object within active floor configuration
  const currentRoom = activeFloorConfig.areas.find(area => area.key === activeSection) || activeFloorConfig.areas[0];

  // Helper to extract locally pasted images from assets folder
  const getLocalImagesForRoom = (folderName) => {
    const matchingUrls = [];
    const folderPathPrefix = `/src/assets/rooms/${folderName}/`.toLowerCase();
    
    for (const path in localImagesGlob) {
      if (path.toLowerCase().startsWith(folderPathPrefix)) {
        const module = localImagesGlob[path];
        const url = module ? (module.default || module) : '';
        
        // Clean caption from file name
        const filename = path.split('/').pop();
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        
        if (filename.toLowerCase().endsWith('.txt')) continue;

        const cleanCaption = nameWithoutExt.startsWith('WhatsApp')
          ? 'Local Site Capture'
          : nameWithoutExt.replace(/_/g, ' ');

        matchingUrls.push({
          url,
          caption: cleanCaption
        });
      }
    }
    return matchingUrls;
  };

  // Dynamic image resolving logic: Prioritizes locally pasted files, falls back to corresponding fallback type
  const getRoomImages = () => {
    if (!currentRoom) return [];
    const local = getLocalImagesForRoom(currentRoom.folder);
    if (local.length > 0) return local;
    
    // Fall back to luxury stock illustrations for that category
    return FALLBACK_ROOM_PHOTOS[currentRoom.fallbackType] || [];
  };

  const currentImages = getRoomImages();

  // Auto-playing Slideshow cycle triggered on room changes
  useEffect(() => {
    setActiveImageIdx(0);
    setIsTransitioning(false);

    if (currentImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveImageIdx((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, [activeSection, currentImages.length]);

  // Update mouse position for floating elegant tooltip
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSectionClick = (sectionKey, e) => {
    if (isMobile) {
      e.stopPropagation();
      setActiveSection(sectionKey);
      setShowDetailCard(true);
    } else {
      setActiveSection(sectionKey);
    }
  };

  // Convert pixel coords [x1, y1, x2, y2] to percentage-based CSS values (for rect shapes)
  const toPercent = (coords) => {
    const [x1, y1, x2, y2] = coords;
    return {
      left: `${(x1 / imgNatural.w) * 100}%`,
      top: `${(y1 / imgNatural.h) * 100}%`,
      width: `${((x2 - x1) / imgNatural.w) * 100}%`,
      height: `${((y2 - y1) / imgNatural.h) * 100}%`,
    };
  };

  // Convert polygon string "x1,y1 x2,y2 ..." to percentage-based SVG points
  const polyToPercentPoints = (polygon) => {
    return polygon.split(' ').map(pair => {
      const [x, y] = pair.split(',').map(Number);
      return `${(x / imgNatural.w) * 100}%,${(y / imgNatural.h) * 100}%`;
    }).join(' ');
  };

  // Dynamically resolve active floor plan image
  const getFloorPlanImage = () => {
    if (selectedFloor === '1') return floorPlanImage;
    
    // Check if user has uploaded a blueprint inside floorplan/floor_2 or floor_3
    const folderPath = `/src/assets/floorplan/floor_${selectedFloor}/`.toLowerCase();
    for (const path in floorplanImagesGlob) {
      if (path.toLowerCase().startsWith(folderPath)) {
        const module = floorplanImagesGlob[path];
        if (module) return module.default || module;
      }
    }
    return floorPlanImage; // Fallback
  };

  return (
    <section id="interactive-map" className="section-white" style={{ borderBottom: '1px solid var(--border-color)', padding: 'var(--space-12) 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
        
        {/* Instructional Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <span className="section-subtitle">Sunrise Estate Layout</span>
          <h2 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-2xl)', fontWeight: '400', fontFamily: 'var(--font-serif)' }}>
            Interactive Floor Plan
          </h2>
          
          {/* Live Pulsing Interaction Badge */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '8px 16px',
              borderRadius: '4px',
              margin: '0 auto',
              maxWidth: '650px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span className="live-pulse-dot" />
            <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
              {isMobile 
                ? 'LIVE BLUEPRINT: Tap any room directly inside the map to explore custom photos.'
                : 'LIVE BLUEPRINT: Click any room directly on the blueprint to view specifications.'
              }
            </span>
          </div>
        </div>

        {/* ==========================================================================
            CUSTOM LUXURY FLOOR SELECTOR DROPDOWN (Highly Polished & Fully Responsive)
            ========================================================================== */}
        <div 
          ref={dropdownRef}
          style={{ 
            position: 'relative',
            margin: 'var(--space-4) auto var(--space-8) auto', 
            width: '100%',
            maxWidth: '280px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            textAlign: 'center',
            zIndex: 100 // Safe stacking above blueprints
          }}
        >
          <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: '600', display: 'block' }}>
            Select Active Floor
          </span>

          {/* Trigger selector button card */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'var(--bg-tertiary)',
              border: `1px solid ${isDropdownOpen ? 'var(--accent-color)' : 'var(--border-color)'}`,
              color: 'var(--text-primary)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              userSelect: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              if (!isDropdownOpen) e.currentTarget.style.borderColor = 'var(--accent-color)';
            }}
            onMouseLeave={(e) => {
              if (!isDropdownOpen) e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <span style={{ fontWeight: '500' }}>{activeFloorConfig.title}</span>
            <span 
              style={{ 
                color: 'var(--accent-color)', 
                fontSize: '8px',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              ▼
            </span>
          </div>

          {/* Floating dropdown overlay options drawer list */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2010,
                overflow: 'hidden',
                animation: 'dropdownFadeIn 0.25s cubic-bezier(0.25, 1, 0.5, 1) forwards'
              }}
            >
              {Object.entries(FLOOR_CONFIGS).map(([key, config]) => {
                const isSelected = selectedFloor === key;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedFloor(key);
                      setActiveSection(config.defaultRoom);
                      setShowDetailCard(false);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: isSelected ? 'var(--accent-color)' : 'var(--text-primary)',
                      backgroundColor: isSelected ? 'var(--accent-light)' : 'transparent',
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--accent-color)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                  >
                    <span style={{ fontWeight: isSelected ? '600' : '400' }}>{config.title}</span>
                    {isSelected && <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>✓</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Elegant Floating Glass Tooltip (For non-touch desktop cursors) */}
        {hoveredRoom && (
          <div 
            className="map-floating-tooltip"
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px`
            }}
          >
            <span>{activeFloorConfig.areas.find(a => a.key === hoveredRoom)?.icon}</span>
            <span>{activeFloorConfig.areas.find(a => a.key === hoveredRoom)?.title}</span>
          </div>
        )}

        {/* Full-Screen Interactive Lightbox System Modal */}
        {currentRoom && (
          <RoomLightbox 
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            images={currentImages}
            activeIndex={activeImageIdx}
            setActiveIndex={setActiveImageIdx}
            roomTitle={currentRoom.title}
          />
        )}

        {/* Click-Catching Backdrop (Mobile Popover centered mode only) */}
        {isMobile && showDetailCard && (
          <div 
            onClick={() => setShowDetailCard(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(26, 23, 20, 0.45)',
              backdropFilter: 'blur(4px)',
              zIndex: 1999,
              cursor: 'default'
            }}
          />
        )}

        {/* ==========================================================================
            RESPONSIVE RENDERING SECTIONS
            ========================================================================== */}

        {isMobile ? (
          /* ==========================================
             MOBILE VIEW: Centered Popover Details Card
             ========================================== */
          <>
            {showDetailCard && currentRoom && (
              <div 
                className="map-detail-overlay"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline', 
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '8px',
                    marginBottom: '4px'
                  }}
                >
                  <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: '600', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{currentRoom.icon}</span>
                    {currentRoom.title}
                  </h3>
                  
                  <button 
                    onClick={() => setShowDetailCard(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '22px',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px 8px',
                      lineHeight: '1'
                    }}
                  >
                    &times;
                  </button>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0' }}>
                  {currentRoom.description}
                </p>

                {/* Auto-cycling Image Slideshow */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  style={{ 
                    width: '100%', 
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: '4px',
                    marginTop: 'var(--space-2)'
                  }}
                >
                  {currentImages.length > 0 ? (
                    <>
                      <img 
                        src={currentImages[activeImageIdx].url} 
                        alt={currentRoom.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '28vh',
                          objectFit: 'contain',
                          opacity: isTransitioning ? 0 : 1,
                          transition: 'opacity 0.35s ease-in-out',
                          display: 'block'
                        }}
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(42, 37, 33, 0.7)',
                          color: '#FFF',
                          padding: '3px 6px',
                          borderRadius: '2px',
                          fontSize: '8px',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        🔍 Tap to Expand
                      </div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 20 }}>
                        {currentImages.map((_, idx) => (
                          <span 
                            key={idx}
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: idx === activeImageIdx ? 'var(--accent-color)' : 'rgba(255,255,255,0.4)',
                              transition: 'all 0.25s ease'
                            }}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {/* Mobile Map Blueprint Container */}
            <div 
              style={{ 
                width: '100%',
                maxWidth: '850px',
                margin: '0 auto',
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-4)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div 
                ref={mapContainerRef}
                style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', margin: '0 auto', overflow: 'hidden' }}
              >
                <img 
                  ref={imgRef}
                  src={getFloorPlanImage()} 
                  alt={`${activeFloorConfig.title} Plan`}
                  onLoad={handleImageLoad}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    maxHeight: '72vh',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />

                {/* SVG Overlay for both rect and polygon hitboxes */}
                {imgNatural.w > 1 && (
                  <svg
                    viewBox={`0 0 ${imgNatural.w} ${imgNatural.h}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
                  >
                    {activeFloorConfig.areas.map((area) => {
                      const isActive = activeSection === area.key && showDetailCard;
                      const fillColor = isActive ? 'rgba(197, 155, 39, 0.09)' : 'transparent';
                      const strokeColor = isActive ? 'rgba(197, 155, 39, 0.85)' : 'transparent';
                      const strokeWidth = isActive ? 4 : 2;

                      if (area.shape === 'poly') {
                        return (
                          <polygon
                            key={area.key}
                            points={area.polygon}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleSectionClick(area.key, e)}
                          />
                        );
                      }
                      const [x1, y1, x2, y2] = area.coords;
                      return (
                        <rect
                          key={area.key}
                          x={x1} y={y1}
                          width={x2 - x1} height={y2 - y1}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          rx={2}
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleSectionClick(area.key, e)}
                        />
                      );
                    })}
                  </svg>
                )}
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '14px', textAlign: 'center', lineHeight: '1.4', padding: '0 8px' }}>
                * Layout zones and room dimensions are approximate artistic representations. Actual scale and proportions may vary from the original sanctioned blueprints.
              </div>
            </div>
          </>
        ) : (
          /* ==========================================
             DESKTOP / LAPTOP VIEW: Beautiful Split Screen Layout
             ========================================== */
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 'var(--space-8)', 
              alignItems: 'stretch',
              marginTop: 'var(--space-4)'
            }}
          >
            {/* Left Column: Big Interactive Map */}
            <div 
              style={{ 
                flex: '1.4 1 55%', 
                minWidth: '320px', 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-6)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div 
                ref={mapContainerRef}
                onMouseMove={handleMouseMove}
                style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', margin: '0 auto', overflow: 'hidden' }}
              >
                <img 
                  ref={imgRef}
                  src={getFloorPlanImage()} 
                  alt={`${activeFloorConfig.title} Plan`}
                  onLoad={handleImageLoad}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    maxHeight: '78vh',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />

                {/* SVG Overlay for both rect and polygon hitboxes */}
                {imgNatural.w > 1 && (
                  <svg
                    viewBox={`0 0 ${imgNatural.w} ${imgNatural.h}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
                  >
                    {activeFloorConfig.areas.map((area) => {
                      const isActive = activeSection === area.key;
                      const isHovered = hoveredRoom === area.key;
                      const fillColor = isActive
                        ? 'rgba(197, 155, 39, 0.09)'
                        : isHovered
                          ? 'rgba(197, 155, 39, 0.04)'
                          : 'transparent';
                      const strokeColor = isActive
                        ? 'rgba(197, 155, 39, 0.85)'
                        : isHovered
                          ? 'rgba(197, 155, 39, 0.4)'
                          : 'transparent';
                      const strokeWidth = isActive ? 4 : 2;
                      const strokeDash = !isActive && isHovered ? '8 4' : 'none';

                      if (area.shape === 'poly') {
                        return (
                          <polygon
                            key={area.key}
                            points={area.polygon}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDash}
                            style={{ cursor: 'pointer', transition: 'fill 0.25s ease, stroke 0.25s ease' }}
                            onClick={(e) => handleSectionClick(area.key, e)}
                            onMouseEnter={() => setHoveredRoom(area.key)}
                            onMouseLeave={() => setHoveredRoom(null)}
                          />
                        );
                      }
                      const [x1, y1, x2, y2] = area.coords;
                      return (
                        <rect
                          key={area.key}
                          x={x1} y={y1}
                          width={x2 - x1} height={y2 - y1}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDash}
                          rx={2}
                          style={{ cursor: 'pointer', transition: 'fill 0.25s ease, stroke 0.25s ease' }}
                          onClick={(e) => handleSectionClick(area.key, e)}
                          onMouseEnter={() => setHoveredRoom(area.key)}
                          onMouseLeave={() => setHoveredRoom(null)}
                        />
                      );
                    })}
                  </svg>
                )}
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '14px', textAlign: 'center', lineHeight: '1.4', padding: '0 8px' }}>
                * Layout zones and room dimensions are approximate artistic representations. Actual scale and proportions may vary from the original sanctioned blueprints.
              </div>
            </div>

            {/* Right Column: Permanently Integrated Showcase Panel */}
            {currentRoom && (
              <div 
                style={{ 
                  flex: '1 1 35%', 
                  minWidth: '320px', 
                  backgroundColor: 'var(--bg-tertiary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'baseline', 
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: 'var(--space-2)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: '500', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{currentRoom.icon}</span>
                      {currentRoom.title}
                    </h3>
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Floor Plan
                    </span>
                  </div>
                  
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 var(--space-4) 0' }}>
                    {currentRoom.description}
                  </p>
                </div>

                {/* Slideshow Card with Lightbox launch */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to view full-screen gallery set"
                  style={{ 
                    width: '100%', 
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    padding: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {currentImages.length > 0 ? (
                    <>
                      <img 
                        src={currentImages[activeImageIdx].url} 
                        alt={currentRoom.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '48vh',
                          objectFit: 'contain',
                          opacity: isTransitioning ? 0 : 1,
                          transition: 'opacity 0.35s ease-in-out',
                          display: 'block'
                        }}
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(42, 37, 33, 0.7)',
                          color: '#FFF',
                          padding: '4px 8px',
                          borderRadius: '2px',
                          fontSize: '9px',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        🔍 Tap to Expand
                      </div>
                      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 20 }}>
                        {currentImages.map((_, idx) => (
                          <span 
                            key={idx}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: idx === activeImageIdx ? 'var(--accent-color)' : 'rgba(255,255,255,0.4)',
                              transition: 'all 0.25s ease'
                            }}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Micro guide link */}
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: 'var(--space-4)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    * Directly click any room on the plan blueprint — the details update instantly in real-time.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
