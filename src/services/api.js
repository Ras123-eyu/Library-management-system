import axios from "axios";

const API_BASE_URL = "https://back-end-for-assessment.vercel.app/";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
export const signupUser = async ({ username, email, password, role }) => {
  try {
    const response = await api.post("/auth/signup", {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "signup failed";
  }
};
export default api;
