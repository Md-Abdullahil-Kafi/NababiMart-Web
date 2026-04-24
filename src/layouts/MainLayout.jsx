import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialFab from "../components/SocialFab";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
      <SocialFab />
    </div>
  );
};

export default MainLayout;
