import axios from "axios";

// prefer VITE_BACKEND_URL, fall back to VITE_API_URL for older envs
const apiUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '';

const instance = axios.create({
  baseURL: apiUrl,
  // include cookies by default for auth endpoints
  withCredentials: true,
});

// also set default to be safe
instance.defaults.withCredentials = true;

export default instance;