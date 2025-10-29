import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const {currUser} = useAuth();
  
  return !currUser ? <Navigate to="/login" replace /> : <Outlet />;
};

export default PrivateRoute;