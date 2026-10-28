import React from 'react';
import { Layers, Droplets, Scissors, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCT_DATA } from '../data/product';

export const SpecsSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 border-t border-white/5 bg-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#ff1a2b] font-bold mb-2">
            ENGINEERING & ANATOMY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Built for Longevity. Engineered for Weight.
          </h2>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
            Every garment in Drop 01 is developed from raw organic long-staple combed cotton, custom-knit to a dense 300 GSM weight to maintain an architectural boxy drape that resists warping, bacon-necking, or shrinking.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-[#141418] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ff1a2b] mb-4">
                <Layers size={20} />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                01. DENSITY
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                300 GSM Combed Compact Cotton
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Substantially heavier than conventional high-street tees (typically 160–180 GSM). Delivers structure, opaque coverage, and a luxury tactile handfeel.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex justify-between">
              <span>Yarn Count</span>
              <span className="text-white font-semibold">16s Compact Single</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-[#141418] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ff1a2b] mb-4">
                <Droplets size={20} />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                02. FINISH
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                Vintage Mineral Enzyme Wash
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hand-treated in small artisan batches with natural enzyme washing to soften the fibers and produce nuanced tonal high-and-low gray-black fades along seam lines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex justify-between">
              <span>Patina</span>
              <span className="text-white font-semibold">Individual Mineral Wash</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-[#141418] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ff1a2b] mb-4">
                <Scissors size={20} />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                03. SILHOUETTE
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                Dropped Shoulder Boxy Drape
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generously broadened shoulder seam combined with straight-cut side panels and a slightly cropped torso creates the quintessential high-fashion streetwear posture.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex justify-between">
              <span>Seams</span>
              <span className="text-white font-semibold">Twin-Needle Reinforced</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-[#141418] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ff1a2b] mb-4">
                <Sparkles size={20} />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                04. GRAPHIC
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">
                High-Density Scarlet Screenprint
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Vibrant scarlet red PWLC signature script paired with crisp white &quot;PEOPLE WHO LOVES CLOTHES&quot; typography, cured at high temperature to avoid cracking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex justify-between">
              <span>Cure</span>
              <span className="text-white font-semibold">Plastisol High-Bond</span>
            </div>
          </div>
        </div>

        {/* Detailed Spec List & Garment Care */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Construction checklist */}
          <div className="p-6 bg-[#141418] border border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#ff1a2b]" />
              <span>Full Garment Specifications</span>
            </h4>
            <ul className="space-y-3 text-xs text-zinc-300">
              {PRODUCT_DATA.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#ff1a2b] font-mono font-bold">›</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Garment Care Instructions */}
          <div className="p-6 bg-[#141418] border border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <ShieldAlert size={16} className="text-zinc-400" />
              <span>Care & Longevity Protocol</span>
            </h4>
            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <p>
                To maintain the vintage mineral wash patina and the integrity of the scarlet print for decades:
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-zinc-900 border border-white/5">
                  <div className="font-semibold text-white uppercase text-[11px]">Washing</div>
                  <div className="text-zinc-400 text-[11px] mt-1">Wash cold (30°C / 85°F) inside out with similar darks.</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/5">
                  <div className="font-semibold text-white uppercase text-[11px]">Drying</div>
                  <div className="text-zinc-400 text-[11px] mt-1">Line dry flat in shade. Do not tumble dry.</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/5">
                  <div className="font-semibold text-white uppercase text-[11px]">Ironing</div>
                  <div className="text-zinc-400 text-[11px] mt-1">Cool iron inside out. Never iron directly over chest print.</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-white/5">
                  <div className="font-semibold text-white uppercase text-[11px]">Bleaching</div>
                  <div className="text-zinc-400 text-[11px] mt-1">Do not bleach or dry clean.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
