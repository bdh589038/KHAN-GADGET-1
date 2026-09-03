import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Zap,
  Check,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductModal, addToCart, buyNow } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = product.discountPrice ?? product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.discountPrice ?? 0)) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product, 1);
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-950/30 transition-all duration-200 overflow-hidden"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient Overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {hasDiscount && (
            <span className="px-2.5 py-0.5 rounded-lg bg-orange-500 text-white text-[11px] font-black tracking-wider shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Stock Alert Badge */}
        <div className="absolute top-2.5 right-2.5">
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/95 backdrop-blur-sm text-white text-[10px] font-black tracking-wide uppercase">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-400/95 backdrop-blur-sm text-slate-950 text-[10px] font-black tracking-wide uppercase">
              <AlertTriangle className="w-3 h-3" />
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-black tracking-tight backdrop-blur-sm border border-slate-700 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-black text-cyan-400 uppercase tracking-widest truncate max-w-[60%]">
              {product.category}
            </span>
            <span className="font-mono font-bold text-slate-500 text-[11px]">{product.sku}</span>
          </div>

          <h3 className="text-sm font-black text-slate-100 group-hover:text-cyan-300 tracking-tight transition-colors line-clamp-2 leading-tight">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-black ml-1 text-slate-200">{product.rating}</span>
            </div>
            <span className="text-slate-600 font-bold">•</span>
            <span className="text-[11px] font-medium text-slate-400">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              ৳{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs font-bold text-slate-500 line-through">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons: Buy Now & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black tracking-tight border transition-all ${
                isOutOfStock
                  ? 'bg-slate-800/40 text-slate-600 border-slate-800 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600 active:scale-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-black tracking-tight shadow-md active:scale-95 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
