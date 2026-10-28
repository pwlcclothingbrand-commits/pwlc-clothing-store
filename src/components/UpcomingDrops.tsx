import React from 'react';
import { Colorway } from '../types';
import { Bell, Eye, Clock, Sparkles } from 'lucide-react';

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
  return (
    <section id="upcoming" className="py-20 border-t border-white/5 bg-[#0e0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold mb-2 flex items-center gap-1.5">
              <Clock size={13} />
              <span>PWLC EARTH SERIES · COMING SOON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Upcoming Earth Design Editions
            </h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl leading-relaxed">
              PWLC 002 Pink Earth, PWLC 003 White Earth, and PWLC 004 Light Blue Earth. Each 75 AED with 15 AED local / 30 AED standard delivery. Strictly 6 pieces per size upon release.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Pre-Registration Roster Open</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonColorways.map((c) => {
            return (
              <div
                key={c.id}
                className="group bg-[#141418] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => {
                      onSelectColorway(c);
                      const target = document.getElementById('product');
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative aspect-square w-full bg-[#18181c] p-6 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Tag overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5">
                      <span>COMING SOON</span>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2.5 py-1 text-[11px] text-white flex items-center gap-1.5 border border-white/10">
                      <Eye size={12} className="text-[#ff1a2b]" />
                      <span>Inspect</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-zinc-400 text-[11px] font-medium">
                          {c.colorName}
                        </span>
                      </div>
                      <span className="font-mono text-zinc-200 font-bold text-xs tabular-nums">
                        {c.price.toFixed(2)} AED
                      </span>
                    </div>

                    <h3
                      onClick={() => {
                        onSelectColorway(c);
                        const target = document.getElementById('product');
                        target?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm font-bold text-white group-hover:text-[#ff1a2b] transition-colors cursor-pointer line-clamp-1 font-display"
                    >
                      {c.name}
                    </h3>

                    <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {c.washDetails}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onSelectColorway(c);
                      const target = document.getElementById('product');
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-3 text-[11px] font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-center transition-colors"
                  >
                    View Cut
                  </button>
                  <button
                    onClick={() => onOpenRestockModal(c.name)}
                    className="py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider bg-[#ff1a2b] hover:bg-[#e01424] text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    <Bell size={12} />
                    <span>Drop Alert</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drop 02 Syndicate Note */}
        <div className="mt-12 p-6 bg-[#141418] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Want guaranteed access to Drop 02?
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Drop 02 will release with only 6 shirts per size. Pre-registered members receive priority access 30 minutes in advance.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenRestockModal('Drop 02 All Colorways')}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-white hover:bg-zinc-200 text-black whitespace-nowrap transition-colors shrink-0"
          >
            Pre-Register for All 4 Colorways
          </button>
        </div>
      </div>
    </section>
  );
};
