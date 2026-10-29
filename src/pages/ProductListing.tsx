import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Filter, X, Grid3X3, List, ChevronRight, Home } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductListing() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const category = categories.find(c => c.slug === slug);
  const subcategory = category?.subcategories.find(s => s.slug === searchParams.get('sub'));

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      if (slug && p.category !== slug) return false;
      if (searchParams.get('sub') && p.subcategory !== searchParams.get('sub')) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      if (freeShippingOnly && !p.freeShipping) return false;
      return true;
    });

    switch (sortBy) {
      case 'price_low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price_high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'discount': filtered.sort((a, b) => b.discount - a.discount); break;
      case 'popular': filtered.sort((a, b) => b.sold - a.sold); break;
    }
    return filtered;
  }, [slug, searchParams, sortBy, priceRange, selectedBrands, minRating, freeShippingOnly]);

  const availableBrands = useMemo(() => {
    const brands = new Set(products.filter(p => !slug || p.category === slug).map(p => p.brand));
    return Array.from(brands);
  }, [slug]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedBrands([]);
    setMinRating(0);
    setFreeShippingOnly(false);
    setSortBy('relevance');
  };

  const activeFilterCount = selectedBrands.length + (minRating > 0 ? 1 : 0) + (freeShippingOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-4">
        <Link to="/" className="hover:text-[var(--color-accent)] flex items-center gap-1"><Home size={12} /> Home</Link>
        <ChevronRight size={10} />
        <span className="text-[var(--color-text)] font-medium">{category?.name || 'All Products'}</span>
        {subcategory && (<><ChevronRight size={10} /><span>{subcategory.name}</span></>)}
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white border border-[var(--color-border)] p-4 sticky top-24 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-[10px] text-[var(--color-accent)] font-medium hover:underline">Clear All</button>
              )}
            </div>

            {/* Subcategories */}
            {category && category.subcategories.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Subcategories</h4>
                <div className="space-y-1.5">
                  {category.subcategories.map(sub => (
                    <a key={sub.id} href={`/category/${slug}?sub=${sub.slug}`} className="flex items-center justify-between text-sm text-gray-600 hover:text-orange-600 py-1">
                      <span>{sub.name}</span>
                      <span className="text-xs text-gray-400">{sub.productCount}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-sm mb-2">Price Range</h4>
              <div className="space-y-2">
                <input type="range" min="0" max="500000" step="1000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-orange-600" />
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} className="w-full px-2 py-1 border rounded text-sm" />
                  <span className="text-gray-400">-</span>
                  <input type="number" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500000])} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="font-medium text-sm mb-2">Brand</h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {availableBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-orange-600" />
                    <span className="text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-sm mb-2">Minimum Rating</h4>
              <div className="space-y-1.5">
                {[4, 3, 2, 1].map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-orange-600" />
                    <span className="text-gray-600">{r}★ & above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Free Shipping */}
            <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={freeShippingOnly} onChange={(e) => setFreeShippingOnly(e.target.checked)} className="accent-orange-600" />
                <span className="text-gray-600">Free Shipping Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-white border border-[var(--color-border)] p-3 mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium">
                <Filter size={14} />
                Filters
                {activeFilterCount > 0 && <span className="bg-[var(--color-accent)] text-white text-[10px] w-4 h-4 flex items-center justify-center">{activeFilterCount}</span>}
              </button>
              <span className="text-xs text-[var(--color-text-muted)]">{filteredProducts.length} products</span>
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs border border-[var(--color-border)] px-2 py-1.5 outline-none focus:border-[var(--color-accent)]">
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="discount">Biggest Discount</option>
                <option value="popular">Most Popular</option>
              </select>
              <div className="hidden sm:flex border border-[var(--color-border)]">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-text-muted)]'}`}><Grid3X3 size={14} /></button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-text-muted)]'}`}><List size={14} /></button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedBrands.map(brand => (
                <span key={brand} className="flex items-center gap-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-2 py-1 text-[10px] font-medium">
                  {brand}
                  <button onClick={() => toggleBrand(brand)}><X size={10} /></button>
                </span>
              ))}
              {minRating > 0 && (
                <span className="flex items-center gap-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-2 py-1 text-[10px] font-medium">
                  {minRating}+ stars
                  <button onClick={() => setMinRating(0)}><X size={10} /></button>
                </span>
              )}
              {freeShippingOnly && (
                <span className="flex items-center gap-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-2 py-1 text-[10px] font-medium">
                  Free Shipping
                  <button onClick={() => setFreeShippingOnly(false)}><X size={10} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
              {filteredProducts.map((product, i) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} index={i} />
                ) : (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <img src={product.images[0]} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-orange-600">Rs. {product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">-{product.discount}%</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{product.seller}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[var(--color-border)]">
              <p className="text-[var(--color-text-muted)] text-sm">No products found</p>
              <button onClick={clearFilters} className="mt-3 text-[var(--color-accent)] text-xs font-medium hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={24} /></button>
              </div>
              {/* Same filters as desktop */}
              <div>
                <h4 className="font-medium text-sm mb-2">Price Range</h4>
                <input type="range" min="0" max="500000" step="1000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-orange-600" />
                <p className="text-sm text-gray-500">Up to Rs. {priceRange[1].toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Brand</h4>
                {availableBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-orange-600" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => { clearFilters(); setShowFilters(false); }} className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium">Apply Filters</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
