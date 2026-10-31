import React from 'react';
import { Colorway } from '../types';
import { HEADWEAR_ITEMS } from '../data/product';
import { Bell, Eye, ArrowUpRight } from 'lucide-react';

interface UpcomingDropsProps {
  comingSoonColorways: Colorway[];
  onSelectColorway: (colorway: Colorway) => void;
  onOpenRestockModal: (colorwayName: string) => void;
}

export const UpcomingDrops: React.FC<UpcomingDropsProps> = ({
  comingSoonColorways,
  onSelectColorway,
  onOpenRestockModal,
}) => {
  // All 4 Drop 02 preview items: Tactical Balaclava + 3 upcoming tees
  const allDrop02Items: Colorway[] = [
    HEADWEAR_ITEMS[0],
    ...comingSoonColorways.filter((c) => c.category === 't-shirt'),
  ];

  return (
    <section id="upcoming" className="py-24 border-t border-white/8 bg-[#09090b] relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,26,43,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#ff1a2b] font-bold mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
              <span>THE ARCHIVE VAULT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-display uppercase">
              Drop 02 Collection
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            LIMITED TO 6 UNITS PER SIZE · PRE-REGISTRATION OPEN
          </div>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allDrop02Items.map((item) => (
            <div
              key={item.id}
              className="bg-[#101014] border border-white/8 hover:border-white/25 transition-all flex flex-col justify-between group shadow-xl hover:shadow-2xl"
            >
              {/* Product Visual Pedestal */}
              <div
                onClick={() => {
                  onSelectColorway(item);
                  document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative aspect-square w-full bg-gradient-to-b from-[#16161b] via-[#121216] to-[#0d0d10] p-6 flex items-center justify-center cursor-pointer overflow-hidden border-b border-white/8 select-none"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-black/80 px-2 py-0.5 border border-white/10 backdrop-blur-sm">
                  DROP 02 PREVIEW
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2.5 py-1 text-xs text-white flex items-center gap-1.5 border border-white/10 backdrop-blur-sm">
                  <Eye size={12} className="text-[#ff1a2b]" />
                  <span>Inspect Piece</span>
                </div>
              </div>

              {/* Minimal Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                        style={{ backgroundColor: item.hex }}
                      />
                      <span className="text-zinc-400 text-[11px] font-mono">
                        {item.colorName}
                      </span>
                    </div>
                    <span className="font-mono text-white font-bold text-xs tabular-nums">
                      {item.price.toFixed(2)} AED
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      onSelectColorway(item);
                      document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm font-bold text-white group-hover:text-[#ff1a2b] transition-colors cursor-pointer truncate font-display uppercase tracking-tight flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-[#ff1a2b] shrink-0 ml-1" />
                  </h3>
                </div>

                {/* Pre-Register Action */}
                <button
                  type="button"
                  onClick={() => onOpenRestockModal(item.name)}
                  className="mt-5 w-full py-2.5 px-3 bg-zinc-900/90 hover:bg-[#ff1a2b] text-zinc-300 hover:text-white border border-white/10 hover:border-transparent text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <Bell size={12} />
                  <span>Pre-Register Drop</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
