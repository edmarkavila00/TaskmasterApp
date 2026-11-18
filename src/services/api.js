
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/taskmaster-pro/backend/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
