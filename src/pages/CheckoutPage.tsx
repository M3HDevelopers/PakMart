import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Check, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cities } from '../data/mockData';
import { Order } from '../types';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder, isAuthenticated, user } = useStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ fullName: user?.name || '', phone: user?.phone || '', address: '', city: 'Islamabad', state: 'ICT', postalCode: '' });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getCartTotal();
  const shippingFee = deliveryMethod === 'express' ? 450 : subtotal > 3000 ? 0 : 250;
  const total = subtotal + shippingFee;

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <Link to="/" className="text-orange-600 hover:underline mt-4 inline-block">Continue Shopping</Link>
      </div>
    );
  }

  const placeOrder = () => {
    const order: Order = {
      id: 'o-' + Date.now(),
      orderNumber: 'PM-' + Date.now().toString().slice(-8),
      customerId: user?.id || 'guest',
      customerName: address.fullName,
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0],
        quantity: item.quantity,
        price: item.product.price,
        sellerId: item.product.sellerId,
        sellerName: item.product.seller,
      })),
      subtotal,
      shippingFee,
      discount: 0,
      tax: 0,
      total,
      status: 'pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      shippingAddress: { id: 'a-new', label: 'Shipping', ...address, isDefault: false },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-6">Thank you for your order. You will receive a confirmation shortly.</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-bold text-lg">PM-{Date.now().toString().slice(-8)}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/account" className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">View Orders</Link>
          <Link to="/" className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {['Address', 'Delivery', 'Payment', 'Confirm'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > i + 1 ? <Check size={16} /> : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${step === i + 1 ? 'text-orange-600' : 'text-gray-500'}`}>{s}</span>
            {i < 3 && <ChevronRight size={16} className="mx-2 text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin size={20} /> Shipping Address</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} placeholder="03XX-XXXXXXX" className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-orange-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <input type="text" value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} placeholder="House/Flat, Street, Area" className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <select value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-orange-500">
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:border-orange-500" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="mt-6 w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">Continue to Delivery</button>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Truck size={20} /> Delivery Method</h3>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${deliveryMethod === 'standard' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="delivery" value="standard" checked={deliveryMethod === 'standard'} onChange={(e) => setDeliveryMethod(e.target.value)} className="accent-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-500">3-5 business days</p>
                  </div>
                  <span className="font-medium">{subtotal > 3000 ? 'FREE' : 'Rs. 250'}</span>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${deliveryMethod === 'express' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="delivery" value="express" checked={deliveryMethod === 'express'} onChange={(e) => setDeliveryMethod(e.target.value)} className="accent-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium">Express Delivery</p>
                    <p className="text-sm text-gray-500">1-2 business days</p>
                  </div>
                  <span className="font-medium">Rs. 450</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment Method</h3>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-orange-600" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-orange-600" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'jazzcash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="jazzcash" checked={paymentMethod === 'jazzcash'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-orange-600" />
                  <div>
                    <p className="font-medium">JazzCash / EasyPaisa</p>
                    <p className="text-sm text-gray-500">Mobile wallet payment</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-orange-600" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank transfer</p>
                  </div>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(4)} className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">Review Order</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Order Confirmation</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Shipping To</h4>
                  <p className="font-medium">{address.fullName}</p>
                  <p className="text-sm text-gray-600">{address.address}, {address.city}, {address.state}</p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-1">Payment</h4>
                  <p className="font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'jazzcash' ? 'JazzCash/EasyPaisa' : 'Bank Transfer'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Items ({cart.length})</h4>
                  {cart.map(item => (
                    <div key={item.productId} className="flex items-center gap-3 py-2">
                      <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(3)} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Back</button>
                <button onClick={placeOrder} className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Place Order</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Items ({cart.length})</span><span>Rs. {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
