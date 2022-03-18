import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/context";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    !isAuthenticated && <Navigate to="/login" />
  );
}

export default ProtectedRoute;
