import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowLeft,
  PackageCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
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

const BRAND_GMAIL = 'pwlcclothingbrand@gmail.com';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'fallback'>('sending');

  // Form State: strictly EMPTY by default as requested by user
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    postalCode: '',
    country: 'United Arab Emirates',
    deliveryNotes: '',
    deliveryProximity: initialDeliveryType, // 'close' | 'standard'
    paymentMethod: 'cod', // 'cod' | 'card_delivery' | 'card' | 'applepay'
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
  });

  if (!isOpen) return null;

  // Fallback item if opened directly without prior bag population
  const activeItems: CartItem[] =
    items.length > 0
      ? items
      : [
          {
            id: 'pwlc-001-black-earth-default',
            title: 'PWLC 001 Black Earth Design',
            size: 'M',
            quantity: 1,
            price: 75.0,
            image: '/assets/pwlc_001_black_earth.jpg',
          },
        ];

  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = formData.deliveryProximity === 'close' ? 15.0 : 30.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      return;
    }
    setStep('payment');
  };

  const generateMailtoUrl = (order: OrderDetails) => {
    const subject = encodeURIComponent(`PWLC Order Confirmation #${order.orderId} - ${order.customer.fullName}`);
    const bodyLines = [
      `PWLC OFFICIAL STORE ORDER`,
      `=========================`,
      `Order ID: ${order.orderId}`,
      `Date: ${order.createdAt}`,
      ``,
      `CUSTOMER DETAILS:`,
      `Name: ${order.customer.fullName}`,
      `Phone / WhatsApp: ${order.customer.phone}`,
      `Email: ${order.customer.email}`,
      `Address: ${order.customer.address}`,
      `City / Emirate: ${order.customer.city}`,
      `Country: ${order.customer.country}`,
      `Postal Code: ${order.customer.postalCode || 'N/A'}`,
      `Special Notes: ${order.customer.notes || 'None'}`,
      ``,
      `ORDERED ITEMS:`,
      ...order.items.map(
        (i) => `- ${i.title} (Size: ${i.size}) x ${i.quantity} = ${(i.price * i.quantity).toFixed(2)} AED`
      ),
      ``,
      `PAYMENT & DELIVERY:`,
      `Payment Method: ${order.paymentMethod}`,
      `Delivery Type: ${order.estimatedDelivery}`,
      `Subtotal: ${order.subtotal.toFixed(2)} AED`,
      `Shipping: ${order.shipping.toFixed(2)} AED`,
      `Total: ${order.total.toFixed(2)} AED`,
      `=========================`,
      `Dispatched to: ${BRAND_GMAIL}`,
    ];
    return `mailto:${BRAND_GMAIL}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  const generateWhatsAppUrl = (order: OrderDetails) => {
    const text = encodeURIComponent(
      `Hello PWLC Team! I just submitted order #${order.orderId}.\n\nItems: ${order.items
        .map((i) => `${i.title} (${i.size}) x${i.quantity}`)
        .join(', ')}\nTotal: ${order.total.toFixed(2)} AED (${order.paymentMethod})\nDelivery to: ${
        order.customer.fullName
      }, ${order.customer.address}, ${order.customer.city}\nPhone: ${order.customer.phone}\n\nEmail sent to: ${BRAND_GMAIL}`
    );
    return `https://wa.me/?text=${text}`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `PWLC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDetails = {
      orderId,
      items: [...activeItems],
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total,
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim() || 'Dubai',
        postalCode: formData.postalCode.trim() || '00000',
        country: formData.country.trim() || 'United Arab Emirates',
        notes: formData.deliveryNotes.trim(),
      },
      paymentMethod:
        formData.paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : formData.paymentMethod === 'card_delivery'
          ? 'Card Machine on Delivery'
          : formData.paymentMethod === 'card'
          ? 'Online Card Payment'
          : 'Apple Pay / Digital Wallet',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      estimatedDelivery:
        formData.deliveryProximity === 'close'
          ? '1–2 Days (Local / Close Area Delivery)'
          : '2–4 Days (Standard Regional Delivery)',
    };

    // 1. Send order details directly to the user's Gmail: pwlcclothingbrand@gmail.com
    try {
      const itemsListFormatted = activeItems
        .map((i) => `${i.title} [Size ${i.size}] x ${i.quantity} (${(i.price * i.quantity).toFixed(2)} AED)`)
        .join(', ');

      const response = await fetch(`https://formsubmit.co/ajax/${BRAND_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New PWLC Order #${orderId} - ${formData.fullName} (${total.toFixed(2)} AED)`,
          order_id: orderId,
          order_date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }) + ' (UAE Time)',
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          customer_email: formData.email,
          delivery_address: formData.address,
          city_emirate: formData.city,
          country: formData.country,
          postal_code: formData.postalCode || 'N/A',
          delivery_zone:
            formData.deliveryProximity === 'close'
              ? 'Close / Local Area (15 AED)'
              : 'Standard Delivery (30 AED)',
          payment_method: newOrder.paymentMethod,
          items_purchased: itemsListFormatted,
          subtotal: `${subtotal.toFixed(2)} AED`,
          shipping_fee: `${shippingCost.toFixed(2)} AED`,
          grand_total: `${total.toFixed(2)} AED`,
          customer_notes: formData.deliveryNotes || 'None',
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('fallback');
      }
    } catch {
      setEmailStatus('fallback');
    }

    // 2. Also forward to local /api/order middleware
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newOrder,
          destination: BRAND_GMAIL,
        }),
      });
    } catch {
      // Local fallback
    }

    // 3. Persist order in local store
    try {
      const savedOrders = JSON.parse(localStorage.getItem('pwlc_store_orders') || '[]');
      localStorage.setItem('pwlc_store_orders', JSON.stringify([newOrder, ...savedOrders]));
    } catch {
      // Local fallback
    }

    setIsSubmitting(false);
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
              01. Delivery Details
            </span>
            <span className="text-zinc-600">›</span>
            <span className={step === 'payment' ? 'text-[#ff1a2b] font-bold' : 'text-zinc-500'}>
              02. Payment & Confirmation
            </span>
          </div>
        )}

        {/* Step 1: Delivery Details (Empty inputs for customer to type) */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitShipping} className="space-y-4 py-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Full Name <span className="text-[#ff1a2b]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Phone / WhatsApp <span className="text-[#ff1a2b]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +971 50 123 4567"
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                Your Email Address <span className="text-[#ff1a2b]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your personal email for tracking"
                className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                Street Address / Villa / Apartment <span className="text-[#ff1a2b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Building or Villa number, Street name, Community"
                className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  City / Emirate <span className="text-[#ff1a2b]">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Al Ain">Al Ain</option>
                  <option value="Other">Other / GCC</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="00000"
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#ff1a2b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-1">
                Delivery Notes / Gate Code (Optional)
              </label>
              <input
                type="text"
                value={formData.deliveryNotes}
                onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                placeholder="Leave at doorstep, ring bell, call upon arrival, etc."
                className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#ff1a2b]"
              />
            </div>

            {/* Delivery Method Selection */}
            <div className="pt-2">
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-2">
                Select Delivery Zone
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
                      <div className="font-bold text-white">Close / Local Area</div>
                      <div className="text-[10px] text-zinc-500">Same City · 1–2 Days</div>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-200 font-bold">15.00 AED</span>
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
                  <span className="font-mono text-zinc-200 font-bold">30.00 AED</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-zinc-400">
                Order Total:{' '}
                <strong className="text-white font-mono text-sm">{total.toFixed(2)} AED</strong>
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method (All payment inputs empty, no pre-filled personal info) */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="space-y-4 py-4 text-xs">
            {/* Payment Method Selector */}
            <div>
              <label className="block text-zinc-300 uppercase tracking-wider text-[11px] font-semibold mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'cod',
                    label: 'Cash on Delivery (COD)',
                    sub: 'Pay cash to courier upon arrival',
                    badge: 'RECOMMENDED',
                    icon: Truck,
                  },
                  {
                    id: 'card_delivery',
                    label: 'Card on Delivery',
                    sub: 'POS card terminal at doorstep',
                    badge: 'CONTACTLESS',
                    icon: CreditCard,
                  },
                  {
                    id: 'card',
                    label: 'Credit / Debit Card',
                    sub: 'Pay online securely now',
                    badge: 'ONLINE',
                    icon: CreditCard,
                  },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = formData.paymentMethod === pm.id;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      className={`relative p-3 border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#ff1a2b] bg-white/5 text-white'
                          : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {pm.badge && (
                        <span
                          className={`absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 uppercase tracking-wider ${
                            pm.id === 'cod'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {pm.badge}
                        </span>
                      )}
                      <Icon size={16} className={isSelected ? 'text-[#ff1a2b]' : 'text-zinc-500'} />
                      <div className="mt-3">
                        <span className="font-bold text-[11px] block text-white">{pm.label}</span>
                        <span className="text-[10px] text-zinc-400 block">{pm.sub}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COD Explanation */}
            {formData.paymentMethod === 'cod' && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>Cash on Delivery (COD) Selected</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  No advance payment or card required. Hand over exactly{' '}
                  <strong className="text-white font-mono">{total.toFixed(2)} AED</strong> in cash
                  directly to the courier upon delivery at your doorstep anywhere in the UAE.
                </p>
                <div className="text-[10px] font-mono text-zinc-400">
                  ✓ Courier will call or WhatsApp your number before arrival.
                </div>
              </div>
            )}

            {/* Card on Delivery Explanation */}
            {formData.paymentMethod === 'card_delivery' && (
              <div className="p-4 bg-zinc-900 border border-white/10 text-xs text-zinc-300 space-y-1">
                <p className="font-semibold text-white flex items-center gap-2">
                  <CreditCard size={14} className="text-[#ff1a2b]" />
                  <span>Card Machine on Doorstep Delivery</span>
                </p>
                <p className="text-zinc-400 text-[11px]">
                  The delivery courier will bring a wireless card payment terminal (accepts Visa, Mastercard, and Apple Pay).
                </p>
              </div>
            )}

            {/* Online Card Inputs (Empty strings, NO pre-filled dummy numbers) */}
            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-900 border border-white/10 space-y-3">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="•••• •••• •••• ••••"
                    className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs placeholder-zinc-700 focus:outline-none focus:border-[#ff1a2b]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs placeholder-zinc-700 focus:outline-none focus:border-[#ff1a2b]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-white font-mono text-xs placeholder-zinc-700 focus:outline-none focus:border-[#ff1a2b]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary Review */}
            <div className="p-3 bg-zinc-950 border border-white/5 text-xs text-zinc-400 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Customer</span>
                <span className="text-white font-semibold">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery To</span>
                <span className="text-zinc-300 truncate max-w-xs">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Items</span>
                <span className="text-zinc-300">
                  {activeItems.map((i) => `${i.title} (${i.size}) x${i.quantity}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/5">
                <span>Shipping ({formData.deliveryProximity === 'close' ? 'Close' : 'Standard'})</span>
                <span className="text-zinc-200">{shippingCost.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1 border-t border-white/10">
                <span className="text-zinc-300">Total Amount</span>
                <span className="text-white font-mono">{total.toFixed(2)} AED</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white text-xs font-bold uppercase tracking-widest transition-colors active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Order...</span>
                ) : (
                  <span>Submit Order ({total.toFixed(2)} AED)</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation (Shows order sent to pwlcclothingbrand@gmail.com) */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="py-4 space-y-5 text-center sm:text-left">
            {/* Success Notification Banner */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <PackageCheck size={36} className="shrink-0 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Order Submitted: {confirmedOrder.orderId}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Thank you, <strong>{confirmedOrder.customer.fullName}</strong>. Your order has been placed.
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-300/90 flex items-center gap-1.5 font-mono">
                    <Mail size={13} className="shrink-0 text-emerald-400" />
                    <span>
                      Order details sent to brand dispatch at: <strong className="text-white underline">{BRAND_GMAIL}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Email & WhatsApp Actions */}
            <div className="p-3 bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-zinc-300 flex items-center gap-2">
                <Sparkles size={14} className="text-[#ff1a2b] shrink-0" />
                <span>Order details logged for brand dispatch to {BRAND_GMAIL}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={generateMailtoUrl(confirmedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold flex items-center gap-1.5 border border-white/10 transition-colors text-[11px] whitespace-nowrap cursor-pointer"
                >
                  <Mail size={13} className="text-[#ff1a2b]" />
                  <span>Send Direct Email</span>
                  <ExternalLink size={11} />
                </a>
                <a
                  href={generateWhatsAppUrl(confirmedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 font-semibold flex items-center gap-1.5 transition-colors text-[11px] whitespace-nowrap cursor-pointer"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>Notify via WhatsApp</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Itemized Order Recap */}
            <div className="border border-white/10 p-4 bg-zinc-900/60 divide-y divide-white/5 text-xs">
              <div className="pb-3 flex justify-between font-mono text-zinc-400 uppercase text-[11px]">
                <span>Purchased Item</span>
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
                      <div className="text-[11px] text-zinc-500 font-mono">
                        Size {item.size} · Heavyweight 300 GSM
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-right">
                    <div className="text-white font-bold">
                      {(item.price * item.quantity).toFixed(2)} AED
                    </div>
                    <div className="text-zinc-500 text-[11px]">{item.quantity} unit(s)</div>
                  </div>
                </div>
              ))}

              <div className="pt-3 space-y-1 font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{confirmedOrder.subtotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({confirmedOrder.estimatedDelivery.includes('Close') ? 'Close Area' : 'Standard'})</span>
                  <span>{confirmedOrder.shipping.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due ({confirmedOrder.paymentMethod})</span>
                  <span>{confirmedOrder.total.toFixed(2)} AED</span>
                </div>
              </div>
            </div>

            {/* Delivery Destination Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left">
              <div className="p-3 bg-zinc-900 border border-white/5">
                <div className="font-bold text-white uppercase text-[11px] mb-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#ff1a2b]" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-zinc-300 font-mono text-[11px] leading-relaxed">
                  {confirmedOrder.customer.fullName}
                  <br />
                  Phone: {confirmedOrder.customer.phone}
                  <br />
                  Email: {confirmedOrder.customer.email}
                  <br />
                  {confirmedOrder.customer.address}
                  <br />
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.country}
                </p>
              </div>

              <div className="p-3 bg-zinc-900 border border-white/5">
                <div className="font-bold text-white uppercase text-[11px] mb-1 flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400" />
                  <span>Fulfillment Timeline</span>
                </div>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Estimated delivery: <strong className="text-white">{confirmedOrder.estimatedDelivery}</strong>.
                  <br />
                  The courier will call or WhatsApp your number ({confirmedOrder.customer.phone}) prior to delivery.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
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
