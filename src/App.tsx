import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductViewer } from './components/ProductViewer';
import { PurchaseModule } from './components/PurchaseModule';
import { UpcomingDrops } from './components/UpcomingDrops';
import { SizeChartModal } from './components/SizeChartModal';
import { FitCalculatorModal } from './components/FitCalculatorModal';
import { RestockModal } from './components/RestockModal';
import { SpecsSection } from './components/SpecsSection';
import { BrandStory } from './components/BrandStory';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { INITIAL_INVENTORY, COLORWAYS, PRODUCT_DATA } from './data/product';
import { Size, SizeInventory, CartItem, OrderDetails, Colorway } from './types';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  // Current Active Colorway (defaults to PWLC 001 Black Earth Design - the only one currently available to buy)
  const [currentColorway, setCurrentColorway] = useState<Colorway>(() => COLORWAYS[0]);

  // Inventory state with localStorage persistence (strictly 0 stock for XS, XL, XXL)
  const [inventory, setInventory] = useState<SizeInventory[]>(() => {
    try {
      const saved = localStorage.getItem('pwlc_drop01_inventory_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: SizeInventory) => {
            if (item.size === 'XS' || item.size === 'XL' || item.size === 'XXL') {
              return { ...item, stock: 0 };
            }
            return item;
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_INVENTORY;
  });

  // Selected Size (Default to M)
  const [selectedSize, setSelectedSize] = useState<Size>('M');

  // Shopping Bag Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pwlc_drop01_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isFitCalculatorOpen, setIsFitCalculatorOpen] = useState(false);
  const [restockModal, setRestockModal] = useState<{ isOpen: boolean; size?: Size; targetName?: string }>({
    isOpen: false,
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<{ amount: number; code: string }>({
    amount: 0,
    code: '',
  });
  const [checkoutDeliveryType, setCheckoutDeliveryType] = useState<'close' | 'standard'>('close');

  // Inline sizing unit for the sizing section
  const [inlineUnit, setInlineUnit] = useState<'inches' | 'cm'>('inches');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pwlc_drop01_inventory_v3', JSON.stringify(inventory));
    } catch {
      // ignore
    }
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem('pwlc_drop01_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Total cart count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Coming Soon colorways list
  const comingSoonColorways = COLORWAYS.filter((c) => c.status === 'coming_soon');

  // Add to Bag handler
  const handleAddToCart = (colorway: Colorway, size: Size, quantity: number) => {
    if (colorway.status === 'coming_soon') {
      setRestockModal({ isOpen: true, size, targetName: colorway.name });
      return;
    }

    const sizeInv = inventory.find((i) => i.size === size);
    if (!sizeInv || sizeInv.stock <= 0) {
      setRestockModal({ isOpen: true, size, targetName: `${colorway.colorName} (Size ${size})` });
      return;
    }

    setCart((prevCart) => {
      const itemKey = `${colorway.id}-${size}`;
      const existingIndex = prevCart.findIndex((item) => item.id.startsWith(itemKey));
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = Math.min(sizeInv.stock, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${itemKey}-${Date.now()}`,
          size,
          quantity: Math.min(sizeInv.stock, quantity),
          price: colorway.price,
          title: colorway.name,
          image: colorway.image,
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
  };

  // Instant Checkout
  const handleInstantBuy = (colorway: Colorway, size: Size, quantity: number) => {
    handleAddToCart(colorway, size, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update Bag Item Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const sizeInv = inventory.find((i) => i.size === item.size);
            const maxStock = sizeInv ? sizeInv.stock : 6;
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > maxStock) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Bag
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Open Checkout with applied discounts and delivery selection
  const handleStartCheckout = (discountAmount: number, promoCode: string, initialDeliveryType: 'close' | 'standard' = 'close') => {
    setCheckoutDiscount({ amount: discountAmount, code: promoCode });
    setCheckoutDeliveryType(initialDeliveryType);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Complete Order: Deduct actual inventory in real-time
  const handleCompleteOrder = (order: OrderDetails) => {
    setInventory((prev) =>
      prev.map((inv) => {
        const orderItem = order.items.find((item) => item.size === inv.size);
        if (orderItem) {
          return {
            ...inv,
            stock: Math.max(0, inv.stock - orderItem.quantity),
          };
        }
        return inv;
      })
    );
    // Clear the cart
    setCart([]);
  };

  // Reset Inventory (for testing & owner verification)
  const handleResetInventory = () => {
    setInventory(INITIAL_INVENTORY);
    setCart([]);
    localStorage.removeItem('pwlc_drop01_inventory');
    localStorage.removeItem('pwlc_drop01_inventory_v3');
    localStorage.removeItem('pwlc_drop01_cart');
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col selection:bg-[#ff1a2b] selection:text-white">
      {/* Top Bar Navigation */}
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Product Showcase Section */}
      <main id="product" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Visuals & Interactive Inspection */}
          <div className="lg:col-span-7">
            <ProductViewer
              imageSrc={currentColorway.image}
              productName={currentColorway.name}
            />
          </div>

          {/* Right Column: Contiguous Purchase / Pre-Register Module */}
          <div className="lg:col-span-5 sticky top-24">
            <PurchaseModule
              currentColorway={currentColorway}
              onSelectColorway={setCurrentColorway}
              inventory={inventory}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onAddToCart={handleAddToCart}
              onInstantBuy={handleInstantBuy}
              onOpenSizeChart={() => setIsSizeChartOpen(true)}
              onOpenFitCalculator={() => setIsFitCalculatorOpen(true)}
              onOpenRestockModal={(size, colorwayName) =>
                setRestockModal({
                  isOpen: true,
                  size,
                  targetName: colorwayName || `${currentColorway.colorName} (Size ${size})`,
                })
              }
            />
          </div>
        </div>

        {/* Dedicated Upcoming Drops Section (Drop 02 Coming Soon) */}
        <UpcomingDrops
          comingSoonColorways={comingSoonColorways}
          onSelectColorway={(colorway) => {
            setCurrentColorway(colorway);
            const target = document.getElementById('product');
            target?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRestockModal={(colorwayName) =>
            setRestockModal({
              isOpen: true,
              size: selectedSize,
              targetName: colorwayName,
            })
          }
        />

        {/* Inline Size & Measurements Table Anchor */}
        <div id="sizing" className="mt-24 pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-mono tracking-widest uppercase text-[#ff1a2b] font-bold mb-2">
                FIT & MEASUREMENTS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Drop 01 & Drop 02 Cut Matrix
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                Engineered for an intentional boxy silhouette with relaxed shoulders, tight non-sag collar, and zero fabric shrinkage across all colorways.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFitCalculatorOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-zinc-900 border border-white/10 hover:border-[#ff1a2b] text-white flex items-center gap-1.5 transition-colors"
              >
                <Sparkles size={13} className="text-[#ff1a2b]" />
                <span>Find Your Size</span>
              </button>

              <div className="flex items-center bg-zinc-900 border border-white/10 p-0.5">
                <button
                  onClick={() => setInlineUnit('inches')}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    inlineUnit === 'inches' ? 'bg-[#ff1a2b] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setInlineUnit('cm')}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    inlineUnit === 'cm' ? 'bg-[#ff1a2b] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto border border-white/10 bg-[#121215]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-900/90 border-b border-white/10 text-zinc-400 uppercase tracking-wider font-mono">
                  <th className="py-3 px-5">Size</th>
                  <th className="py-3 px-5">Drop 01 Stock</th>
                  <th className="py-3 px-5">Drop 02 Allocation</th>
                  <th className="py-3 px-5">Chest (Pit to Pit)</th>
                  <th className="py-3 px-5">Length</th>
                  <th className="py-3 px-5">Shoulder Drop</th>
                  <th className="py-3 px-5 text-right">Selection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {PRODUCT_DATA.sizeChart.map((row) => {
                  const sizeInv = inventory.find((inv) => inv.size === row.size);
                  const stock = sizeInv ? sizeInv.stock : 0;
                  const isSelected = selectedSize === row.size;
                  const isSoldOut = stock <= 0;

                  return (
                    <tr
                      key={row.size}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-white/5 text-white'
                          : 'text-zinc-300 hover:bg-zinc-900/40'
                      }`}
                    >
                      <td className="py-3.5 px-5 font-bold flex items-center gap-2">
                        <span>{row.size}</span>
                        {isSoldOut && (
                          <span className="text-[10px] text-zinc-500 font-normal">
                            (Drop 01 Sold Out)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        {isSoldOut ? (
                          <span className="text-[#ff1a2b] font-bold">0 units left</span>
                        ) : stock <= 2 ? (
                          <span className="text-amber-400 font-bold">{stock} units left (Low)</span>
                        ) : (
                          <span className="text-emerald-400">{stock} units left</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-amber-300 font-bold">6 units (Coming Soon)</span>
                      </td>
                      <td className="py-3.5 px-5">
                        {inlineUnit === 'inches' ? row.chestIn : `${row.chestCm} cm`}
                      </td>
                      <td className="py-3.5 px-5">
                        {inlineUnit === 'inches' ? row.lengthIn : `${row.lengthCm} cm`}
                      </td>
                      <td className="py-3.5 px-5">
                        {inlineUnit === 'inches' ? row.shoulderIn : `${row.shoulderCm} cm`}
                      </td>
                      <td className="py-3.5 px-5 text-right font-sans">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#ff1a2b] font-semibold">
                            <Check size={12} /> Active Size
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedSize(row.size as Size);
                              const target = document.getElementById('product');
                              target?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-[11px] text-zinc-400 hover:text-white underline"
                          >
                            Choose {row.size}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Specifications & Craftsmanship Section */}
      <SpecsSection />

      {/* Brand Story & Manifesto */}
      <BrandStory />

      {/* Footer */}
      <Footer onResetInventory={handleResetInventory} />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        inventory={inventory}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleStartCheckout}
      />

      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      <FitCalculatorModal
        isOpen={isFitCalculatorOpen}
        onClose={() => setIsFitCalculatorOpen(false)}
        onSelectSize={setSelectedSize}
      />

      <RestockModal
        isOpen={restockModal.isOpen}
        onClose={() => setRestockModal({ isOpen: false })}
        size={restockModal.size}
        targetName={restockModal.targetName}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={checkoutDiscount.amount}
        promoCode={checkoutDiscount.code}
        initialDeliveryType={checkoutDeliveryType}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
