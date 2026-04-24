import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
import { formatBDT } from "../utils/currency";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return <p className="text-center mt-10">Cart is empty 🛒</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

      <div className="grid md:grid-cols-3 gap-5">

        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold">
                    {formatBDT(item.price)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="btn btn-xs"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="btn btn-xs"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-5 h-fit">
          <h3 className="text-lg font-bold mb-3">Summary</h3>

          <p className="mb-2">
            Total Items: {cart.length}
          </p>

          <p className="text-xl font-bold mb-4">
            Total: {formatBDT(totalPrice)}
          </p>

          <Link to="/checkout">
            <button className="btn btn-primary w-full">
              Buy Now
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Cart;
