import axios from "axios";


// create Axios instance 

const API = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true,  // for cookie-based auth if needed 
});

// Request interceptor to attach access token 

API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Request interceptor to attach access token 

API.interceptors.request.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 && !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const res = await axios.post(
                    'http://localhost:9000/refresh-token', { refreshToken });

                const { accessToken, refreshToken: newRefreshToken } = res.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (err) {
                console.log("Refresh token failed", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
)

export default API;
