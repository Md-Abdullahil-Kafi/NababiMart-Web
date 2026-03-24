import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import QueryProvider from "./providers/QueryProvider";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);