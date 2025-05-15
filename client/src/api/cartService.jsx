//public api

//private api
const cartPrivate = (axiosPrivate) => ({
    getProductCartApi: async (userId) => {
        const response = await axiosPrivate.get(
            `/cart/get-products-cart/${userId}`
        );
        return response.data;
    },

    addProductCartApi: async ({ userId, productId, quantity, price }) => {
        const response = await axiosPrivate.post(
            `/cart/add-product-cart/${userId}`,
            {
                productId,
                quantity,
                price,
            }
        );
        return response.data;
    },

    updateQuantityProductCartApi: async ({ cartId, productId, quantity }) => {
        const response = await axiosPrivate.patch(
            `/cart/update-quantity-product-cart/${cartId}`,
            {
                productId,
                quantity,
            }
        );
        return response.data;
    },

    deleteProductCartApi: async ({ userId, productId }) => {
        const response = await axiosPrivate.delete(
            `/cart/delete-product-cart/${userId}`,
            {
                data: { productId },
            }
        );
        return response.data;
    },
});

export default cartPrivate;
