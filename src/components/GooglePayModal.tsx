import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, RefreshCw } from 'lucide-react';

interface GooglePayModalProps {
  isOpen: boolean;
  total: number;
  itemsCount: number;
  customerName: string;
  customerEmail: string;
  dubaiArea: string;
  onSuccess: (gpayData: { token: string; account: string; cardLast4: string }) => void;
  onClose: () => void;
}

export const GooglePayModal: React.FC<GooglePayModalProps> = ({
  isOpen,
  total,
  itemsCount,
  customerName,
  customerEmail,
  dubaiArea,
  onSuccess,
  onClose,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCard, setSelectedCard] = useState<'4242' | '8831'>('4242');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        token: `GPAY-TOKEN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        account: customerEmail || 'pwlcclothingbrand@gmail.com',
        cardLast4: selectedCard,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-[#1e1e24] border border-white/20 text-white shadow-2xl p-6 rounded-2xl my-8">
        {/* Top GPay branding */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {/* Google "G" in official colors */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-bold text-base tracking-tight text-white font-sans">
              Google Pay
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
            aria-label="Close Google Pay"
          >
            <X size={18} />
          </button>
        </div>

        {/* Merchant & Order Amount */}
        <div className="py-4 border-b border-white/10 space-y-1">
          <div className="text-zinc-400 text-xs font-medium">PWLC Clothing Store</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">
              {total.toFixed(2)} AED
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {itemsCount} item{itemsCount > 1 ? 's' : ''} · Dubai
            </span>
          </div>
        </div>

        {/* Google Account & Payment Methods in Wallet */}
        <div className="py-4 space-y-3 text-xs">
          <div className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider">
            Google Account
          </div>
          <div className="p-3 bg-zinc-900/90 border border-white/10 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">
                {customerName || 'Google Pay User'}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono truncate max-w-[200px]">
                {customerEmail || 'pwlcclothingbrand@gmail.com'}
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              Verified
            </div>
          </div>

          <div className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider pt-1">
            Pay with Card in Google Wallet
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSelectedCard('4242')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                selectedCard === '4242'
                  ? 'border-emerald-500 bg-white/5'
                  : 'border-white/10 bg-zinc-900/40 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center font-bold text-[9px] text-white tracking-wider">
                  VISA
                </div>
                <div>
                  <div className="text-white font-medium text-xs">Visa ending in 4242</div>
                  <div className="text-[10px] text-zinc-400">Tokenized Device Primary Card</div>
                </div>
              </div>
              {selectedCard === '4242' && <CheckCircle2 size={16} className="text-emerald-400" />}
            </button>

            <button
              type="button"
              onClick={() => setSelectedCard('8831')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                selectedCard === '8831'
                  ? 'border-emerald-500 bg-white/5'
                  : 'border-white/10 bg-zinc-900/40 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-amber-600 rounded flex items-center justify-center font-bold text-[9px] text-white tracking-wider">
                  MC
                </div>
                <div>
                  <div className="text-white font-medium text-xs">Mastercard ending in 8831</div>
                  <div className="text-[10px] text-zinc-400">UAE Emirates NBD Card</div>
                </div>
              </div>
              {selectedCard === '8831' && <CheckCircle2 size={16} className="text-emerald-400" />}
            </button>
          </div>

          <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-xl space-y-1 text-[11px]">
            <div className="flex justify-between text-zinc-400">
              <span>Delivery Emirate:</span>
              <span className="text-white font-medium">Dubai Only</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Community Area:</span>
              <span className="text-zinc-200 truncate max-w-[170px]">{dubaiArea}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Official GPay black pill button */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePay}
            className="w-full py-3.5 bg-black hover:bg-zinc-900 border border-white/20 text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-lg shadow-black/60"
          >
            {isProcessing ? (
              <>
                <RefreshCw size={15} className="animate-spin text-white" />
                <span>Processing Google Pay...</span>
              </>
            ) : (
              <>
                <span className="text-zinc-300 font-normal">Pay with</span>
                {/* Inline GPay SVG */}
                <svg className="w-4 h-4 ml-0.5 inline-block" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-bold font-sans">Pay</span>
                <span className="text-zinc-400 font-mono text-[11px] font-normal ml-1">
                  ({total.toFixed(2)} AED)
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono">
            <Lock size={10} className="text-emerald-400" />
            <span>Encrypted Google Pay Token · Zero Card Data Shared</span>
          </div>
        </div>
      </div>
    </div>
  );
};
