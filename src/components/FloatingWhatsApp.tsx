import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { ADMIN_PHONE, getWhatsAppLink } from '../utils/orderNotification';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-5 z-40 flex flex-col items-start gap-2">
      {/* Quick Prompt Popup */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl w-72 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">Khan Gadget Support</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online on WhatsApp</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white p-1"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            আসসালামু আলাইকুম! কোনো পণ্য বা অর্ডার সম্পর্কে জানতে সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন।
          </p>

          <a
            href={getWhatsAppLink('Hello Khan Gadget! I want to inquire about a product.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat: {ADMIN_PHONE}</span>
          </a>

          <a
            href={`tel:${ADMIN_PHONE}`}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Call: {ADMIN_PHONE}</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          href={getWhatsAppLink('Hello Khan Gadget! I want to inquire about products.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs rounded-full shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 active:scale-95 transition-all"
          title={`WhatsApp: ${ADMIN_PHONE}`}
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#25D366]" />
          </div>
          <span className="font-extrabold tracking-tight hidden sm:inline">
            WhatsApp: {ADMIN_PHONE}
          </span>
          <span className="font-extrabold tracking-tight sm:hidden">
            WhatsApp
          </span>
        </a>

        {/* Small toggle button to view options without leaving immediately */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 shadow-md transition-colors"
          title="Toggle info"
        >
          {isOpen ? <X className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">?</span>}
        </button>
      </div>
    </div>
  );
};
