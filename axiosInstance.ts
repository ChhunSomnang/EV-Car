import axios from "axios";

const api = axios.create({
  baseURL: "https://inventoryapi-367404119922.asia-southeast1.run.app",
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized), try refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token
        const response = await axios.post(
          "https://inventoryapi-367404119922.asia-southeast1.run.app/User/RefreshToken",
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken); // Save new token

        // Update the Authorization header and retry the request
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle logout if refresh fails
      }
    }
    return Promise.reject(error);
  }
);

export default api;
