import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../api/orders";

const AdminOrders = () => {
  const queryClient = useQueryClient();

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
          Review, confirm, and manage customer orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Customer Info
                  </h2>
                  <p className="text-slate-300">
                    {order.shippingInfo?.fullName}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {order.userEmail}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {order.shippingInfo?.phone}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    {order.shippingInfo?.address}, {order.shippingInfo?.city}
                  </p>
                  {order.shippingInfo?.notes && (
                    <p className="text-slate-500 text-sm mt-2">
                      Note: {order.shippingInfo.notes}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Order Items
                  </h2>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 border-b border-slate-800 pb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg bg-slate-950"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">{item.title}</p>
                          <p className="text-slate-400 text-xs">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-slate-300 text-sm">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Status Control
                  </h2>

                  <p className="text-slate-400 text-sm mb-2">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-violet-400 mb-4">
                    ${order.totalAmount}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Order Status
                      </label>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleOrderStatusChange(order._id, e.target.value)
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Payment Status
                      </label>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          handlePaymentStatusChange(order._id, e.target.value)
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-500 pt-2">
                      <p>
                        Created:{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      {order.cancelledBy && (
                        <p className="mt-1">
                          Cancelled by: {order.cancelledBy}
                        </p>
                      )}
                    </div>
                  </div>
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