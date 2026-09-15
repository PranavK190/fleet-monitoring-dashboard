import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;