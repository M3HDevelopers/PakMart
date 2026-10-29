import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Bell, ChevronDown, MapPin, Package } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-gray-50 font-[Inter]">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-center py-2 text-sm font-medium">
        🎉 Mega Sale Live! Up to 70% OFF on Electronics | Free Shipping on Orders over Rs. 3,000 🚚
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">Pak<span className="text-green-600">Mart</span></h1>
            </Link>

            {/* Delivery Location */}
            <div className="hidden md:flex items-center gap-1 text-sm cursor-pointer hover:text-orange-600">
              <MapPin size={16} />
              <div>
                <p className="text-gray-500 text-xs">Deliver to</p>
                <p className="font-medium">Islamabad</p>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-colors ${searchFocused ? 'border-orange-500' : 'border-gray-200'}`}>
                <input
                  type="text"
                  placeholder="Search products, brands and categories..."
                  className="flex-1 px-4 py-2.5 outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              {isAuthenticated && (
                <Link to="/account" className="relative p-2 hover:bg-gray-100 rounded-full">
                  <Bell size={22} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
              )}

              {/* Wishlist */}
              <Link to="/wishlist" className="hidden sm:block p-2 hover:bg-gray-100 rounded-full">
                <Heart size={22} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              {isAuthenticated ? (
                <Link to="/account" className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors">
                  <User size={16} />
                  Login
                </Link>
              )}

              {/* Mobile Menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="border-t bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              <div className="relative">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-colors"
                >
                  <Menu size={16} />
                  All Categories
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {categoryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-lg border w-64 z-50 py-2"
                    >
                      {categories.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          onClick={() => setCategoryMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <span className="text-sm font-medium">{cat.name}</span>
                          <span className="ml-auto text-xs text-gray-400">{cat.productCount}</span>
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
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
              <Link to="/seller" className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap font-medium">
                <Package size={14} />
                Become a Seller
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
            className="md:hidden bg-white border-b shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2">
              {isAuthenticated && (
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <User size={20} className="text-orange-600" />
                  <span className="font-medium">{user?.name}</span>
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-orange-600 text-white rounded-lg">
                  <User size={20} />
                  <span className="font-medium">Login / Register</span>
                </Link>
              )}
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <ShoppingCart size={20} />
                <span>Cart ({cartCount})</span>
              </Link>
              <hr />
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <span>{cat.icon}</span>
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
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">PakMart</h3>
              <p className="text-sm text-gray-400 mb-4">Pakistan's largest online marketplace. Shop millions of products at the best prices.</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">f</a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">t</a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">in</a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">ig</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">How to Buy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">PakMart</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Seller Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Payment & Delivery</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">COD</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">JazzCash</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">EasyPaisa</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">Visa</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">Mastercard</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">TCS</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">Leopard</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">Trax</span>
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs">CallCourier</span>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-white text-sm font-medium mb-2">Newsletter</h5>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-700 rounded-l text-sm outline-none" />
                  <button className="px-3 py-2 bg-orange-600 rounded-r text-sm font-medium hover:bg-orange-700">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 PakMart. All rights reserved. | Made with ❤️ in Pakistan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
