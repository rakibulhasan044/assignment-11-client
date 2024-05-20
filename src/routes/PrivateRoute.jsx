import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-481px)]">
        <div className="loading loading-spinner text-error w-[80px]"></div>
      </div>
    );

  if (user) return children;
  return <Navigate to="/login" state={location?.pathname} replace={true} />;
};

export default PrivateRoute;
