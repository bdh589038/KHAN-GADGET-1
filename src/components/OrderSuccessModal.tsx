import React from 'react';
import {
  CheckCircle2,
  Package,
  PhoneCall,
  Calendar,
  Truck,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  ADMIN_PHONE,
  ADMIN_EMAIL,
  generateOrderWhatsAppMessage,
  getWhatsAppLink,
  getGmailComposeLink
} from '../utils/orderNotification';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setSelectedCategory } = useStore();

  if (!lastPlacedOrder) return null;

  const order = lastPlacedOrder;

  const handleContinue = () => {
    setLastPlacedOrder(null);
    setSelectedCategory('All');
  };

  const whatsappMessage = generateOrderWhatsAppMessage(order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Animated Celebration Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-black text-white font-display tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-300">
            Thank you for shopping with <span className="text-cyan-400 font-black">KHAN GADGET</span>.
            Our representative will contact you shortly to confirm delivery.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Order Reference</span>
            <span className="font-mono font-black text-cyan-400 text-sm">
              {order.orderNumber}
            </span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Customer:</span>
              <span className="font-black text-white">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Contact:</span>
              <span className="font-mono font-bold text-white">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Delivery Address:</span>
              <span className="text-right font-medium truncate max-w-[60%] text-slate-200">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Payment:</span>
              <span className="font-black text-orange-400 uppercase">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery estimate */}
          <div className="pt-2.5 border-t border-slate-800 flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-medium">
              Estimated Arrival:{' '}
              <strong className="text-white font-black">
                {order.shippingZone === 'inside_dhaka'
                  ? '24-48 Hours (Dhaka City)'
                  : '48-72 Hours (Outside Dhaka)'}
              </strong>
            </span>
          </div>

          {/* Items count & grand total */}
          <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-sm">
            <span className="text-slate-300 font-black">
              Total Payable ({order.items.length} item{order.items.length > 1 ? 's' : ''}):
            </span>
            <span className="text-cyan-400 font-display font-black text-lg tracking-tight">
              ৳{order.total.toLocaleString()}
            </span>
          </div>

          {/* Automatic Email Notification Badge */}
          <div className="pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Order copy sent to admin:</span>
            </span>
            <span className="font-mono font-bold text-cyan-300">{ADMIN_EMAIL}</span>
          </div>
        </div>

        {/* WhatsApp & Email Quick Copy Buttons */}
        <div className="space-y-2">
          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all tracking-tight"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Send Order Copy to WhatsApp ({ADMIN_PHONE})</span>
          </a>

          <a
            href={getGmailComposeLink(order)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>Open & Send in Gmail to {ADMIN_EMAIL}</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Support hotline */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
          <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
          <span>Support Hotline: </span>
          <a href={`tel:${ADMIN_PHONE}`} className="text-cyan-400 font-black hover:underline font-mono">
            {ADMIN_PHONE}
          </a>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all tracking-tight"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
