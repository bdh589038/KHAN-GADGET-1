import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    editProduct,
    deleteProduct
  } = useStore();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0]?.name || 'Electrical Gadget Items',
    price: '',
    discountPrice: '',
    stock: '',
    sku: '',
    description: '',
    imageUrl: '',
    featured: false,
    bestseller: false,
    active: true
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      category: categories[0]?.name || 'Electrical Gadget Items',
      price: '',
      discountPrice: '',
      stock: '20',
      sku: `KG-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      featured: false,
      bestseller: false,
      active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      category: prod.category,
      price: prod.price.toString(),
      discountPrice: prod.discountPrice ? prod.discountPrice.toString() : '',
      stock: prod.stock.toString(),
      sku: prod.sku,
      description: prod.description,
      imageUrl: prod.imageUrl,
      featured: prod.featured || false,
      bestseller: prod.bestseller || false,
      active: prod.active
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.imageUrl) return;

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock) || 0,
      sku: formData.sku.trim() || `KG-${Date.now().toString().slice(-4)}`,
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
      featured: formData.featured,
      bestseller: formData.bestseller,
      active: formData.active,
      rating: editingProduct?.rating || 5.0,
      reviewsCount: editingProduct?.reviewsCount || 12
    };

    if (editingProduct) {
      editProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsModalOpen(false);
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header with Search and Add Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
            Product Inventory Management ({products.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Create, modify, update pricing and manage stock counts for items
          </p>
        </div>

        <button
          onClick={openAddModal}
          id="admin-add-product-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 self-start sm:self-auto active:scale-95 transition-all tracking-tight"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or SKU..."
            className="w-full bg-slate-950 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="bg-slate-950 text-slate-200 text-xs font-bold rounded-xl border border-slate-800 px-3.5 py-2.5 focus:border-cyan-500 focus:outline-none"
        >
          <option value="All">All Categories ({products.length})</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Badges</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Product Title & Thumbnail */}
                  <td className="p-3">
                    <div className="flex items-center gap-3 max-w-xs">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-10 h-10 rounded-xl object-cover bg-slate-950 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-slate-100 truncate tracking-tight">{p.title}</div>
                        <div className="text-[10px] text-slate-400 font-medium line-clamp-1">{p.description}</div>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="p-3 font-mono text-cyan-400 font-black">{p.sku}</td>

                  {/* Category */}
                  <td className="p-3 text-slate-300 font-medium">{p.category}</td>

                  {/* Price */}
                  <td className="p-3 font-mono">
                    <div className="font-black text-white">
                      ৳{(p.discountPrice ?? p.price).toLocaleString()}
                    </div>
                    {p.discountPrice && (
                      <div className="text-[10px] text-slate-500 font-medium line-through">
                        ৳{p.price.toLocaleString()}
                      </div>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="p-3 font-mono">
                    {p.stock <= 0 ? (
                      <span className="text-rose-400 font-black">Out of stock</span>
                    ) : p.stock <= 5 ? (
                      <span className="text-amber-400 font-black flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {p.stock} units
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold">{p.stock} units</span>
                    )}
                  </td>

                  {/* Badges */}
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {p.featured && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
                          Featured
                        </span>
                      )}
                      {p.bestseller && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Active / Inactive Status */}
                  <td className="p-3">
                    <button
                      onClick={() => editProduct(p.id, { active: !p.active })}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border transition-colors ${
                        p.active
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete product "${p.title}"?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Khan SoundPulse ANC Wireless Earbuds"
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Category & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. KG-TWS-99"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price, Discount Price, Stock Quantity */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Regular Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="3200"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Sale Price (৳)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.discountPrice}
                    onChange={e => setFormData({ ...formData, discountPrice: e.target.value })}
                    placeholder="2450 (Optional)"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Stock Qty *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="25"
                    className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Image URL *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-10 h-10 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Features, build quality, warranty details..."
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-slate-300 font-bold">Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={e => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-slate-300 font-bold">Bestseller Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-slate-300 font-bold">Active in Store</span>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/20 tracking-tight"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
