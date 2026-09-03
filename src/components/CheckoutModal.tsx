import React, { useState } from 'react';
import {
  X,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  Phone,
  User,
  MapPin,
  CreditCard,
  Banknote
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingZone, PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutItem,
    setCheckoutItem,
    cart,
    placeOrder,
    appliedCoupon
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shippingZone, setShippingZone] = useState<ShippingZone>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Active items being checked out: either single "Buy Now" product or entire cart
  const items = checkoutItem ? [checkoutItem] : cart;

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm text-center space-y-4">
          <p className="text-sm text-slate-300">No items to checkout.</p>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = shippingZone === 'inside_dhaka' ? 70 : 130;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount) + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validations
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid phone number (e.g., 017XXXXXXXX).');
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setErrorMsg('Please provide a complete delivery address including house/road/area.');
      return;
    }

    setIsSubmitting(true);

    try {
      placeOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        shippingZone,
        paymentMethod,
        notes: notes.trim() || undefined
      });
    } catch (err) {
      console.error('Order placement error:', err);
      setErrorMsg('Something went wrong while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsCheckoutOpen(false);
    setCheckoutItem(null);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Zap className="w-5 h-5 fill-orange-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                Fast Order Checkout
              </h2>
              <p className="text-[11px] font-medium text-slate-400">
                Confirm your details for speedy delivery & Cash on Delivery
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-left">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* Ordered Products Snapshot */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Selected Item{items.length > 1 ? 's' : ''} ({items.reduce((s, i) => s + i.quantity, 0)})
            </label>
            <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 max-h-40 overflow-y-auto divide-y divide-slate-800/60">
              {items.map(item => {
                const price = item.product.discountPrice ?? item.product.price;
                return (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 truncate max-w-[70%]">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-slate-100 truncate tracking-tight">
                          {item.product.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          Qty: {item.quantity} × ৳{price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-white font-mono">
                      ৳{(price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    id="checkout-name-input"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Shakil Khan"
                    className="w-full bg-slate-950 text-slate-100 text-xs sm:text-sm font-medium rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-300">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    id="checkout-phone-input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-slate-950 text-slate-100 text-xs sm:text-sm font-bold rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-300">
                Detailed Delivery Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  required
                  id="checkout-address-input"
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="House number, road name/number, area, police station, district..."
                  className="w-full bg-slate-950 text-slate-100 text-xs sm:text-sm font-medium rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Shipping Zone Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Shipping Zone <span className="text-rose-400">*</span></span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    shippingZone === 'inside_dhaka'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shippingZone"
                      checked={shippingZone === 'inside_dhaka'}
                      onChange={() => setShippingZone('inside_dhaka')}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-black">Inside Dhaka</div>
                      <div className="text-[10px] text-slate-400 font-medium">24-48h Express Delivery</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-cyan-400">৳70</span>
                </label>

                <label
                  className={`cursor-pointer p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    shippingZone === 'outside_dhaka'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shippingZone"
                      checked={shippingZone === 'outside_dhaka'}
                      onChange={() => setShippingZone('outside_dhaka')}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-black">Outside Dhaka</div>
                      <div className="text-[10px] text-slate-400 font-medium">48-72h Courier Delivery</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-cyan-400">৳130</span>
                </label>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label
                  className={`cursor-pointer p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-orange-500 bg-orange-950/30 text-white font-black'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-orange-400 mb-1" />
                  <span className="text-[11px] font-black">Cash on Delivery</span>
                  <span className="text-[9px] text-emerald-400 font-black">Recommended</span>
                </label>

                <label
                  className={`cursor-pointer p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-rose-500 bg-rose-950/30 text-white font-black'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-rose-400 mb-1" />
                  <span className="text-[11px] font-black">bKash / Nagad</span>
                  <span className="text-[9px] text-slate-400 font-medium">Mobile Banking</span>
                </label>

                <label
                  className={`cursor-pointer p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-950/30 text-white font-black'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Lock className="w-5 h-5 text-cyan-400 mb-1" />
                  <span className="text-[11px] font-black">Card Payment</span>
                  <span className="text-[9px] text-slate-400 font-medium">Visa / Master</span>
                </label>
              </div>
            </div>

            {/* Special Instructions / Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g., Please call before coming, leave with building security..."
                className="w-full bg-slate-950 text-slate-100 text-xs font-medium rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Order Summary Calculation */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-black text-slate-300 uppercase tracking-widest text-[11px]">
              Order Summary
            </h4>
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Item Subtotal</span>
              <span className="font-mono font-bold text-slate-200">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Shipping Fee ({shippingZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
              <span className="font-mono font-bold text-slate-200">৳{shippingCost.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="font-mono">-৳{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span className="font-display">Total Payable Amount</span>
              <span className="text-lg text-cyan-400 font-display font-black tracking-tight">
                ৳{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium py-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Buyer Protection</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Check Parcel Before Paying</span>
            </span>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            id="confirm-order-submit-btn"
            className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-black text-base shadow-xl shadow-orange-500/25 active:scale-95 transition-all disabled:opacity-50 tracking-tight"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>Confirm Order — ৳{grandTotal.toLocaleString()}</span>
          </button>

          <p className="text-center text-[11px] text-slate-400 font-medium">
            Order copy will automatically be dispatched to <strong className="text-cyan-400">esaali391@gmail.com</strong>
          </p>
        </form>
      </div>
    </div>
  );
};
