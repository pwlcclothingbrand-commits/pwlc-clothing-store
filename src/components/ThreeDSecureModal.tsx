import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Smartphone, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';

interface ThreeDSecureModalProps {
  isOpen: boolean;
  amount: number;
  cardLast4: string;
  customerPhone?: string;
  onSuccess: (authData: { authId: string; eci: string; dsTransId: string }) => void;
  onCancel: () => void;
}

export const ThreeDSecureModal: React.FC<ThreeDSecureModalProps> = ({
  isOpen,
  amount,
  cardLast4,
  customerPhone,
  onSuccess,
  onCancel,
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (!isOpen) {
      setOtp('');
      setErrorMsg('');
      setIsVerifying(false);
      setTimer(59);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const demoOtp = '849201';
  const maskedPhone = customerPhone
    ? `•••• ${customerPhone.slice(-4)}`
    : '•••• 757';
  const displayLast4 = cardLast4.replace(/\s+/g, '').slice(-4) || '4242';

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otp.trim().length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP code.');
      return;
    }

    setIsVerifying(true);

    // Simulate 3D Secure 2.0 Directory Server & Access Control Server (ACS) challenge handshake
    setTimeout(() => {
      setIsVerifying(false);
      const authData = {
        authId: `3DS2-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        eci: '05', // ECI 05: Fully authenticated transaction under 3DS2
        dsTransId: `UAE-ACS-${Date.now().toString(36).toUpperCase()}`,
      };
      onSuccess(authData);
    }, 1200);
  };

  const handleQuickFill = () => {
    setOtp(demoOtp);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#16161b] border border-white/15 text-white shadow-2xl p-6 rounded-none my-8">
        {/* Bank & 3D Secure Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  3D Secure 2.0 Authentication
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  UAE Central Bank Verified Gateway
                </div>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-zinc-500 hover:text-white p-1 transition-colors"
              aria-label="Cancel authentication"
            >
              <X size={18} />
            </button>
          </div>

          {/* Card Brands Badges */}
          <div className="mt-3 flex items-center gap-2 text-[9px] font-mono font-bold tracking-wider text-zinc-400">
            <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-blue-400">
              Verified by VISA
            </span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-amber-400">
              Mastercard Identity Check
            </span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-cyan-400">
              Amex SafeKey
            </span>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="py-4 space-y-2 border-b border-white/10 text-xs font-mono">
          <div className="flex justify-between text-zinc-400">
            <span>Merchant:</span>
            <span className="text-white font-semibold">PWLC CLOTHING (DUBAI)</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Transaction Amount:</span>
            <span className="text-emerald-400 font-bold text-sm">
              {amount.toFixed(2)} AED
            </span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Card Account:</span>
            <span className="text-zinc-200">•••• •••• •••• {displayLast4}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Authentication Protocol:</span>
            <span className="text-zinc-300">EMV 3DS 2.2.0 (SCA Compliant)</span>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="py-4 space-y-4 text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-zinc-300 font-medium mb-1">
              <Smartphone size={14} className="text-[#ff1a2b]" />
              <span>SMS One-Time Password (OTP)</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
              An SMS with a 6-digit confirmation code has been sent by your issuing bank to your UAE mobile registered ending in{' '}
              <strong className="text-white">{maskedPhone}</strong>.
            </p>

            {/* Quick Demo Helper */}
            <div className="p-2.5 bg-zinc-900/90 border border-white/10 flex items-center justify-between text-[11px] mb-3">
              <span className="text-zinc-400">
                Demo Code: <strong className="text-emerald-400 font-mono">{demoOtp}</strong>
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] uppercase font-bold border border-white/15 transition-colors cursor-pointer"
              >
                Auto-Fill Code
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter 6-digit code"
                className="w-full bg-zinc-950 border border-white/20 px-3 py-2.5 text-center text-white font-mono text-base tracking-[0.5em] placeholder:tracking-normal placeholder:text-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
              />
            </div>

            {errorMsg && (
              <div className="mt-2 text-rose-400 text-[11px] flex items-center gap-1.5 font-medium">
                <AlertCircle size={13} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>
              Resend code in: <strong className="text-zinc-300">00:{timer < 10 ? `0${timer}` : timer}</strong>
            </span>
            <button
              type="button"
              disabled={timer > 0}
              onClick={() => {
                setTimer(59);
                setErrorMsg('');
              }}
              className="text-zinc-400 hover:text-white disabled:opacity-40 underline cursor-pointer"
            >
              Resend OTP
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isVerifying || otp.length < 6}
              className="w-full py-3 bg-[#ff1a2b] hover:bg-[#e01424] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Authenticating 3D Secure...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Verify & Pay {amount.toFixed(2)} AED</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 bg-transparent text-zinc-400 hover:text-white text-[11px] transition-colors cursor-pointer"
            >
              Cancel & Change Payment Method
            </button>
          </div>
        </form>

        {/* Security Trust Footnote */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Lock size={11} className="text-emerald-400" />
            <span>256-bit TLS Encrypted Session</span>
          </div>
          <span>Dubai SCA Certified</span>
        </div>
      </div>
    </div>
  );
};
