import { createContext } from "react";

const authContext = createContext({
  isAuthenticated: false,
  signIn: undefined,
  signOut: undefined,
  user: {},
});

export default authContext;
