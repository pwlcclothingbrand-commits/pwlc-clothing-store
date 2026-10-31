import React, { useState } from 'react';
import { X, ShieldCheck, Check, Copy, Award, MapPin, Sparkles } from 'lucide-react';

interface AuthenticityCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const AuthenticityCertificateModal: React.FC<AuthenticityCertificateModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [copied, setCopied] = useState(false);
  const certNumber = 'PWLC-CERT-001-DXB-9842';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(certNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#121215] border border-white/15 text-white shadow-2xl p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close certificate"
        >
          <X size={20} />
        </button>

        {/* Certificate Header */}
        <div className="text-center pb-6 border-b border-white/10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-950/40 border border-[#ff1a2b]/40 text-[#ff1a2b] mb-3">
            <Award size={24} />
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff1a2b] font-bold">
            ARCHIVAL GARMENT SPECIFICATION
          </div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mt-1">
            Certificate of Authenticity
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            PEOPLE WHO LOVES CLOTHES · OFFICIAL RELEASE
          </p>
        </div>

        {/* Certificate Body */}
        <div className="py-6 space-y-4 text-xs">
          <div className="p-4 bg-zinc-950 border border-white/10 space-y-3 font-mono">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase">Garment Title</span>
              <span className="text-white font-bold">{productName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase">Release Classification</span>
              <span className="text-[#ff1a2b] font-bold">Drop 01 · Limited 6 Pcs / Size</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase">Yarn Specification</span>
              <span className="text-white font-medium">300 GSM Combed Compact Cotton</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase">Finishing Treatment</span>
              <span className="text-white font-medium">Natural Mineral Enzyme Wash</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase">Origin of Milling</span>
              <span className="text-white font-medium">Porto, Portugal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 uppercase">Exclusive Territory</span>
              <span className="text-emerald-400 font-medium">Dubai, UAE Local Dispatch</span>
            </div>
          </div>

          {/* Verification Code Box */}
          <div className="p-3.5 bg-zinc-900 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">
                Archival Batch Verification ID
              </div>
              <div className="text-sm font-mono font-bold text-white tracking-wider mt-0.5">
                {certNumber}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-zinc-400 leading-relaxed pt-2">
            Each garment features an internal woven archival neck tag and custom side care label indicating the production lot. PWLC guarantees zero synthetic filler fibers and permanent neckline retention.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Verified Genuine PWLC Garment</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-bold uppercase text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
