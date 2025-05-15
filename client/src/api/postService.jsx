import { axiosInstancePublic } from './axiosInstance';

export const addPostApi = async (formData) => {
    const response = await axiosInstancePublic.post('/post/add-post', formData);
    return response.data;
};

export const updatePostApi = async (id, formData) => {
    const response = await axiosInstancePublic.post(
        `/post/update-post/${id}`,
        formData
    );
    return response.data;
};

export const getPostSlugApi = async (slug) => {
    const response = await axiosInstancePublic.get(
        `/post/get-post-slug/${slug}`
    );
    return response.data;
};

export const getPostPageApi = async (type, pageNumber) => {
    const response = await axiosInstancePublic.get(
        `/post/get-post-page/${type}`,
        {
            params: {
                page: pageNumber,
            },
        }
    );
    return response.data;
};

export const deletePostApi = async (id) => {
    const response = await axiosInstancePublic.delete(
        `/post/delete-post/${id}`
    );
    return response.data;
};

export const uploadImgtApi = async (formData) => {
    const response = await axiosInstancePublic.post(
        `/post/upload-img-post/`,
        formData
    );
    return response.data;
};
