import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
  };

  return (
    <section id="manifesto" className="py-24 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-widest uppercase text-[#ff1a2b] font-bold mb-3">
              THE PWLC ETHOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
              People Who Loves Clothes
            </h2>
            <div className="mt-6 space-y-4 text-sm text-zinc-400 leading-relaxed max-w-xl">
              <p>
                PWLC was born from a singular obsession: the tactile weight, enduring silhouette, and raw character of clothing that matters. We do not manufacture disposable seasonal fast-fashion.
              </p>
              <p>
                Every release is treated as an isolated drop with strict production caps. Once a drop sells through, it returns to the archive. For Drop 01, we produced strictly 6 pieces per size—ensuring every garment in circulation is genuine, scarce, and preserved with artisan care.
              </p>
              <p className="text-zinc-300 font-medium">
                Made for the purists. Made for people who truly love clothes.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10 font-mono">
              <div>
                <div className="text-2xl font-black text-white">01</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1">
                  Inaugural Drop
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#ff1a2b] tabular-nums">06</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1">
                  Units Per Size
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tabular-nums">300</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1">
                  GSM Cotton
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: VIP Drop Access Signup */}
          <div className="lg:col-span-5 bg-[#141418] border border-white/10 p-8 sm:p-10 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff1a2b]" />

            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 tracking-widest mb-2">
              <Mail size={14} className="text-[#ff1a2b]" />
              <span>INNER CIRCLE · DROP 02</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-3">
              Private Drop Password
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Members receive the storefront unlock code 30 minutes prior to public release. Limited to 500 members globally.
            </p>

            {!joined ? (
              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for password access"
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff1a2b]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-white hover:bg-zinc-200 text-black flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Request Membership Access</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-950/30 border border-emerald-900/40 text-emerald-400 text-xs flex items-start gap-3">
                <Check size={18} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Access Granted</strong>
                  <span>Your email ({email}) has been added to the Drop 02 private release roster.</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-zinc-500 text-center">
              Direct contact: <a href="mailto:pwlcclothingbrand@gmail.com" className="text-zinc-300 hover:underline">pwlcclothingbrand@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
