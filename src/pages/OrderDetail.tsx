import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export function OrderDetail() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/account" className="text-orange-600 hover:underline mt-4 inline-block">Back to Orders</Link>
      </div>
    );
  }

  const statusSteps = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/account" className="hover:text-orange-600">My Account</Link>
        <ChevronRight size={14} />
        <Link to="/account" className="hover:text-orange-600">Orders</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800">{order.orderNumber}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Order {order.orderNumber}</h1>
            <p className="text-sm text-gray-500">Placed on {order.createdAt}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Tracking Timeline */}
        {order.status !== 'cancelled' && (
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
              <div className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all" style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}></div>
              {statusSteps.map((step, i) => (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= currentStepIndex ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {i <= currentStepIndex ? <CheckCircle size={16} /> : <Clock size={14} />}
                  </div>
                  <span className="text-xs mt-1 text-center hidden sm:block capitalize">{step.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="border-t pt-4">
          <h3 className="font-bold mb-3">Items</h3>
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
              <img src={item.productImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/product/${item.productId}`} className="font-medium hover:text-orange-600">{item.productName}</Link>
                <p className="text-sm text-gray-500">Seller: {item.sellerName}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t mt-4 pt-4">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPin size={14} /> Shipping Address</h4>
              <p className="text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center gap-1"><CreditCard size={14} /> Payment</h4>
              <p className="text-sm capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
              <p className="text-sm text-gray-600">Status: <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>{order.paymentStatus}</span></p>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-sm"><span className="text-green-600">Discount</span><span className="text-green-600">-Rs. {order.discount.toLocaleString()}</span></div>}
          <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span className="text-orange-600">Rs. {order.total.toLocaleString()}</span></div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="border-t mt-4 pt-4">
            <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center gap-1"><Truck size={14} /> Tracking Information</h4>
            <p className="text-sm">Courier: {order.courierName}</p>
            <p className="text-sm">Tracking #: <span className="font-mono font-medium">{order.trackingNumber}</span></p>
          </div>
        )}

        {/* Actions */}
        <div className="border-t mt-4 pt-4 flex flex-wrap gap-3">
          {['pending', 'confirmed', 'processing'].includes(order.status) && (
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">Cancel Order</button>
          )}
          {order.status === 'delivered' && (
            <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50">Request Return</button>
          )}
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Download Invoice</button>
          <Link to="/" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Buy Again</Link>
        </div>
      </div>
    </div>
  );
}
