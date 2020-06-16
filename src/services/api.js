import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV || "https://localhost:3333",
});

export default api;
