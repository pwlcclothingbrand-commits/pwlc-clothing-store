import React, { useState } from 'react';
import { ShoppingBag, X, Package } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  ordersCount?: number;
  onOpenOrders?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  ordersCount = 0,
  onOpenOrders,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0b0d]/90 border-b border-white/5 transition-all">
      {/* Slim Promotional Drop Banner */}
      {showBanner && (
        <div className="bg-[#141418] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-[11px] font-medium tracking-wider text-zinc-300">
          <div className="w-6" />
          <div className="flex items-center gap-2">
            <span className="text-[#ff1a2b] font-bold">PWLC EARTH SERIES</span>
            <span>·</span>
            <span className="text-zinc-200">TEES 75 AED · SKI MASK 35 AED</span>
            <span>·</span>
            <span className="text-[#ff1a2b] font-semibold bg-[#ff1a2b]/10 border border-[#ff1a2b]/30 px-2 py-0.5 text-[10px] tracking-wider uppercase">
              DUBAI ORDERS ONLY
            </span>
            <span>·</span>
            <span className="hidden sm:inline text-zinc-400">DELIVERY: 15 AED CENTRAL DUBAI · 30 AED OUTER DUBAI</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-zinc-400 hover:text-white p-0.5 transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#product"
          className="group flex items-baseline gap-1 text-2xl font-black tracking-tighter text-white whitespace-nowrap shrink-0 font-display"
        >
          <span>PWLC</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
        </a>

        {/* Zone 2: clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-widest uppercase text-zinc-400">
          <a
            href="#product"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            T-Shirts (Live)
          </a>
          <a
            href="#headwear"
            className="text-zinc-200 hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b] flex items-center gap-1.5"
          >
            <span>Ski Mask (Headwear)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
          </a>
          <a
            href="#upcoming"
            className="text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            Drop 02 Tees
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            Craftsmanship
          </a>
          <a
            href="#sizing"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            Sizing Guide
          </a>
        </nav>

        {/* Zone 3: actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenOrders && (
            <button
              onClick={onOpenOrders}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="View Brand Orders Hub"
              title="Brand Orders Hub (Direct Dispatch)"
            >
              <Package size={14} className="text-[#ff1a2b]" />
              <span className="hidden sm:inline">Brand Orders</span>
              {ordersCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#ff1a2b] text-white text-[10px] font-bold font-mono">
                  {ordersCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#ff1a2b] hover:bg-[#e01424] transition-colors whitespace-nowrap shrink-0 group active:scale-[0.98] cursor-pointer shadow-md shadow-red-600/20"
            aria-label="Order PWLC 001 Now"
          >
            <ShoppingBag size={14} className="text-white" />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
