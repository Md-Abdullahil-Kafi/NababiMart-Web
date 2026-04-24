import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { cancelOrder, getUserOrders } from "../api/orders";
import Loader from "../components/Loader";
import { formatBDT } from "../utils/currency";

const statusStyles = {
  pending: "bg-amber-500/20 text-amber-300",
  confirmed: "bg-blue-500/20 text-blue-300",
  processing: "bg-indigo-500/20 text-indigo-300",
  shipped: "bg-cyan-500/20 text-cyan-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
  cancelled: "bg-rose-500/20 text-rose-300",
  paid: "bg-emerald-500/20 text-emerald-300",
  failed: "bg-rose-500/20 text-rose-300",
};

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "Not available";

  const {
    data: myOrders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => getUserOrders(user.email),
    enabled: !!user?.email,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", user?.email] });
    },
  });

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return myOrders;
    return myOrders.filter((order) => order.orderStatus === statusFilter);
  }, [myOrders, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: myOrders.length,
      pending: myOrders.filter((order) => order.orderStatus === "pending").length,
      delivered: myOrders.filter((order) => order.orderStatus === "delivered")
        .length,
      totalSpend: myOrders.reduce(
        (sum, order) => sum + (Number(order.totalAmount) || 0),
        0
      ),
    };
  }, [myOrders]);

  if (isLoading) return <Loader />;

  return (
    <section className="min-h-screen bg-slate-950 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  {user?.displayName || "NababiMart Customer"}
                </h1>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Member since {memberSince}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Total Orders</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Pending</p>
            <p className="text-2xl font-bold text-amber-300">{summary.pending}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Delivered</p>
            <p className="text-2xl font-bold text-emerald-300">{summary.delivered}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Total Spend</p>
            <p className="text-2xl font-bold text-violet-300">
              {formatBDT(summary.totalSpend)}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-semibold">Order History</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {isError ? (
            <p className="text-red-400">Failed to load orders.</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-slate-400">No orders found for this filter.</p>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="text-xs text-slate-400">Order ID: {order._id}</p>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs capitalize ${
                          statusStyles[order.orderStatus] || "bg-slate-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs capitalize ${
                          statusStyles[order.paymentStatus] || "bg-slate-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-300 mb-2">
                        {order.items?.length || 0} items in this order
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-2xl font-bold text-violet-300">
                        {formatBDT(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {order.orderStatus === "pending" && (
                    <button
                      type="button"
                      className="btn btn-sm btn-error mt-4"
                      onClick={() => cancelMutation.mutate(order._id)}
                      disabled={cancelMutation.isPending}
                    >
                      {cancelMutation.isPending ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
