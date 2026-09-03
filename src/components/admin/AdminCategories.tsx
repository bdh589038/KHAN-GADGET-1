import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Layers,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const {
    categories,
    products,
    addCategory,
    editCategory,
    deleteCategory
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    imageUrl: '',
    description: ''
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      imageUrl: cat.imageUrl,
      description: cat.description
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl) return;

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      editCategory(editingCategory.id, {
        name: formData.name.trim(),
        slug,
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim()
      });
    } else {
      addCategory({
        name: formData.name.trim(),
        slug,
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim(),
        isPreset: false
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
            Category Management ({categories.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Presets (Food Items, Man Fashion, Woman Fashion, Electrical Gadgets) + Custom categories
          </p>
        </div>

        <button
          onClick={openAddModal}
          id="admin-add-category-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 self-start sm:self-auto active:scale-95 transition-all tracking-tight"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(cat => {
          const productCount = products.filter(p => p.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-3">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  {cat.isPreset && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-cyan-400 text-[10px] font-black uppercase tracking-wider border border-cyan-500/30">
                      Preset Category
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black text-white truncate font-display tracking-tight">{cat.name}</h3>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {productCount} items
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium line-clamp-2 mt-1">
                    {cat.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => openEditModal(cat)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })
                  }
                  placeholder="e.g. Smart Wearables"
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Category Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. smart-wearables"
                  className="w-full bg-slate-950 text-slate-100 font-mono font-bold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

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

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-[11px] text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Category highlights and scope..."
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

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
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
