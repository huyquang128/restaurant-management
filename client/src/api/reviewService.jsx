import { axiosInstancePublic } from './axiosInstance';

export const getAllReviewApi = async () => {
    const response = await axiosInstancePublic.get('/review/get-all-review');
    return response.data;
};

export const addReviewApi = async (formData) => {
    const response = await axiosInstancePublic.post(
        '/review/add-review',
        formData
    );
    return response.data;
};

export const updateReviewApi = async (id, formData) => {
    const response = await axiosInstancePublic.patch(
        `/review/update-review/${id}`,
        formData
    );
    return response.data;
};

export const respondToReviewApi = async (id, formData) => {
    const response = await axiosInstancePublic.patch(
        `/review/response-review/${id}`,
        formData
    );
    return response.data;
};
