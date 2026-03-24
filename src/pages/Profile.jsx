import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const myOrders = orders.filter(
    (order) => order.userEmail === user?.email
  );

  return (
    <div className="max-w-5xl mx-auto p-5">

      <h2 className="text-2xl font-bold mb-5">My Profile</h2>

      {/* User Info */}
      <div className="card bg-base-100 shadow p-5 mb-6">
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      {/* Orders */}
      <h3 className="text-xl font-bold mb-3">Order History</h3>

      {myOrders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-3">
          {myOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;