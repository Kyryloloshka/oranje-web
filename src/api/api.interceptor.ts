import axios from "axios";
import { errorHandler, getContentType } from "./api.helpers";
import { getAccessToken } from "@/services/auth/auth.helper";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: getContentType(),
});

api.interceptors.request.use(
  async (config) => {
    const access_token = getAccessToken();
    if (config.headers && access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 ||
        errorHandler(error) === "jwt expired" ||
        errorHandler(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        return api.request(originalRequest);
      } catch (error) {
        if (errorHandler(error) === "jwt expired") {
          // logout
        }
      }
    }
  }
);

export default api;
