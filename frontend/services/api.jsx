import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.139:5000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
