import { useEffect, useState } from "react";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userEmail}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => updateStatus(order.id, "confirmed")}
                  className="btn btn-xs btn-primary"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(order.id, "shipped")}
                  className="btn btn-xs btn-success"
                >
                  Ship
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;   