import React, { useState } from 'react';
import {
  Search,
  User,
  Phone,
  MapPin,
  ShoppingBag,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Customer } from '../../types';

export const AdminCustomers: React.FC = () => {
  const { customers, orders, toggleCustomerStatus } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
            Customer Directory ({customers.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            View customer details, spending history, orders, and account status
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers by name, phone or address..."
            className="w-full bg-slate-950 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Delivery Address</th>
                <th className="p-3">Total Orders</th>
                <th className="p-3">Total Spent</th>
                <th className="p-3">Last Order</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-500 font-medium">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(cust => (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xs">
                        {cust.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{cust.name}</span>
                    </td>

                    <td className="p-3 font-mono font-black text-cyan-400">
                      {cust.phone}
                    </td>

                    <td className="p-3 text-slate-300 max-w-xs truncate font-medium">
                      {cust.address}
                    </td>

                    <td className="p-3 font-black text-slate-200">
                      {cust.totalOrders} order{cust.totalOrders > 1 ? 's' : ''}
                    </td>

                    <td className="p-3 font-mono font-black text-white">
                      ৳{cust.totalSpent.toLocaleString()}
                    </td>

                    <td className="p-3 text-slate-400 text-[11px] font-medium">
                      {cust.lastOrderDate}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => toggleCustomerStatus(cust.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border transition-colors ${
                          cust.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {cust.status}
                      </button>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                        title="View Customer Orders"
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

      {/* Customer Detail & Orders History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    {selectedCustomer.phone}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Delivery Address:</span>
                <span className="font-bold text-white max-w-[65%] text-right truncate">
                  {selectedCustomer.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Total Lifetime Orders:</span>
                <span className="font-black text-cyan-400">{selectedCustomer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Total Revenue:</span>
                <span className="font-mono font-black text-white">
                  ৳{selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Orders History List */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Order History for this Customer
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {orders
                  .filter(o => o.phone === selectedCustomer.phone)
                  .map(ord => (
                    <div
                      key={ord.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-mono font-black text-cyan-400">{ord.orderNumber}</div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} item(s)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-black text-white">
                          ৳{ord.total.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-black">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs tracking-tight transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
