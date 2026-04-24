import { useContext } from "react";
import { CartContext } from "./cart-context-object";

export const useCart = () => useContext(CartContext);
