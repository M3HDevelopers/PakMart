import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, DollarSign, TrendingUp, Star, AlertTriangle, Plus, Edit, Eye, Archive, ChevronRight, LayoutDashboard, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function SellerDashboard() {
  const { user, orders, logout } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sellerProducts = products.filter(p => p.sellerId === 's1' || p.sellerId === user?.store?.id).slice(0, 12);
  const sellerOrders = orders.filter(o => o.items.some(i => i.sellerId === 's1'));

  const salesData = [
    { name: 'Mon', sales: 45000 }, { name: 'Tue', sales: 62000 }, { name: 'Wed', sales: 38000 },
    { name: 'Thu', sales: 71000 }, { name: 'Fri', sales: 55000 }, { name: 'Sat', sales: 89000 }, { name: 'Sun', sales: 42000 },
  ];
  const orderStatusData = [
    { name: 'Delivered', value: 145, color: '#15803d' }, { name: 'Processing', value: 23, color: '#a16207' },
    { name: 'Shipped', value: 18, color: '#1d4ed8' }, { name: 'Cancelled', value: 5, color: '#b91c1c' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'finance', label: 'Finance', icon: DollarSign },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="bg-white border border-[var(--color-border)] sticky top-24">
            <div className="p-3 border-b border-[var(--color-border)]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Seller Center</p>
              <p className="text-xs font-medium text-[var(--color-text)] mt-0.5 truncate">{user?.store?.name || 'TechZone Pakistan'}</p>
            </div>
            <nav className="p-1.5">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === tab.id ? 'bg-[#171717] text-[#B7D92B]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'}`}>
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
              <hr className="my-1.5 border-[var(--color-border)]" />
              <Link to="/account" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
                <ChevronRight size={14} /> My Account
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-[var(--color-text)]">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{user?.store?.name || 'TechZone Pakistan'}</p>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex gap-0 overflow-x-auto border-b border-[var(--color-border)] mb-6">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-transparent text-[var(--color-text-muted)]'}`}>
                <tab.icon size={12} /> {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Total Sales', value: 'Rs. 3.4M', icon: DollarSign },
                  { label: 'Total Orders', value: '191', icon: ShoppingCart },
                  { label: 'Products', value: String(sellerProducts.length), icon: Package },
                  { label: 'Rating', value: '4.8/5', icon: Star },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border border-[var(--color-border)] p-4">
                    <stat.icon size={14} className="text-[var(--color-text-muted)] mb-2" />
                    <p className="text-lg font-semibold text-[var(--color-text)]">{stat.value}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-[var(--color-border)] p-4">
                  <h3 className="text-sm font-semibold mb-3">Weekly Sales</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis dataKey="name" fontSize={10} />
                      <YAxis fontSize={10} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                      <Bar dataKey="sales" fill="#c2410c" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border border-[var(--color-border)] p-4">
                  <h3 className="text-sm font-semibold mb-3">Order Status</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-[var(--color-warning)]" />
                  <h3 className="text-xs font-semibold text-[var(--color-text)]">Action Required</h3>
                </div>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1.5">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-warning)]" /> 3 orders need to be shipped</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-danger)]" /> 2 products are running low on stock</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-info)]" /> 1 return request needs your response</li>
                </ul>
              </div>

              {/* Recent Orders */}
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <div className="p-3 border-b border-[var(--color-border)] flex items-center justify-between">
                  <h3 className="text-xs font-semibold">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-[10px] text-[var(--color-accent)] font-medium hover:underline">View All</button>
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2 px-3 font-medium text-[var(--color-text-muted)]">Order</th><th className="text-left py-2 px-3 font-medium text-[var(--color-text-muted)]">Customer</th><th className="text-right py-2 px-3 font-medium text-[var(--color-text-muted)]">Amount</th><th className="text-center py-2 px-3 font-medium text-[var(--color-text-muted)]">Status</th></tr></thead>
                  <tbody>
                    {sellerOrders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="py-2 px-3 font-mono font-medium">{order.orderNumber}</td>
                        <td className="py-2 px-3">{order.customerName}</td>
                        <td className="py-2 px-3 text-right font-medium">Rs. {order.total.toLocaleString()}</td>
                        <td className="py-2 px-3 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-yellow-50 text-[var(--color-warning)] border border-yellow-200 font-medium">{order.status}</span></td>
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
                <p className="text-xs text-[var(--color-text-muted)]">{sellerProducts.length} products</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-medium hover:bg-[var(--color-accent-hover)]"><Plus size={12} /> Add Product</button>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Product</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Price</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Stock</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Sold</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Actions</th></tr></thead>
                  <tbody>
                    {sellerProducts.map(product => (
                      <tr key={product.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2 px-3"><div className="flex items-center gap-2"><img src={product.images[0]} alt="" className="w-8 h-8 object-cover" /><span className="font-medium line-clamp-1">{product.name}</span></div></td>
                        <td className="py-2 px-3 text-right font-medium">Rs. {product.price.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right"><span className={product.stock < 10 ? 'text-[var(--color-danger)] font-medium' : ''}>{product.stock}</span></td>
                        <td className="py-2 px-3 text-right">{product.sold}</td>
                        <td className="py-2 px-3 text-center"><div className="flex items-center justify-center gap-0.5"><button className="p-1 hover:bg-[var(--color-bg-tertiary)]"><Eye size={11} /></button><button className="p-1 hover:bg-[var(--color-bg-tertiary)]"><Edit size={11} /></button><button className="p-1 hover:bg-red-50 text-[var(--color-danger)]"><Archive size={11} /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex gap-1.5 overflow-x-auto">
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                  <button key={status} className="px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] whitespace-nowrap">{status}</button>
                ))}
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Order</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Date</th><th className="text-left py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Customer</th><th className="text-right py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Total</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Status</th><th className="text-center py-2.5 px-3 font-medium text-[var(--color-text-muted)]">Action</th></tr></thead>
                  <tbody>
                    {sellerOrders.map(order => (
                      <tr key={order.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)]">
                        <td className="py-2.5 px-3 font-mono font-medium">{order.orderNumber}</td>
                        <td className="py-2.5 px-3 text-[var(--color-text-muted)]">{order.createdAt}</td>
                        <td className="py-2.5 px-3">{order.customerName}</td>
                        <td className="py-2.5 px-3 text-right font-medium">Rs. {order.total.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-yellow-50 text-[var(--color-warning)] border border-yellow-200 font-medium">{order.status}</span></td>
                        <td className="py-2.5 px-3 text-center"><button className="text-[var(--color-accent)] text-[10px] font-medium hover:underline">Process</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white border border-[var(--color-border)] p-4 text-center"><p className="text-[10px] text-[var(--color-text-muted)] uppercase">Avg. Order Value</p><p className="text-lg font-semibold mt-1">Rs. 17,800</p></div>
                <div className="bg-white border border-[var(--color-border)] p-4 text-center"><p className="text-[10px] text-[var(--color-text-muted)] uppercase">Return Rate</p><p className="text-lg font-semibold mt-1">2.6%</p></div>
                <div className="bg-white border border-[var(--color-border)] p-4 text-center"><p className="text-[10px] text-[var(--color-text-muted)] uppercase">Satisfaction</p><p className="text-lg font-semibold mt-1">95%</p></div>
              </div>
              <div className="bg-white border border-[var(--color-border)] p-4">
                <h3 className="text-sm font-semibold mb-3">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[{ m: 'Jan', r: 450000 }, { m: 'Feb', r: 520000 }, { m: 'Mar', r: 480000 }, { m: 'Apr', r: 610000 }, { m: 'May', r: 580000 }, { m: 'Jun', r: 720000 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="m" fontSize={10} />
                    <YAxis fontSize={10} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Bar dataKey="r" fill="#c2410c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Gross Revenue</p><p className="text-base font-semibold">Rs. 3.4M</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Commission</p><p className="text-base font-semibold text-[var(--color-danger)]">-Rs. 340K</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Pending</p><p className="text-base font-semibold text-[var(--color-warning)]">Rs. 125K</p></div>
                <div className="bg-white border border-[var(--color-border)] p-3"><p className="text-[10px] text-[var(--color-text-muted)]">Available</p><p className="text-base font-semibold text-[var(--color-success)]">Rs. 2.9M</p></div>
              </div>
              <div className="bg-white border border-[var(--color-border)] overflow-hidden">
                <div className="p-3 border-b border-[var(--color-border)]"><h3 className="text-xs font-semibold">Recent Transactions</h3></div>
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"><th className="text-left py-2 px-3 font-medium text-[var(--color-text-muted)]">Date</th><th className="text-left py-2 px-3 font-medium text-[var(--color-text-muted)]">Type</th><th className="text-left py-2 px-3 font-medium text-[var(--color-text-muted)]">Reference</th><th className="text-right py-2 px-3 font-medium text-[var(--color-text-muted)]">Amount</th><th className="text-center py-2 px-3 font-medium text-[var(--color-text-muted)]">Status</th></tr></thead>
                  <tbody>
                    {[{ date: '2024-11-14', type: 'Sale', ref: 'PM-20240003', amount: '+Rs. 349,999', status: 'Completed' }, { date: '2024-11-10', type: 'Sale', ref: 'PM-20240002', amount: '+Rs. 18,999', status: 'Completed' }, { date: '2024-11-05', type: 'Payout', ref: 'PAY-001', amount: 'Rs. 500,000', status: 'Processed' }, { date: '2024-11-01', type: 'Sale', ref: 'PM-20240001', amount: '+Rs. 289,999', status: 'Completed' }].map((t, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="py-2 px-3 text-[var(--color-text-muted)]">{t.date}</td>
                        <td className="py-2 px-3">{t.type}</td>
                        <td className="py-2 px-3 font-mono">{t.ref}</td>
                        <td className={`py-2 px-3 text-right font-medium ${t.amount.startsWith('+') ? 'text-[var(--color-success)]' : ''}`}>{t.amount}</td>
                        <td className="py-2 px-3 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-[var(--color-success)] border border-green-200 font-medium">{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="px-4 py-2 bg-[var(--color-success)] text-white text-xs font-medium hover:opacity-90">Request Payout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
