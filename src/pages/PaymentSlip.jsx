const PaymentSlip = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders[orders.length - 1];

  if (!order) {
    return <p className="text-center mt-10">No order found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="border p-5 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Payment Slip
        </h2>

        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <hr className="my-3" />

        <h3 className="font-bold mb-2">Customer Info</h3>
        <p>{order.customer.name}</p>
        <p>{order.customer.phone}</p>
        <p>{order.customer.address}</p>

        <hr className="my-3" />

        <h3 className="font-bold mb-2">Items</h3>

        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span>{item.title.slice(0, 25)}</span>
            <span>{item.quantity} × ${item.price}</span>
          </div>
        ))}

        <hr className="my-3" />

        <p className="text-xl font-bold">
          Total: ${order.total.toFixed(2)}
        </p>

      </div>
    </div>
  );
};

export default PaymentSlip;