import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "../api/user";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { data: userData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => getUserByEmail(user.email),
    enabled: !!user?.email,
  });

  if (loading || isRoleLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.data?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
