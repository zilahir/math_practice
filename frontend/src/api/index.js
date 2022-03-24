import axios from "axios";

const API_ROOT_URL = "/api";

const api = axios.create({
  baseURL: API_ROOT_URL,
  timeout: 3000,
});

export default api;
