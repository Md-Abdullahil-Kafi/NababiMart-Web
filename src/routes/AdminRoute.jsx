import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Temporary admin check
  // Later this should come from backend role
  const adminEmail = "hello.nababimart@gmail.com";

  if (user.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;