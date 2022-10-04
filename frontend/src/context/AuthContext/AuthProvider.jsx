import { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

import AuthContext from "./context";

export const useAuth = () => useContext(AuthContext);

/** @param isLoggedIn */
function handleLocalStorage(loggedInUser) {
  if (loggedInUser && loggedInUser.isLoggedIn) {
    window.localStorage.setItem("isLoggedIn", JSON.stringify(loggedInUser));
  } else {
    window.localStorage.setItem("isLoggedIn", undefined);
  }
}

function helpLocalStorage() {
  const storageValue = window.localStorage.getItem("isLoggedIn");
  let result = false;
  if (storageValue !== null) {
    try {
      JSON.parse(storageValue);
      result = true;
    } catch {
      console.error("error");
    }
  }
  return result;
}

/**
 * @param root0
 * @param root0.children
 */
function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    helpLocalStorage()
      ? JSON.parse(window.localStorage.getItem("isLoggedIn")).isLoggedIn
      : undefined,
  );
  const [loggedInUser, setLoggedInUser] = useState(
    helpLocalStorage()
      ? JSON.parse(window.localStorage.getItem("isLoggedIn")).user
      : undefined,
  );

  function signIn(user, callback) {
    if (user) {
      // we have the user and the password is correct, we can login
      setAuthenticated(true);
      handleLocalStorage({
        isLoggedIn: true,
        user,
      });
      setLoggedInUser(user);
      callback();
    } else {
      // TODO: handle login error
    }
  }

  function signOut() {
    setAuthenticated(false);
    setLoggedInUser();
    handleLocalStorage(undefined);
  }

  const value = useMemo(
    () => ({
      loggedInUser,
      isAuthenticated,
      setAuthenticated,
      signIn,
      signOut,
    }),
    [loggedInUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthProvider;
