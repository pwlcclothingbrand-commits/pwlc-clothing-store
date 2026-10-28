import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';
import { CartItem, SizeInventory } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  inventory: SizeInventory[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (discountAmount: number, promoCode: string, initialDeliveryType: 'close' | 'standard') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  inventory,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [deliveryType, setDeliveryType] = useState<'close' | 'standard'>('close');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.percent) / 100 : 0;
  const shippingAmount = items.length === 0 ? 0 : deliveryType === 'close' ? 15.0 : 30.0;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'PWLC10' || code === 'DROP01' || code === 'EARTH10') {
      setAppliedPromo({ code, percent: 10 });
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "PWLC10" for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121215] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#ff1a2b]" />
              <h2 className="text-base font-bold uppercase tracking-wider font-display">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Delivery Pricing Strip */}
          <div className="px-6 py-2.5 bg-[#18181c] border-b border-white/5 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-300">
              <Truck size={14} className="text-[#ff1a2b]" />
              <span>Flat Delivery: <strong>15 AED</strong> close · <strong>30 AED</strong> standard</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag size={36} className="text-zinc-600 mb-3" />
                <p className="text-sm font-semibold text-zinc-300">Your bag is empty</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  PWLC Earth Series is produced in strictly limited runs of 6 per size.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const sizeInv = inventory.find((inv) => inv.size === item.size);
                const currentStock = sizeInv ? sizeInv.stock : 0;

                return (
                  <div key={item.id} className="py-4 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-zinc-900 border border-white/10 shrink-0 p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                            <span>Size: <strong className="text-white font-mono">{item.size}</strong></span>
                            <span>·</span>
                            <span>300 GSM Heavyweight</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-white/10 bg-zinc-900 px-2 py-1 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-zinc-400 hover:text-white px-1.5"
                          >
                            -
                          </button>
                          <span className="font-mono px-2 text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            disabled={item.quantity >= currentStock}
                            className="text-zinc-400 hover:text-white px-1.5 disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-bold font-mono text-white tabular-nums">
                            {(item.price * item.quantity).toFixed(2)} AED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0e0e11] space-y-4">
              {/* Delivery Zone Selector */}
              <div>
                <label className="block text-zinc-400 uppercase tracking-wider text-[10px] font-semibold mb-1.5">
                  Delivery Distance / Location
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('close')}
                    className={`p-2 border text-left transition-colors ${
                      deliveryType === 'close'
                        ? 'border-[#ff1a2b] bg-white/5 text-white'
                        : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px] text-white">Close / Nearby</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">15.00 AED</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('standard')}
                    className={`p-2 border text-left transition-colors ${
                      deliveryType === 'standard'
                        ? 'border-[#ff1a2b] bg-white/5 text-white'
                        : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-semibold text-[11px] text-white">Standard Delivery</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">30.00 AED</div>
                  </button>
                </div>
              </div>

              {/* Promo Code Input */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try PWLC10)"
                      className="flex-1 bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#ff1a2b]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold uppercase tracking-wider text-white border border-white/10"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-950/30 border border-emerald-900/40 text-emerald-400 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Tag size={12} />
                      <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% off)</span>
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-zinc-400 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1">{promoError}</p>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} shirts @ 60 AED)</span>
                  <span className="text-white">{subtotal.toFixed(2)} AED</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo?.percent}%)</span>
                    <span>-{discountAmount.toFixed(2)} AED</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliveryType === 'close' ? 'Close Area' : 'Standard Area'})</span>
                  <span>{shippingAmount.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white font-sans">
                  <span>Estimated Total</span>
                  <span className="font-mono">{total.toFixed(2)} AED</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(discountAmount, appliedPromo?.code || '', deliveryType)}
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-[#ff1a2b] hover:bg-[#e01424] text-white flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck size={13} className="text-zinc-400" />
                <span>Encrypted 256-Bit Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
