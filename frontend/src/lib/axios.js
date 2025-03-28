import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chat-app-mern-mq93.onrender.com" : "/api",
  withCredentials: true,
});
