import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { getUserOrders } from "../api/orders";
import Loader from "../components/Loader";
import { formatBDT } from "../utils/currency";

const PaymentSlip = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => getUserOrders(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  const order = orders[0];

  if (!order) {
    return <p className="text-center mt-10">No order found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="border p-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Slip</h2>

        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment:</strong> {order.paymentStatus}</p>

        <hr className="my-3" />

        <h3 className="font-bold mb-2">Customer Info</h3>
        <p>{order.shippingInfo?.fullName}</p>
        <p>{order.shippingInfo?.phone}</p>
        <p>{order.shippingInfo?.address}</p>

        <hr className="my-3" />

        <h3 className="font-bold mb-2">Items</h3>
        {order.items?.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm mb-1">
            <span>{item.title?.slice(0, 25)}</span>
            <span>{item.quantity} x {formatBDT(item.price)}</span>
          </div>
        ))}

        <hr className="my-3" />

        <p className="text-xl font-bold">Total: {formatBDT(order.totalAmount)}</p>
      </div>
    </div>
  );
};

export default PaymentSlip;
