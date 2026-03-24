import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <Navbar></Navbar>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AdminLayout;