import React from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Lock,
  Truck,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ADMIN_PHONE, ADMIN_EMAIL, getWhatsAppLink } from '../utils/orderNotification';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsAdminLoginOpen, isAdminAuthenticated, setIsAdminView } = useStore();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16 text-left">
      {/* Top Value Proposition Grid */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight">Dhaka Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Guaranteed delivery within 24 to 48 hours right to your doorstep for only ৳70.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight">100% Authentic Products</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Original gadgets and premium lifestyle products directly sourced from verified makers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight">Cash on Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Inspect your parcel before paying. Available in all 64 districts of Bangladesh.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Our support team is ready to answer questions via phone hotline and WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xl tracking-tight text-white font-display">
                KHAN
              </span>
              <span className="font-black text-xl tracking-tight text-cyan-400 font-display">
                GADGET
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            The premier single-destination e-commerce store for smart gadgets, refined fashion, and pure organic food items in Bangladesh.
          </p>
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-xs font-bold text-slate-400">Hotline:</span>
              <a href={`tel:${ADMIN_PHONE}`} className="text-cyan-400 font-black font-mono hover:underline">
                {ADMIN_PHONE}
              </a>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-black text-xs transition-all tracking-tight"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: {ADMIN_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-white">
            Product Categories
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button
                onClick={() => setSelectedCategory('Electrical Gadget Items')}
                className="hover:text-cyan-400 transition-colors"
              >
                Electrical Gadget Items
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('Man Fashion')}
                className="hover:text-cyan-400 transition-colors"
              >
                Man Fashion
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('Woman Fashion')}
                className="hover:text-cyan-400 transition-colors"
              >
                Woman Fashion
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('Food Items')}
                className="hover:text-cyan-400 transition-colors"
              >
                Food Items
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Help & Policy */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-white">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>Cash on Delivery Policy</li>
            <li>Dhaka & Countrywide Shipping Rates</li>
            <li>7-Day Replacement Guarantee</li>
            <li>Terms & Conditions</li>
            <li>
              <button
                onClick={() => {
                  if (isAdminAuthenticated) {
                    setIsAdminView(true);
                  } else {
                    setIsAdminLoginOpen(true);
                  }
                }}
                className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 font-bold"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal Login (AP)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Office & Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-white">
            Dhaka Flagship Office
          </h4>
          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>House 24, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`mailto:${ADMIN_EMAIL}`} className="hover:text-cyan-400 transition-colors font-medium">
                {ADMIN_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`tel:${ADMIN_PHONE}`} className="hover:text-cyan-400 transition-colors font-mono">
                {ADMIN_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-bold"
              >
                WhatsApp: {ADMIN_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mon - Sat: 9:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Gateways */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} KHAN GADGET. All rights reserved. Self-contained & Vercel ready.
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span className="font-bold">Payment:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-orange-400 font-black">
              COD
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-rose-400 font-black">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-amber-400 font-black">
              Nagad
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-black">
              Visa / Card
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
