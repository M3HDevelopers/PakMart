import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, Component, ReactNode } from 'react';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductListing = lazy(() => import('./pages/ProductListing').then(m => ({ default: m.ProductListing })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard').then(m => ({ default: m.SellerDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminReports = lazy(() => import('./pages/AdminReports').then(m => ({ default: m.AdminReports })));
const OrderDetail = lazy(() => import('./pages/OrderDetail').then(m => ({ default: m.OrderDetail })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })));
const SearchResults = lazy(() => import('./pages/SearchResults').then(m => ({ default: m.SearchResults })));
const StorePage = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Something went wrong</h2>
            <p className="text-[var(--color-text-muted)] mb-4">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function SuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SuspenseWrapper><HomePage /></SuspenseWrapper>} />
            <Route path="category/:slug" element={<SuspenseWrapper><ProductListing /></SuspenseWrapper>} />
            <Route path="search" element={<SuspenseWrapper><SearchResults /></SuspenseWrapper>} />
            <Route path="product/:slug" element={<SuspenseWrapper><ProductDetail /></SuspenseWrapper>} />
            <Route path="cart" element={<SuspenseWrapper><CartPage /></SuspenseWrapper>} />
            <Route path="checkout" element={<SuspenseWrapper><CheckoutPage /></SuspenseWrapper>} />
            <Route path="login" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
            <Route path="register" element={<SuspenseWrapper><RegisterPage /></SuspenseWrapper>} />
            <Route path="account" element={<SuspenseWrapper><CustomerDashboard /></SuspenseWrapper>} />
            <Route path="account/orders/:id" element={<SuspenseWrapper><OrderDetail /></SuspenseWrapper>} />
            <Route path="wishlist" element={<SuspenseWrapper><WishlistPage /></SuspenseWrapper>} />
            <Route path="compare" element={<SuspenseWrapper><ComparePage /></SuspenseWrapper>} />
            <Route path="seller" element={<SuspenseWrapper><SellerDashboard /></SuspenseWrapper>} />
            <Route path="seller/store/:slug" element={<SuspenseWrapper><StorePage /></SuspenseWrapper>} />
            <Route path="admin" element={<SuspenseWrapper><AdminDashboard /></SuspenseWrapper>} />
            <Route path="admin/reports" element={<SuspenseWrapper><AdminReports /></SuspenseWrapper>} />
            <Route path="*" element={<SuspenseWrapper><NotFoundPage /></SuspenseWrapper>} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
