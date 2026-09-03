import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailsModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    addToCart,
    buyNow
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const allImages = [
    product.imageUrl,
    ...(product.additionalImages || [])
  ];

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = product.discountPrice ?? product.price;
  const discountAmount = product.discountPrice ? product.price - product.discountPrice : 0;
  const discountPercent = hasDiscount
    ? Math.round((discountAmount / product.price) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    buyNow(product, quantity);
    setActiveProductModal(null);
  };

  const closeModal = () => {
    setActiveProductModal(null);
    setQuantity(1);
    setActiveImageIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-black text-slate-400">
            <span className="text-cyan-400 uppercase tracking-widest">
              {product.category}
            </span>
            <span>•</span>
            <span className="font-mono text-slate-400">SKU: {product.sku}</span>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Left: Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Main HD Image */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={allImages[activeImageIndex] || product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {hasDiscount && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-orange-500 text-white text-xs font-black tracking-wide shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.bestseller && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="md:col-span-6 space-y-4 sm:space-y-5 text-left">
              <div>
                <h1 className="text-xl sm:text-3xl font-black text-white font-display tracking-tight leading-snug">
                  {product.title}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-black ml-1 text-white">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span className="font-medium text-slate-300">{product.reviewsCount} customer ratings</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Genuine
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                    ৳{currentPrice.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="ml-2.5 text-sm font-bold text-slate-500 line-through">
                      ৳{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <span className="text-xs font-black text-orange-400 tracking-wide uppercase">
                    Save ৳{discountAmount.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center justify-between text-xs py-2.5 px-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-bold">Availability:</span>
                {isOutOfStock ? (
                  <span className="font-black text-rose-400 uppercase tracking-wide">Currently Out of Stock</span>
                ) : isLowStock ? (
                  <span className="font-black text-amber-400 flex items-center gap-1 tracking-wide">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Low Stock: Only {product.stock} items left!
                  </span>
                ) : (
                  <span className="font-black text-emerald-400 flex items-center gap-1 tracking-wide">
                    <Check className="w-3.5 h-3.5" />
                    In Stock ({product.stock} units available)
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-black text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Subtotal: <span className="font-mono text-cyan-400 font-black">৳{(currentPrice * quantity).toLocaleString()}</span>
                  </span>
                </div>
              )}

              {/* Full Description */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Product Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Specifications if available */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Key Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col"
                      >
                        <span className="text-slate-400 font-bold text-[11px]">{key}</span>
                        <span className="font-black text-slate-100">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery info */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Delivery: Inside Dhaka ৳70 (24-48h) • Outside Dhaka ৳130</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-orange-400" />
                  <span>7-Day Return and Replacement Policy on manufacturing defects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar as explicitly requested */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/95 sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-400">Order Total ({quantity} item{quantity > 1 ? 's' : ''})</span>
            <span className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              ৳{(currentPrice * quantity).toLocaleString()}
            </span>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-black border transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed'
                  : addedToast
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-black tracking-tight shadow-lg active:scale-95 transition-all ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20'
              }`}
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Direct Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
