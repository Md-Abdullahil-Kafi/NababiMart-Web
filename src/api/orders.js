import apiClient from "./client";

export const createOrder = async (orderData) => {
  const res = await apiClient.post("/orders", orderData);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await apiClient.get("/orders");
  return res.data.data;
};

export const getUserOrders = async (email) => {
  const res = await apiClient.get(`/orders/user/${email}`);
  return res.data.data;
};

export const cancelOrder = async (id) => {
  const res = await apiClient.patch(`/orders/${id}/cancel`);
  return res.data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const res = await apiClient.patch(`/orders/${id}/status`, {
    orderStatus,
  });
  return res.data;
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  const res = await apiClient.patch(`/orders/${id}/payment-status`, {
    paymentStatus,
  });
  return res.data;
};
