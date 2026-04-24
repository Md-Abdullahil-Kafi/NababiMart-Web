import apiClient from "./client";

export const getAllBanners = async () => {
  const res = await apiClient.get("/banners");
  return res.data.data;
};

export const createBanner = async (bannerData) => {
  const res = await apiClient.post("/banners", bannerData);
  return res.data;
};

export const updateBanner = async (id, bannerData) => {
  const res = await apiClient.patch(`/banners/${id}`, bannerData);
  return res.data;
};

export const deleteBanner = async (id) => {
  const res = await apiClient.delete(`/banners/${id}`);
  return res.data;
};
