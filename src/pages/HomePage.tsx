import { Link } from 'react-router-dom';
import { ChevronRight, Zap, TrendingUp, Award, Clock, Gift, ArrowRight } from 'lucide-react';
import { products, categories, mockBanners } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HomePage() {
  const { recentlyViewed } = useStore();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 5, minutes: 23, seconds: 45 });

  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = products.filter(p => p.trending);
  const newProducts = products.filter(p => p.isNew);
  const discountedProducts = [...products].sort((a, b) => b.discount - a.discount).slice(0, 10);
  const recentlyViewedProducts = products.filter(p => recentlyViewed.includes(p.id));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % mockBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96">
        {mockBanners.map((banner, i) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentBanner ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="px-8 md:px-12 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
                <p className="text-lg md:text-xl mb-4 opacity-90">{banner.subtitle}</p>
                <Link to={banner.link} className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Shop Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {mockBanners.map((_, i) => (
            <button key={i} onClick={() => setCurrentBanner(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentBanner ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.slug}`} className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5">
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-xs font-medium text-center text-gray-700">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Flash Sale */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="fill-yellow-300 text-yellow-300" size={28} />
            <h2 className="text-xl md:text-2xl font-bold">Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <div className="flex gap-1">
              <span className="bg-black/30 px-2 py-1 rounded text-sm font-mono">{String(flashSaleTime.hours).padStart(2, '0')}</span>
              <span className="font-bold">:</span>
              <span className="bg-black/30 px-2 py-1 rounded text-sm font-mono">{String(flashSaleTime.minutes).padStart(2, '0')}</span>
              <span className="font-bold">:</span>
              <span className="bg-black/30 px-2 py-1 rounded text-sm font-mono">{String(flashSaleTime.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {discountedProducts.slice(0, 5).map(product => (
            <Link key={product.id} to={`/product/${product.slug}`} className="bg-white rounded-lg p-3 text-gray-800 hover:shadow-lg transition-all">
              <img src={product.images[0]} alt={product.name} className="w-full h-28 object-cover rounded mb-2" />
              <p className="text-xs line-clamp-1 font-medium">{product.name}</p>
              <p className="text-orange-600 font-bold text-sm">Rs. {product.price.toLocaleString()}</p>
              <p className="text-gray-400 text-xs line-through">Rs. {product.originalPrice.toLocaleString()}</p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${Math.min(90, product.sold / 20)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{product.sold} sold</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="text-orange-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
          </div>
          <Link to="/search?q=featured" className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredProducts.slice(0, 10).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Trending Now</h2>
          </div>
          <Link to="/search?q=trending" className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingProducts.slice(0, 10).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-1">New Collection</p>
            <h3 className="text-2xl font-bold mb-2">Fashion Week</h3>
            <p className="text-sm opacity-90 mb-4">Up to 50% off on latest trends</p>
            <Link to="/category/fashion" className="inline-flex items-center gap-1 bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
              Shop Fashion <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-1">Best Deals</p>
            <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
            <p className="text-sm opacity-90 mb-4">Gadgets at unbeatable prices</p>
            <Link to="/category/electronics" className="inline-flex items-center gap-1 bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50">
              Shop Electronics <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="text-purple-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">New Arrivals</h2>
          </div>
          <Link to="/search?q=new" className="text-orange-600 text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {newProducts.slice(0, 10).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyViewedProducts.slice(0, 5).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Top Brands */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Brands</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'Xiaomi'].map(brand => (
            <Link key={brand} to={`/search?q=${brand}`} className="bg-white rounded-xl p-4 flex items-center justify-center hover:shadow-md transition-all border border-gray-100">
              <span className="font-bold text-gray-700 text-sm">{brand}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
