import axiosInstancePrivate from '@/api/axiosInstance';
import cartPrivate from '@/api/cartService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isLoadingDelProduct: false,
    carts: null,
    quantityProdValue: {},
    isOpenCartModal: false,
};

export const getProductCart = createAsyncThunk(
    '/cart/get-products-cart',
    async (userId, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = cartPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.getProductCartApi(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const addProductCart = createAsyncThunk(
    '/cart/add-product-cart',
    async (
        { userId, productId, quantity, price },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = cartPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.addProductCartApi({
                userId,
                productId,
                quantity,
                price,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const updateQuantityProductCart = createAsyncThunk(
    '/cart/update-quantity-product-cart',
    async (
        { cartId, productId, quantity },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = cartPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.updateQuantityProductCartApi({
                cartId,
                productId,
                quantity,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const deleteProductCart = createAsyncThunk(
    '/cart/delete-product-cart',
    async ({ userId, productId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = cartPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.deleteProductCartApi({
                userId,
                productId,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsOpenCartModal: (state, action) => {
            state.isOpenCartModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload?.data;
            })
            .addCase(getProductCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //add product to cart
            .addCase(addProductCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProductCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload?.data;
            })
            .addCase(addProductCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //delete product from cart
            .addCase(deleteProductCart.pending, (state) => {
                state.isLoadingDelProduct = true;
                state.error = null;
            })
            .addCase(deleteProductCart.fulfilled, (state) => {
                state.isLoadingDelProduct = false;
            })
            .addCase(deleteProductCart.rejected, (state, action) => {
                state.isLoadingDelProduct = false;
                state.error = action.payload;
            });
    },
});

export const { setIsOpenCartModal } = cartSlice.actions;
export default cartSlice.reducer;
