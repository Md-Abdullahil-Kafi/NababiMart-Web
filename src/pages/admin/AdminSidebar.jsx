import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaImage,
  FaBoxes,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";

const links = [
  { name: "Dashboard", path: "/admin", icon: FaChartPie },
  { name: "Banners", path: "/admin/banners", icon: FaImage },
  { name: "Products", path: "/admin/products", icon: FaBoxes },
  { name: "Orders", path: "/admin/orders", icon: FaClipboardList },
];

const AdminSidebar = () => {
  return (
    <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Admin Control</h2>
        <p className="text-slate-400 text-sm mt-2">
          Manage products, banners and customer orders.
        </p>
      </div>

      <nav className="space-y-2 mb-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon className="text-sm" />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition"
      >
        <FaHome className="text-sm" />
        <span>Back To Store</span>
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;
