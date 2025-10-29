import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const {currUser} = useAuth();
  
  return currUser ? <Navigate to="/dashboard/chats" replace /> : <Outlet />;
};

export default PublicRoute;