import { refreshToken } from '@/redux/authSlice';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api/v1';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Tạo axios instance
const axiosInstancePrivate = (store) => {
    const axiosInstances = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
    });

    axiosInstances.interceptors.request.use(
        (config) => {
            const state = store?.getState();
            const accessToken = state.auth.accessToken;

            if (accessToken) {
                config.headers['token'] = `Bearer ${accessToken}`;
            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    axiosInstances.interceptors.response.use(
        (response) => response,
        async (err) => {
            const originalRequest = err.config;

            if (
                err.response &&
                err.response.status === 403 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    // Gọi Redux dispatch để refresh token
                    const result = await store.dispatch(refreshToken());

                    // Lấy access token mới từ payload
                    const newAccessToken = result.payload.accessToken;

                    // Cập nhật lại token vào headers của originalRequest
                    originalRequest.headers[
                        'token'
                    ] = `Bearer ${newAccessToken}`;

                    // Retry lại request gốc
                    return axiosInstances(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(err);
        }
    );

    return axiosInstances;
};

export default axiosInstancePrivate;
