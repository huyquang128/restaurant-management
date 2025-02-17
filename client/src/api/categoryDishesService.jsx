import ToastMsg from '@/components/common/ToastMsg';
import { axiosInstancePublic } from './axiosInstance';

// api public ( do not verify token)
export const getAllCategoriesDishesApi = async (page) => {
    try {
        const response = await axiosInstancePublic.get(
            '/category-dishes/get-all-category-dishes',
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

export const getCategoryDishesSlugApi = async (slug) => {
    try {
        const response = await axiosInstancePublic.get(
            `/category-dishes/get-category-slug/${slug}`
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
    addCategoriesDishesApi: async (formData) => {
        const response = await axiosPrivate.post(
            '/category-dishes/add-category-dishes',
            formData
        );
        return response.data;
    },

    updateCategoriesDishesApi: async ({ formData, categoryId }) => {
        const response = await axiosPrivate.put(
            `/category-dishes/update-category-dishes/${categoryId}`,
            formData
        );
        return response.data;
    },

    deleteCategoriesDishesApi: async (categoryIds) => {
        const response = await axiosPrivate.delete(
            '/category-dishes/remove-category-dishes',
            {
                data: { categoryIds },
            }
        );
        return response.data;
    },
});

export default categoryDishesPrivate;
