import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orders";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "cash_on_delivery",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        userId: user.uid,
        userEmail: user.email,
        items: cart.map((item) => ({
          productId: item._id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingInfo: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          notes: form.notes,
        },
        totalAmount: totalPrice,
        paymentMethod: form.paymentMethod,
      };

      const res = await createOrder(orderPayload);

      if (res?.success) {
        clearCart();
        navigate("/profile");
      } else {
        setError("Failed to place order.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
              required
            />

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={handleChange}
              className="w-full min-h-28 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
            />

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
            >
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="online_payment">Online Payment</option>
            </select>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-slate-400">No items in cart.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b border-slate-800 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-950"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-slate-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-lg text-slate-300">Total</span>
            <span className="text-2xl font-bold text-violet-400">
              ${totalPrice}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;