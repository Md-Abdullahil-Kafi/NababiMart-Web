import axios from "axios";

const BASE_URL = "https://nababimart.vercel.app/api";

export const createOrder = async (orderData) => {
  const res = await axios.post(`${BASE_URL}/orders`, orderData);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders`);
  return res.data.data;
};

export const getUserOrders = async (email) => {
  const res = await axios.get(`${BASE_URL}/orders/user/${email}`);
  return res.data.data;
};

export const cancelOrder = async (id, userEmail) => {
  const res = await axios.patch(`${BASE_URL}/orders/${id}/cancel`, {
    userEmail,
  });
  return res.data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const res = await axios.patch(`${BASE_URL}/orders/${id}/status`, {
    orderStatus,
  });
  return res.data;
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  const res = await axios.patch(`${BASE_URL}/orders/${id}/payment-status`, {
    paymentStatus,
  });
  return res.data;
};