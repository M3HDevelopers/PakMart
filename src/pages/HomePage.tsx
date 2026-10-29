import { Link } from 'react-router-dom';
import { ChevronRight, Zap, TrendingUp, Award, Clock, Gift, ArrowRight, Smartphone, Shirt, Home, Sparkles, Dumbbell, Salad, Monitor } from 'lucide-react';
import { products, categories, mockBanners } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  'electronics': <Smartphone size={20} />,
  'fashion': <Shirt size={20} />,
  'home-living': <Home size={20} />,
  'beauty': <Sparkles size={20} />,
  'sports': <Dumbbell size={20} />,
  'groceries': <Salad size={20} />,
  'computers': <Monitor size={20} />,
  'appliances': <Zap size={20} />,
};

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
      <div className="relative border border-[#171717] overflow-hidden h-64 sm:h-80 md:h-96 bg-[#171717]">
        {mockBanners.map((banner, i) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentBanner ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-[#171717]/70 flex items-center">
              <div className="px-8 md:px-12 text-white max-w-lg">
                <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{banner.title}</h2>
                <p className="text-base md:text-lg mb-6 text-[#EDEFE7]/90">{banner.subtitle}</p>
                <Link to={banner.link} className="inline-flex items-center gap-2 bg-[#B7D92B] text-[#171717] px-5 py-2.5 text-sm font-bold hover:bg-[#9FC020] transition-colors">
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {mockBanners.map((_, i) => (
            <button key={i} onClick={() => setCurrentBanner(i)} className={`w-6 h-1 transition-colors ${i === currentBanner ? 'bg-[#B7D92B]' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-0 border border-[var(--color-border)] bg-white">
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.slug}`} className="flex flex-col items-center gap-2 p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors border-r border-[var(--color-border)] last:border-r-0">
            <span className="text-[var(--color-text-muted)]">{categoryIcons[cat.slug]}</span>
            <span className="text-[10px] font-medium text-center text-[var(--color-text-secondary)]">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Flash Sale */}
      <section className="border border-[#171717] bg-white">
        <div className="flex items-center justify-between p-4 border-b border-[#171717] bg-[#171717]">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#B7D92B]" />
            <h2 className="text-base font-bold text-[#B7D92B]">Flash Sale</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#EDEFE7]" />
            <div className="flex gap-1 font-mono">
              <span className="bg-[#B7D92B] text-[#171717] px-1.5 py-0.5 text-xs font-bold">{String(flashSaleTime.hours).padStart(2, '0')}</span>
              <span className="text-[#EDEFE7]">:</span>
              <span className="bg-[#B7D92B] text-[#171717] px-1.5 py-0.5 text-xs font-bold">{String(flashSaleTime.minutes).padStart(2, '0')}</span>
              <span className="text-[#EDEFE7]">:</span>
              <span className="bg-[#B7D92B] text-[#171717] px-1.5 py-0.5 text-xs font-bold">{String(flashSaleTime.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-[var(--color-border)]">
          {discountedProducts.slice(0, 5).map(product => (
            <Link key={product.id} to={`/product/${product.slug}`} className="p-3 hover:bg-[var(--color-bg-tertiary)] transition-colors">
              <img src={product.images[0]} alt={product.name} className="w-full h-28 object-cover mb-2" loading="lazy" />
              <p className="text-[11px] line-clamp-1 font-medium text-[var(--color-text)]">{product.name}</p>
              <p className="text-xs font-semibold text-[var(--color-accent)] mt-0.5">Rs. {product.price.toLocaleString()}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] line-through">Rs. {product.originalPrice.toLocaleString()}</p>
              <div className="mt-1.5 w-full bg-[var(--color-bg-tertiary)] h-1">
                <div className="bg-[var(--color-accent)] h-1" style={{ width: `${Math.min(90, product.sold / 20)}%` }}></div>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{product.sold} sold</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[var(--color-text)]" />
            <h2 className="text-base font-semibold text-[var(--color-text)]">Featured Products</h2>
          </div>
          <Link to="/search?q=featured" className="text-[#171717] text-xs font-bold flex items-center gap-1 hover:text-[#B7D92B] transition-colors">
            View All <ChevronRight size={14} />
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
            <TrendingUp size={18} className="text-[var(--color-text)]" />
            <h2 className="text-base font-semibold text-[var(--color-text)]">Trending Now</h2>
          </div>
          <Link to="/search?q=trending" className="text-[#171717] text-xs font-bold flex items-center gap-1 hover:text-[#B7D92B] transition-colors">
            View All <ChevronRight size={14} />
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
        <Link to="/category/fashion" className="border border-[#171717] bg-white p-6 flex items-center justify-between hover:bg-[#171717] hover:text-white transition-colors group">
          <div>
            <p className="text-[10px] text-[#737373] uppercase tracking-wider mb-1 group-hover:text-[#B7D92B]">New Collection</p>
            <h3 className="text-xl font-black text-[#171717] mb-1 group-hover:text-white">Fashion Week</h3>
            <p className="text-xs text-[#404040] mb-3 group-hover:text-[#EDEFE7]">Up to 50% off on latest trends</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#171717] group-hover:text-[#B7D92B]">
              Shop Fashion <ArrowRight size={12} />
            </span>
          </div>
          <Shirt size={48} className="text-[#D4D6CE] group-hover:text-[#B7D92B] transition-colors" />
        </Link>
        <Link to="/category/electronics" className="border border-[#171717] bg-white p-6 flex items-center justify-between hover:bg-[#171717] hover:text-white transition-colors group">
          <div>
            <p className="text-[10px] text-[#737373] uppercase tracking-wider mb-1 group-hover:text-[#B7D92B]">Best Deals</p>
            <h3 className="text-xl font-black text-[#171717] mb-1 group-hover:text-white">Electronics Sale</h3>
            <p className="text-xs text-[#404040] mb-3 group-hover:text-[#EDEFE7]">Gadgets at unbeatable prices</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#171717] group-hover:text-[#B7D92B]">
              Shop Electronics <ArrowRight size={12} />
            </span>
          </div>
          <Smartphone size={48} className="text-[#D4D6CE] group-hover:text-[#B7D92B] transition-colors" />
        </Link>
      </div>

      {/* New Arrivals */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-[var(--color-text)]" />
            <h2 className="text-base font-semibold text-[var(--color-text)]">New Arrivals</h2>
          </div>
          <Link to="/search?q=new" className="text-[#171717] text-xs font-bold flex items-center gap-1 hover:text-[#B7D92B] transition-colors">
            View All <ChevronRight size={14} />
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
          <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyViewedProducts.slice(0, 5).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Top Brands */}
      <section>
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Popular Brands</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 border border-[var(--color-border)] bg-white">
          {['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'Xiaomi'].map(brand => (
            <Link key={brand} to={`/search?q=${brand}`} className="p-4 flex items-center justify-center hover:bg-[var(--color-bg-tertiary)] transition-colors border-r border-[var(--color-border)] last:border-r-0">
              <span className="font-semibold text-xs text-[var(--color-text-secondary)]">{brand}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
