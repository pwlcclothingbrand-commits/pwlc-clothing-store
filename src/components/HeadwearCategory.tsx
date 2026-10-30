import React from 'react';
import { HEADWEAR_ITEMS, HEADWEAR_DATA } from '../data/product';
import { Colorway } from '../types';
import { Bell, Eye, ShieldCheck, Flame, Wind, Sparkles, Check, Truck } from 'lucide-react';

interface HeadwearCategoryProps {
  onSelectHeadwear: (item: Colorway) => void;
  onOpenRestockModal: (itemName: string) => void;
}

export const HeadwearCategory: React.FC<HeadwearCategoryProps> = ({
  onSelectHeadwear,
  onOpenRestockModal,
}) => {
  const mask = HEADWEAR_ITEMS[0];

  return (
    <section id="headwear" className="py-20 border-t border-white/5 bg-[#0d0d10] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#ff1a2b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#ff1a2b] font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff1a2b] animate-ping" />
              <span>CATEGORY: HEADWEAR & ACCESSORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display">
              PWLC Tactical Ski Mask / Balaclava
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Separated into our dedicated headwear line. Engineered from resilient 4-way compression thermal knit with signature high-density scarlet embroidery. Drop 02 limited allocation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider font-semibold">
              Drop 02 · Coming Soon
            </span>
            <span className="text-xs font-mono text-zinc-400">
              35.00 AED
            </span>
          </div>
        </div>

        {/* Standalone Feature Card */}
        <div className="bg-[#141418] border border-white/10 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Impact Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => onSelectHeadwear(mask)}
              className="relative aspect-square w-full max-w-md bg-[#18181c] p-8 flex items-center justify-center cursor-pointer group border border-white/5 hover:border-white/20 transition-all overflow-hidden"
            >
              <img
                src={mask.image}
                alt={mask.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-300 border border-amber-500/30">
                HEADWEAR DROP 02
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 text-xs text-white flex items-center gap-1.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={13} className="text-[#ff1a2b]" />
                <span>Load in 3D Viewer</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono text-zinc-500">
                Authentic PWLC Tactical Embroidery Pattern
              </span>
            </div>
          </div>

          {/* Right: Technical Specs & Pre-Registration Module */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                <span className="text-white font-bold">{mask.dropNumber}</span>
                <span>·</span>
                <span className="text-[#ff1a2b] font-semibold">{mask.colorName}</span>
                <span>·</span>
                <span>{HEADWEAR_DATA.fit}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                {mask.name}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {mask.description}
              </p>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {HEADWEAR_DATA.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-900/80 border border-white/5 flex items-start gap-2.5 text-xs text-zinc-300"
                  >
                    <Check size={14} className="text-[#ff1a2b] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing, Payment & Dispatch Details */}
            <div className="p-4 bg-black/40 border border-white/5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase">
                    Launch Allocation Price
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    35.00 AED
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center justify-end gap-1">
                    <Check size={13} />
                    <span>Cash on Delivery (COD) Enabled</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Dubai Delivery: 15 AED Central · 30 AED Outer
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onSelectHeadwear(mask);
                  const target = document.getElementById('product');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-1/2 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Eye size={14} className="text-[#ff1a2b]" />
                <span>Inspect in Main Viewer</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenRestockModal(mask.name)}
                className="w-full sm:w-1/2 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-[#ff1a2b] hover:bg-[#e01424] text-white flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
              >
                <Bell size={14} />
                <span>Pre-Register for Ski Mask</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
