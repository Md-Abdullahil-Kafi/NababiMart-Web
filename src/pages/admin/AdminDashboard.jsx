import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  // 🔹 Products
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data.data;
    },
  });

  // 🔹 Banners
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/banners`);
      return res.data.data;
    },
  });

  // 🔥 Dynamic stats
  const stats = [
    {
      title: "Total Products",
      value: products.length,
    },
    {
      title: "Active Banners",
      value: banners.filter((item) => item.isActive).length,
    },
    {
      title: "Total Orders",
      value: 0, // later connect
    },
    {
      title: "Total Users",
      value: 0, // later connect
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">
          Quick summary of your store activity
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            <p className="text-slate-400 text-sm mb-2">{item.title}</p>
            <h3 className="text-3xl font-bold text-white">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;