import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, DollarSign, TrendingUp, Star, AlertTriangle, Plus, Edit, Eye, Archive, Truck, Users, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function SellerDashboard() {
  const { user, orders } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sellerProducts = products.filter(p => p.sellerId === user?.store?.id || p.sellerId === 's1').slice(0, 15);
  const sellerOrders = orders.filter(o => o.items.some(i => i.sellerId === 's1'));

  const salesData = [
    { name: 'Mon', sales: 45000 }, { name: 'Tue', sales: 62000 }, { name: 'Wed', sales: 38000 },
    { name: 'Thu', sales: 71000 }, { name: 'Fri', sales: 55000 }, { name: 'Sat', sales: 89000 }, { name: 'Sun', sales: 42000 },
  ];
  const monthlyData = [
    { name: 'Jan', revenue: 450000 }, { name: 'Feb', revenue: 520000 }, { name: 'Mar', revenue: 480000 },
    { name: 'Apr', revenue: 610000 }, { name: 'May', revenue: 580000 }, { name: 'Jun', revenue: 720000 },
  ];
  const orderStatusData = [
    { name: 'Delivered', value: 145, color: '#22c55e' }, { name: 'Processing', value: 23, color: '#f59e0b' },
    { name: 'Shipped', value: 18, color: '#3b82f6' }, { name: 'Cancelled', value: 5, color: '#ef4444' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'finance', label: 'Finance', icon: DollarSign },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-gray-500 text-sm">{user?.store?.name || 'TechZone Pakistan'}</p>
        </div>
        <Link to="/account" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
          Back to Account <ChevronRight size={14} />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><DollarSign size={20} className="text-green-600" /></div>
                <div><p className="text-xs text-gray-500">Total Sales</p><p className="text-lg font-bold">Rs. 3.4M</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><ShoppingCart size={20} className="text-blue-600" /></div>
                <div><p className="text-xs text-gray-500">Total Orders</p><p className="text-lg font-bold">191</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Package size={20} className="text-purple-600" /></div>
                <div><p className="text-xs text-gray-500">Products</p><p className="text-lg font-bold">{sellerProducts.length}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"><Star size={20} className="text-yellow-600" /></div>
                <div><p className="text-xs text-gray-500">Rating</p><p className="text-lg font-bold">4.8/5</p></div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold mb-4">Weekly Sales</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold mb-4">Order Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-yellow-600" />
              <h3 className="font-medium text-yellow-800">Action Required</h3>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 3 orders need to be shipped</li>
              <li>• 2 products are running low on stock</li>
              <li>• 1 return request needs your response</li>
            </ul>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2 font-medium text-gray-500">Order</th><th className="text-left py-2 font-medium text-gray-500">Customer</th><th className="text-left py-2 font-medium text-gray-500">Items</th><th className="text-left py-2 font-medium text-gray-500">Amount</th><th className="text-left py-2 font-medium text-gray-500">Status</th></tr></thead>
                <tbody>
                  {sellerOrders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{order.orderNumber}</td>
                      <td className="py-3">{order.customerName}</td>
                      <td className="py-3">{order.items.length} item(s)</td>
                      <td className="py-3 font-medium">Rs. {order.total.toLocaleString()}</td>
                      <td className="py-3"><span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">My Products</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700"><Plus size={16} /> Add Product</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Product</th><th className="text-left py-3 px-4 font-medium">Price</th><th className="text-left py-3 px-4 font-medium">Stock</th><th className="text-left py-3 px-4 font-medium">Sold</th><th className="text-left py-3 px-4 font-medium">Rating</th><th className="text-left py-3 px-4 font-medium">Actions</th></tr></thead>
              <tbody>
                {sellerProducts.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4"><div className="flex items-center gap-3"><img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded" /><span className="font-medium line-clamp-1">{product.name}</span></div></td>
                    <td className="py-3 px-4 font-medium">Rs. {product.price.toLocaleString()}</td>
                    <td className="py-3 px-4"><span className={product.stock < 10 ? 'text-red-600' : 'text-green-600'}>{product.stock}</span></td>
                    <td className="py-3 px-4">{product.sold}</td>
                    <td className="py-3 px-4"><div className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" />{product.rating.toFixed(1)}</div></td>
                    <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1.5 hover:bg-gray-100 rounded"><Eye size={14} /></button><button className="p-1.5 hover:bg-gray-100 rounded"><Edit size={14} /></button><button className="p-1.5 hover:bg-gray-100 rounded"><Archive size={14} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Order Management</h2>
          <div className="flex gap-2 overflow-x-auto">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <button key={status} className="px-4 py-2 bg-white rounded-lg text-sm font-medium border hover:border-orange-500 hover:text-orange-600 whitespace-nowrap">{status}</button>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Order #</th><th className="text-left py-3 px-4 font-medium">Date</th><th className="text-left py-3 px-4 font-medium">Customer</th><th className="text-left py-3 px-4 font-medium">Items</th><th className="text-left py-3 px-4 font-medium">Total</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Action</th></tr></thead>
              <tbody>
                {sellerOrders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.createdAt}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">{order.items.length}</td>
                    <td className="py-3 px-4 font-medium">Rs. {order.total.toLocaleString()}</td>
                    <td className="py-3 px-4"><span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">{order.status}</span></td>
                    <td className="py-3 px-4"><button className="text-orange-600 text-xs font-medium hover:underline">Process</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Analytics</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-800">Rs. 17,800</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm text-gray-500">Return Rate</p>
              <p className="text-2xl font-bold text-gray-800">2.6%</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm text-gray-500">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-800">95%</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Finance & Payouts</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Gross Revenue</p><p className="text-xl font-bold">Rs. 3.4M</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Commission</p><p className="text-xl font-bold text-red-600">-Rs. 340K</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Pending</p><p className="text-xl font-bold text-yellow-600">Rs. 125K</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Available</p><p className="text-xl font-bold text-green-600">Rs. 2.9M</p></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold mb-4">Recent Transactions</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left py-2 font-medium text-gray-500">Date</th><th className="text-left py-2 font-medium text-gray-500">Type</th><th className="text-left py-2 font-medium text-gray-500">Reference</th><th className="text-left py-2 font-medium text-gray-500">Amount</th><th className="text-left py-2 font-medium text-gray-500">Status</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="py-3">2024-11-14</td><td className="py-3">Sale</td><td className="py-3">PM-20240003</td><td className="py-3 text-green-600">+Rs. 349,999</td><td className="py-3"><span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Completed</span></td></tr>
                <tr className="border-b"><td className="py-3">2024-11-10</td><td className="py-3">Sale</td><td className="py-3">PM-20240002</td><td className="py-3 text-green-600">+Rs. 18,999</td><td className="py-3"><span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Completed</span></td></tr>
                <tr className="border-b"><td className="py-3">2024-11-05</td><td className="py-3">Payout</td><td className="py-3">PAY-001</td><td className="py-3 text-blue-600">Rs. 500,000</td><td className="py-3"><span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Processed</span></td></tr>
                <tr className="border-b"><td className="py-3">2024-11-01</td><td className="py-3">Sale</td><td className="py-3">PM-20240001</td><td className="py-3 text-green-600">+Rs. 289,999</td><td className="py-3"><span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Completed</span></td></tr>
              </tbody>
            </table>
          </div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Request Payout</button>
        </div>
      )}
    </div>
  );
}
