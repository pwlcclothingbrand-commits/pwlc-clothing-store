import React from 'react';
import { RotateCcw, Package, Mail } from 'lucide-react';

interface FooterProps {
  onResetInventory: () => void;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetInventory, onOpenOrders }) => {
  return (
    <footer className="border-t border-white/5 bg-[#09090b] text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div>
            <div className="text-2xl font-black text-white font-display tracking-tight">
              PWLC
            </div>
            <p className="text-zinc-500 text-xs mt-1 font-mono">
              PEOPLE WHO LOVES CLOTHES · 300 GSM HEAVYWEIGHT COTTON · DUBAI EXCLUSIVE DISPATCH
            </p>
          </div>

          {/* Quick Links & Contact */}
          <div className="flex items-center gap-6 flex-wrap text-xs font-mono">
            <a href="#product" className="text-zinc-400 hover:text-white transition-colors">
              T-Shirts
            </a>
            <a href="#product" className="text-zinc-400 hover:text-white transition-colors">
              Ski Mask
            </a>
            <a href="#upcoming" className="text-zinc-400 hover:text-white transition-colors">
              Drop 02
            </a>
            <a href="#sizing" className="text-zinc-400 hover:text-white transition-colors">
              Sizing
            </a>
            <a
              href="mailto:pwlcclothingbrand@gmail.com"
              className="text-zinc-300 hover:text-[#ff1a2b] transition-colors flex items-center gap-1"
            >
              <Mail size={12} />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} PWLC. All rights reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            {onOpenOrders && (
              <button
                onClick={onOpenOrders}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="View Brand Orders & Dispatched Receipts"
              >
                <Package size={12} className="text-[#ff1a2b]" />
                <span className="font-semibold">Brand Orders Hub</span>
              </button>
            )}
            <span>·</span>
            <button
              onClick={onResetInventory}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              title="Reset stock to initial release numbers"
            >
              <RotateCcw size={11} />
              <span>Reset Drop Stock</span>
            </button>
            <span>·</span>
            <span>Dubai Doorstep COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
