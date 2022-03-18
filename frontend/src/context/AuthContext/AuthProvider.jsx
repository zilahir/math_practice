/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import PropTypes from "prop-types";

import AuthContext from "./context";

function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState({});

  const value = {
    isAuthenticated,
    setAuthenticated,
    user,
    setUser,
  };
  return (
    (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
