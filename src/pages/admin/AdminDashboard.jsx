import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/products";
import { getAllBanners } from "../../api/banner";
import { getAllOrders } from "../../api/orders";
import { formatBDT } from "../../utils/currency";

const StatCard = ({ title, value, hint }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
    <p className="text-slate-400 text-sm">{title}</p>
    <p className="text-3xl font-bold mt-2 text-white">{value}</p>
    <p className="text-xs text-slate-500 mt-2">{hint}</p>
  </div>
);

const AdminDashboard = () => {
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { data: banners = [], isLoading: bannersLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const loading = productsLoading || bannersLoading || ordersLoading;

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (Number(order.totalAmount) || 0),
      0
    );
    const pendingOrders = orders.filter(
      (item) => item.orderStatus === "pending"
    ).length;
    const paidOrders = orders.filter(
      (item) => item.paymentStatus === "paid"
    ).length;

    return [
      {
        title: "Total Products",
        value: products.length,
        hint: "Live products in catalog",
      },
      {
        title: "Active Banners",
        value: banners.filter((item) => item.isActive).length,
        hint: "Currently shown in hero slider",
      },
      {
        title: "Pending Orders",
        value: pendingOrders,
        hint: "Need confirmation/processing",
      },
      {
        title: "Paid Orders",
        value: paidOrders,
        hint: "Payment already completed",
      },
      {
        title: "Total Revenue",
        value: formatBDT(totalRevenue),
        hint: "Calculated from all orders",
      },
    ];
  }, [products, banners, orders]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">
          One quick view to track your store health.
        </p>
      </div>

      {loading ? (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-slate-400">
          Loading dashboard data...
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {stats.map((item) => (
              <StatCard key={item.title} {...item} />
            ))}
          </div>

          <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Orders
            </h2>
            {recentOrders.length === 0 ? (
              <p className="text-slate-400">No recent orders found.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {order.shippingInfo?.fullName || "Customer"}
                      </p>
                      <p className="text-xs text-slate-400">{order.userEmail}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 capitalize">
                        {order.orderStatus}
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-violet-600/20 text-violet-300 capitalize">
                        {order.paymentStatus}
                      </span>
                      <span className="text-slate-200 font-semibold">
                        {formatBDT(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
