import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Bell, Settings, LogOut, ShoppingBag, Star, ChevronRight, Clock, Truck, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/mockData';

export function CustomerDashboard() {
  const { user, isAuthenticated, orders, notifications, wishlist, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(o => o.customerId === user?.id || o.customerName === user?.name);
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'shipped': return <Truck size={16} className="text-blue-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      case 'return_requested': return <RotateCcw size={16} className="text-orange-500" />;
      default: return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': case 'out_for_delivery': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'processing': case 'packed': return 'bg-purple-100 text-purple-700';
      case 'pending': case 'confirmed': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
            <div className="flex items-center gap-3 pb-4 border-b mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <tab.icon size={18} />
                  {tab.label}
                  {tab.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{notifications.filter(n => !n.read).length}</span>
                  )}
                  {tab.id === 'wishlist' && wishlist.length > 0 && (
                    <span className="ml-auto text-xs text-gray-400">{wishlist.length}</span>
                  )}
                </button>
              ))}
              <hr className="my-2" />
              {user?.role === 'seller' && (
                <Link to="/seller" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-green-600 hover:bg-green-50">
                  <ShoppingBag size={18} /> Seller Dashboard
                </Link>
              )}
              {(user?.role === 'admin' || user?.role === 'superadmin') && (
                <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-purple-600 hover:bg-purple-50">
                  <Settings size={18} /> Admin Panel
                </Link>
              )}
              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{userOrders.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Wishlist Items</p>
                  <p className="text-2xl font-bold text-gray-800">{wishlist.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Pending Deliveries</p>
                  <p className="text-2xl font-bold text-gray-800">{userOrders.filter(o => ['processing', 'shipped', 'out_for_delivery'].includes(o.status)).length}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-orange-600 hover:underline">View All</button>
                </div>
                {userOrders.slice(0, 3).map(order => (
                  <Link key={order.id} to={`/account/orders/${order.id}`} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img src={order.items[0]?.productImage} alt="" className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{order.items.length} item(s) • {order.createdAt}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>{order.status.replace('_', ' ')}</span>
                    <span className="font-medium text-sm">Rs. {order.total.toLocaleString()}</span>
                  </Link>
                ))}
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-bold mb-4">Recent Notifications</h3>
                {notifications.slice(0, 3).map(n => (
                  <div key={n.id} className={`p-3 rounded-lg mb-2 ${n.read ? 'bg-gray-50' : 'bg-orange-50'}`}>
                    <p className="font-medium text-sm">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">My Orders</h2>
              {userOrders.length > 0 ? userOrders.map(order => (
                <Link key={order.id} to={`/account/orders/${order.id}`} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">Placed on {order.createdAt}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>{order.status.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img key={i} src={item.productImage} alt="" className="w-14 h-14 object-cover rounded-lg" />
                    ))}
                    {order.items.length > 3 && <span className="text-sm text-gray-500">+{order.items.length - 3} more</span>}
                    <div className="ml-auto text-right">
                      <p className="font-bold text-orange-600">Rs. {order.total.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{order.paymentMethod.toUpperCase()}</p>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                  <Link to="/" className="text-orange-600 hover:underline text-sm mt-2 inline-block">Start Shopping</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              {wishlistProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
                      <Link to={`/product/${product.slug}`}>
                        <img src={product.images[0]} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${product.slug}`} className="font-medium text-sm line-clamp-2 hover:text-orange-600">{product.name}</Link>
                        <p className="text-orange-600 font-bold mt-1">Rs. {product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <Link to="/" className="text-orange-600 hover:underline text-sm mt-2 inline-block">Browse Products</Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">My Addresses</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="border-2 border-dashed border-orange-200 rounded-xl p-8 text-center">
                  <MapPin size={32} className="mx-auto text-orange-300 mb-3" />
                  <p className="text-gray-500 mb-4">No saved addresses yet</p>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Add New Address</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Notifications</h2>
              <div className="bg-white rounded-xl shadow-sm divide-y">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 ${n.read ? '' : 'bg-orange-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'order' ? 'bg-blue-100' : n.type === 'promotion' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {n.type === 'order' ? <Package size={14} className="text-blue-600" /> : n.type === 'promotion' ? <Star size={14} className="text-green-600" /> : <Bell size={14} className="text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input type="text" defaultValue={user?.name} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input type="email" defaultValue={user?.email} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input type="tel" defaultValue={user?.phone} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Save Changes</button>
                </div>
                <hr />
                <div>
                  <h3 className="font-bold text-lg mb-4">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    <input type="password" placeholder="Current Password" className="w-full px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 border rounded-lg outline-none focus:border-orange-500" />
                    <button className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Update Password</button>
                  </div>
                </div>
                <hr />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-red-600">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-3">Once you delete your account, there is no going back.</p>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
