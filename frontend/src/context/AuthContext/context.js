import { createContext } from "react";

const authContext = createContext({
  isAuthenticated: false,
  login: undefined,
  logout: undefined,
  user: undefined,
});

export default authContext;
