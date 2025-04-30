import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://print-lu2y.onrender.com/"
    : "http://localhost:5000";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;
