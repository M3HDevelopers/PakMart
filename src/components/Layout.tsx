import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Bell, ChevronDown, MapPin, Package, Smartphone, Shirt, Home, Sparkles, Dumbbell, Salad, Monitor, Zap, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  'electronics': <Smartphone size={18} />,
  'fashion': <Shirt size={18} />,
  'home-living': <Home size={18} />,
  'beauty': <Sparkles size={18} />,
  'sports': <Dumbbell size={18} />,
  'groceries': <Salad size={18} />,
  'computers': <Monitor size={18} />,
  'appliances': <Zap size={18} />,
};

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { user, isAuthenticated, getCartCount, notifications, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const cartCount = getCartCount();
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] font-[Inter]">
      {/* Announcement Bar */}
      <div className="bg-[var(--color-text)] text-white text-center py-2 text-xs font-medium tracking-wide">
        Free shipping on orders over Rs. 3,000 — Same-day dispatch on orders before 2 PM
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight text-[var(--color-text)]">
              Pak<span className="text-[var(--color-accent)]">Mart</span>
            </h1>
          </Link>

          {/* Delivery Location */}
          <div className="hidden lg:flex items-center gap-1.5 text-sm cursor-pointer hover:text-[var(--color-accent)] transition-colors border-l border-[var(--color-border)] pl-4">
            <MapPin size={14} className="text-[var(--color-text-muted)]" />
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] leading-none">Deliver to</p>
              <p className="font-medium text-xs leading-tight mt-0.5">Islamabad</p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className={`flex items-center border transition-colors ${searchFocused ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'}`}>
              <input
                type="text"
                placeholder="Search products, brands..."
                className="flex-1 px-3 py-2 outline-none text-sm bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <button type="submit" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-4 py-2 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {isAuthenticated && (
              <Link to="/account" className="relative p-2 hover:bg-[var(--color-bg-tertiary)] transition-colors hidden sm:block">
                <Bell size={18} className="text-[var(--color-text-secondary)]" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 bg-[var(--color-accent)] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center font-medium">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
            )}

            <Link to="/wishlist" className="p-2 hover:bg-[var(--color-bg-tertiary)] transition-colors hidden sm:block">
              <Heart size={18} className="text-[var(--color-text-secondary)]" />
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-[var(--color-bg-tertiary)] transition-colors">
              <ShoppingCart size={18} className="text-[var(--color-text-secondary)]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-white text-[9px] w-4 h-4 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/account" className="hidden md:flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-bg-tertiary)] transition-colors border border-[var(--color-border)]">
                <User size={14} className="text-[var(--color-text-secondary)]" />
                <span className="text-xs font-medium">{user?.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                <User size={14} /> Login
              </Link>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="border-t border-[var(--color-border)] bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0.5 h-10 overflow-x-auto">
              <div className="relative">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className="flex items-center gap-2 px-3 h-full bg-[var(--color-text)] text-white text-xs font-medium hover:bg-[var(--color-text-secondary)] transition-colors"
                >
                  <Menu size={14} />
                  All Categories
                  <ChevronDown size={12} />
                </button>
                <AnimatePresence>
                  {categoryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 mt-0 bg-white border border-[var(--color-border)] w-56 z-50"
                    >
                      {categories.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          onClick={() => setCategoryMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--color-bg-tertiary)] transition-colors border-b border-[var(--color-border)] last:border-0"
                        >
                          <span className="text-[var(--color-text-muted)]">{categoryIcons[cat.slug]}</span>
                          <span className="text-xs font-medium">{cat.name}</span>
                          <span className="ml-auto text-[10px] text-[var(--color-text-muted)]">{cat.productCount}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {categories.slice(0, 6).map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-1.5 px-3 h-full text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-[var(--color-accent)]"
                >
                  {categoryIcons[cat.slug]}
                  {cat.name}
                </Link>
              ))}
              <Link to="/seller" className="ml-auto flex items-center gap-1.5 px-3 h-full text-xs text-[var(--color-success)] hover:bg-[var(--color-bg-tertiary)] transition-colors whitespace-nowrap font-medium">
                <Package size={14} /> Sell on PakMart
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[var(--color-border)] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {isAuthenticated && (
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 bg-[var(--color-bg-tertiary)]">
                  <User size={16} className="text-[var(--color-accent)]" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 bg-[var(--color-accent)] text-white">
                  <User size={16} />
                  <span className="text-sm font-medium">Login / Register</span>
                </Link>
              )}
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 hover:bg-[var(--color-bg-tertiary)]">
                <Heart size={16} />
                <span className="text-sm">Wishlist</span>
              </Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 hover:bg-[var(--color-bg-tertiary)]">
                <ShoppingCart size={16} />
                <span className="text-sm">Cart ({cartCount})</span>
              </Link>
              <hr className="border-[var(--color-border)]" />
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-[var(--color-bg-tertiary)]">
                  <span className="text-[var(--color-text-muted)]">{categoryIcons[cat.slug]}</span>
                  <span className="text-sm">{cat.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="min-h-[60vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-text)] text-[var(--color-border)] mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">PakMart</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">Pakistan's largest online marketplace. Shop millions of products at the best prices with secure payments and fast delivery.</p>
              <div className="flex gap-2">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-8 h-8 border border-[var(--color-text-secondary)] flex items-center justify-center hover:border-white hover:text-white transition-colors text-[10px] uppercase">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Customer Service</h4>
              <ul className="space-y-2 text-xs">
                {['Help Center', 'How to Buy', 'Returns & Refunds', 'Contact Us', 'Track Order'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">PakMart</h4>
              <ul className="space-y-2 text-xs">
                {['About Us', 'Careers', 'Privacy Policy', 'Terms & Conditions', 'Seller Policy'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Payment & Delivery</h4>
              <div className="space-y-3 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {['COD', 'JazzCash', 'EasyPaisa', 'Visa', 'Mastercard'].map(p => (
                    <span key={p} className="px-2 py-1 border border-[var(--color-text-secondary)] text-[10px]">{p}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['TCS', 'Leopard', 'Trax', 'CallCourier'].map(c => (
                    <span key={c} className="px-2 py-1 border border-[var(--color-text-secondary)] text-[10px]">{c}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-white text-xs font-medium mb-2">Newsletter</h5>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-transparent border border-[var(--color-text-secondary)] text-xs outline-none focus:border-white" />
                  <button className="px-3 py-2 bg-[var(--color-accent)] text-xs font-medium hover:bg-[var(--color-accent-hover)]">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--color-text-secondary)] mt-8 pt-8 text-center text-xs text-[var(--color-text-muted)]">
            <p>&copy; 2024 PakMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
