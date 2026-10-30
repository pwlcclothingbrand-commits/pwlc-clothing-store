import React, { useState, useEffect } from 'react';
import { X, Package, Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { OrderDetails } from '../types';

interface BrandOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRAND_GMAIL = 'pwlcclothingbrand@gmail.com';

export const BrandOrdersModal: React.FC<BrandOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    let loadedOrders: any[] = [];

    // 1. Fetch from server API
    try {
      const res = await fetch('/api/order');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.recentOrders)) {
          loadedOrders = [...data.recentOrders];
        }
      }
    } catch {
      // fallback to localStorage
    }

    // 2. Fetch from local storage
    try {
      const local = JSON.parse(localStorage.getItem('pwlc_store_orders') || '[]');
      if (Array.isArray(local)) {
        // Merge without duplicates by orderId
        const existingIds = new Set(loadedOrders.map((o) => o.orderId));
        for (const item of local) {
          if (!existingIds.has(item.orderId)) {
            loadedOrders.push(item);
          }
        }
      }
    } catch {
      // ignore
    }

    setOrders(loadedOrders);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyOrder = (order: any) => {
    const summary = [
      `PWLC DUBAI ORDER #${order.orderId}`,
      `Date: ${order.createdAt || new Date().toLocaleDateString()}`,
      `Customer: ${order.customer?.fullName || 'N/A'}`,
      `Phone: ${order.customer?.phone || 'N/A'}`,
      `Email: ${order.customer?.email || 'N/A'}`,
      `Address: ${order.customer?.address || 'N/A'}, Dubai, UAE`,
      `Payment: ${order.paymentMethod || 'COD'}`,
      `Total: ${order.total} AED`,
      `Items:`,
      ...(order.items || []).map(
        (i: any) => `- ${i.title} (${i.size}) x${i.quantity} = ${(i.price * i.quantity).toFixed(2)} AED`
      ),
    ].join('\n');

    navigator.clipboard.writeText(summary);
    setCopiedId(order.orderId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getGmailUrl = (order: any) => {
    const subject = encodeURIComponent(`🚨 PWLC ORDER #${order.orderId} - ${order.customer?.fullName || 'Customer'} [DUBAI]`);
    const body = encodeURIComponent(
      `PWLC DUBAI ORDER RECEIPT #${order.orderId}\n\n` +
      `Customer: ${order.customer?.fullName}\n` +
      `Phone: ${order.customer?.phone}\n` +
      `Email: ${order.customer?.email}\n` +
      `Dubai Address: ${order.customer?.address}\n` +
      `Payment Method: ${order.paymentMethod}\n` +
      `Total: ${order.total} AED\n\n` +
      `Items Ordered:\n` +
      (order.items || []).map((i: any) => `- ${i.title} (${i.size}) x${i.quantity} - ${(i.price * i.quantity).toFixed(2)} AED`).join('\n') +
      `\n\nDispatched to: ${BRAND_GMAIL}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${BRAND_GMAIL}&su=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#141418] border border-white/10 text-white shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-950/60 border border-[#ff1a2b]/40 flex items-center justify-center text-[#ff1a2b]">
              <Package size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-display uppercase tracking-tight">
                  PWLC Brand Orders Hub
                </span>
                <span className="bg-[#ff1a2b]/20 text-[#ff1a2b] border border-[#ff1a2b]/40 font-mono text-[10px] px-2 py-0.5 font-bold">
                  {orders.length} ORDER{orders.length === 1 ? '' : 'S'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Target Dispatch Inbox: <strong className="text-white">{BRAND_GMAIL}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              title="Refresh Orders"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Status Callout */}
        <div className="my-4 p-3.5 bg-zinc-900 border border-white/10 text-xs text-zinc-300 shrink-0 space-y-1">
          <div className="font-semibold text-white flex items-center gap-2">
            <Mail size={14} className="text-[#ff1a2b]" />
            <span>Email Dispatch Status Notice</span>
          </div>
          <p className="text-zinc-400 leading-relaxed text-[11px]">
            Every order placed in this store is automatically recorded here and on the server. If FormSubmit’s external forwarding gateway is slow or facing downtime, you can open any order directly into Gmail with 1 click or copy full customer details below.
          </p>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs">
              <Package size={36} className="mx-auto mb-2 text-zinc-600" />
              <p>No orders recorded yet.</p>
              <p className="text-[11px] text-zinc-600 mt-1">When someone places an order in Dubai, it will appear here immediately.</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div
                key={order.orderId || idx}
                className="p-4 bg-zinc-950 border border-white/10 text-xs space-y-3 relative group hover:border-[#ff1a2b]/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">
                      #{order.orderId}
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-mono text-[10px] px-2 py-0.5">
                      {order.paymentMethod || 'COD Dubai'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                    <Clock size={12} />
                    <span>{order.createdAt || order.receivedAt || 'Recent'}</span>
                  </div>
                </div>

                {/* Customer info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                  <div className="space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{order.customer?.fullName || 'Customer'}</span>
                    </div>
                    <div className="text-zinc-400 flex items-center gap-1.5 font-mono text-[11px]">
                      <Phone size={12} className="text-[#ff1a2b]" />
                      <a href={`tel:${order.customer?.phone}`} className="hover:underline text-white">
                        {order.customer?.phone || 'No phone'}
                      </a>
                    </div>
                    <div className="text-zinc-400 flex items-center gap-1.5 font-mono text-[11px]">
                      <Mail size={12} className="text-zinc-500" />
                      <span>{order.customer?.email || 'No email'}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-zinc-400 flex items-start gap-1.5 text-[11px]">
                      <MapPin size={12} className="text-[#ff1a2b] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-medium">Dubai Delivery Address:</div>
                        <div className="text-zinc-300 font-mono">{order.customer?.address || 'Dubai, UAE'}</div>
                      </div>
                    </div>
                    {order.customer?.notes && (
                      <div className="text-[11px] text-amber-300/80 font-mono">
                        Note: {order.customer.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="bg-zinc-900/60 p-2.5 border border-white/5 space-y-1 font-mono text-[11px]">
                  <div className="text-zinc-500 uppercase text-[10px] font-bold">Items Ordered:</div>
                  {(order.items || []).map((item: any, iIdx: number) => (
                    <div key={iIdx} className="flex justify-between text-zinc-300">
                      <span>
                        • {item.title} (Size: <strong className="text-white">{item.size}</strong>) x {item.quantity}
                      </span>
                      <span className="text-white font-bold">
                        {(item.price * item.quantity).toFixed(2)} AED
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold text-xs">
                    <span>Grand Total:</span>
                    <span className="text-[#ff1a2b]">{Number(order.total || 0).toFixed(2)} AED</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <a
                    href={getGmailUrl(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#ff1a2b] hover:bg-[#e01424] text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail size={12} />
                    <span>Open in Gmail</span>
                    <ExternalLink size={10} />
                  </a>

                  {order.customer?.phone && (
                    <a
                      href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${order.customer.fullName}! PWLC Clothing here confirming your order #${order.orderId} for ${order.total} AED in Dubai.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone size={12} className="text-emerald-400" />
                      <span>WhatsApp Customer</span>
                      <ExternalLink size={10} />
                    </a>
                  )}

                  <button
                    onClick={() => handleCopyOrder(order)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === order.orderId ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Order Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs shrink-0">
          <span className="text-zinc-500 font-mono text-[11px]">
            PWLC Store · Dubai Exclusive Delivery
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-bold uppercase text-[11px] hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
