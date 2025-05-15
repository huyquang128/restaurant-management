import { axiosInstancePublic } from './axiosInstance';

// api public (don't verify token)
export const registerApi = async (formData) => {
    try {
        const response = await axiosInstancePublic.post(
            '/auth/register',
            formData
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const loginApi = async (formData) => {
    const response = await axiosInstancePublic.post('/auth/login', formData);
    return response.data;
};

export const logoutApi = async () => {
    const response = await axiosInstancePublic.post('/auth/logout');
    return response.data;
};

export const refreshTokenApi = async () => {
    const response = await axiosInstancePublic.post('/auth/refresh-token');
    return response.data;
};
