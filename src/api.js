// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://tarka.ngrok.app/pagar-nusa/api",
  headers: {
    "ngrok-skip-browser-warning": "true",
  }, // Ganti jika backend kamu berbeda
});

// Tambahkan token secara otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
