/* eslint-disable no-unused-labels */

import { axiosInstancePublic } from './axiosInstance';

//api public
export const getUrlPaymentVNPayApi = async (orderId, methodStatus) => {
    const response = await axiosInstancePublic.post(
        `/payment/vnpay-url/${orderId}`,
        { methodStatus }
    );
    return response.data;
};

export const updateDepositOrderApi = async (orderId, deposit) => {
    const response = await axiosInstancePublic.post(
        `/order/update-deposit/${orderId}`,
        { deposit }
    );
    return response.data;
};

export const getRevenueApi = async (day, month, year, type) => {
    const response = await axiosInstancePublic.get(`/order/get-renevue`, {
        params: {
            day,
            month,
            year,
            type,
        },
    });
    return response.data;
};

export const getRevenueProfitReportApi = async (day, month, year, type) => {
    const response = await axiosInstancePublic.get(
        `/order/get-reports-renevue-profit`,
        {
            params: {
                day,
                month,
                year,
                type,
            },
        }
    );
    return response.data;
};

//api private
const orderServicePrivate = (axiosPrivate) => ({
    addOrderApi: async (formData) => {
        const response = await axiosPrivate.post('/order/add-order', formData);
        return response.data;
    },

    getOrderByUserApi: async (userId) => {
        const response = await axiosPrivate.get(
            `/order/get-order-by-user/${userId}`
        );
        return response.data;
    },

    getAllOrderApi: async () => {
        const response = await axiosPrivate.get(`/order/get-all-orders`);
        return response.data;
    },

    getOrderByIdApi: async (orderId) => {
        const response = await axiosPrivate.get(
            `/order/get-order-by-id/${orderId}`
        );
        return response.data;
    },

    updateQuantityDishesOrderApi: async (orderId, productId, quantity) => {
        const response = await axiosPrivate.post(
            `/order/update-quantity-dishes-order/${orderId}`,
            { productId, quantity }
        );
        return response.data;
    },

    deleteProductOrderApi: async (orderId, productId) => {
        const response = await axiosPrivate.delete(
            `/order/delete-dishes-order/${orderId}`,
            { data: { productId } }
        );
        return response.data;
    },

    addProductToOrderApi: async (orderId, productId, price) => {
        const response = await axiosPrivate.post(
            `/order/add-product-order/${orderId}`,
            { productId, price }
        );
        return response.data;
    },

    updateStatusPaymentOrderApi: async (
        orderId,
        statusPayment,
        type,
        cancelReason,
        mealDuration
    ) => {
        const response = await axiosPrivate.post(
            `/order/update-status-payment-order/${orderId}`,
            { statusPayment, type, cancelReason, mealDuration }
        );
        return response.data;
    },

    getOrderPageApi: async (pageNumber) => {
        const response = await axiosPrivate.get(`/order/get-order-page`, {
            params: {
                page: pageNumber,
            },
        });
        return response.data;
    },

    getOrderPagePendingApi: async (pageNumber) => {
        const response = await axiosPrivate.get(
            `/order/get-order-page-pending`,
            {
                params: {
                    page: pageNumber,
                },
            }
        );
        return response.data;
    },

    getOrderPagePaidApi: async (pageNumber) => {
        const response = await axiosPrivate.get(`/order/get-order-page-paid`, {
            params: {
                page: pageNumber,
            },
        });
        return response.data;
    },

    getOrderPageCanceledApi: async (pageNumber) => {
        const response = await axiosPrivate.get(
            `/order/get-order-page-canceled`,
            {
                params: {
                    page: pageNumber,
                },
            }
        );
        return response.data;
    },
});

export default orderServicePrivate;
