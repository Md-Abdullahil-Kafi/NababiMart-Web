import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <div className="lg:sticky lg:top-24 self-start">
            <AdminSidebar />
          </div>

          <main className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
