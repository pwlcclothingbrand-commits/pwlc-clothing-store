import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X, RefreshCw } from 'lucide-react';

interface ProductViewerProps {
  imageSrc: string;
  productName: string;
}

export const ProductViewer: React.FC<ProductViewerProps> = ({
  imageSrc,
  productName,
}) => {
  const isHeadwear =
    productName.toLowerCase().includes('balaclava') ||
    productName.toLowerCase().includes('mask') ||
    imageSrc.includes('Balaclava');

  // Active view:
  // For T-Shirts: 'both' | 'front' | 'back'
  // For Headwear: 'full' | 'logo' | 'texture'
  const [activeView, setActiveView] = useState<string>(isHeadwear ? 'full' : 'both');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync default view when product category changes
  const [lastProduct, setLastProduct] = useState(productName);
  if (productName !== lastProduct) {
    setLastProduct(productName);
    setActiveView(isHeadwear ? 'full' : 'both');
  }

  // Handle ESC key for fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePosition({ x, y });
  };

  const getTransformStyle = () => {
    if (isHovered) {
      return {
        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        transform: 'scale(2.4)',
        transition: 'transform 0.1s ease-out, transform-origin 0.06s ease-out',
      };
    }

    if (isHeadwear) {
      switch (activeView) {
        case 'logo':
          return {
            transformOrigin: '50% 36%',
            transform: 'scale(2.2)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          };
        case 'texture':
          return {
            transformOrigin: '50% 55%',
            transform: 'scale(1.95)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          };
        case 'full':
        default:
          return {
            transformOrigin: '50% 50%',
            transform: 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          };
      }
    }

    // T-Shirt transform handling
    switch (activeView) {
      case 'front':
        return {
          transformOrigin: '25% 50%',
          transform: 'scale(1.9)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'back':
        return {
          transformOrigin: '75% 50%',
          transform: 'scale(1.9)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'both':
      default:
        return {
          transformOrigin: '50% 50%',
          transform: 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        };
    }
  };

  const handleNextSide = () => {
    if (isHeadwear) {
      setActiveView((prev) => (prev === 'full' ? 'logo' : prev === 'logo' ? 'texture' : 'full'));
    } else {
      setActiveView((prev) => (prev === 'both' ? 'front' : prev === 'front' ? 'back' : 'both'));
    }
  };

  const handlePrevSide = () => {
    if (isHeadwear) {
      setActiveView((prev) => (prev === 'full' ? 'texture' : prev === 'texture' ? 'logo' : 'full'));
    } else {
      setActiveView((prev) => (prev === 'back' ? 'front' : prev === 'front' ? 'both' : 'back'));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Studio Showcase Canvas */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square sm:aspect-[4/3] md:aspect-square lg:aspect-[16/11] w-full bg-gradient-to-b from-[#131317] via-[#0e0e12] to-[#08080a] border border-white/10 overflow-hidden group select-none flex items-center justify-center p-6 sm:p-10 shadow-2xl transition-all"
      >
        {/* Architectural Studio Lighting Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,26,43,0.08),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(255,255,255,0.04),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

        {/* Studio Product Flat-Lay Artwork */}
        <img
          src={imageSrc}
          alt={productName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain will-change-transform filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] cursor-crosshair transition-all duration-300"
          style={getTransformStyle()}
        />

        {/* Minimal Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevSide();
          }}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/80 hover:bg-[#ff1a2b] text-white flex items-center justify-center border border-white/10 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Previous view"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextSide();
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/80 hover:bg-[#ff1a2b] text-white flex items-center justify-center border border-white/10 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Next view"
        >
          <ChevronRight size={18} />
        </button>

        {/* View Badge (Top-Left) */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-white font-bold bg-[#ff1a2b] px-2.5 py-1 shadow-lg shadow-red-950/60">
            {isHeadwear
              ? activeView === 'logo'
                ? 'EMBROIDERED LOGO'
                : activeView === 'texture'
                ? 'COMPRESSION KNIT'
                : 'FULL SILHOUETTE'
              : activeView === 'front'
              ? 'FRONT CHEST SCRIPT'
              : activeView === 'back'
              ? 'BACK EARTH GRAPHIC'
              : 'DUAL SPREAD VIEW'}
          </span>
          <span className="hidden sm:inline-block text-[9px] font-mono text-zinc-400 bg-black/60 px-2 py-1 border border-white/5 backdrop-blur-md uppercase tracking-wider">
            300 GSM ARCHIVE
          </span>
        </div>

        {/* Fullscreen Expand Action (Top-Right) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="p-2 bg-black/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all backdrop-blur-md cursor-pointer shadow-lg"
            title="Expand Fullscreen View"
            aria-label="Expand Fullscreen View"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Interactive Loupe Status (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 pointer-events-none">
          <ZoomIn size={13} className="text-[#ff1a2b]" />
          <span>{isHovered ? '2.4x Magnifier Active' : 'Hover to inspect print & weave'}</span>
        </div>

        {/* Studio Technical Stamp (Bottom-Right) */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:block text-[9px] font-mono tracking-widest text-zinc-400 uppercase pointer-events-none">
          PWLC // VAULT SPEC
        </div>
      </div>

      {/* Preset View Switcher with Active Indicators */}
      {isHeadwear ? (
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: 'full', label: 'Full Silhouette', desc: 'Anatomical Mask' },
            { id: 'logo', label: 'PWLC Logo', desc: 'Scarlet Embroidery' },
            { id: 'texture', label: 'Eye Slit & Weave', desc: 'Thermal Knit' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveView(tab.id)}
              className={`p-3 text-left border transition-all cursor-pointer ${
                activeView === tab.id
                  ? 'bg-zinc-900 border-[#ff1a2b] text-white shadow-lg shadow-red-950/20'
                  : 'bg-[#111114] border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  {tab.label}
                </span>
                {activeView === tab.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
                )}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{tab.desc}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: 'both', label: 'Dual Spread', desc: 'Complete Piece' },
            { id: 'front', label: 'Front Chest', desc: 'PWLC Script' },
            { id: 'back', label: 'Back Earth', desc: 'Earth & Stars' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveView(tab.id)}
              className={`p-3 text-left border transition-all cursor-pointer ${
                activeView === tab.id
                  ? 'bg-zinc-900/95 border-[#ff1a2b] text-white shadow-lg shadow-red-950/20 ring-1 ring-[#ff1a2b]/30'
                  : 'bg-[#111114] border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  {tab.label}
                </span>
                {activeView === tab.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
                )}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{tab.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white uppercase">{productName}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[#ff1a2b] uppercase">HIGH-RESOLUTION INSPECTION</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-[#ff1a2b] text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <X size={14} />
              <span>Close (ESC)</span>
            </button>
          </div>

          {/* Fullscreen Showcase */}
          <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
            <img
              src={imageSrc}
              alt={productName}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] max-w-[92vw] object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Bottom Bar Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div>300 GSM COMBED ORGANIC COTTON · HIGH DENSITY SCREENPRINT</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFullscreen(false)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Exit Lightbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
