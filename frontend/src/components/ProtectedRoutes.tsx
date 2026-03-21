import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = "hello";

  if (!auth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
