import React, { useState } from 'react';
import {
  Plus,
  Tag,
  Trash2,
  Calendar,
  Percent,
  Coins,
  Check,
  X,
  Clock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    minOrderValue: '',
    expiryDate: '2026-12-31',
    usageLimit: '200',
    active: true
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue || !formData.minOrderValue) return;

    addCoupon({
      code: formData.code.trim().toUpperCase(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue),
      expiryDate: formData.expiryDate,
      usageLimit: Number(formData.usageLimit) || 100,
      active: formData.active
    });

    setIsModalOpen(false);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderValue: '',
      expiryDate: '2026-12-31',
      usageLimit: '200',
      active: true
    });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
            Coupon & Discount Campaigns ({coupons.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Create percentage discounts or flat rate savings for checkout promotion
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          id="admin-add-coupon-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 self-start sm:self-auto active:scale-95 transition-all tracking-tight"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(coupon => {
          const isExpired = new Date(coupon.expiryDate) < new Date();
          return (
            <div
              key={coupon.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 font-mono font-black text-sm tracking-wider">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{coupon.code}</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      !coupon.active || isExpired
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {isExpired ? 'Expired' : coupon.active ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `৳${coupon.discountValue} FLAT OFF`}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Min Order: <strong className="text-white font-black font-mono">৳{coupon.minOrderValue.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400 pt-2.5 border-t border-slate-800 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Valid Until:</span>
                    </span>
                    <span className="font-mono font-bold text-slate-300">{coupon.expiryDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Usage Progress:</span>
                    <span className="font-mono text-cyan-400 font-black">
                      {coupon.usedCount} / {coupon.usageLimit} uses
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (confirm(`Delete coupon code "${coupon.code}"?`)) {
                      deleteCoupon(coupon.id);
                    }
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                Create Promo Coupon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. DHAKA2026"
                  className="w-full bg-slate-950 text-slate-100 uppercase font-mono font-black rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        discountType: e.target.value as 'percentage' | 'fixed'
                      })
                    }
                    className="w-full bg-slate-950 text-slate-100 font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Discount Value *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.discountValue}
                    onChange={e => setFormData({ ...formData, discountValue: e.target.value })}
                    placeholder={formData.discountType === 'percentage' ? '15%' : '৳200'}
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Min Order Value (৳) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minOrderValue}
                    onChange={e => setFormData({ ...formData, minOrderValue: e.target.value })}
                    placeholder="1000"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Usage Limit *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.usageLimit}
                    onChange={e => setFormData({ ...formData, usageLimit: e.target.value })}
                    placeholder="200"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Expiry Date *</label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={e => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-300 font-bold">Active Coupon Immediately</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/20 tracking-tight"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
