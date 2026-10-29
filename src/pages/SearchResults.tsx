import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(500000);

  const results = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.includes(query.toLowerCase()));
      const matchesPrice = p.price <= maxPrice;
      return matchesQuery && matchesPrice;
    });

    switch (sortBy) {
      case 'price_low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price_high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'discount': filtered.sort((a, b) => b.discount - a.discount); break;
      case 'popular': filtered.sort((a, b) => b.sold - a.sold); break;
    }
    return filtered;
  }, [query, sortBy, maxPrice]);

  const suggestions = ['Samsung', 'iPhone', 'Nike', 'Laptop', 'Headphones', 'Smart Watch'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {query ? (
            <>Results for "<span className="text-orange-600">{query}</span>"</>
          ) : (
            'All Products'
          )}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{results.length} products found</p>
      </div>

      {/* Popular Searches */}
      {!query && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <a key={s} href={`/search?q=${s}`} className="px-3 py-1.5 bg-white border rounded-full text-sm hover:border-orange-500 hover:text-orange-600 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24 space-y-4">
            <h3 className="font-bold text-sm">Filters</h3>
            <div>
              <label className="text-sm font-medium text-gray-700">Max Price</label>
              <input type="range" min="1000" max="500000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full mt-2 accent-orange-600" />
              <p className="text-xs text-gray-500 mt-1">Up to Rs. {maxPrice.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full mt-1 px-2 py-2 border rounded text-sm outline-none">
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Mobile sort */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none">
              <option value="relevance">Sort: Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">No results found</h2>
              <p className="text-gray-500 mb-4">Try searching with different keywords</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map(s => (
                  <a key={s} href={`/search?q=${s}`} className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm hover:bg-orange-100">{s}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
