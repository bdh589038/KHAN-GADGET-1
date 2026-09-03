import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Calendar,
  Phone,
  MapPin,
  Truck,
  CheckCircle2,
  X,
  Printer
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = orders.filter(ord => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
            Order Management ({orders.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Track customer orders, delivery status & fulfillments
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Order ID, customer name, phone number..."
            className="w-full bg-slate-950 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-slate-950 text-slate-200 text-xs font-bold rounded-xl border border-slate-800 px-3.5 py-2.5 focus:border-cyan-500 focus:outline-none"
        >
          <option value="All">All Statuses ({orders.length})</option>
          {statuses.map(s => (
            <option key={s} value={s}>
              {s} ({orders.filter(o => o.status === s).length})
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Contact & Address</th>
                <th className="p-3">Products</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status Changer</th>
                <th className="p-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-slate-500 font-medium">
                    No orders matching the specified filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Order ID */}
                    <td className="p-3 font-mono font-black text-cyan-400 whitespace-nowrap">
                      {order.orderNumber}
                    </td>

                    {/* Customer */}
                    <td className="p-3 font-bold text-slate-100">
                      {order.customerName}
                    </td>

                    {/* Phone & Address */}
                    <td className="p-3 max-w-xs">
                      <div className="font-mono font-medium text-slate-300">{order.phone}</div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                        {order.address}
                      </div>
                    </td>

                    {/* Products List */}
                    <td className="p-3 text-slate-300 max-w-xs truncate font-medium">
                      {order.items.map(i => `${i.productTitle} × ${i.quantity}`).join(', ')}
                    </td>

                    {/* Total */}
                    <td className="p-3 font-black text-white font-mono whitespace-nowrap">
                      ৳{order.total.toLocaleString()}
                    </td>

                    {/* Payment Method */}
                    <td className="p-3 uppercase font-black text-[10px] text-orange-400 tracking-wider">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                    </td>

                    {/* Date */}
                    <td className="p-3 text-slate-400 text-[11px] whitespace-nowrap font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status Changer dropdown */}
                    <td className="p-3 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={e =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-xs font-black rounded-xl border px-2.5 py-1.5 focus:outline-none ${getStatusBadge(
                          order.status
                        )} bg-slate-950`}
                      >
                        {statuses.map(st => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Details View Action */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                        title="View Full Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black font-mono">
                  Order Details
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Delivery Card */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Customer:</span>
                <div className="font-bold text-white text-sm">{selectedOrder.customerName}</div>
                <div className="text-slate-400 font-mono">{selectedOrder.phone}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Shipping Zone:</span>
                <div className="font-bold text-cyan-400">
                  {selectedOrder.shippingZone === 'inside_dhaka'
                    ? 'Inside Dhaka (৳70)'
                    : 'Outside Dhaka (৳130)'}
                </div>
                <div className="text-slate-300 font-medium line-clamp-2">{selectedOrder.address}</div>
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Purchased Products
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {selectedOrder.items.map(item => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-none"
                  >
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="w-10 h-10 rounded-xl object-cover bg-slate-900"
                      />
                      <div className="truncate">
                        <div className="font-bold text-slate-200 truncate">
                          {item.productTitle}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {item.quantity} × ৳{item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-white font-mono">
                      ৳{item.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-white">
                  ৳{selectedOrder.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Delivery Charge:</span>
                <span className="font-mono font-bold text-white">
                  ৳{selectedOrder.shippingCost.toLocaleString()}
                </span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount ({selectedOrder.couponCode}):</span>
                  <span className="font-mono font-bold">-৳{selectedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                <span>Total Amount:</span>
                <span className="text-cyan-400 font-display font-black text-base">
                  ৳{selectedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status Control in Modal */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs flex items-center gap-2">
                <span className="text-slate-400 font-black uppercase text-[11px] tracking-wider">Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={e => {
                    const newSt = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, status: newSt });
                  }}
                  className="bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-700 px-3 py-1.5 font-bold focus:border-cyan-500 focus:outline-none"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs tracking-tight transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
