import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Zap,
  PhoneCall,
  Truck,
  ShieldCheck,
  Lock,
  Menu,
  X,
  SlidersHorizontal,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ADMIN_PHONE, getWhatsAppLink } from '../utils/orderNotification';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    isAdminAuthenticated,
    setIsAdminLoginOpen,
    isAdminView,
    setIsAdminView
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl shadow-black/40">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/80 border-b border-slate-800/80 text-xs text-slate-300 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1.5 text-cyan-400 font-extrabold tracking-tight">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span>SUPER FAST DELIVERY IN DHAKA (24-48H)</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300 font-bold tracking-tight">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>Cash on Delivery All Over Bangladesh</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 font-bold tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Authentic Quality Guaranteed</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs shrink-0">
            <a
              href={`tel:${ADMIN_PHONE}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors font-medium"
              title="Call Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-extrabold tracking-wider font-mono">{ADMIN_PHONE}</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold transition-all text-[11px]"
              title={`Chat on WhatsApp (${ADMIN_PHONE})`}
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Discreet AP (Admin Portal) Link at top corner as requested */}
            <button
              id="admin-portal-trigger-btn"
              onClick={() => {
                if (isAdminAuthenticated) {
                  setIsAdminView(!isAdminView);
                } else {
                  setIsAdminLoginOpen(true);
                }
              }}
              title="Admin Portal Access"
              className="group relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-mono font-black tracking-widest transition-all border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-cyan-950/50"
            >
              <Lock className="w-3 h-3 text-slate-400 group-hover:text-cyan-400" />
              <span>AP</span>
              {isAdminAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <div
          onClick={() => {
            setSelectedCategory('All');
            setIsAdminView(false);
          }}
          className="cursor-pointer flex items-center gap-2.5 select-none group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 fill-slate-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-3xl tracking-tighter text-white font-display">
                KHAN
              </span>
              <span className="font-black text-xl sm:text-3xl tracking-tighter text-cyan-400 font-display">
                GADGET
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-slate-400 -mt-1">
              Official Store • Dhaka Direct
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop & Tablet) */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              id="header-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search gadgets, watches, fashion, organic food..."
              className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm font-semibold rounded-2xl pl-10 pr-10 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin View Switch Badge if logged in */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2.5 rounded-2xl transition-all border ${
                isAdminView
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 text-cyan-400 border-cyan-500/40 hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isAdminView ? 'Storefront' : 'Admin Panel'}</span>
            </button>
          )}

          {/* Cart Drawer Button */}
          <button
            id="cart-drawer-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-black text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-950 shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-black tracking-tight">CART</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search gadgets, fashion, food..."
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs font-semibold rounded-xl pl-9 pr-8 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation Bar (Pills) */}
      {!isAdminView && (
        <div className="bg-slate-900/80 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl shrink-0 transition-all font-black tracking-tight ${
                  selectedCategory === 'All'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                All Products
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl shrink-0 transition-all font-black tracking-tight flex items-center gap-1.5 ${
                    selectedCategory === cat.name
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation if open */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left p-2 rounded-lg text-xs font-medium ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-200'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left p-2 rounded-lg text-xs font-medium truncate ${
                  selectedCategory === cat.name
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/60 text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <a
                href={`tel:${ADMIN_PHONE}`}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>{ADMIN_PHONE}</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAdminAuthenticated) {
                  setIsAdminView(true);
                } else {
                  setIsAdminLoginOpen(true);
                }
              }}
              className="text-cyan-400 hover:underline font-medium"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
