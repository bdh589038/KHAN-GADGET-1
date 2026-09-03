import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setCheckoutItem
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput, cartSubtotal);
    setCouponFeedback({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const handleProceedCheckout = () => {
    setCheckoutItem(null); // Full cart checkout
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-400 font-black transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">Your Cart is Empty</h3>
                  <p className="text-xs font-medium text-slate-400 max-w-xs mt-1">
                    Looks like you haven't added any premium gadgets or lifestyle essentials yet.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => {
                const price = item.product.discountPrice ?? item.product.price;
                return (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-start gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-slate-100 truncate tracking-tight">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-cyan-400 font-mono font-black mt-0.5">
                        ৳{price.toLocaleString()} each
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Adjuster */}
                        <div className="flex items-center border border-slate-700 bg-slate-950 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-black text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white font-mono">
                            ৳{(price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-black">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code "{appliedCoupon.code}" Applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white text-xs font-bold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. KHAN10)"
                        className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-black text-xs border border-slate-700 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <div
                    className={`text-[11px] font-bold flex items-center gap-1 ${
                      couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {couponFeedback.success ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span>{couponFeedback.text}</span>
                  </div>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Cart Subtotal</span>
                  <span className="font-black text-white font-mono">
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Estimated Delivery</span>
                  <span>Inside Dhaka ৳70 / Outside ৳130</span>
                </div>

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span className="font-display">Subtotal Amount</span>
                  <span className="text-lg text-cyan-400 font-display font-black tracking-tight">
                    ৳{Math.max(0, cartSubtotal - discountAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={handleProceedCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-black text-sm tracking-tight shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <span>Proceed to Quick Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
