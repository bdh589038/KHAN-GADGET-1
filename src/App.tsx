import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Sparkles, SlidersHorizontal, PackageX } from 'lucide-react';

const Storefront: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  // Filter products by active status, category, and search query
  const filteredProducts = products.filter(p => {
    if (!p.active) return false;
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice ?? a.price;
    const priceB = b.discountPrice ?? b.price;

    switch (sortBy) {
      case 'bestseller':
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 w-full">
        {/* Banner Hero is displayed when on 'All' or no active search */}
        {selectedCategory === 'All' && searchQuery.trim() === '' && <BannerHero />}

        {/* Product Catalog Section */}
        <section className="space-y-6">
          {/* Section Heading & Sort Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-3xl font-black text-white font-display tracking-tight">
                  {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory === 'All' ? 'Curated Products & Gadgets' : selectedCategory}
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-black font-mono">
                  {sortedProducts.length} item{sortedProducts.length !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Authentic stock with immediate Dhaka dispatch and Cash on Delivery
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sort by:</span>
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-900 text-slate-100 text-xs font-black rounded-xl border border-slate-800 px-3.5 py-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="bestseller">Top Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-md mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <PackageX className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">No products found</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  We couldn't find any products matching your search or active filter.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-colors tracking-tight"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Modals and Overlays */}
      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AdminLoginModal />
      <FloatingWhatsApp />
    </div>
  );
};

const MainApp: React.FC = () => {
  const { isAdminView, isAdminAuthenticated } = useStore();

  if (isAdminView && isAdminAuthenticated) {
    return (
      <>
        <AdminPanel />
        <ProductDetailsModal />
      </>
    );
  }

  return <Storefront />;
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
