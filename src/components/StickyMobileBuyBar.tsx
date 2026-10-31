import React, { useState, useEffect } from 'react';
import { Colorway, Size } from '../types';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

interface StickyMobileBuyBarProps {
  colorway: Colorway;
  selectedSize: Size;
  onOrderNow: () => void;
}

export const StickyMobileBuyBar: React.FC<StickyMobileBuyBarProps> = ({
  colorway,
  selectedSize,
  onOrderNow,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 500px down on mobile
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const isComingSoon = colorway.status === 'coming_soon';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e12]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-10 h-10 bg-zinc-900 border border-white/10 shrink-0 p-1 flex items-center justify-center">
          <img
            src={colorway.image}
            alt={colorway.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-white truncate font-display">
            {colorway.name}
          </div>
          <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
            <span className="text-[#ff1a2b] font-bold">{colorway.price.toFixed(2)} AED</span>
            <span>·</span>
            <span>Size {colorway.category === 'headwear' ? 'OSFA' : selectedSize}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onOrderNow}
        className="px-5 py-2.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 shadow-md shadow-red-950/50 cursor-pointer active:scale-95 transition-transform"
      >
        <span>{isComingSoon ? 'Pre-Register' : 'Order Now'}</span>
      </button>
    </div>
  );
};
