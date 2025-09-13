import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;

// Ensure browser includes cookies on cross-site requests
instance.defaults.withCredentials = true;