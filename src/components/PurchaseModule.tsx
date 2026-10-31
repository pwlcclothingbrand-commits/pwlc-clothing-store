import React, { useState } from 'react';
import { Size, SizeInventory, Colorway, ProductCategory } from '../types';
import { TSHIRT_COLORWAYS, HEADWEAR_ITEMS } from '../data/product';
import { Ruler, Sparkles, Truck, Bell, Check, Award, ShieldCheck, Flame } from 'lucide-react';

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
  onOpenAuthenticityCertificate?: () => void;
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
  onOpenAuthenticityCertificate,
}) => {
  const [quantity, setQuantity] = useState(1);

  const isHeadwear = currentColorway.category === 'headwear';
  const isComingSoon = currentColorway.status === 'coming_soon';
  const currentInventory = inventory.find((item) => item.size === selectedSize);
  const stock = currentInventory ? currentInventory.stock : 0;
  const isSoldOut = !isComingSoon && !isHeadwear && stock <= 0;

  // Total remaining inventory across sizes
  const totalStock = inventory.reduce((acc, curr) => acc + curr.stock, 0);

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
    if (isComingSoon || isSoldOut) {
      onOpenRestockModal(sizeToUse, currentColorway.name);
      return;
    }
    onOrderNow(currentColorway, sizeToUse, quantity);
  };

  return (
    <div className="flex flex-col gap-6 bg-[#101014] border border-white/10 p-6 md:p-8 shadow-2xl relative">
      {/* Top Limited Edition Status Strip */}
      <div className="flex items-center justify-between border-b border-white/8 pb-4 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <Flame size={14} className="text-[#ff1a2b]" />
          <span className="text-white font-bold tracking-wider uppercase">
            {isComingSoon ? 'ARCHIVE RESERVATION' : 'LIMITED RUN · 24 PIECES WORLDWIDE'}
          </span>
        </div>
        {!isComingSoon && (
          <span className="text-zinc-400 font-bold">
            <span className="text-emerald-400">{totalStock}</span> / 24 Available
          </span>
        )}
      </div>

      {/* Category Switcher Tabs */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
          Collection
        </span>
        <div className="flex items-center gap-1 bg-[#09090b] p-1 border border-white/10">
          <button
            type="button"
            onClick={() => handleCategorySwitch('t-shirt')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              currentColorway.category === 't-shirt'
                ? 'bg-white text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Heavyweight Tees
          </button>
          <button
            type="button"
            onClick={() => handleCategorySwitch('headwear')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              currentColorway.category === 'headwear'
                ? 'bg-[#ff1a2b] text-white font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ski Mask
          </button>
        </div>
      </div>

      {/* Title & Price Block */}
      <div>
        <div className="text-[11px] font-mono tracking-widest text-[#ff1a2b] uppercase font-bold mb-1">
          {currentColorway.releaseTag}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display uppercase">
          {currentColorway.name}
        </h1>

        <div className="flex items-baseline justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono tracking-tight">
              {currentColorway.price.toFixed(2)} AED
            </span>
            <span className="text-[11px] font-mono text-zinc-500 uppercase">VAT INCL.</span>
          </div>

          {onOpenAuthenticityCertificate && (
            <button
              type="button"
              onClick={onOpenAuthenticityCertificate}
              className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer underline underline-offset-4 decoration-white/20 hover:decoration-[#ff1a2b]"
            >
              <Award size={13} className="text-[#ff1a2b]" />
              <span>Authenticity Verified</span>
            </button>
          )}
        </div>

        {/* Minimal Spec Strip */}
        <div className="mt-3 text-xs text-zinc-400 font-mono">
          {isHeadwear
            ? '4-Way Stretch Compression Knit · Scarlet Embroidered Insignia · Universal Fit'
            : '300 GSM Organic Combed Cotton · Boxy Drop-Shoulder Silhouette · Made in Portugal'}
        </div>
      </div>

      {/* Colorway Swatch Strip */}
      <div className="py-3.5 border-y border-white/8 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400 font-mono">
            Color: <strong className="text-white font-semibold">{currentColorway.colorName}</strong>
          </span>
          <span className="text-[11px] font-mono uppercase text-zinc-500">
            {isComingSoon ? 'Drop 02 Preview' : 'In Stock in Dubai'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(isHeadwear ? HEADWEAR_ITEMS : TSHIRT_COLORWAYS).map((c) => {
            const isSelected = currentColorway.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectColorway(c)}
                className={`p-2.5 flex items-center gap-2.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#ff1a2b] bg-white/5 text-white shadow-md ring-1 ring-[#ff1a2b]/40'
                    : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-black/50 shrink-0 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs font-semibold whitespace-nowrap">
                  {c.colorName}
                </span>
                {c.status === 'coming_soon' && (
                  <span className="text-[9px] font-mono text-amber-400 font-bold uppercase">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selector */}
      {isHeadwear ? (
        <div className="p-3.5 bg-zinc-900/60 border border-white/10 flex items-center justify-between text-xs">
          <div>
            <div className="text-white font-bold font-mono">ONE SIZE FITS ALL (OSFA)</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Adaptive anatomical stretch knit</div>
          </div>
          <span className="text-[10px] font-mono text-[#ff1a2b] uppercase font-bold">Universal</span>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs mb-2.5 font-mono">
            <span className="font-semibold text-zinc-300 uppercase tracking-wider">
              Select Size
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenFitCalculator}
                className="text-[#ff1a2b] hover:underline flex items-center gap-1 font-semibold transition-colors cursor-pointer"
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
                  className={`py-3 px-2 flex flex-col items-center justify-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#ff1a2b] bg-[#ff1a2b]/15 text-white ring-1 ring-[#ff1a2b] shadow-md shadow-red-950/20'
                      : sizeSoldOut
                      ? 'border-white/5 bg-zinc-950 text-zinc-600'
                      : 'border-white/10 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`text-sm font-bold tracking-wider ${sizeSoldOut ? 'line-through text-zinc-600' : ''}`}>
                    {item.size}
                  </span>
                  <span className="text-[10px] mt-1 font-mono">
                    {isComingSoon ? (
                      <span className="text-amber-400 text-[9px] uppercase font-bold">Soon</span>
                    ) : sizeSoldOut ? (
                      <span className="text-zinc-600 uppercase text-[9px]">Sold</span>
                    ) : (
                      <span className={item.stock <= 2 ? 'text-[#ff1a2b] font-bold' : 'text-zinc-400'}>
                        {item.stock} left
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick status message */}
          <div className="mt-2.5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            {isComingSoon ? (
              <span className="text-amber-400">Drop 02 archive item — pre-register for launch notice.</span>
            ) : isSoldOut ? (
              <span className="text-red-400">Size {selectedSize} sold out in Drop 01.</span>
            ) : (
              <span>Size {selectedSize}: {stock} units ready in Dubai · Dispatches in 24 hours.</span>
            )}
          </div>
        </div>
      )}

      {/* Main Order Action */}
      {isComingSoon ? (
        <button
          type="button"
          onClick={() => onOpenRestockModal(isHeadwear ? 'OSFA' : selectedSize, currentColorway.name)}
          className="w-full py-4 px-6 text-xs font-bold uppercase tracking-widest bg-[#ff1a2b] hover:bg-[#e01424] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-950/40"
        >
          <Bell size={14} />
          <span>Pre-Register For Drop 02</span>
        </button>
      ) : !isSoldOut ? (
        <div className="flex gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between border border-white/10 bg-zinc-900 px-3.5 py-3 w-28 shrink-0">
            <span className="text-xs text-zinc-400 font-mono uppercase">Qty</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="text-zinc-400 hover:text-white disabled:opacity-30 font-bold text-sm cursor-pointer p-0.5"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="font-mono text-white text-sm font-bold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                className="text-zinc-400 hover:text-white disabled:opacity-30 font-bold text-sm cursor-pointer p-0.5"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Order Now CTA */}
          <button
            type="button"
            onClick={handleOrder}
            className="flex-1 py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#ff1a2b] hover:bg-[#e01424] text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-950/50 hover:shadow-red-600/30 cursor-pointer active:scale-[0.99]"
          >
            <span>Order Now · {(currentColorway.price * quantity).toFixed(2)} AED</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpenRestockModal(selectedSize, currentColorway.name)}
          className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Bell size={14} className="text-[#ff1a2b]" />
          <span>Notify Me When Size {selectedSize} Restocks</span>
        </button>
      )}

      {/* Trust & Dispatch Badges */}
      <div className="pt-3.5 border-t border-white/8 flex items-center justify-between text-[11px] font-mono text-zinc-400 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Truck size={14} className="text-[#ff1a2b]" />
          <span>Dubai Express (15 AED)</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Check size={13} />
          <span>Cash on Delivery</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <ShieldCheck size={13} className="text-zinc-400" />
          <span>Authentic Guaranteed</span>
        </div>
      </div>
    </div>
  );
};
