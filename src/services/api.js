import axios from "axios";

const api = axios.create({
  baseURL: "https://apostala-b.herokuapp.com/",
});

export default api;
