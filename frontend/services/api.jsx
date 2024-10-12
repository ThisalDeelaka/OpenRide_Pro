import axios from "axios";

const api = axios.create({
  baseURL: "https://openride-pro.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
