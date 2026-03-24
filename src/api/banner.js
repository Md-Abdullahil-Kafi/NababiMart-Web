import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAllBanners = async () => {
  const res = await axios.get(`${BASE_URL}/banners`);
  return res.data.data; // 🔥 only array return
};

export const createBanner = async (bannerData) => {
  const res = await axios.post(`${BASE_URL}/banners`, bannerData);
  return res.data;
};

export const updateBanner = async (id, bannerData) => {
  const res = await axios.patch(`${BASE_URL}/banners/${id}`, bannerData);
  return res.data;
};

export const deleteBanner = async (id) => {
  const res = await axios.delete(`${BASE_URL}/banners/${id}`);
  return res.data;
};