import { createContext } from "react";

export const authContext = createContext({
  isAuthenticated: false,
  signIn: undefined,
  signOut: undefined,
  user: {},
});

export default authContext;
