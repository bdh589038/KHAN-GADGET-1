import React from 'react';
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

export const AdminOverview: React.FC = () => {
  const {
    orders,
    products,
    customers,
    setActiveAdminTab,
    updateOrderStatus
  } = useStore();

  // Statistics calculation
  const totalOrders = orders.length;

  const todayStr = new Date().toDateString();
  const todayOrders = orders.filter(
    o => new Date(o.createdAt).toDateString() === todayStr
  ).length;

  const totalSales = orders.reduce((sum, o) => {
    // Count all except cancelled orders
    return o.status !== 'Cancelled' ? sum + o.total : sum;
  }, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalCustomersCount = customers.length;
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Confirmed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Processing':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Shipped':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Overview Stat Cards Grid (8 Required Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Total Orders */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Total Orders</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {totalOrders}
            </div>
            <span className="text-[11px] text-cyan-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Lifetime orders</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* 2. Today's Orders */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Today's Orders</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {todayOrders}
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" />
              <span>Active today</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* 3. Total Sales */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Total Sales</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight truncate">
              ৳{totalSales.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span>Gross revenue</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <span className="text-xl font-black">৳</span>
          </div>
        </div>

        {/* 4. Pending Orders */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Pending Orders</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display tracking-tight">
              {pendingOrders}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Needs confirmation</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* 5. Delivered Orders */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Delivered Orders</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display tracking-tight">
              {deliveredOrders}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Fulfilled orders</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* 6. Total Customers */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Total Customers</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {totalCustomersCount}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Verified buyers</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* 7. Total Products */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Total Products</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {totalProductsCount}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">In catalog</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* 8. Low Stock Alert */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">Low Stock Alert</span>
            <div className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${lowStockProducts.length > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {lowStockProducts.length}
            </div>
            <span className="text-[11px] text-rose-400 flex items-center gap-1 font-bold">
              <AlertTriangle className="w-3 h-3" />
              <span>≤ 5 units left</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-rose-200">
                Action Required: {lowStockProducts.length} Product(s) Running Low on Stock
              </h4>
              <p className="text-[11px] text-rose-300/80 font-medium">
                {lowStockProducts.map(p => `${p.title} (${p.stock} left)`).join(' • ')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('products')}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500 text-slate-950 font-black text-xs hover:bg-rose-400 transition-colors shrink-0"
          >
            Manage Inventory
          </button>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Latest incoming orders placed via website checkout
            </p>
          </div>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-black flex items-center gap-1 tracking-tight"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-black text-cyan-400">
                    {order.orderNumber}
                  </td>
                  <td className="p-3 font-bold text-slate-200">
                    {order.customerName}
                  </td>
                  <td className="p-3 font-mono font-medium text-slate-400">
                    {order.phone}
                  </td>
                  <td className="p-3 text-slate-300 font-medium">
                    {order.items.map(i => `${i.productTitle} (${i.quantity})`).join(', ')}
                  </td>
                  <td className="p-3 font-black text-white font-mono">
                    ৳{order.total.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={e =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-slate-950 text-slate-200 text-[11px] font-medium rounded-lg border border-slate-700 px-2 py-1 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
