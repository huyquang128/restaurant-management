import ToastMsg from '@/components/common/ToastMsg';
import { axiosInstancePublic } from './axiosInstance';

// api public ( do not verify token)
export const getAllCategoriesDishesApi = async () => {
    try {
        const response = await axiosInstancePublic.get(
            '/category-dishes/get-all-category-dishes'
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

// api private (verify token)
const categoryDishesPrivate = (axiosPrivate) => ({
    addCategoriesDishesApi: async (name) => {
        const response = await axiosPrivate.post(
            '/category-dishes/add-category-dishes',
            { name }
        );
        return response.data;
    },

    deleteCategoriesDishesApi: async () => {
        const response = await axiosPrivate.get(
            '/category-dishes/delete-category-dishes'
        );
        return response.data;
    },
});

export default categoryDishesPrivate;
