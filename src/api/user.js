import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const saveUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users`, userData);
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await axios.get(`${BASE_URL}/users/${email}`);
  return res.data;
};