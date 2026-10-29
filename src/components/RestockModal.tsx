import React, { useState } from 'react';
import { X, Bell, Check, ShieldCheck, Clock } from 'lucide-react';
import { Size } from '../types';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: Size;
  targetName?: string;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  onClose,
  size,
  targetName,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isComingSoonDrop =
    targetName?.includes('Drop 02') ||
    targetName?.includes('Pink') ||
    targetName?.includes('Blue') ||
    targetName?.includes('White') ||
    targetName?.includes('Balaclava') ||
    targetName?.includes('Ski Mask') ||
    targetName?.includes('Headwear') ||
    targetName?.includes('Stone');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#141418] border border-white/10 p-6 md:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isComingSoonDrop ? (
                <>
                  <Clock size={18} className="text-amber-400" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                    Drop 02 Early Access Roster
                  </span>
                </>
              ) : (
                <>
                  <Bell size={18} className="text-[#ff1a2b]" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff1a2b]">
                    Archive Restock Alert
                  </span>
                </>
              )}
            </div>

            <h3 className="text-xl font-bold tracking-tight font-display mb-2">
              {isComingSoonDrop
                ? targetName || 'Drop 02 Priority Access'
                : `Size ${size || 'XXL'} Sold Out in Drop 01`}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              {isComingSoonDrop
                ? `Drop 02 will release in strictly limited quantities (6 pieces per size). Enter your email below to receive the private storefront unlock password and release time before the general public.`
                : `Drop 01 produced strictly 6 units per size, and Size ${size || 'XXL'} is completely out of stock. Leave your email below to receive instant early-access notification if an archive restock or return allocation occurs.`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>

              {size && (
                <div className="text-[11px] text-zinc-400 flex items-center justify-between p-2 bg-zinc-900 border border-white/5">
                  <span>Selected Size Allocation:</span>
                  <span className="font-mono font-bold text-white">Size {size}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck size={14} className="text-zinc-400 shrink-0" />
                <span>Zero spam. Only notified for PWLC release drops.</span>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-widest text-white transition-colors ${
                  isComingSoonDrop
                    ? 'bg-gradient-to-r from-amber-500 to-[#ff1a2b] hover:opacity-90'
                    : 'bg-[#ff1a2b] hover:bg-[#e01424]'
                }`}
              >
                {isComingSoonDrop ? 'Join Drop 02 Priority Roster' : `Register For Size ${size || ''} Notification`}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <Check size={24} />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Registration Confirmed
            </h3>
            <p className="text-xs text-zinc-400 mb-6 max-w-xs mx-auto">
              We&apos;ve added <span className="text-zinc-200 font-mono">{email}</span> to the priority release roster for <strong>{targetName || `Size ${size}`}</strong>.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
