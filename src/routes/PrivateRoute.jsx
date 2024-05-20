import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

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
  return <Navigate state={location.pathname} to="/login" replace={true} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute;
