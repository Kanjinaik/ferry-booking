import axios from "axios";

// Get token from localStorage (after login)
const getToken = () => localStorage.getItem("token");

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// Axios instance
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include token in every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch bookings of logged-in user
export const fetchMyBookings = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found. Please login first.");
    }
    const response = await api.get("/bookings/my");
    return response.data; // { status: true, data: [...] }
  } catch (error) {
    console.error("Error fetching bookings:", error.response || error.message);
    throw error;
  }
};

export default api;
