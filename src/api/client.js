import axios from "axios";
import { auth } from "../firebase/firebase.config";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://nababimart.vercel.app/api",
});

apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
