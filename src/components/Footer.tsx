import React from 'react';
import { RotateCcw } from 'lucide-react';

interface FooterProps {
  onResetInventory: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetInventory }) => {
  return (
    <footer className="border-t border-white/5 bg-[#09090b] text-zinc-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-1 text-2xl font-black text-white font-display">
              <span>PWLC</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a2b]" />
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              People Who Loves Clothes. Heavyweight garments engineered with intentional architectural silhouettes and hand-finished washes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Store
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#product" className="hover:text-white transition-colors">
                  Drop 01: Signature Washed Tee
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  300 GSM Fabrication
                </a>
              </li>
              <li>
                <a href="#sizing" className="hover:text-white transition-colors">
                  Fit & Measurements
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">
                  The PWLC Manifesto
                </a>
              </li>
            </ul>
          </div>

          {/* Drop Policies */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Drop Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>Strict 6-piece limit per size</li>
              <li>Tracked global shipping</li>
              <li>14-day return privilege</li>
              <li>Pre-shrunk 100% combed cotton</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Direct Inquiries
            </h4>
            <p className="text-xs text-zinc-500 mb-2">
              For wholesale inquiries or archival support:
            </p>
            <a
              href="mailto:pwlcclothingbrand@gmail.com"
              className="text-white hover:text-[#ff1a2b] font-mono text-xs transition-colors block underline"
            >
              pwlcclothingbrand@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <div>
            © {new Date().getFullYear()} PWLC · PEOPLE WHO LOVES CLOTHES. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onResetInventory}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Reset stock to initial release numbers (6 for S/M/L, 0 for XS/XL/XXL)"
            >
              <RotateCcw size={12} />
              <span>Reset Drop Stock</span>
            </button>
            <span>·</span>
            <span>Worldwide Release</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
