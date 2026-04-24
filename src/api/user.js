import apiClient from "./client";

export const saveUser = async (userData) => {
  const res = await apiClient.post("/users", userData);
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await apiClient.get(`/users/${email}`);
  return res.data;
};
