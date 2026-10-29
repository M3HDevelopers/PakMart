import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Users, Store, Package, ShoppingCart, DollarSign, Tag, MessageSquare, Settings, Shield, TrendingUp, Eye, Check, X, AlertTriangle, ChevronRight, FileText, LogOut, LayoutDashboard, Search, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products, categories, mockOrders } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function AdminDashboard() {
  const { user, orders, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect non-admin users
  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Shield size={48} className="mx-auto text-[var(--color-text-muted)] mb-4" />
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Access Denied</h2>
        <p className="text-[var(--color-text-muted)] mb-4">You do not have permission to access this page.</p>
        <Link to="/" className="text-[var(--color-accent)] hover:underline text-sm">Return to Home</Link>
      </div>
    );
  }

  const revenueData = [
    { name: 'Jul', revenue: 3200000, orders: 940 }, { name: 'Aug', revenue: 3800000, orders: 1100 },
    { name: 'Sep', revenue: 4100000, orders: 1200 }, { name: 'Oct', revenue: 3900000, orders: 1150 },
    { name: 'Nov', revenue: 4500000, orders: 1340 }, { name: 'Dec', revenue: 5200000, orders: 1500 },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
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
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="bg-white border border-[var(--color-border)] sticky top-24">
            <div className="p-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[var(--color-accent)]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Admin Panel</span>
              </div>
            </div>
            <nav className="p-1.5">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === item.id ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'}`}
                >
                  <item.icon size={14} />
                  {item.label}
                </button>
              ))}
              <hr className="my-1.5 border-[var(--color-border)]" />
              <Link to="/admin/reports" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
                <FileText size={14} /> Reports
              </Link>
              <Link to="/account" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
                <ChevronRight size={14} /> Back to Account
              </Link>
              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-danger)] hover:bg-red-50">
                <LogOut size={14} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-[var(--color-text)]">
                {sidebarItems.find(s => s.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {user?.role === 'superadmin' ? 'Super Administrator' : 'Administrator'} — {user?.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-[var(--color-border)] px-2 py-1.5">
                <Search size={14} className="text-[var(--color-text-muted)]" />
                <input type="text" placeholder="Search..." className="ml-2 text-xs outline-none w-32 bg-transparent" />
              </div>
              <button className="relative p-2 border border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]">
                <Bell size={14} className="text-[var(--color-text-secondary)]" />
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-white text-[8px] w-3 h-3 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex gap-0 overflow-x-auto border-b border-[var(--color-border)] mb-6">
            {sidebarItems.slice(0, 5).map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 ${activeTab === item.id ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-transparent text-[var(--color-text-muted)]'}`}>
                <item.icon size={12} /> {item.label}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Total Customers', value: '24,521', change: '+12%', icon: Users },
                  { label: 'Active Sellers', value: '1,245', change: '+8%', icon: Store },
                  { label: 'Total Orders', value: '18,432', change: '+15%', icon: ShoppingCart },
                  { label: 'GMV (PKR)', value: 'Rs. 45M', change: '+22%', icon: DollarSign },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border border-[var(--color-border)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon size={14} className="text-[var(--color-text-muted)]" />
                      <span className="text-[10px] font-medium text-[var(--color-success)]">{stat.change}</span>
                    </div>
                    <p className="text-lg font-semibold text-[var(--color-text)]">{stat.value}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Active Products', value: '11,590', icon: Package },
                  { label: 'Pending Approvals', value: '23', icon: AlertTriangle, warn: true },
                  { label: 'Commission Earned', value: 'Rs. 4.5M', icon: TrendingUp },
                  { label: 'Pending Payouts', value: 'Rs. 2.1M', icon: DollarSign },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border border-[var(--color-border)] p-3">
                    <div className="flex items-center gap-2">
                      <stat.icon size={12} className={stat.warn ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]'} />
                      <span className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</span>
                    </div>
                    <p className={`text-base font-semibold mt-1 ${stat.warn ? 'text-[var(--color-warning)]' : 'text-[var(--color-text)]'}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white border border-[var(--color-border)] p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">Revenue Trend</h3>
                  <Link to="/admin/reports" className="text-[10px] text-[var(--color-accent)] font-medium hover:underline">View Reports</Link>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Area type="monotone" dataKey="revenue" stroke="#c2410c" fill="#fff7ed" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Alerts & Tables */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-[var(--color-border)] p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><AlertTriangle size={14} className="text-[var(--color-warning)]" /> Pending Actions</h3>
                  <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>Seller applications</span><span className="font-semibold text-[var(--color-warning)]">5</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>Products pending approval</span><span className="font-semibold text-[var(--color-warning)]">12</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>Refund requests</span><span className="font-semibold text-[var(--color-danger)]">3</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5">
                      <span>Escalated tickets</span><span className="font-semibold text-[var(--color-danger)]">2</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-[var(--color-border)] p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><TrendingUp size={14} className="text-[var(--color-success)]" /> Top Performers</h3>
                  <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>TechZone Pakistan</span><span className="font-semibold">Rs. 890K</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>Fashion Hub</span><span className="font-semibold">Rs. 650K</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5 border-b border-[var(--color-border)] last:border-0">
                      <span>Best selling product</span><span className="font-semibold">Galaxy S24</span>
                    </li>
                    <li className="flex items-center justify-between py-1.5">
                      <span>Top category</span><span className="font-semibold">Electronics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--color-text-muted)]">24,521 total customers</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-bg-tertiary)]">Export CSV</button>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Customer</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Email</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Orders</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Spent</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Actions</th></tr></thead>
                  <tbody>
                    {[{ name: 'Ahmed Khan', email: 'ahmed@example.com', orders: 12, spent: 'Rs. 145K', status: 'Active' }, { name: 'Sara Ali', email: 'sara@example.com', orders: 8, spent: 'Rs. 89K', status: 'Active' }, { name: 'Bilal Ahmed', email: 'bilal@example.com', orders: 5, spent: 'Rs. 52K', status: 'Active' }, { name: 'Fatima Noor', email: 'fatima@example.com', orders: 0, spent: 'Rs. 0', status: 'Suspended' }].map((c, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-medium">{c.name}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{c.email}</td>
                        <td className="py-2.5 px-3 text-right">{c.orders}</td>
                        <td className="py-2.5 px-3 text-right font-medium">{c.spent}</td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${c.status === 'Active' ? 'bg-green-50 text-[var(--color-success)] border border-green-200' : 'bg-red-50 text-[var(--color-danger)] border border-red-200'}`}>{c.status}</span></td>
                        <td className="py-2.5 px-3 text-center"><button className="p-1 hover:bg-[var(--color-bg-tertiary)]"><Eye size={12} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sellers Tab */}
          {activeTab === 'sellers' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-[var(--color-warning)]/10 text-[var(--color-warning)] text-xs font-medium border border-[var(--color-warning)]/30">Pending (5)</button>
                <button className="px-3 py-1.5 bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-medium border border-[var(--color-success)]/30">Approved (1,240)</button>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Store</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Owner</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Products</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Sales</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Actions</th></tr></thead>
                  <tbody>
                    {[{ store: 'TechZone Pakistan', owner: 'Ali Hassan', products: 150, sales: 'Rs. 890K', status: 'Approved' }, { store: 'Fashion Hub', owner: 'Zainab Khan', products: 320, sales: 'Rs. 650K', status: 'Approved' }, { store: 'Gadget World', owner: 'Usman Ali', products: 45, sales: '-', status: 'Pending' }, { store: 'Home Decor Plus', owner: 'Ayesha Siddiqui', products: 28, sales: '-', status: 'Pending' }].map((s, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-medium">{s.store}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{s.owner}</td>
                        <td className="py-2.5 px-3 text-right">{s.products}</td>
                        <td className="py-2.5 px-3 text-right font-medium">{s.sales}</td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${s.status === 'Approved' ? 'bg-green-50 text-[var(--color-success)] border border-green-200' : 'bg-yellow-50 text-[var(--color-warning)] border border-yellow-200'}`}>{s.status}</span></td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {s.status === 'Pending' ? (
                              <><button className="p-1 hover:bg-green-50 text-[var(--color-success)]"><Check size={12} /></button><button className="p-1 hover:bg-red-50 text-[var(--color-danger)]"><X size={12} /></button></>
                            ) : <button className="p-1 hover:bg-[var(--color-bg-tertiary)]"><Eye size={12} /></button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--color-text-muted)]">11,590 active products</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-bg-tertiary)]">Bulk Actions</button>
                </div>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Product</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Seller</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Price</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Stock</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Actions</th></tr></thead>
                  <tbody>
                    {products.slice(0, 8).map(product => (
                      <tr key={product.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2 px-3"><div className="flex items-center gap-2"><img src={product.images[0]} alt="" className="w-7 h-7 object-cover" /><span className="font-medium line-clamp-1">{product.name}</span></div></td>
                        <td className="py-2 px-3 text-[var(--color-text-muted)]">{product.seller}</td>
                        <td className="py-2 px-3 text-right font-medium">Rs. {product.price.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right"><span className={product.stock < 10 ? 'text-[var(--color-danger)] font-medium' : ''}>{product.stock}</span></td>
                        <td className="py-2 px-3 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-[var(--color-success)] border border-green-200 font-medium">Active</span></td>
                        <td className="py-2 px-3 text-center"><div className="flex items-center justify-center gap-0.5"><button className="p-1 hover:bg-[var(--color-bg-tertiary)]"><Eye size={11} /></button><button className="p-1 hover:bg-red-50 text-[var(--color-danger)]"><X size={11} /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                  <div key={s} className="bg-white border border-[var(--color-border)] p-2.5 text-center">
                    <p className="text-[10px] text-[var(--color-text-muted)]">{s}</p>
                    <p className="text-sm font-semibold">{Math.floor(Math.random() * 500)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Order</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Customer</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Amount</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Payment</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th></tr></thead>
                  <tbody>
                    {mockOrders.map(order => (
                      <tr key={order.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-mono font-medium">{order.orderNumber}</td>
                        <td className="py-2.5 px-3">{order.customerName}</td>
                        <td className="py-2.5 px-3 text-right font-medium">Rs. {order.total.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${order.paymentStatus === 'paid' ? 'bg-green-50 text-[var(--color-success)] border border-green-200' : 'bg-yellow-50 text-[var(--color-warning)] border border-yellow-200'}`}>{order.paymentStatus}</span></td>
                        <td className="py-2.5 px-3 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-[var(--color-info)] border border-blue-200 font-medium">{order.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Finance Tab */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">GMV</p><p className="text-base font-semibold">Rs. 45M</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Commission</p><p className="text-base font-semibold text-[var(--color-success)]">Rs. 4.5M</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Refunds</p><p className="text-base font-semibold text-[var(--color-danger)]">Rs. 230K</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Net Revenue</p><p className="text-base font-semibold">Rs. 4.27M</p></div>
              </div>
              <div className="bg-white border border-[var(--color-border)] p-4">
                <h3 className="text-sm font-semibold mb-4">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#c2410c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--color-text-muted)]">Active coupons and promotions</p>
                <button className="px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)]">+ Create Coupon</button>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Code</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Type</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Value</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Usage</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Expires</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th></tr></thead>
                  <tbody>
                    {[{ code: 'WELCOME10', type: 'Percentage', value: '10%', used: '234/1000', expires: '2025-12-31', active: true }, { code: 'FLAT500', type: 'Fixed', value: 'Rs. 500', used: '89/500', expires: '2025-06-30', active: true }, { code: 'MEGA20', type: 'Percentage', value: '20%', used: '45/200', expires: '2024-12-31', active: true }].map((c, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-mono font-medium">{c.code}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{c.type}</td>
                        <td className="py-2.5 px-3">{c.value}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{c.used}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{c.expires}</td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${c.active ? 'bg-green-50 text-[var(--color-success)] border border-green-200' : 'bg-gray-50 text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}>{c.active ? 'Active' : 'Expired'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {[{ label: 'Open', count: 12 }, { label: 'In Progress', count: 8 }, { label: 'Resolved', count: 156 }, { label: 'Escalated', count: 3 }].map(s => (
                  <div key={s.label} className="bg-white border border-[var(--color-border)] p-2.5 text-center">
                    <p className="text-[10px] text-[var(--color-text-muted)]">{s.label}</p>
                    <p className="text-sm font-semibold">{s.count}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">ID</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Subject</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">From</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Priority</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th></tr></thead>
                  <tbody>
                    {[{ id: 'TK-001', subject: 'Order not received', from: 'Ahmed Khan', priority: 'High', status: 'Open' }, { id: 'TK-002', subject: 'Wrong item delivered', from: 'Sara Ali', priority: 'Medium', status: 'In Progress' }, { id: 'TK-003', subject: 'Refund not processed', from: 'Bilal Ahmed', priority: 'High', status: 'Escalated' }].map(t => (
                      <tr key={t.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-mono">{t.id}</td>
                        <td className="py-2.5 px-3 font-medium">{t.subject}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{t.from}</td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${t.priority === 'High' ? 'bg-red-50 text-[var(--color-danger)] border border-red-200' : 'bg-yellow-50 text-[var(--color-warning)] border border-yellow-200'}`}>{t.priority}</span></td>
                        <td className="py-2.5 px-3 text-center"><span className={`text-[10px] px-1.5 py-0.5 font-medium ${t.status === 'Open' ? 'bg-blue-50 text-[var(--color-info)] border border-blue-200' : t.status === 'Escalated' ? 'bg-red-50 text-[var(--color-danger)] border border-red-200' : 'bg-yellow-50 text-[var(--color-warning)] border border-yellow-200'}`}>{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="bg-white border border-[var(--color-border)] p-4 space-y-4">
                <h3 className="text-sm font-semibold">Platform Configuration</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Platform Name</label><input type="text" defaultValue="PakMart" className="w-full mt-1 px-3 py-2 border border-[var(--color-border)] text-xs outline-none focus:border-[var(--color-accent)]" /></div>
                  <div><label className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Currency</label><input type="text" defaultValue="PKR" className="w-full mt-1 px-3 py-2 border border-[var(--color-border)] text-xs outline-none focus:border-[var(--color-accent)]" /></div>
                  <div><label className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Default Commission %</label><input type="number" defaultValue="10" className="w-full mt-1 px-3 py-2 border border-[var(--color-border)] text-xs outline-none focus:border-[var(--color-accent)]" /></div>
                  <div><label className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Return Window (days)</label><input type="number" defaultValue="7" className="w-full mt-1 px-3 py-2 border border-[var(--color-border)] text-xs outline-none focus:border-[var(--color-accent)]" /></div>
                </div>
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked className="accent-[var(--color-accent)]" /> Require seller approval</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked className="accent-[var(--color-accent)]" /> Require product approval</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="accent-[var(--color-accent)]" /> Allow guest checkout</label>
                </div>
                <button className="px-4 py-2 bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)]">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
