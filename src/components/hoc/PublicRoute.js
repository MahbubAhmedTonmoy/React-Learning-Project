import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

//hoc
//render props
export default function PrivateRoute() {
  const { currentUser } = useAuth();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
}
