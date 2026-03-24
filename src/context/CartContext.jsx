import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ➕ Add to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ➕ Increase quantity
  const increaseQty = (_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ Decrease quantity
  const decreaseQty = (_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ❌ Remove from cart
  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // 💰 Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🧮 Total items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;