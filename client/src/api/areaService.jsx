import { axiosInstancePublic } from './axiosInstance';

//api public
export const getAllAreaApi = async () => {
    const response = await axiosInstancePublic.get('/area/get-all-area');
    return response.data;
};

//api private
