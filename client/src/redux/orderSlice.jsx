import axiosInstancePrivate from '@/api/axiosInstance';
import orderServicePrivate, {
    getRevenueApi,
    getRevenueProfitReportApi,
    getUrlPaymentVNPayApi,
    updateDepositOrderApi,
} from '@/api/orderService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    order: null,
    orders: [],
    ordersPage: null,
    urlPaymentVNPay: null,
    orderIdSeleted: null,
    formValueOrder: {
        nameCustomer: '',
        phoneCustomer: '',
        addressRestaurant: '',
        quantityCustomer: '',
        diningTime: '',
        tableSelected: '',
        note: '',
    },
    reportRenevue: null,
    reportRenevueAndProfit: null,
};

export const getOrderByUser = createAsyncThunk(
    '/order/get-order',
    async (userId, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderByUserApi(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllOrder = createAsyncThunk(
    '/order/get-all-orders',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getAllOrderApi();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'error');
        }
    }
);

export const getOrderById = createAsyncThunk(
    '/order/get-order-by-id',
    async (orderId, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderByIdApi(orderId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addOrder = createAsyncThunk(
    '/order/add-order',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addOrderApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateQuantityProductOrder = createAsyncThunk(
    '/order/update-quantity-dishes-order',
    async (
        { orderId, productId, quantity },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.updateQuantityDishesOrderApi(
                orderId,
                productId,
                quantity
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProductOrder = createAsyncThunk(
    '/order/delete-dishes-order',
    async ({ orderId, productId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteProductOrderApi(
                orderId,
                productId
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUrlPaymentVNPay = createAsyncThunk(
    '/order/vnpay-url',
    async ({ orderId, methodStatus }) => {
        try {
            const response = await getUrlPaymentVNPayApi(orderId, methodStatus);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addProductToOrder = createAsyncThunk(
    '/order/add-product-order',
    async (
        { orderId, productId, price },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addProductToOrderApi(
                orderId,
                productId,
                price
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateStatusPaymentOrder = createAsyncThunk(
    '/order/update-status-payment-order',
    async (
        { orderId, statusPayment, type, cancelReason, mealDuration },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.updateStatusPaymentOrderApi(
                orderId,
                statusPayment,
                type,
                cancelReason,
                mealDuration
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getOrderPage = createAsyncThunk(
    '/order/get-order-page',
    async (pageNumber, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderPageApi(pageNumber);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getOrderPagePending = createAsyncThunk(
    '/order/get-order-page-pending',
    async (pageNumber, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderPagePendingApi(pageNumber);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getOrderPagePaid = createAsyncThunk(
    '/order/get-order-page-paid',
    async (pageNumber, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderPagePaidApi(pageNumber);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getOrderPageCanceled = createAsyncThunk(
    '/order/get-order-page-canceled',
    async (pageNumber, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = orderServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.getOrderPageCanceledApi(pageNumber);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateDepositOrder = createAsyncThunk(
    '/order/update-deposit',
    async (orderId, deposit) => {
        try {
            const response = await updateDepositOrderApi(orderId, deposit);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getRevenue = createAsyncThunk(
    '/order/get-renevue',
    async ({ day, month, year, type }) => {
        try {
            const response = await getRevenueApi(day, month, year, type);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const getRevenueProfitReport = createAsyncThunk(
    '/order/get-reports-renevue-profit',
    async ({ day, month, year, type }) => {
        try {
            const response = await getRevenueProfitReportApi(
                day,
                month,
                year,
                type
            );
            return response;
        } catch (error) {
            return error;
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCurrentOrderIdSeleted: (state, action) => {
            state.orderIdSeleted = action.payload;
        },
        addNewOrder: (state, action) => {
            state.orders = [...state.orders, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder

            //add Order
            .addCase(addOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get Order By User
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get Url Payment VNPay
            .addCase(getUrlPaymentVNPay.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUrlPaymentVNPay.fulfilled, (state, action) => {
                state.isLoading = false;
                state.urlPaymentVNPay = action.payload.paymentUrl;
            })
            .addCase(getUrlPaymentVNPay.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get All Order
            .addCase(getAllOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.data;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get Order By Id
            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload.data;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //update Quantity Product Order
            .addCase(updateQuantityProductOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateQuantityProductOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateQuantityProductOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // delete Product Order
            .addCase(deleteProductOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProductOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProductOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // add Product Order
            .addCase(addProductToOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProductToOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addProductToOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(updateStatusPaymentOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateStatusPaymentOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateStatusPaymentOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(getOrderPage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersPage = action.payload;
            })
            .addCase(getOrderPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(getOrderPagePending.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderPagePending.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersPage = action.payload;
            })
            .addCase(getOrderPagePending.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(getOrderPagePaid.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderPagePaid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersPage = action.payload;
            })
            .addCase(getOrderPagePaid.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(getOrderPageCanceled.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderPageCanceled.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordersPage = action.payload;
            })
            .addCase(getOrderPageCanceled.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //
            .addCase(updateDepositOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDepositOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateDepositOrder.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getRevenue.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRevenue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportRenevue = action.payload.data;
            })
            .addCase(getRevenue.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getRevenueProfitReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRevenueProfitReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reportRenevueAndProfit = action.payload.data;
            })
            .addCase(getRevenueProfitReport.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCurrentOrderIdSeleted, addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;
