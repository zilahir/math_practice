import axios from "axios";

import apiEndpoints from "./apiEndpoints";

export const API_ROOT_URL = "/api";

const api = axios.create({
  baseURL: API_ROOT_URL,
});

export default api;
export { apiEndpoints };
