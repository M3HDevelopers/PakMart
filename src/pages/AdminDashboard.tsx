import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Store, Package, ShoppingCart, DollarSign, Tag, MessageSquare, Settings, Shield, TrendingUp, Eye, Check, X, AlertTriangle, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products, categories, mockOrders } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const { user, orders } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const revenueData = [
    { name: 'Jan', revenue: 1200000, orders: 340 }, { name: 'Feb', revenue: 1450000, orders: 410 },
    { name: 'Mar', revenue: 1380000, orders: 380 }, { name: 'Apr', revenue: 1620000, orders: 450 },
    { name: 'May', revenue: 1550000, orders: 430 }, { name: 'Jun', revenue: 1890000, orders: 520 },
  ];
  const categoryData = categories.slice(0, 5).map(c => ({ name: c.name, value: c.productCount }));
  const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ef4444'];

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sellers', label: 'Sellers', icon: Store },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm flex items-center gap-1"><Shield size={14} /> {user?.role === 'superadmin' ? 'Super Admin' : 'Administrator'}</p>
        </div>
        <Link to="/account" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
          Back to Account <ChevronRight size={14} />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
              <p className="text-xs text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold">24,521</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
              <p className="text-xs text-gray-500">Total Sellers</p>
              <p className="text-2xl font-bold">1,245</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% this month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">18,432</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% this month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
              <p className="text-xs text-gray-500">GMV (PKR)</p>
              <p className="text-2xl font-bold">Rs. 45M</p>
              <p className="text-xs text-green-600 mt-1">↑ 22% this month</p>
            </div>
          </div>

          {/* Second Row Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Active Products</p>
              <p className="text-xl font-bold">11,590</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Pending Approvals</p>
              <p className="text-xl font-bold text-yellow-600">23</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Commission Earned</p>
              <p className="text-xl font-bold text-green-600">Rs. 4.5M</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Pending Payouts</p>
              <p className="text-xl font-bold text-orange-600">Rs. 2.1M</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold mb-4">Revenue & Orders</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="#fed7aa" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold mb-4">Products by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name }) => name}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-2"><AlertTriangle size={16} className="text-red-600" /><h3 className="font-medium text-red-800 text-sm">Pending Actions</h3></div>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• 5 seller applications awaiting review</li>
                <li>• 12 products pending approval</li>
                <li>• 3 refund requests need authorization</li>
                <li>• 2 support tickets escalated</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-green-600" /><h3 className="font-medium text-green-800 text-sm">Top Performers</h3></div>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• TechZone Pakistan - Rs. 890K this month</li>
                <li>• Fashion Hub - Rs. 650K this month</li>
                <li>• Samsung Galaxy S24 - Best selling product</li>
                <li>• Electronics - Top category by revenue</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Customer Management</h2>
            <input type="text" placeholder="Search customers..." className="px-4 py-2 border rounded-lg text-sm outline-none focus:border-orange-500" />
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Customer</th><th className="text-left py-3 px-4 font-medium">Email</th><th className="text-left py-3 px-4 font-medium">Orders</th><th className="text-left py-3 px-4 font-medium">Spent</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Actions</th></tr></thead>
              <tbody>
                {[{ name: 'Ahmed Khan', email: 'ahmed@example.com', orders: 12, spent: 'Rs. 145K', status: 'Active' }, { name: 'Sara Ali', email: 'sara@example.com', orders: 8, spent: 'Rs. 89K', status: 'Active' }, { name: 'Bilal Ahmed', email: 'bilal@example.com', orders: 5, spent: 'Rs. 52K', status: 'Active' }, { name: 'Fatima Noor', email: 'fatima@example.com', orders: 0, spent: 'Rs. 0', status: 'Suspended' }].map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{c.name}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">{c.orders}</td>
                    <td className="py-3 px-4">{c.spent}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span></td>
                    <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1 hover:bg-gray-100 rounded"><Eye size={14} /></button><button className="p-1 hover:bg-gray-100 rounded text-orange-600"><Settings size={14} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sellers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Seller Management</h2>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Pending (5)</button>
              <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Approved (1,240)</button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Store</th><th className="text-left py-3 px-4 font-medium">Owner</th><th className="text-left py-3 px-4 font-medium">Products</th><th className="text-left py-3 px-4 font-medium">Sales</th><th className="text-left py-3 px-4 font-medium">Rating</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Actions</th></tr></thead>
              <tbody>
                {[{ store: 'TechZone Pakistan', owner: 'Ali Hassan', products: 150, sales: 'Rs. 890K', rating: '4.8', status: 'Approved' }, { store: 'Fashion Hub', owner: 'Zainab Khan', products: 320, sales: 'Rs. 650K', rating: '4.6', status: 'Approved' }, { store: 'Gadget World', owner: 'Usman Ali', products: 45, sales: 'Rs. 0', rating: '-', status: 'Pending' }, { store: 'Home Decor Plus', owner: 'Ayesha Siddiqui', products: 28, sales: 'Rs. 0', rating: '-', status: 'Pending' }].map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{s.store}</td>
                    <td className="py-3 px-4">{s.owner}</td>
                    <td className="py-3 px-4">{s.products}</td>
                    <td className="py-3 px-4">{s.sales}</td>
                    <td className="py-3 px-4">{s.rating}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${s.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.status}</span></td>
                    <td className="py-3 px-4"><div className="flex gap-1">{s.status === 'Pending' ? (<><button className="p-1 hover:bg-green-100 rounded text-green-600"><Check size={14} /></button><button className="p-1 hover:bg-red-100 rounded text-red-600"><X size={14} /></button></>) : (<button className="p-1 hover:bg-gray-100 rounded"><Eye size={14} /></button>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Product Management</h2>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Pending (12)</button>
              <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Active (11,590)</button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Product</th><th className="text-left py-3 px-4 font-medium">Seller</th><th className="text-left py-3 px-4 font-medium">Category</th><th className="text-left py-3 px-4 font-medium">Price</th><th className="text-left py-3 px-4 font-medium">Stock</th><th className="text-left py-3 px-4 font-medium">Status</th><th className="text-left py-3 px-4 font-medium">Actions</th></tr></thead>
              <tbody>
                {products.slice(0, 10).map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4"><div className="flex items-center gap-2"><img src={product.images[0]} alt="" className="w-8 h-8 object-cover rounded" /><span className="font-medium line-clamp-1">{product.name}</span></div></td>
                    <td className="py-3 px-4">{product.seller}</td>
                    <td className="py-3 px-4 capitalize">{product.category}</td>
                    <td className="py-3 px-4">Rs. {product.price.toLocaleString()}</td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4"><span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Active</span></td>
                    <td className="py-3 px-4"><div className="flex gap-1"><button className="p-1 hover:bg-gray-100 rounded"><Eye size={14} /></button><button className="p-1 hover:bg-gray-100 rounded text-red-500"><X size={14} /></button></div></td>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
              <div key={s} className="bg-white rounded-lg p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500">{s}</p>
                <p className="text-lg font-bold">{Math.floor(Math.random() * 500)}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Order #</th><th className="text-left py-3 px-4 font-medium">Customer</th><th className="text-left py-3 px-4 font-medium">Seller</th><th className="text-left py-3 px-4 font-medium">Amount</th><th className="text-left py-3 px-4 font-medium">Payment</th><th className="text-left py-3 px-4 font-medium">Status</th></tr></thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">{order.items[0]?.sellerName}</td>
                    <td className="py-3 px-4 font-medium">Rs. {order.total.toLocaleString()}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus}</span></td>
                    <td className="py-3 px-4"><span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Financial Overview</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">GMV</p><p className="text-xl font-bold">Rs. 45M</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Commission</p><p className="text-xl font-bold text-green-600">Rs. 4.5M</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Refunds</p><p className="text-xl font-bold text-red-600">Rs. 230K</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm"><p className="text-xs text-gray-500">Net Revenue</p><p className="text-xl font-bold">Rs. 4.27M</p></div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'promotions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Promotions & Coupons</h2>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">+ Create Coupon</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Code</th><th className="text-left py-3 px-4 font-medium">Type</th><th className="text-left py-3 px-4 font-medium">Value</th><th className="text-left py-3 px-4 font-medium">Used</th><th className="text-left py-3 px-4 font-medium">Expires</th><th className="text-left py-3 px-4 font-medium">Status</th></tr></thead>
              <tbody>
                {[{ code: 'WELCOME10', type: 'Percentage', value: '10%', used: '234/1000', expires: '2025-12-31', active: true }, { code: 'FLAT500', type: 'Fixed', value: 'Rs. 500', used: '89/500', expires: '2025-06-30', active: true }, { code: 'MEGA20', type: 'Percentage', value: '20%', used: '45/200', expires: '2024-12-31', active: true }].map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-medium">{c.code}</td>
                    <td className="py-3 px-4">{c.type}</td>
                    <td className="py-3 px-4">{c.value}</td>
                    <td className="py-3 px-4">{c.used}</td>
                    <td className="py-3 px-4">{c.expires}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${c.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{c.active ? 'Active' : 'Expired'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Support Tickets</h2>
          <div className="grid md:grid-cols-4 gap-3">
            {[{ label: 'Open', count: 12, color: 'blue' }, { label: 'In Progress', count: 8, color: 'yellow' }, { label: 'Resolved', count: 156, color: 'green' }, { label: 'Escalated', count: 3, color: 'red' }].map(s => (
              <div key={s.label} className="bg-white rounded-lg p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className={`text-lg font-bold text-${s.color}-600`}>{s.count}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b"><th className="text-left py-3 px-4 font-medium">Ticket</th><th className="text-left py-3 px-4 font-medium">Subject</th><th className="text-left py-3 px-4 font-medium">From</th><th className="text-left py-3 px-4 font-medium">Priority</th><th className="text-left py-3 px-4 font-medium">Status</th></tr></thead>
              <tbody>
                {[{ id: 'TK-001', subject: 'Order not received', from: 'Ahmed Khan', priority: 'High', status: 'Open' }, { id: 'TK-002', subject: 'Wrong item delivered', from: 'Sara Ali', priority: 'Medium', status: 'In Progress' }, { id: 'TK-003', subject: 'Refund not processed', from: 'Bilal Ahmed', priority: 'High', status: 'Escalated' }].map(t => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs">{t.id}</td>
                    <td className="py-3 px-4 font-medium">{t.subject}</td>
                    <td className="py-3 px-4">{t.from}</td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${t.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.priority}</span></td>
                    <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${t.status === 'Open' ? 'bg-blue-100 text-blue-700' : t.status === 'Escalated' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Platform Settings</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-bold mb-3">General</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700">Platform Name</label><input type="text" defaultValue="PakMart" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700">Default Currency</label><input type="text" defaultValue="PKR (Pakistani Rupee)" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700">Country</label><input type="text" defaultValue="Pakistan" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700">Default Commission %</label><input type="number" defaultValue="10" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
            </div>
            <hr />
            <div>
              <h3 className="font-bold mb-3">Order Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700">Return Window (days)</label><input type="number" defaultValue="7" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700">Free Shipping Threshold</label><input type="number" defaultValue="3000" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" /></div>
              </div>
            </div>
            <hr />
            <div>
              <h3 className="font-bold mb-3">Seller Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-orange-600" /> Require admin approval for new sellers</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-orange-600" /> Require product approval before listing</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-orange-600" /> Allow guest checkout</label>
              </div>
            </div>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}
