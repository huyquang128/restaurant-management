import { axiosInstancePublic } from './axiosInstance';

//api public
export const getAllProductsPageApi = async (pageNumber) => {
    const response = await axiosInstancePublic.get(
        '/product/get-all-products-pages',
        {
            params: {
                page: pageNumber,
            },
        }
    );
    return response.data;
};

export const getAllProductsApi = async () => {
    const response = await axiosInstancePublic.get('/product/get-all-products');
    return response.data;
};

export const getProductsPageByCategoryApi = async (id, pageNumber) => {
    const response = await axiosInstancePublic.get(
        `/product/get-products-page-by-category/${id}`,
        {
            params: {
                page: pageNumber,
            },
        }
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

export const searchNameProductApi = async ({ page, q }) => {
    const response = await axiosInstancePublic.get(
        `/product/search-product-name`,
        {
            params: {
                page,
                q,
            },
        }
    );
    return response.data;
};

export const searchNameProductNoPageApi = async (q) => {
    const response = await axiosInstancePublic.get(
        `/product/search-product-name-no-pages`,
        {
            params: {
                q,
            },
        }
    );
    return response.data;
};

export const getProductSoldApi = async () => {
    const response = await axiosInstancePublic.get(`/product/get-product-sold`);
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

    deleteProductApi: async (id, categoryId) => {
        const response = await axiosPrivate.delete(`/product/delete-product`, {
            data: { id, categoryId },
        });
        return response.data;
    },
});

export default productServicePrivate;
