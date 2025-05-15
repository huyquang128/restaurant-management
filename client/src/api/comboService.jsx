import ToastMsg from '@/components/common/ToastMsg';
import { axiosInstancePublic } from './axiosInstance';

// api public ( do not verify token)
export const getComboPageApi = async (page) => {
    try {
        const response = await axiosInstancePublic.get(
            '/combo/get-combo-page',
            {
                params: {
                    page,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        ToastMsg({
            status: 'error',
            msg: error.response.data.message,
        });
    }
};

export const getComboSlugApi = async (slug) => {
    try {
        const response = await axiosInstancePublic.get(
            `/combo/get-combo-slug/${slug}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        ToastMsg({
            status: 'error',
            msg: error.response.data.message,
        });
    }
};

export const getAllComboDishesApi = async () => {
    try {
        const response = await axiosInstancePublic.get(`/combo/get-all-combo`);
        return response.data;
    } catch (error) {
        console.error(error);
        ToastMsg({
            status: 'error',
            msg: error.response.data.message,
        });
    }
};

// api private (verify token)
const comboPrivate = (axiosPrivate) => ({
    addComboApi: async (formData) => {
        const response = await axiosPrivate.post('/combo/add-combo', formData);
        return response.data;
    },

    updateComboApi: async ({ formData, comboId }) => {
        const response = await axiosPrivate.put(
            `/combo/update-combo/${comboId}`,
            formData
        );
        return response.data;
    },

    deleteComboApi: async (comboIds) => {
        const response = await axiosPrivate.delete('/combo/remove-combo', {
            data: { comboIds },
        });
        return response.data;
    },
});

export default comboPrivate;
