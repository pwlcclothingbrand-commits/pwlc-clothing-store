import React, { useState } from 'react';
import { Size, SizeInventory, Colorway } from '../types';
import { PRODUCT_DATA, COLORWAYS } from '../data/product';
import { Ruler, Sparkles, Truck, RefreshCw, AlertCircle, Bell, Check, Clock } from 'lucide-react';

interface PurchaseModuleProps {
  currentColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
  inventory: SizeInventory[];
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  onAddToCart: (colorway: Colorway, size: Size, quantity: number) => void;
  onInstantBuy: (colorway: Colorway, size: Size, quantity: number) => void;
  onOpenSizeChart: () => void;
  onOpenFitCalculator: () => void;
  onOpenRestockModal: (size: Size, colorwayName?: string) => void;
}

export const PurchaseModule: React.FC<PurchaseModuleProps> = ({
  currentColorway,
  onSelectColorway,
  inventory,
  selectedSize,
  onSelectSize,
  onAddToCart,
  onInstantBuy,
  onOpenSizeChart,
  onOpenFitCalculator,
  onOpenRestockModal,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isComingSoon = currentColorway.status === 'coming_soon';
  const currentInventory = inventory.find((item) => item.size === selectedSize);
  const stock = currentInventory ? currentInventory.stock : 0;
  const isSoldOut = !isComingSoon && stock <= 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > stock) return stock;
      return next;
    });
  };

  const handleAdd = () => {
    if (isComingSoon) {
      onOpenRestockModal(selectedSize, currentColorway.name);
      return;
    }
    if (isSoldOut) {
      onOpenRestockModal(selectedSize, currentColorway.name);
      return;
    }
    onAddToCart(currentColorway, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (isComingSoon) {
      onOpenRestockModal(selectedSize, currentColorway.name);
      return;
    }
    if (isSoldOut) {
      onOpenRestockModal(selectedSize, currentColorway.name);
      return;
    }
    onInstantBuy(currentColorway, selectedSize, quantity);
  };

  return (
    <div className="flex flex-col gap-6 bg-[#121215] border border-white/5 p-6 md:p-8">
      {/* Brand & Kicker */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
          <span>{currentColorway.releaseTag}</span>
          {isComingSoon ? (
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Clock size={12} />
              <span>DROP 02 PREVIEW</span>
            </span>
          ) : (
            <span className="text-[#ff1a2b] font-bold">LIMITED DROP (6 PER SIZE)</span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          {currentColorway.name}
        </h1>
        <div className="flex items-baseline gap-3 mt-3">
          <span className="text-2xl font-bold text-white tabular-nums font-mono">
            {currentColorway.price.toFixed(2)} AED
          </span>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            {isComingSoon ? 'Projected Drop Price · VAT Included' : 'AED · VAT Included'}
          </span>
        </div>
      </div>

      {/* Colorway Swatch Selector */}
      <div className="py-3 border-y border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            Colorway: <strong className="text-white font-semibold">{currentColorway.colorName}</strong>
          </span>
          {isComingSoon ? (
            <span className="text-amber-400 font-mono text-[11px] font-bold uppercase">
              Coming Soon
            </span>
          ) : (
            <span className="text-emerald-400 font-mono text-[11px] font-bold uppercase">
              In Stock Now
            </span>
          )}
        </div>

        {/* 5 Colorway Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {COLORWAYS.map((c) => {
            const isSelected = currentColorway.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectColorway(c)}
                className={`group relative p-1 flex items-center gap-2 border transition-all text-left ${
                  isSelected
                    ? 'border-[#ff1a2b] bg-white/5 text-white'
                    : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/30 hover:text-zinc-200'
                }`}
                title={`${c.colorName} (${c.status === 'coming_soon' ? 'Coming Soon' : 'Available'})`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-black/30 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] font-medium pr-1.5 whitespace-nowrap">
                  {c.colorName}
                </span>
                {c.status === 'coming_soon' && (
                  <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold">
                    Soon
                  </span>
                )}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#ff1a2b]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selector Header & Helpers */}
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300 uppercase tracking-wider">
              {isComingSoon ? 'Select Preferred Size' : 'Select Size'}
            </span>
            <span className="text-zinc-500">
              (US Men&apos;s Oversized Fit)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFitCalculator}
              className="text-[#ff1a2b] hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <Sparkles size={12} />
              <span>Fit Advisor</span>
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={onOpenSizeChart}
              className="text-zinc-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
            >
              <Ruler size={12} />
              <span>Size Chart</span>
            </button>
          </div>
        </div>

        {/* Size Buttons Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {inventory.map((item) => {
            const isSelected = selectedSize === item.size;
            const sizeSoldOut = !isComingSoon && item.stock <= 0;

            return (
              <button
                key={item.size}
                onClick={() => {
                  onSelectSize(item.size);
                  setQuantity(1);
                }}
                className={`relative py-3 px-2 flex flex-col items-center justify-center border transition-all text-center ${
                  isSelected
                    ? 'border-[#ff1a2b] bg-white/5 text-white'
                    : sizeSoldOut
                    ? 'border-white/5 bg-zinc-950/60 text-zinc-600 hover:border-zinc-700'
                    : 'border-white/10 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-white/30'
                }`}
              >
                <span className={`text-sm font-bold tracking-wider ${sizeSoldOut ? 'line-through text-zinc-600' : ''}`}>
                  {item.size}
                </span>

                {/* Stock or Coming Soon indicator */}
                <span className="text-[10px] mt-1 tracking-tight font-mono">
                  {isComingSoon ? (
                    <span className="text-amber-400 text-[9px] uppercase font-semibold">
                      Drop 02
                    </span>
                  ) : sizeSoldOut ? (
                    <span className="text-zinc-500 uppercase font-bold text-[9px]">
                      Sold Out
                    </span>
                  ) : item.stock <= 3 ? (
                    <span className="text-[#ff1a2b] font-semibold">
                      {item.stock} left
                    </span>
                  ) : (
                    <span className="text-zinc-400">
                      {item.stock} left
                    </span>
                  )}
                </span>

                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff1a2b]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live inventory or Coming Soon status message */}
        <div className="mt-3 text-xs">
          {isComingSoon ? (
            <div className="w-full bg-amber-950/20 border border-amber-900/40 p-2.5 text-zinc-300 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300">
                <Clock size={14} className="shrink-0" />
                <span>
                  <strong>{currentColorway.colorName}</strong> is part of Drop 02. Production limited to 6 units per size.
                </span>
              </div>
              <button
                onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
                className="text-[11px] uppercase tracking-wider font-semibold text-white underline hover:text-[#ff1a2b] shrink-0"
              >
                Pre-Register
              </button>
            </div>
          ) : isSoldOut ? (
            <div className="w-full bg-red-950/30 border border-red-900/40 p-2.5 text-zinc-300 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={14} className="shrink-0" />
                <span>Size <strong>{selectedSize}</strong> is currently sold out in Drop 01.</span>
              </div>
              <button
                onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
                className="text-[11px] uppercase tracking-wider font-semibold text-white underline hover:text-[#ff1a2b] shrink-0"
              >
                Notify Me
              </button>
            </div>
          ) : (
            <div className="text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>
                <strong>{stock} in stock</strong> in the UAE — ships within 24 hours in commemorative PWLC packaging.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {isComingSoon ? (
        /* Coming Soon Pre-Registration CTA */
        <div className="space-y-3 pt-2">
          <button
            onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
            className="w-full py-4 px-6 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-[#ff1a2b] hover:opacity-95 text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg shadow-amber-500/10"
          >
            <Bell size={15} />
            <span>Pre-Register For {currentColorway.colorName} (Size {selectedSize})</span>
          </button>
          <div className="text-center text-[11px] text-zinc-400">
            Guarantees priority password access before general public drop.
          </div>
        </div>
      ) : !isSoldOut ? (
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between border border-white/10 bg-zinc-900/80 px-3 py-2.5 sm:w-32 shrink-0">
            <span className="text-xs text-zinc-400">Qty</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="text-zinc-400 hover:text-white disabled:opacity-30 px-1 font-bold text-sm"
              >
                -
              </button>
              <span className="text-sm font-bold font-mono tabular-nums text-white">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                className="text-zinc-400 hover:text-white disabled:opacity-30 px-1 font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Bag CTA */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-6 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#ff1a2b] hover:bg-[#e01424] text-white active:scale-[0.99]'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check size={16} />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Bag · {(currentColorway.price * quantity).toFixed(2)} AED</span>
            )}
          </button>

          {/* Instant Buy CTA */}
          <button
            onClick={handleBuyNow}
            className="py-3 px-6 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Instant Checkout
          </button>
        </div>
      ) : (
        /* Sold Out Action */
        <button
          onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
          className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 flex items-center justify-center gap-2 transition-colors"
        >
          <Bell size={14} className="text-[#ff1a2b]" />
          <span>Notify Me When Size {selectedSize} Restocks</span>
        </button>
      )}

      {/* Trust & Delivery Highlights */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-[#ff1a2b] shrink-0" />
          <span>Delivery: 15 AED (Close) · 30 AED (Standard)</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw size={14} className="text-zinc-500 shrink-0" />
          <span>14-Day Return Privilege</span>
        </div>
      </div>

      {/* Wash & Cut Notes */}
      <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
        <div className="text-zinc-300 font-semibold uppercase tracking-wider text-[11px]">
          Colorway Treatment
        </div>
        <p className="text-zinc-400 leading-relaxed text-[12px]">
          {currentColorway.description}
        </p>
      </div>
    </div>
  );
};
