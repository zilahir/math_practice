import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../../context/AuthContext/context";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    !isAuthenticated ? <Navigate to="/login" /> : children
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
