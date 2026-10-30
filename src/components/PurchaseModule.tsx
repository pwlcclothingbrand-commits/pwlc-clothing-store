import React, { useState } from 'react';
import { Size, SizeInventory, Colorway, ProductCategory } from '../types';
import { TSHIRT_COLORWAYS, HEADWEAR_ITEMS } from '../data/product';
import { Ruler, Sparkles, Truck, AlertCircle, Bell, Check, Clock, ShieldCheck, Layers } from 'lucide-react';

interface PurchaseModuleProps {
  currentColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
  inventory: SizeInventory[];
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  onOrderNow: (colorway: Colorway, size: Size, quantity: number) => void;
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
  onOrderNow,
  onOpenSizeChart,
  onOpenFitCalculator,
  onOpenRestockModal,
}) => {
  const [quantity, setQuantity] = useState(1);

  const isHeadwear = currentColorway.category === 'headwear';
  const isComingSoon = currentColorway.status === 'coming_soon';
  const currentInventory = inventory.find((item) => item.size === selectedSize);
  const stock = currentInventory ? currentInventory.stock : 0;
  const isSoldOut = !isComingSoon && !isHeadwear && stock <= 0;

  const handleCategorySwitch = (category: ProductCategory) => {
    if (category === 't-shirt') {
      const activeTee = TSHIRT_COLORWAYS[0];
      onSelectColorway(activeTee);
      if (selectedSize === 'OSFA') {
        onSelectSize('M');
      }
    } else {
      const mask = HEADWEAR_ITEMS[0];
      onSelectColorway(mask);
      onSelectSize('OSFA');
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > stock) return stock;
      return next;
    });
  };

  const handleOrder = () => {
    const sizeToUse = isHeadwear ? 'OSFA' : selectedSize;
    if (isComingSoon) {
      onOpenRestockModal(sizeToUse, currentColorway.name);
      return;
    }
    if (isSoldOut) {
      onOpenRestockModal(sizeToUse, currentColorway.name);
      return;
    }
    onOrderNow(currentColorway, sizeToUse, quantity);
  };

  return (
    <div className="flex flex-col gap-6 bg-[#121215] border border-white/5 p-6 md:p-8">
      {/* Category Tabs: Clearly segregates T-Shirts and Ski Mask into their own categories */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-[#ff1a2b]" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Category
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0b0b0d] p-1 border border-white/10">
          <button
            type="button"
            onClick={() => handleCategorySwitch('t-shirt')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              currentColorway.category === 't-shirt'
                ? 'bg-white text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>T-Shirts</span>
            <span className="text-[10px] font-mono opacity-60">({TSHIRT_COLORWAYS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategorySwitch('headwear')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              currentColorway.category === 'headwear'
                ? 'bg-[#ff1a2b] text-white font-bold shadow shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Ski Mask</span>
            <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 border border-amber-500/30">
              SOON
            </span>
          </button>
        </div>
      </div>

      {/* Brand & Kicker */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
          <span className="text-zinc-300">{currentColorway.releaseTag}</span>
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

      {/* Category Specific Colorway Swatch Selector */}
      <div className="py-3 border-y border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            {isHeadwear ? 'Colorway (Headwear Category):' : 'Colorway (T-Shirt Category):'}{' '}
            <strong className="text-white font-semibold">{currentColorway.colorName}</strong>
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

        {/* Dynamic Colorway Buttons (Strictly filtered by active category: T-shirts only has 4 colors, no grey; Headwear has balaclava) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {(isHeadwear ? HEADWEAR_ITEMS : TSHIRT_COLORWAYS).map((c) => {
            const isSelected = currentColorway.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectColorway(c)}
                className={`group relative p-1.5 flex items-center gap-2 border transition-all text-left cursor-pointer ${
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

      {/* Sizing & Specs Section: Adapts dynamically based on Category */}
      {isHeadwear ? (
        /* Headwear / Ski Mask Specific Sizing & Specs */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300 uppercase tracking-wider">
              Headwear Specification & Sizing
            </span>
            <span className="text-zinc-500 font-mono text-[11px]">
              ONE SIZE FITS ALL
            </span>
          </div>

          <div className="p-4 bg-zinc-900/90 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>OSFA (Universal Fit)</span>
                <span className="text-[10px] font-mono text-[#ff1a2b] bg-red-950/50 border border-red-800/40 px-2 py-0.5">
                  Adaptive 4-Way Stretch
                </span>
              </div>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Engineered with resilient high-recovery thermal compression weave that molds comfortably to any head shape and stays snug under movement.
            </p>
            <ul className="text-[11px] text-zinc-300 space-y-1.5 font-mono pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ff1a2b]" />
                <span>Scarlet high-density embroidered PWLC insignia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ff1a2b]" />
                <span>Dual-layer wind barrier with breathable mouth filter</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ff1a2b]" />
                <span>Reinforced eye contour aperture — zero unraveling</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* Heavyweight T-Shirt Sizing Matrix (Drop 01 Live 6 stock for S/M/L/XL & Drop 02 Coming Soon) */
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
                type="button"
                onClick={onOpenFitCalculator}
                className="text-[#ff1a2b] hover:underline flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                <Sparkles size={12} />
                <span>Fit Advisor</span>
              </button>
              <span className="text-zinc-700">·</span>
              <button
                type="button"
                onClick={onOpenSizeChart}
                className="text-zinc-400 hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
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
                  type="button"
                  onClick={() => {
                    onSelectSize(item.size);
                    setQuantity(1);
                  }}
                  className={`relative py-3 px-2 flex flex-col items-center justify-center border transition-all text-center cursor-pointer ${
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
                    <strong>{currentColorway.colorName}</strong> is part of Drop 02. Limited to 6 units per size.
                  </span>
                </div>
                <button
                  type="button"
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
                  <span>Size <strong>{selectedSize}</strong> is sold out in Drop 01.</span>
                </div>
                <button
                  type="button"
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
                  <strong>{stock} in stock</strong> in Dubai — ships within 24h across Dubai in commemorative PWLC packaging.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {isComingSoon ? (
        /* Coming Soon Pre-Registration CTA */
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenRestockModal(isHeadwear ? 'OSFA' : selectedSize, currentColorway.name)}
            className="w-full py-4 px-6 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-[#ff1a2b] hover:opacity-95 text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Bell size={15} />
            <span>
              Pre-Register For {isHeadwear ? 'Ski Mask / Balaclava' : `${currentColorway.colorName} (Size ${selectedSize})`}
            </span>
          </button>
          <div className="text-center text-[11px] text-zinc-400">
            Pre-registered customers receive priority password drop access 30 minutes early.
          </div>
        </div>
      ) : !isSoldOut ? (
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between border border-white/10 bg-zinc-900/80 px-3 py-2.5 sm:w-32 shrink-0">
            <span className="text-xs text-zinc-400 font-mono uppercase">Qty</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="text-zinc-400 hover:text-white disabled:opacity-30 px-1 font-bold text-sm cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-sm font-bold font-mono tabular-nums text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                className="text-zinc-400 hover:text-white disabled:opacity-30 px-1 font-bold text-sm cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Direct Order Now Button */}
          <button
            type="button"
            onClick={handleOrder}
            className="flex-1 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#ff1a2b] hover:bg-[#e01424] text-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer"
          >
            <span>Order Now · {(currentColorway.price * quantity).toFixed(2)} AED</span>
          </button>
        </div>
      ) : (
        /* Sold Out Action */
        <button
          type="button"
          onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
          className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Bell size={14} className="text-[#ff1a2b]" />
          <span>Notify Me When Size {selectedSize} Restocks</span>
        </button>
      )}

      {/* Trust & Delivery Highlights (Dubai Only) */}
      <div className="pt-4 border-t border-white/5 space-y-2 text-[11px] text-zinc-400">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-[#ff1a2b] shrink-0" />
            <span>Dubai Delivery: 15 AED Central · 30 AED</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <Check size={14} className="shrink-0" />
            <span>Cash on Delivery (Dubai)</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
          <span>✓ Pay cash or card at your Dubai doorstep</span>
          <span className="text-[#ff1a2b] font-semibold">✓ Exclusive Dubai Ordering Only</span>
        </div>
      </div>

      {/* Wash & Cut Notes */}
      <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
        <div className="text-zinc-300 font-semibold uppercase tracking-wider text-[11px]">
          {isHeadwear ? 'Material & Care' : 'Colorway Treatment'}
        </div>
        <p className="text-zinc-400 leading-relaxed text-[12px]">
          {currentColorway.description}
        </p>
      </div>
    </div>
  );
};
