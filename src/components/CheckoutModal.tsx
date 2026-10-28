import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  promoCode: string;
  initialDeliveryType?: 'close' | 'standard';
  onCompleteOrder: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  promoCode,
  initialDeliveryType = 'close',
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Hamdan Al-Nuaimi',
    email: 'pwlcclothingbrand@gmail.com',
    address: 'Al Wasl Road, Villa 42',
    city: 'Dubai',
    postalCode: '00000',
    country: 'United Arab Emirates',
    deliveryProximity: initialDeliveryType, // 'close' | 'standard'
    paymentMethod: 'card', // card | applepay | cod
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = formData.deliveryProximity === 'close' ? 15.0 : 30.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `PWLC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDetails = {
      orderId,
      items: [...items],
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod.toUpperCase(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      estimatedDelivery:
        formData.deliveryProximity === 'close'
          ? '1–2 Days (Local / Close Delivery)'
          : '2–4 Days (Standard Delivery)',
    };

    setConfirmedOrder(newOrder);
    setStep('confirmation');
    onCompleteOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#141418] border border-white/10 text-white shadow-2xl p-6 sm:p-8 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-display uppercase tracking-tight">
              PWLC Checkout
            </span>
            <span className="text-zinc-500 font-mono text-xs">· Drop 01</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center gap-4 py-4 text-xs font-mono border-b border-white/5">
            <span className={step === 'shipping' ? 'text-[#ff1a2b] font-bold' : 'text-zinc-500'}>
              01. Shipping Destination
            </span>
            <span className="text-zinc-600">›</span>
            <span className={step === 'payment' ? 'text-[#ff1a2b] font-bold' : 'text-zinc-500'}>
              02. Payment & Authorization
            </span>
          </div>
        )}

        {/* Step 1: Shipping Destination */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitShipping} className="space-y-4 py-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Email for Tracking Updates
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                Street Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
            </div>

            {/* Delivery Method Selection */}
            <div className="pt-3">
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-2">
                Delivery Location & Rates
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setFormData({ ...formData, deliveryProximity: 'close' })}
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                    formData.deliveryProximity === 'close'
                      ? 'border-[#ff1a2b] bg-white/5'
                      : 'border-white/10 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#ff1a2b]" />
                    <div>
                      <div className="font-bold text-white">Close / Nearby Area</div>
                      <div className="text-[10px] text-zinc-500">Same City · 1–2 Days</div>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-200 font-bold">
                    15.00 AED
                  </span>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, deliveryProximity: 'standard' })}
                  className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                    formData.deliveryProximity === 'standard'
                      ? 'border-[#ff1a2b] bg-white/5'
                      : 'border-white/10 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-zinc-400" />
                    <div>
                      <div className="font-bold text-white">Standard Delivery</div>
                      <div className="text-[10px] text-zinc-500">All Other Areas · 2–4 Days</div>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-200 font-bold">
                    30.00 AED
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-zinc-400">Total with Shipping: <strong className="text-white font-mono">{total.toFixed(2)} AED</strong></span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment & Authorization */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="space-y-4 py-4 text-xs">
            {/* Payment Method Selector */}
            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Apple / Google Pay', icon: ShieldCheck },
                  { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = formData.paymentMethod === pm.id;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      className={`p-3 border text-left flex flex-col justify-between transition-colors ${
                        isSelected
                          ? 'border-[#ff1a2b] bg-white/5 text-white'
                          : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Icon size={16} className={isSelected ? 'text-[#ff1a2b]' : 'text-zinc-500'} />
                      <span className="font-bold text-[11px] mt-2 block">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card Inputs */}
            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-900 border border-white/10 space-y-3">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff1a2b]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff1a2b]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      defaultValue="888"
                      className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#ff1a2b]"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'applepay' && (
              <div className="p-6 bg-zinc-900 border border-white/10 text-center space-y-2">
                <ShieldCheck size={28} className="text-white mx-auto" />
                <p className="text-xs text-zinc-300 font-semibold">Biometric Touch ID / Face ID Ready</p>
                <p className="text-[11px] text-zinc-500">Click Authorize below to simulate immediate digital wallet tokenization.</p>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="p-4 bg-zinc-900 border border-white/10 text-xs text-zinc-300 space-y-1">
                <p className="font-semibold text-white">Cash on Delivery Policy:</p>
                <p className="text-zinc-400 text-[11px]">Pay the courier in exact cash upon doorstep arrival. Courier will provide receipt.</p>
              </div>
            )}

            {/* Summary Review */}
            <div className="p-3 bg-zinc-950 border border-white/5 text-xs text-zinc-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Shipping to</span>
                <span className="text-zinc-300 truncate max-w-xs">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Charge</span>
                <span className="text-white font-bold">{total.toFixed(2)} AED</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-widest transition-colors active:scale-[0.99]"
              >
                Authorize & Place Order ({total.toFixed(2)} AED)
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="py-6 space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400">
              <PackageCheck size={36} className="shrink-0 text-emerald-400" />
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Order Confirmed: {confirmedOrder.orderId}
                </h3>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Thank you, {confirmedOrder.customer.fullName}. Receipt sent to <span className="font-mono text-white">{confirmedOrder.customer.email}</span>.
                </p>
              </div>
            </div>

            {/* Itemized Order Recap */}
            <div className="border border-white/10 p-4 bg-zinc-900/60 divide-y divide-white/5 text-xs">
              <div className="pb-3 flex justify-between font-mono text-zinc-400 uppercase text-[11px]">
                <span>Purchased Items (Drop 01)</span>
                <span>Qty · Size</span>
              </div>

              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-950 border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">Size {item.size} · Washed Black</div>
                    </div>
                  </div>
                  <div className="font-mono text-right">
                    <div className="text-white font-bold">{(item.price * item.quantity).toFixed(2)} AED</div>
                    <div className="text-zinc-500 text-[11px]">{item.quantity} unit(s)</div>
                  </div>
                </div>
              ))}

              <div className="pt-3 space-y-1 font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{confirmedOrder.subtotal.toFixed(2)} AED</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{confirmedOrder.discount.toFixed(2)} AED</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{confirmedOrder.shipping === 0 ? 'FREE' : `${confirmedOrder.shipping.toFixed(2)} AED`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span>{confirmedOrder.total.toFixed(2)} AED</span>
                </div>
              </div>
            </div>

            {/* Delivery & Tracking Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left">
              <div className="p-3 bg-zinc-900 border border-white/5">
                <div className="font-bold text-white uppercase text-[11px] mb-1">
                  Destination
                </div>
                <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">
                  {confirmedOrder.customer.fullName}<br />
                  {confirmedOrder.customer.address}<br />
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.postalCode}<br />
                  {confirmedOrder.customer.country}
                </p>
              </div>

              <div className="p-3 bg-zinc-900 border border-white/5">
                <div className="font-bold text-white uppercase text-[11px] mb-1">
                  Tracking & Delivery
                </div>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Estimated delivery: <strong className="text-white">{confirmedOrder.estimatedDelivery}</strong>.<br />
                  Tracking number will activate within 24 hours of warehouse dispatch.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-zinc-200 transition-colors"
              >
                Back to PWLC Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
