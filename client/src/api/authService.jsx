import { axiosInstance } from './axiosInstance';

export const registerApi = async (formData) => {
    try {
        const response = await axiosInstance.post('/auth/register', formData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const loginApi = async (formData) => {
    try {
        const response = await axiosInstance.post('/auth/login', formData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const logoutApi = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const refreshTokenApi = async () => {
    try {
        const response = await axiosInstance.post('/auth/refresh-token');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
