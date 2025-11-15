import axios from "axios";
import { getTokenFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "http://localhost:8080",
});

customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
});

export default customFetch;
