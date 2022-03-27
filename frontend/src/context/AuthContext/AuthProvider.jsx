/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useContext } from "react";
import PropTypes from "prop-types";

import AuthContext from "./context";
import { fakeUsers } from "../../fakeApi/fakeUsers";
import { ALL } from "../../fakeApi/menuItems";

export const useAuth = () => useContext(AuthContext);

function handleLocalStorage(isLoggedIn) {
  if (isLoggedIn) {
    window.localStorage.setItem("isLoggedIn", true);
  } else {
    window.localStorage.setItem("isLoggedIn", false);
  }
}

function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(window.localStorage.getItem("isLoggedIn") ?? false);
  const [loggedInUser, setLoggedInUser] = useState({
    scope: ALL,
  });

  function signIn({ email, password }, callback) {
    const hasUser = fakeUsers.find((user) => user.email === email && user.password === password);
    if (hasUser) {
      // we have the user and the password is correct, we can login
      setAuthenticated(true);
      handleLocalStorage(true);
      setLoggedInUser(hasUser);
      callback();
    } else {
      // TODO: handle login error
    }
  }

  function signOut() {
    setAuthenticated(false);
    setLoggedInUser();
    handleLocalStorage(false);
  }

  const value = {
    loggedInUser,
    isAuthenticated,
    setAuthenticated,
    signIn,
    signOut,
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthProvider;
