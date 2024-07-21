import axios from "axios";
import { getContentType } from "./api.helpers";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: getContentType(),
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
