import apiClient from "./client";

export const getAllProducts = async () => {
  const res = await apiClient.get("/products");
  return res.data.data;
};

export const getSingleProduct = async (id) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data.data;
};

export const createProduct = async (productData) => {
  const res = await apiClient.post("/products", productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await apiClient.patch(`/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await apiClient.delete(`/products/${id}`);
  return res.data;
};
