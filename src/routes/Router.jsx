import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import PaymentSlip from "../pages/PaymentSlip";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBanners from "../pages/admin/AdminBanners";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },

      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-slip",
        element: (
          <PrivateRoute>
            <PaymentSlip />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      { path: "login", element: <Login /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "banners", element: <AdminBanners /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
]);

export default router;