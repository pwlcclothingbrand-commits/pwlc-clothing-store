import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { PRODUCT_DATA } from '../data/product';
import { Size } from '../types';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#141418] border border-white/10 p-6 md:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold tracking-tight font-display">
              PWLC Oversized Cut Sizing Matrix
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Flat garment measurements. Designed with dropped shoulders and a boxy chest drape.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Size Chart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between my-4">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            Measurements
          </span>
          <div className="flex items-center bg-zinc-900 border border-white/10 p-0.5">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                unit === 'inches' ? 'bg-[#ff1a2b] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                unit === 'cm' ? 'bg-[#ff1a2b] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900/90 border-b border-white/10 text-zinc-400 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest (Pit to Pit)</th>
                <th className="py-3 px-4">Length</th>
                <th className="py-3 px-4">Shoulder Drop</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {PRODUCT_DATA.sizeChart.map((row) => {
                const isSelected = selectedSize === row.size;
                const isXXL = row.size === 'XXL';
                return (
                  <tr
                    key={row.size}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-white/5 text-white font-bold'
                        : 'text-zinc-300 hover:bg-zinc-900/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold flex items-center gap-2">
                      <span>{row.size}</span>
                      {isXXL && (
                        <span className="text-[9px] text-[#ff1a2b] uppercase font-mono font-normal">
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {unit === 'inches' ? row.chestIn : `${row.chestCm} cm`}
                    </td>
                    <td className="py-3 px-4">
                      {unit === 'inches' ? row.lengthIn : `${row.lengthCm} cm`}
                    </td>
                    <td className="py-3 px-4">
                      {unit === 'inches' ? row.shoulderIn : `${row.shoulderCm} cm`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#ff1a2b] font-sans font-semibold">
                          <Check size={12} /> Selected
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectSize(row.size as Size);
                            onClose();
                          }}
                          className="text-[11px] text-zinc-400 hover:text-white underline font-sans"
                        >
                          Select
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="mt-4 p-3 bg-zinc-900/50 border border-white/5 text-xs text-zinc-400 leading-relaxed">
          <strong className="text-zinc-200">How to measure:</strong> Lay your favorite well-fitting oversized tee flat. Measure pit-to-pit across chest and from highest shoulder point down to bottom hem. Compare against chart above.
        </div>
      </div>
    </div>
  );
};
