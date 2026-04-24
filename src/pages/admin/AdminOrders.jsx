import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../api/orders";
import { formatBDT } from "../../utils/currency";

const statusClasses = {
  pending: "bg-amber-500/20 text-amber-300",
  confirmed: "bg-blue-500/20 text-blue-300",
  processing: "bg-indigo-500/20 text-indigo-300",
  shipped: "bg-cyan-500/20 text-cyan-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
  cancelled: "bg-rose-500/20 text-rose-300",
  paid: "bg-emerald-500/20 text-emerald-300",
  failed: "bg-rose-500/20 text-rose-300",
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const orderStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const paymentStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updatePaymentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        orderFilter === "all" || order.orderStatus === orderFilter;
      const search = query.trim().toLowerCase();
      const matchSearch =
        !search ||
        order._id?.toLowerCase().includes(search) ||
        order.userEmail?.toLowerCase().includes(search) ||
        order.shippingInfo?.fullName?.toLowerCase().includes(search);
      return matchStatus && matchSearch;
    });
  }, [orders, query, orderFilter]);

  const summary = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "pending").length,
      delivered: orders.filter((o) => o.orderStatus === "delivered").length,
      cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
    };
  }, [orders]);

  const handleOrderStatusChange = (id, value) => {
    orderStatusMutation.mutate({ id, status: value });
  };

  const handlePaymentStatusChange = (id, value) => {
    paymentStatusMutation.mutate({ id, status: value });
  };

  if (isLoading) {
    return <p className="text-slate-400">Loading orders...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Failed to load orders.</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Orders</h1>
        <p className="text-slate-400 mt-2">
          Search, filter and update order status quickly.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-2xl font-bold text-white">{summary.total}</p>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-amber-300">{summary.pending}</p>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">Delivered</p>
          <p className="text-2xl font-bold text-emerald-300">
            {summary.delivered}
          </p>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">Cancelled</p>
          <p className="text-2xl font-bold text-rose-300">{summary.cancelled}</p>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 grid md:grid-cols-[1fr_220px] gap-4">
        <input
          type="text"
          placeholder="Search by order id, email or customer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
        />
        <select
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <p className="text-xs text-slate-400">Order ID: {order._id}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs capitalize ${
                      statusClasses[order.orderStatus] || "bg-slate-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs capitalize ${
                      statusClasses[order.paymentStatus] || "bg-slate-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <h2 className="text-sm font-semibold text-white mb-2">
                    Customer
                  </h2>
                  <p className="text-slate-200">{order.shippingInfo?.fullName}</p>
                  <p className="text-slate-400 text-sm">{order.userEmail}</p>
                  <p className="text-slate-400 text-sm mt-1">
                    {order.shippingInfo?.phone}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    {order.shippingInfo?.address}, {order.shippingInfo?.city}
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-white mb-2">Items</h2>
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm gap-3">
                        <p className="text-slate-300 line-clamp-1">
                          {item.title} x {item.quantity}
                        </p>
                        <p className="text-slate-200">
                          {formatBDT(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Total Amount</p>
                  <p className="text-2xl font-bold text-violet-300 mb-3">
                    {formatBDT(order.totalAmount)}
                  </p>

                  <div className="space-y-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleOrderStatusChange(order._id, e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(order._id, e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  <p className="text-xs text-slate-500 mt-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
