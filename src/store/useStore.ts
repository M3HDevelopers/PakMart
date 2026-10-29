import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User, Order, Notification, Product } from '../types';
import { products as mockProducts, mockOrders, mockUsers } from '../data/mockData';

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User>) => boolean;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variantId?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // UI
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        // Allow any login for demo
        const newUser: User = {
          id: 'u-demo-' + Date.now(),
          name: email.split('@')[0],
          email,
          phone: '03001234567',
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      register: (data: Partial<User>) => {
        const newUser: User = {
          id: 'u-new-' + Date.now(),
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),

      // Cart
      cart: [],
      addToCart: (product, quantity = 1, variantId) => {
        const { cart } = get();
        const existing = cart.find(item => item.productId === product.id && item.variantId === variantId);
        if (existing) {
          set({ cart: cart.map(item => item.productId === product.id && item.variantId === variantId ? { ...item, quantity: item.quantity + quantity } : item) });
        } else {
          set({ cart: [...cart, { productId: product.id, variantId, quantity, product }] });
        }
      },
      removeFromCart: (productId) => set({ cart: get().cart.filter(item => item.productId !== productId) }),
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ cart: get().cart.filter(item => item.productId !== productId) });
        } else {
          set({ cart: get().cart.map(item => item.productId === productId ? { ...item, quantity } : item) });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          set({ wishlist: wishlist.filter(id => id !== productId) });
        } else {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // Orders
      orders: mockOrders,
      addOrder: (order) => set({ orders: [order, ...get().orders] }),

      // Notifications
      notifications: [
        { id: 'n1', title: 'Order Delivered', message: 'Your order PM-20240001 has been delivered.', type: 'order', read: false, createdAt: '2024-11-05' },
        { id: 'n2', title: 'Flash Sale!', message: 'Mega electronics sale - Up to 70% off!', type: 'promotion', read: false, createdAt: '2024-11-10' },
        { id: 'n3', title: 'Welcome Bonus', message: 'Use code WELCOME10 for 10% off your next order.', type: 'promotion', read: true, createdAt: '2024-11-01' },
      ],
      markNotificationRead: (id) => set({ notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n) }),

      // Recently Viewed
      recentlyViewed: [],
      addRecentlyViewed: (productId) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(id => id !== productId);
        set({ recentlyViewed: [productId, ...filtered].slice(0, 10) });
      },

      // UI
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      selectedCategory: '',
      setSelectedCategory: (c) => set({ selectedCategory: c }),
    }),
    {
      name: 'pakmart-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        notifications: state.notifications,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);

export const useProducts = () => mockProducts;
