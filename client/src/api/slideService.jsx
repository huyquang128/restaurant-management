import { axiosInstancePublic } from './axiosInstance';

// api public ( do not verify token)
export const getSlidePageApi = async (page) => {
    const response = await axiosInstancePublic.get('/slide/get-slide-page', {
        params: {
            page,
        },
    });
    return response.data;
};

export const getAllSlideApi = async () => {
    const response = await axiosInstancePublic.get('/slide/get-all-slide');
    return response.data;
};

export const addSlideApi = async (formData) => {
    const response = await axiosInstancePublic.post(
        '/slide/add-slide',
        formData
    );
    return response.data;
};

export const removeSlideApi = async (slideIdOld) => {
    const response = await axiosInstancePublic.delete('/slide/remove-slide', {
        data: {
            slideIdOld,
        },
    });
    return response.data;
};
