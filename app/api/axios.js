import axios from "axios";

// Create Axios instance
const API = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true,
});

// ✅ 1. Attach access token in requests
API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ 2. Handle 401 responses & auto-refresh token
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 || error.response?.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            console.log("🔥 Fetched refreshToken from localStorage:", refreshToken);

            if (!refreshToken) {
                console.warn("⚠️ No refreshToken found in localStorage.");
                return Promise.reject({ message: "Refresh token missing on client" });
            }

            try {
                const res = await axios.post(
                    'http://localhost:9000/refresh-token',
                    { refreshToken },
                    { withCredentials: true }
                );

                const { accessToken, refreshToken: newRefreshToken } = res.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (err) {
                console.log("🔁 Refresh token failed", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default API;
