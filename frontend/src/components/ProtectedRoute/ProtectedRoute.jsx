import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
