// libs/api.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.backendUrl,
});

// Interceptor untuk menambahkan Authorization Bearer token ke setiap request
api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken(); // Fungsi untuk mendapatkan token dari SecureStore
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error in request interceptor:", error);
  }
  return config;
});

// Fungsi untuk mendapatkan token dari SecureStore
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export default api;
