import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.data;
};

export const getSingleProduct = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(`${BASE_URL}/products`, productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.patch(`${BASE_URL}/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`);
  return res.data;
};