import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Size } from '../types';

interface FitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: Size) => void;
}

export const FitCalculatorModal: React.FC<FitCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  const [heightCm, setHeightCm] = useState(178); // default ~5'10"
  const [weightKg, setWeightKg] = useState(74); // default ~163 lbs
  const [fitPreference, setFitPreference] = useState<'fitted' | 'signature' | 'extreme'>('signature');

  if (!isOpen) return null;

  // Calculate recommendation
  const calculateRecommendation = (): { size: Size; rationale: string; isSoldOut: boolean } => {
    // Basic BMI / volume proxy
    const baseScore = heightCm * 0.4 + weightKg * 0.6;
    let recSize: Size = 'M';

    if (baseScore < 105) recSize = 'XS';
    else if (baseScore < 113) recSize = 'S';
    else if (baseScore < 122) recSize = 'M';
    else if (baseScore < 132) recSize = 'L';
    else if (baseScore < 144) recSize = 'XL';
    else recSize = 'XXL';

    // Adjust based on fit preference
    if (fitPreference === 'fitted') {
      if (recSize === 'XXL') recSize = 'XL';
      else if (recSize === 'XL') recSize = 'L';
      else if (recSize === 'L') recSize = 'M';
      else if (recSize === 'M') recSize = 'S';
      else if (recSize === 'S') recSize = 'XS';
    } else if (fitPreference === 'extreme') {
      if (recSize === 'XS') recSize = 'S';
      else if (recSize === 'S') recSize = 'M';
      else if (recSize === 'M') recSize = 'L';
      else if (recSize === 'L') recSize = 'XL';
      else if (recSize === 'XL') recSize = 'XXL';
    }

    const isSoldOut = recSize === 'XXL';

    let rationale = '';
    if (fitPreference === 'signature') {
      rationale = 'Provides our authentic boxy drop-shoulder cut with clean chest drape and 1.25" structured collar.';
    } else if (fitPreference === 'fitted') {
      rationale = 'Slightly more tailored shoulder silhouette while preserving the heavyweight 300 GSM cotton drape.';
    } else {
      rationale = 'Extra roomy, exaggerated 90s skater boxy proportions with extended sleeve length.';
    }

    return { size: recSize, rationale, isSoldOut };
  };

  const recommendation = calculateRecommendation();

  // Convert for display
  const heightFeet = Math.floor(heightCm / 30.48);
  const heightInches = Math.round((heightCm % 30.48) / 2.54);
  const weightLbs = Math.round(weightKg * 2.20462);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#141418] border border-white/10 p-6 md:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#ff1a2b]" />
            <h3 className="text-xl font-bold tracking-tight font-display">
              PWLC Fit Advisor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Fit Advisor"
          >
            <X size={20} />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-5 my-6 text-xs">
          {/* Height Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-300 font-semibold uppercase tracking-wider">
                Your Height
              </span>
              <span className="text-zinc-400 font-mono">
                {heightCm} cm · {heightFeet}&apos;{heightInches}&quot;
              </span>
            </div>
            <input
              type="range"
              min="155"
              max="205"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-[#ff1a2b] bg-zinc-800 h-1.5 cursor-pointer"
            />
          </div>

          {/* Weight Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-300 font-semibold uppercase tracking-wider">
                Your Weight
              </span>
              <span className="text-zinc-400 font-mono">
                {weightKg} kg · {weightLbs} lbs
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="125"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#ff1a2b] bg-zinc-800 h-1.5 cursor-pointer"
            />
          </div>

          {/* Fit Preference Buttons */}
          <div>
            <span className="text-zinc-300 font-semibold uppercase tracking-wider block mb-2">
              Desired Silhouette
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'fitted', label: 'Tailored', desc: 'Closer fit' },
                { id: 'signature', label: 'Signature', desc: 'True oversized' },
                { id: 'extreme', label: 'Heavy Boxy', desc: 'Exaggerated' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setFitPreference(p.id as any)}
                  className={`p-2.5 text-center border transition-all ${
                    fitPreference === p.id
                      ? 'border-[#ff1a2b] bg-white/5 text-white'
                      : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-semibold text-[11px] uppercase">{p.label}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Result Box */}
        <div className="p-4 bg-zinc-900 border border-white/10 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              Recommended Size
            </span>
            {recommendation.isSoldOut && (
              <span className="text-[10px] font-mono uppercase text-[#ff1a2b] font-bold">
                Sold Out in Drop 01
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white font-display">
              {recommendation.size}
            </span>
            <span className="text-xs text-zinc-400">
              ({fitPreference === 'signature' ? 'Signature Oversized Drape' : fitPreference === 'fitted' ? 'Subtle Relaxed Drape' : 'Extreme Boxy Cut'})
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {recommendation.rationale}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-zinc-400 hover:text-white uppercase tracking-wider font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelectSize(recommendation.size);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-[#ff1a2b] hover:bg-[#e01424] text-white transition-colors"
          >
            <span>Apply Size {recommendation.size}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
