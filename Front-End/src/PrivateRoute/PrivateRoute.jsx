import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { loggedUser } = useSelector((store) => store.user);
  const location = useLocation();
  const token = localStorage.getItem("business_jwt");

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && token) {
    return children;
  }

  return <Spinner></Spinner>;
};

export default PrivateRoute;
