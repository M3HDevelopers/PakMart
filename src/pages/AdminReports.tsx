import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, DollarSign, Package, Users, Store, ArrowLeft, Download, Calendar, Filter, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const COLORS = ['#c2410c', '#1d4ed8', '#15803d', '#a16207', '#7c3aed', '#b91c1c'];

const monthlyRevenue = [
  { month: 'Jul', gmv: 3200000, commission: 320000, net: 2880000 },
  { month: 'Aug', gmv: 3800000, commission: 380000, net: 3420000 },
  { month: 'Sep', gmv: 4100000, commission: 410000, net: 3690000 },
  { month: 'Oct', gmv: 3900000, commission: 390000, net: 3510000 },
  { month: 'Nov', gmv: 4500000, commission: 450000, net: 4050000 },
  { month: 'Dec', gmv: 5200000, commission: 520000, net: 4680000 },
];

const categorySales = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 25 },
  { name: 'Home', value: 15 },
  { name: 'Beauty', value: 12 },
  { name: 'Sports', value: 8 },
  { name: 'Other', value: 5 },
];

const sellerPerformance = [
  { name: 'TechZone PK', orders: 342, revenue: 2890000, rating: 4.8, cancellations: 3.2 },
  { name: 'Fashion Hub', orders: 289, revenue: 1650000, rating: 4.6, cancellations: 4.1 },
  { name: 'Home Essentials', orders: 198, revenue: 980000, rating: 4.5, cancellations: 2.8 },
  { name: 'Beauty Palace', orders: 176, revenue: 720000, rating: 4.7, cancellations: 1.9 },
  { name: 'Sports World', orders: 145, revenue: 540000, rating: 4.4, cancellations: 5.2 },
];

const paymentMethods = [
  { name: 'Cash on Delivery', value: 45 },
  { name: 'Credit/Debit Card', value: 28 },
  { name: 'JazzCash', value: 15 },
  { name: 'EasyPaisa', value: 8 },
  { name: 'Bank Transfer', value: 4 },
];

const deliveryRegions = [
  { region: 'Punjab', orders: 4520, percentage: 42 },
  { region: 'Sindh', orders: 2890, percentage: 27 },
  { region: 'KPK', orders: 1340, percentage: 12 },
  { region: 'Islamabad', orders: 1120, percentage: 10 },
  { region: 'Balochistan', orders: 540, percentage: 5 },
  { region: 'Other', orders: 430, percentage: 4 },
];

const operationalMetrics = [
  { metric: 'Avg. Fulfillment Time', value: '1.8 days', change: -12, unit: 'days' },
  { metric: 'Delivery Success Rate', value: '94.2%', change: 2.1, unit: '%' },
  { metric: 'Return Rate', value: '3.8%', change: -0.5, unit: '%' },
  { metric: 'Cancellation Rate', value: '4.2%', change: -1.1, unit: '%' },
  { metric: 'Avg. Support Response', value: '2.4 hrs', change: -18, unit: 'hrs' },
  { metric: 'Failed Delivery Rate', value: '5.8%', change: -0.8, unit: '%' },
];

export function AdminReports() {
  const [activeReport, setActiveReport] = useState('sales');
  const [dateRange, setDateRange] = useState('30d');

  const reports = [
    { id: 'sales', label: 'Sales', icon: BarChart3 },
    { id: 'operational', label: 'Operational', icon: Package },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'sellers', label: 'Sellers', icon: Store },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
            <Link to="/admin" className="hover:text-[var(--color-accent)]">Admin</Link>
            <ChevronRight size={12} />
            <span>Reports</span>
          </div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">Reports & Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-3 py-2 border border-[var(--color-border)] text-sm outline-none focus:border-[var(--color-accent)]">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-bg-tertiary)] transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex gap-0 border-b border-[var(--color-border)] mb-6">
        {reports.map(report => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeReport === report.id ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
          >
            <report.icon size={16} />
            {report.label}
          </button>
        ))}
      </div>

      {/* Sales Report */}
      {activeReport === 'sales' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Gross Merchandise Value</p>
              <p className="text-2xl font-semibold mt-1">Rs. 24.7M</p>
              <p className="text-xs text-[var(--color-success)] mt-1">+18% vs previous period</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Net Sales</p>
              <p className="text-2xl font-semibold mt-1">Rs. 22.1M</p>
              <p className="text-xs text-[var(--color-success)] mt-1">+15% vs previous period</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Total Orders</p>
              <p className="text-2xl font-semibold mt-1">10,840</p>
              <p className="text-xs text-[var(--color-success)] mt-1">+22% vs previous period</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Avg. Order Value</p>
              <p className="text-2xl font-semibold mt-1">Rs. 2,278</p>
              <p className="text-xs text-[var(--color-danger)] mt-1">-3% vs previous period</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">GMV vs Net Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="gmv" stroke="#c2410c" fill="#fff7ed" name="GMV" />
                <Area type="monotone" dataKey="net" stroke="#15803d" fill="#f0fdf4" name="Net Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category & Payment */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[var(--color-border)] p-4">
              <h3 className="font-semibold text-[var(--color-text)] mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categorySales} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                    {categorySales.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <h3 className="font-semibold text-[var(--color-text)] mb-4">Payment Methods</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={paymentMethods} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${value}%`}>
                    {paymentMethods.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1">
                {paymentMethods.map((pm, i) => (
                  <div key={pm.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[var(--color-text-secondary)]">{pm.name}</span>
                    <span className="ml-auto font-medium">{pm.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Regions */}
          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold text-[var(--color-text)] mb-4">Sales by Delivery Region</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Region</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Orders</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Share</th>
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)] w-1/3">Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryRegions.map(r => (
                    <tr key={r.region} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-2.5 font-medium">{r.region}</td>
                      <td className="py-2.5 text-right">{r.orders.toLocaleString()}</td>
                      <td className="py-2.5 text-right">{r.percentage}%</td>
                      <td className="py-2.5">
                        <div className="w-full bg-[var(--color-bg-tertiary)] h-2">
                          <div className="h-2 bg-[var(--color-accent)]" style={{ width: `${r.percentage * 2.5}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Operational Report */}
      {activeReport === 'operational' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {operationalMetrics.map(m => (
              <div key={m.metric} className="bg-white border border-[var(--color-border)] p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">{m.metric}</p>
                <p className="text-2xl font-semibold mt-1">{m.value}</p>
                <p className={`text-xs mt-1 ${m.change < 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                  {m.change > 0 ? '+' : ''}{m.change}% vs previous
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Pending Orders & Fulfillment</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Status</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Count</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">% of Total</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Avg. Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { status: 'Pending', count: 234, time: '-' },
                    { status: 'Confirmed', count: 156, time: '0.5 hrs' },
                    { status: 'Processing', count: 89, time: '4.2 hrs' },
                    { status: 'Packed', count: 67, time: '8.1 hrs' },
                    { status: 'Shipped', count: 312, time: '1.2 days' },
                    { status: 'Out for Delivery', count: 145, time: '0.3 days' },
                    { status: 'Delivered', count: 9837, time: '2.1 days' },
                  ].map(row => (
                    <tr key={row.status} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-2.5 font-medium">{row.status}</td>
                      <td className="py-2.5 text-right">{row.count.toLocaleString()}</td>
                      <td className="py-2.5 text-right">{((row.count / 10840) * 100).toFixed(1)}%</td>
                      <td className="py-2.5 text-right text-[var(--color-text-muted)]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Low Stock Alerts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Product</th>
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Seller</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Current Stock</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Threshold</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Daily Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: 'Samsung Galaxy S24', seller: 'TechZone PK', stock: 3, threshold: 10, daily: 5 },
                    { product: 'Nike Air Max 270', seller: 'Fashion Hub', stock: 7, threshold: 15, daily: 8 },
                    { product: 'Sony WH-1000XM5', seller: 'Gadget Store', stock: 2, threshold: 5, daily: 3 },
                    { product: 'Philips Air Fryer', seller: 'Home Essentials', stock: 5, threshold: 10, daily: 4 },
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-2.5 font-medium">{item.product}</td>
                      <td className="py-2.5 text-[var(--color-text-secondary)]">{item.seller}</td>
                      <td className="py-2.5 text-right font-medium text-[var(--color-danger)]">{item.stock}</td>
                      <td className="py-2.5 text-right text-[var(--color-text-muted)]">{item.threshold}</td>
                      <td className="py-2.5 text-right">{item.daily}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Financial Report */}
      {activeReport === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Platform Commission</p>
              <p className="text-2xl font-semibold mt-1">Rs. 2.47M</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">10% avg. rate</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Seller Earnings</p>
              <p className="text-2xl font-semibold mt-1">Rs. 19.6M</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">After commission</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Pending Payouts</p>
              <p className="text-2xl font-semibold mt-1 text-[var(--color-warning)]">Rs. 1.2M</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">23 sellers</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Refund Liabilities</p>
              <p className="text-2xl font-semibold mt-1 text-[var(--color-danger)]">Rs. 340K</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">1.5% of GMV</p>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Commission vs Payouts (Monthly)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                <Bar dataKey="commission" fill="#c2410c" name="Commission" />
                <Bar dataKey="net" fill="#15803d" name="Seller Payout" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Settlement Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Item</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Amount</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">% of GMV</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'Gross Merchandise Value', amount: 24700000, pct: '100%' },
                    { item: 'Platform Commission (10%)', amount: -2470000, pct: '10%' },
                    { item: 'Payment Gateway Fees', amount: -247000, pct: '1%' },
                    { item: 'Refunds Processed', amount: -340000, pct: '1.5%' },
                    { item: 'Shipping Deductions', amount: -180000, pct: '0.7%' },
                    { item: 'Net Seller Earnings', amount: 21463000, pct: '86.9%' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-[var(--color-border)] last:border-0 ${i === 0 || i === 5 ? 'font-semibold' : ''}`}>
                      <td className="py-2.5">{row.item}</td>
                      <td className={`py-2.5 text-right ${row.amount < 0 ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'}`}>
                        {row.amount < 0 ? '-' : ''}Rs. {Math.abs(row.amount).toLocaleString()}
                      </td>
                      <td className="py-2.5 text-right text-[var(--color-text-muted)]">{row.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sellers Report */}
      {activeReport === 'sellers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Active Sellers</p>
              <p className="text-2xl font-semibold mt-1">1,245</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Pending Approval</p>
              <p className="text-2xl font-semibold mt-1 text-[var(--color-warning)]">23</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Suspended</p>
              <p className="text-2xl font-semibold mt-1 text-[var(--color-danger)]">12</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">New This Month</p>
              <p className="text-2xl font-semibold mt-1">48</p>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Top Performing Sellers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">Seller</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Orders</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Revenue</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Rating</th>
                    <th className="text-right py-2 font-medium text-[var(--color-text-muted)]">Cancel Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerPerformance.map(s => (
                    <tr key={s.name} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-2.5 font-medium">{s.name}</td>
                      <td className="py-2.5 text-right">{s.orders}</td>
                      <td className="py-2.5 text-right">Rs. {(s.revenue / 1000).toFixed(0)}K</td>
                      <td className="py-2.5 text-right">{s.rating}</td>
                      <td className="py-2.5 text-right">
                        <span className={s.cancellations > 4 ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-secondary)]'}>
                          {s.cancellations}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Report */}
      {activeReport === 'customers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Total Customers</p>
              <p className="text-2xl font-semibold mt-1">24,521</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Active (30d)</p>
              <p className="text-2xl font-semibold mt-1">8,432</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">New Registrations</p>
              <p className="text-2xl font-semibold mt-1">1,245</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Repeat Rate</p>
              <p className="text-2xl font-semibold mt-1">34%</p>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-4">
            <h3 className="font-semibold mb-4">Customer Acquisition Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue.map((m, i) => ({ ...m, customers: 1800 + i * 200 + Math.floor(Math.random() * 300) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#1d4ed8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
