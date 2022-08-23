import axios from "axios";

import apiEndpoints from "./apiEndpoints";

export const API_ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://math-node-backend.herokuapp.com"
    : "/api";

const api = axios.create({
  baseURL: API_ROOT_URL,
  timeout: 3000,
});

export default api;
export { apiEndpoints };
