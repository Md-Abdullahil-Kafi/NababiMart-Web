import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "Banners", path: "/admin/banners" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
];

const AdminSidebar = () => {
  return (
    <aside className="min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <p className="text-slate-400 text-sm mt-2">
          Manage your website content
        </p>
      </div>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;