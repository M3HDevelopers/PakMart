import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductListing } from './pages/ProductListing';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderDetail } from './pages/OrderDetail';
import { WishlistPage } from './pages/WishlistPage';
import { ComparePage } from './pages/ComparePage';
import { SearchResults } from './pages/SearchResults';
import { StorePage } from './pages/StorePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:slug" element={<ProductListing />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<CustomerDashboard />} />
          <Route path="account/orders/:id" element={<OrderDetail />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="seller" element={<SellerDashboard />} />
          <Route path="seller/store/:slug" element={<StorePage />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
