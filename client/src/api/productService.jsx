import { axiosInstancePublic } from './axiosInstance';

//api public
export const getAllProductsApi = async (pageNumber) => {
    const response = await axiosInstancePublic.get(
        '/product/get-all-products',
        {
            params: {
                page: pageNumber,
            },
        }
    );
    return response.data;
};

export const getProductsPageByCategoryApi = async (id) => {
    const response = await axiosInstancePublic.get(
        `/product/get-products-page-by-category/${id}`
    );
    return response.data;
};

export const getProductBySlugApi = async (slug) => {
    const response = await axiosInstancePublic.get(
        `/product/get-product-by-slug/${slug}`
    );
    return response.data;
};

export const getImagesIdsApi = async (ids) => {
    const response = await axiosInstancePublic.get('/images/get-images-ids', {
        params: {
            ids,
        },
    });
    return response.data;
};

//api private
const productServicePrivate = (axiosPrivate) => ({
    addProductApi: async (formData) => {
        const response = await axiosPrivate.post(
            '/product/add-product',
            formData
        );
        return response.data;
    },

    updateProductApi: async ({ formData, id }) => {
        const response = await axiosPrivate.put(
            `/product/update-product/${id}`,
            formData
        );
        return response.data;
    },

    deleteProductApi: async (id) => {
        const response = await axiosPrivate.delete(`/product/delete-product`, {
            data: { ids: id },
        });
        return response.data;
    },
});

export default productServicePrivate;
