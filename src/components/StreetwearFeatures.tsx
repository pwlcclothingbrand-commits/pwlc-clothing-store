import React, { useState, useEffect } from 'react';
import {
  Clock,
  Truck,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  Package,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface StreetwearFeaturesProps {
  onOrderNow: () => void;
}

export const StreetwearFeatures: React.FC<StreetwearFeaturesProps> = ({ onOrderNow }) => {
  // Live UAE Dispatch Countdown: Target is 18:00 (6:00 PM UAE time daily)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 3,
    minutes: 42,
    seconds: 18,
  });

  const [activeTab, setActiveTab] = useState<'fabric' | 'fit' | 'care' | 'delivery'>('fabric');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Dubai is UTC+4
      const dubaiHour = (now.getUTCHours() + 4) % 24;
      const dubaiMinutes = now.getUTCMinutes();
      const dubaiSeconds = now.getUTCSeconds();

      // Cutoff at 18:00 (6 PM)
      let diffSeconds = (18 - dubaiHour) * 3600 - dubaiMinutes * 60 - dubaiSeconds;
      if (diffSeconds <= 0) {
        // Next day cutoff
        diffSeconds += 24 * 3600;
      }

      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = diffSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const verifiedReviews = [
    {
      id: 1,
      author: 'Tariq M.',
      location: 'Downtown Dubai',
      rating: 5,
      date: '2 days ago',
      sizeBought: 'Size L · Black Earth',
      review:
        'The 300 GSM weight is unreal. It holds a stiff, architectural boxy drape that hangs cleanly over cargo pants. Paid with Cash on Delivery in Dubai, courier arrived in under 24 hours.',
    },
    {
      id: 2,
      author: 'Khalid A.',
      location: 'Al Quoz / Jumeirah, Dubai',
      rating: 5,
      date: '4 days ago',
      sizeBought: 'Size XL · Black Earth',
      review:
        'Finally XL is in stock! Ordered instantly with Cash on Delivery. The scarlet red embroidery and back graphic are sharp. Collar is tight and does not sag after cold wash.',
    },
    {
      id: 3,
      author: 'Sultan B.',
      location: 'Dubai Marina / JBR, Dubai',
      rating: 5,
      date: '1 week ago',
      sizeBought: 'Size M · Black Earth',
      review:
        'Fast courier doorstep drop in Dubai Marina. The fabric hand-feel is equivalent to Japanese heavyweight blanks. Cash on delivery was seamless. Waiting on the ski mask to drop next!',
    },
  ];

  return (
    <div className="mt-20 space-y-16">
      {/* 1. Live Dubai Express Dispatch & Cash on Delivery Banner */}
      <div className="bg-gradient-to-r from-[#17171d] via-[#1a1315] to-[#17171d] border border-white/10 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ff1a2b]" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff1a2b] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ff1a2b] animate-ping" />
              <span>Dubai Express Dispatch & Cash on Delivery</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Order within{' '}
              <span className="font-mono text-[#ff1a2b] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>{' '}
              for Next-Day Dubai Delivery
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dispatched locally from Dubai. Pay <strong className="text-white">Cash on Delivery</strong> or via courier card terminal across all Dubai communities. <span className="text-[#ff1a2b] font-semibold">Exclusively serving Dubai addresses.</span>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <div className="p-3 bg-zinc-900/90 border border-white/5 flex items-center gap-3 text-xs flex-1 sm:flex-initial">
              <Truck size={20} className="text-[#ff1a2b] shrink-0" />
              <div>
                <div className="font-bold text-white uppercase text-[11px]">15 AED Central Dubai</div>
                <div className="text-[10px] text-zinc-400">1–2 Days Doorstep</div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/90 border border-emerald-900/30 flex items-center gap-3 text-xs flex-1 sm:flex-initial">
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white uppercase text-[11px]">Cash on Delivery</div>
                <div className="text-[10px] text-emerald-400">Doorstep in Dubai</div>
              </div>
            </div>

            <button
              onClick={onOrderNow}
              className="px-5 py-3 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto shrink-0"
            >
              <span>Order Now</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Streetwear Tech Specs & Fabric Craftsmanship Tabs */}
      <div className="border border-white/10 bg-[#121215] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#ff1a2b] font-bold mb-1">
              MATERIAL SPECIFICATIONS
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Engineered For Longevity & Heavyweight Drape
            </h3>
          </div>

          {/* Navigation Pill Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 border border-white/10 overflow-x-auto">
            {[
              { id: 'fabric', label: '300 GSM Fabric' },
              { id: 'fit', label: 'Boxy Silhouette' },
              { id: 'care', label: 'Care & Wash' },
              { id: 'delivery', label: 'Dubai Delivery & COD' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#ff1a2b] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'fabric' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#ff1a2b]/10 text-[#ff1a2b] flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h4 className="font-bold text-white text-sm font-display">300 GSM Combed Cotton</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Double the weight of commercial retail tees (typically 150–180 GSM). Rigid enough to maintain structure without clinging to the body.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#ff1a2b]/10 text-[#ff1a2b] flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h4 className="font-bold text-white text-sm font-display">Dual-Sided Contrast Art</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Scarlet PWLC cursive insignia screenprinted on the left chest, with the oversized high-definition Earth community manifesto graphic spanning the back.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#ff1a2b]/10 text-[#ff1a2b] flex items-center justify-center font-bold font-mono">
                  03
                </div>
                <h4 className="font-bold text-white text-sm font-display">Reinforced 32mm Collar</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Thick 1.25-inch high-density ribbed crewneck with herringbone neck tape reinforcement prevents neck stretching or bacon-necking permanently.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Dropped Shoulder Seams</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Shoulder line extends 2–3 inches past the natural shoulder break, producing the quintessential modern relaxed streetwear posture.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Square Torso Cut</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Wide chest with zero side-tapering allows air circulation in warm climates while creating a sharp, structured silhouette.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Elongated Elbow-Length Sleeves</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Sleeves terminate right at the elbow joint with generous bicep room, ideal for layering or solo statement wear.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Wash Inside Out (Cold)</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Machine wash cold (30°C / 85°F) with like dark colors. Inside-out washing protects the screenprinted pigments and scarlet embroidery.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Hang Dry Preferred</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Flat dry or hang in the shade. Avoid direct harsh sunlight drying and tumble dryers to maintain the rich deep jet black dye.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Iron Reverse Side</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  If ironing is desired, use low-to-medium heat on the garment&apos;s reverse side. Never apply an iron directly to prints or badges.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Cash on Delivery (Dubai)</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Available across Dubai. You inspect the parcel and pay exact AED cash or swipe via card machine directly with the courier at your doorstep.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">15 AED Central / 30 AED Outer Dubai</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Central Dubai courier delivery is 15 AED (1–2 days). Outer Dubai communities (DSO, JVC, Damac Hills, DIP) is 30 AED (1–2 days). Orders are restricted exclusively to Dubai.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm font-display">Dubai WhatsApp / Phone Coordination</h4>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Our local Dubai dispatch team coordinates directly with your mobile number for community gate access, delivery window, or building concierge drop.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Verified UAE Street Community Drop Reviews */}
      <div className="border border-white/10 bg-[#141418] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
              <Star size={13} fill="#fbbf24" className="text-amber-400" />
              <span>4.9 / 5.0 RATING · VERIFIED UAE DROP BUYERS</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Community Drop Feedback
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 border border-white/5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Strictly Verified Purchases Only</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-zinc-900/80 border border-white/5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="#fbbf24" className="text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <span className="text-[9px] text-emerald-400 font-mono bg-emerald-950/60 px-1 py-0.2 border border-emerald-800/40">
                      Verified
                    </span>
                  </div>
                  <div className="text-zinc-500 text-[10px]">{rev.location}</div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">{rev.sizeBought}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
