import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ZoomIn, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

interface ProductViewerProps {
  imageSrc: string;
  productName: string;
}

type SideView = 'front' | 'back' | 'both';

export const ProductViewer: React.FC<ProductViewerProps> = ({ imageSrc, productName }) => {
  const [activeSide, setActiveSide] = useState<SideView>('front');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch & Mouse swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const mouseStartX = useRef<number | null>(null);
  const hasDragged = useRef<boolean>(false);

  // Auto-switch between front and back every 4 seconds
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setActiveSide((prev) => (prev === 'front' ? 'back' : 'front'));
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRotate, isHovered]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 35;

    if (diff > minSwipeDistance) {
      // Swiped left -> show Back
      setActiveSide('back');
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> show Front
      setActiveSide('front');
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    hasDragged.current = false;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current || mouseStartX.current === null) {
      isMouseDown.current = false;
      return;
    }
    const diff = mouseStartX.current - e.clientX;
    isMouseDown.current = false;

    if (Math.abs(diff) > 35) {
      hasDragged.current = true;
      if (diff > 35) {
        // Dragged left -> show Back
        setActiveSide('back');
      } else {
        // Dragged right -> show Front
        setActiveSide('front');
      }
    } else if (!hasDragged.current) {
      // Simple press/click -> flip side
      toggleSide();
    }
    mouseStartX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePosition({ x, y });
  };

  const toggleSide = () => {
    setActiveSide((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  // Determine transform style for front, back, or full spread
  const getTransformStyle = () => {
    // If hovering with mouse, enable precision zoom
    if (isHovered) {
      return {
        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        transform: 'scale(2.2)',
        transition: 'transform 0.15s ease-out',
      };
    }

    switch (activeSide) {
      case 'front':
        // Smoothly center the left front shirt
        return {
          transformOrigin: '25% 50%',
          transform: 'scale(1.9)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'back':
        // Smoothly center the right back shirt with Earth graphic
        return {
          transformOrigin: '75% 50%',
          transform: 'scale(1.9)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'both':
      default:
        return {
          transformOrigin: '50% 50%',
          transform: 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Showcase Canvas */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          isMouseDown.current = false;
        }}
        onMouseMove={handleMouseMove}
        className="relative aspect-square sm:aspect-[4/3] md:aspect-square lg:aspect-[16/11] w-full bg-[#121215] border border-white/5 overflow-hidden group select-none cursor-grab active:cursor-grabbing flex items-center justify-center p-4 sm:p-6"
      >
        {/* Subtle grid background texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Studio Product Image */}
        <img
          src={imageSrc}
          alt={productName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain will-change-transform filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          style={getTransformStyle()}
        />

        {/* Left / Right Chevron Controls for Quick Flip */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSide();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 hover:bg-[#ff1a2b] text-white flex items-center justify-center border border-white/10 transition-colors shadow-lg"
          aria-label="View previous side"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSide();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 hover:bg-[#ff1a2b] text-white flex items-center justify-center border border-white/10 transition-colors shadow-lg"
          aria-label="View next side"
        >
          <ChevronRight size={18} />
        </button>

        {/* Active Side Indicator Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white font-bold bg-[#ff1a2b] px-2 py-0.5">
              {activeSide === 'front' ? 'FRONT VIEW' : activeSide === 'back' ? 'BACK VIEW (EARTH)' : 'FRONT & BACK'}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 border border-white/10 hidden sm:inline">
              Swipe or tap arrows
            </span>
          </div>
        </div>

        {/* 4-Second Auto-Rotation Pill */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
              autoRotate
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Toggle 4-second auto-switching"
          >
            {autoRotate ? (
              <>
                <RefreshCw size={11} className="animate-spin text-amber-400" />
                <span>4s Auto-Switch ON</span>
              </>
            ) : (
              <>
                <Play size={11} />
                <span>Auto-Switch Paused</span>
              </>
            )}
          </button>
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] text-zinc-400 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/10 pointer-events-none z-10">
          <ZoomIn size={12} className="text-[#ff1a2b]" />
          <span>Swipe left/right or hover to zoom</span>
        </div>
      </div>

      {/* Preset View Switcher & Tabs */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          onClick={() => {
            setActiveSide('front');
          }}
          className={`p-3 text-center border transition-all ${
            activeSide === 'front'
              ? 'bg-zinc-900 border-[#ff1a2b] text-white font-bold'
              : 'bg-[#121215] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
          }`}
        >
          <div className="uppercase tracking-wider text-[11px] flex items-center justify-center gap-1.5">
            <span>Front Side</span>
            {activeSide === 'front' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />}
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">PWLC Chest Script</div>
        </button>

        <button
          onClick={() => {
            setActiveSide('back');
          }}
          className={`p-3 text-center border transition-all ${
            activeSide === 'back'
              ? 'bg-zinc-900 border-[#ff1a2b] text-white font-bold'
              : 'bg-[#121215] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
          }`}
        >
          <div className="uppercase tracking-wider text-[11px] flex items-center justify-center gap-1.5">
            <span>Back Side</span>
            {activeSide === 'back' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />}
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Earth Graphic & Stars</div>
        </button>

        <button
          onClick={() => {
            setActiveSide('both');
          }}
          className={`p-3 text-center border transition-all ${
            activeSide === 'both'
              ? 'bg-zinc-900 border-[#ff1a2b] text-white font-bold'
              : 'bg-[#121215] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
          }`}
        >
          <div className="uppercase tracking-wider text-[11px] flex items-center justify-center gap-1.5">
            <span>Dual View</span>
            {activeSide === 'both' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />}
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Front & Back Together</div>
        </button>
      </div>
    </div>
  );
};
