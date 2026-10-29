import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { mockCoupons } from '../data/mockData';

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartTotal();
  const discount = appliedCoupon ? (appliedCoupon === 'WELCOME10' ? Math.min(subtotal * 0.1, 1000) : appliedCoupon === 'FLAT500' ? 500 : 0) : 0;
  const shippingFee = subtotal > 3000 ? 0 : 250;
  const total = subtotal - discount + shippingFee;

  const applyCoupon = () => {
    const coupon = mockCoupons.find(c => c.code === couponCode.toUpperCase() && c.active);
    if (coupon) {
      if (subtotal < coupon.minOrder) {
        setCouponError(`Minimum order of Rs. ${coupon.minOrder.toLocaleString()} required`);
        return;
      }
      setAppliedCoupon(coupon.code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={48} className="mx-auto text-[var(--color-border)] mb-4" />
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-5 py-2.5 text-sm font-medium hover:bg-[var(--color-accent-hover)]">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-[var(--color-text)] mb-6">Shopping Cart ({cart.length} items)</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.productId} className="bg-white border border-[var(--color-border)] p-4 flex gap-4">
              <Link to={`/product/${item.product.slug}`}>
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.product.slug}`} className="font-medium text-gray-800 hover:text-orange-600 line-clamp-2">{item.product.name}</Link>
                <p className="text-sm text-gray-500 mt-1">Seller: {item.product.seller}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-orange-600">Rs. {item.product.price.toLocaleString()}</span>
                  {item.product.originalPrice > item.product.price && (
                    <span className="text-sm text-gray-400 line-through">Rs. {item.product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100"><Minus size={14} /></button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear Cart</button>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-[var(--color-border)] p-5 h-fit sticky top-24">
          <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
          
          {/* Coupon */}
          <div className="mb-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:border-orange-500"
                />
              </div>
              <button onClick={applyCoupon} className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700">Apply</button>
            </div>
            {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
            {appliedCoupon && <p className="text-green-600 text-xs mt-1">✓ Coupon "{appliedCoupon}" applied!</p>}
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600 font-medium">-Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className={shippingFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-orange-600">Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <Link to="/checkout" className="block w-full mt-6 text-center bg-[#171717] text-[#B7D92B] py-2.5 text-sm font-bold hover:bg-[#2a2a2a] transition-colors">
            Proceed to Checkout
          </Link>
          <Link to="/" className="block w-full mt-3 text-center text-[var(--color-accent)] text-xs font-medium hover:underline">
            Continue Shopping
          </Link>

          <div className="mt-4 p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Lock size={10} /> Secure checkout. Your data is protected.
          </div>
        </div>
      </div>
    </div>
  );
}
