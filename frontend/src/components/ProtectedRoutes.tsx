import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token") ?? null;

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
