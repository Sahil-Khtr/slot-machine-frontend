import axios from "axios";
import { getItemFromStorage, setItemToStorage } from "../utils/Helper";
import { REACT_APP_API_BASE_URL } from "./config";
import { StorageConstant } from "../constants/Constants";

// Default headers
const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Image headers
const imgHeader = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

// Create axios instances
const axiosClient = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: defaultHeaders,
});

const axiosClientImg = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: imgHeader,
});

// Function to set up interceptors
const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getItemFromStorage(StorageConstant?.is_login_token);
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data === "Access token not found"
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = getItemFromStorage(
            StorageConstant?.refresh_login_token
          );
          const response = await axios.post(
            `${REACT_APP_API_BASE_URL}/refresh-token`,
            { refreshToken }
          );

          setItemToStorage(
            StorageConstant?.is_login_token,
            response.data.accessToken
          );

          // Update the Authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure
          console.error("Refresh token error:", refreshError);
          // Optionally: Redirect to login or handle logout
        }
      }

      return Promise.reject(error);
    }
  );
};

// Apply interceptors to both instances
setupInterceptors(axiosClient);
setupInterceptors(axiosClientImg);

// Export axios clients
export { axiosClientImg };
export default axiosClient;
