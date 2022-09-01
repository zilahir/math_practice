import axios from "axios";

import apiEndpoints from "./apiEndpoints";

export const API_ROOT_URL = "/api";

const api = axios.create({
  baseURL: API_ROOT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
export { apiEndpoints };
