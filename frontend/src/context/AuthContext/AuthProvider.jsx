/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useContext } from "react";
import PropTypes from "prop-types";

import AuthContext from "./context";
import { fakeUsers } from "../../fakeApi/fakeUsers";

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

  /**
   * @param root0
   * @param root0.email
   * @param root0.password
   * @param callback
   */
  function signIn({ email, password }, callback) {
    const hasUser = fakeUsers.find(
      (user) => user.email === email && user.password === password,
    );
    if (hasUser) {
      // we have the user and the password is correct, we can login
      setAuthenticated(true);
      handleLocalStorage({
        isLoggedIn: true,
        user: hasUser,
      });
      setLoggedInUser(hasUser);
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

  const value = {
    loggedInUser,
    isAuthenticated,
    setAuthenticated,
    signIn,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthProvider;
