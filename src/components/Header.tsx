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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090b]/92 border-b border-white/8 transition-all">
      {/* Slim Promotional Drop Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#141419] via-[#1a1114] to-[#141419] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-300">
          <div className="w-6 hidden sm:block" />
          <div className="flex items-center gap-2.5 justify-center text-center mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 text-[#ff1a2b] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b] animate-ping" />
              <span>DROP 01 LIVE</span>
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-white font-medium">DUBAI DISPATCH</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">CASH ON DELIVERY AVAILABLE</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark + subtle luxury subtitle */}
        <a
          href="#product"
          className="group flex flex-col justify-center shrink-0 select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#ff1a2b] font-display transition-colors">
              PWLC
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#ff1a2b] uppercase font-bold border border-[#ff1a2b]/30 bg-[#ff1a2b]/10 px-1.5 py-0.5">
              001
            </span>
          </div>
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-zinc-400 -mt-1 group-hover:text-zinc-300 transition-colors">
            PEOPLE WHO LOVE CLOTHES
          </span>
        </a>

        {/* Zone 2: clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-zinc-400 font-mono">
          <a
            href="#product"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b] flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
            <span>Drop 01 (Live)</span>
          </a>
          <a
            href="#upcoming"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            Drop 02 Preview
          </a>
          <a
            href="#sizing"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#ff1a2b]"
          >
            Size Guide
          </a>
        </nav>

        {/* Zone 3: actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dubai AED Indicator */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-mono text-zinc-400 bg-zinc-900/60 border border-white/5">
            <span className="text-zinc-500">AED</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-300 font-medium">Dubai, UAE</span>
          </div>

          {onOpenOrders && (
            <button
              onClick={onOpenOrders}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="View Brand Orders Hub"
              title="Brand Orders Hub (Direct Dispatch)"
            >
              <Package size={14} className="text-[#ff1a2b]" />
              <span className="hidden sm:inline">Orders</span>
              {ordersCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#ff1a2b] text-white text-[10px] font-bold font-mono">
                  {ordersCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#ff1a2b] hover:bg-[#e01424] transition-all whitespace-nowrap shrink-0 group active:scale-[0.98] cursor-pointer shadow-lg shadow-red-950/40 hover:shadow-red-600/30"
            aria-label="Order PWLC 001 Now"
          >
            <ShoppingBag size={14} className="text-white" />
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-white text-black text-[10px] font-bold font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
