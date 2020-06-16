import axios from "axios";

const api = axios.create({
  baseURL: process.env.URLAPI || "https://localhost:3333",
});

export default api;
