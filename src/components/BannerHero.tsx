import React from 'react';
import {
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Headphones,
  Shirt,
  ShoppingBag,
  Apple
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BannerHero: React.FC = () => {
  const { setSelectedCategory, categories } = useStore();

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Electrical Gadget Items':
        return <Headphones className="w-5 h-5 text-cyan-400" />;
      case 'Man Fashion':
        return <Shirt className="w-5 h-5 text-blue-400" />;
      case 'Woman Fashion':
        return <ShoppingBag className="w-5 h-5 text-rose-400" />;
      case 'Food Items':
        return <Apple className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-black/60">
        {/* Glow Effects */}
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-black tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>OFFICIAL FLAGSHIP STORE • DHAKA DIRECT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white font-display leading-[1.08]">
              Bold Tech, Smart Gadgets & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-blue-400">
                Premium Lifestyle
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
              Authentic wireless audio, smart watches, tailored apparel, and 100% pure organic food items. Fast 24-48h delivery across Dhaka with guaranteed Cash on Delivery.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setSelectedCategory('Electrical Gadget Items')}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 sm:px-7 py-3.5 rounded-2xl text-sm sm:text-base tracking-tight shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Shop Electrical Gadgets</span>
              </button>

              <button
                onClick={() => setSelectedCategory('All')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black px-6 sm:px-7 py-3.5 rounded-2xl text-sm sm:text-base tracking-tight border border-slate-700/80 transition-all"
              >
                <span>View All Collections</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Banner Promo Visual Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div
              onClick={() => setSelectedCategory('Electrical Gadget Items')}
              className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 hover:border-cyan-500/60 transition-all"
            >
              <div className="aspect-video sm:aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
                  alt="SoundPulse Earbuds"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="text-[11px] font-black tracking-wider text-cyan-400 flex items-center gap-1 mb-0.5 uppercase">
                <Zap className="w-3 h-3" />
                <span>HOT GADGETS</span>
              </div>
              <div className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-300 tracking-tight truncate">
                TWS ANC Earbuds
              </div>
              <div className="text-xs sm:text-sm font-black text-orange-400 mt-1 font-mono">From ৳2,450</div>
            </div>

            <div
              onClick={() => setSelectedCategory('Food Items')}
              className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 sm:p-4 hover:border-amber-500/60 transition-all"
            >
              <div className="aspect-video sm:aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
                  alt="Organic Raw Honey"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="text-[11px] font-black tracking-wider text-amber-400 flex items-center gap-1 mb-0.5 uppercase">
                <Apple className="w-3 h-3" />
                <span>100% ORGANIC</span>
              </div>
              <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 tracking-tight truncate">
                Sundarbans Raw Honey
              </div>
              <div className="text-xs sm:text-sm font-black text-orange-400 mt-1 font-mono">From ৳890</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight">Fast Delivery</div>
            <div className="text-[11px] font-medium text-slate-400">24-48h in Dhaka (৳70)</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight">100% Authentic</div>
            <div className="text-[11px] font-medium text-slate-400">Inspected Quality Only</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight">Cash on Delivery</div>
            <div className="text-[11px] font-medium text-slate-400">Pay after verification</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight">7 Days Warranty</div>
            <div className="text-[11px] font-medium text-slate-400">Easy claim & replace</div>
          </div>
        </div>
      </div>

      {/* 4 Main Categories Showcase Cards */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
            <span>Explore Categories</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">Select to filter instantly</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/70 hover:bg-slate-900 hover:border-cyan-500/60 p-3.5 sm:p-4 transition-all duration-200"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 relative mb-3">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 p-2 rounded-lg bg-slate-950/90 backdrop-blur-sm border border-slate-700/60">
                  {getCategoryIcon(cat.name)}
                </div>
              </div>

              <h3 className="font-black text-xs sm:text-sm text-white group-hover:text-cyan-300 tracking-tight transition-colors truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] font-medium text-slate-400 line-clamp-1 mt-0.5">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
