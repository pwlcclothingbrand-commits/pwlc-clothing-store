import React, { useState, useRef } from 'react';
import { ZoomIn, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductViewerProps {
  imageSrc: string;
  productName: string;
}

type ViewMode = 'full' | 'chest' | 'collar' | 'texture';

export const ProductViewer: React.FC<ProductViewerProps> = ({ imageSrc, productName }) => {
  const [activeView, setActiveView] = useState<ViewMode>('full');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePosition({ x, y });
  };

  // Determine transform based on view mode or hover
  const getTransformStyle = () => {
    if (isHovered && activeView === 'full') {
      return {
        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        transform: 'scale(1.9)',
      };
    }

    switch (activeView) {
      case 'chest':
        // The PWLC red logo is on the left chest (viewer's right chest)
        return {
          transformOrigin: '62% 30%',
          transform: 'scale(2.4)',
        };
      case 'collar':
        return {
          transformOrigin: '50% 12%',
          transform: 'scale(2.5)',
        };
      case 'texture':
        return {
          transformOrigin: '40% 65%',
          transform: 'scale(2.2)',
        };
      case 'full':
      default:
        return {
          transformOrigin: '50% 50%',
          transform: 'scale(1)',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Showcase Canvas */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square w-full bg-[#121215] border border-white/5 overflow-hidden group select-none cursor-crosshair flex items-center justify-center p-6 md:p-10"
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
          className="w-full h-full object-contain transition-transform duration-300 ease-out will-change-transform filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          style={getTransformStyle()}
        />

        {/* Editorial Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff1a2b] font-bold">
            DROP 01 // ARCHIVE
          </span>
          <span className="text-[11px] font-medium text-zinc-400">
            300 GSM Heavyweight
          </span>
        </div>

        <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5 pointer-events-none">
          <ShieldCheck size={13} className="text-zinc-400" />
          <span>Authentic Garment</span>
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 pointer-events-none transition-opacity">
          <ZoomIn size={12} className="text-[#ff1a2b]" />
          <span>Hover to inspect grain & chest print</span>
        </div>
      </div>

      {/* Preset Inspection Angles */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        {[
          { id: 'full', label: 'Full Cut', desc: 'Boxy Silhouette' },
          { id: 'chest', label: 'Chest Graphic', desc: 'PWLC Scarlet Print' },
          { id: 'collar', label: 'Collar Rib', desc: '1.25" Non-Sag' },
          { id: 'texture', label: 'Mineral Wash', desc: 'Enzyme Patina' },
        ].map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewMode)}
              className={`p-2.5 text-left transition-all border ${
                isActive
                  ? 'bg-zinc-900 border-[#ff1a2b] text-white'
                  : 'bg-[#121215] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              <div className="font-semibold text-[11px] uppercase tracking-wider text-white flex items-center justify-between">
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />}
              </div>
              <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                {item.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
