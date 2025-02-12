import { axiosInstancePublic } from './axiosInstance';

//api public
export const getAllUnitApi = async () => {
    const response = await axiosInstancePublic.get('/unit/get-all-unit');
    return response.data;
};

//api private (verify-token)
const unitServicePrivate = (axiosPrivate) => ({
    addUnitApi: async (name) => {
        const response = await axiosPrivate.post('/unit/add-unit', { name });
        return response.data;
    },

    deleteUnitApi: async (id) => {
        const response = await axiosPrivate.delete(`/unit/delete-unit/${id}`);
        return response.data;
    },
});

export default unitServicePrivate;
