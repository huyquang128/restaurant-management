import axiosInstancePrivate from '@/api/axiosInstance';
import productServicePrivate, {
    getAllProductsApi,
    getProductBySlugApi,
    getProductsPageByCategoryApi,
} from '@/api/productService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: null,
    products: null,
    formProductValue: {
        nameProduct: '',
        categoryDishes: '',
        unit: '',
        quantity: '',
        note: '',
        promotion: '',
        selling: '',
        description: '',
        cost: '',
    },
    currentProductId: null,
    urlImgProducts: [],
    arrImgSelected: [],
    arrFileImgUpload: [],
};

export const getAllProducts = createAsyncThunk(
    '/product/get-all-products',
    async (pageNumber) => {
        try {
            const response = await getAllProductsApi(pageNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductsPageByCategory = createAsyncThunk(
    '/product/get-products-page-by-category',
    async (id) => {
        try {
            const response = await getProductsPageByCategoryApi(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductBySlug = createAsyncThunk(
    '/product/get-product-by-slug',
    async (slug) => {
        try {
            const response = await getProductBySlugApi(slug);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addProduct = createAsyncThunk(
    '/product/add-product',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addProductApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    '/product/update-product',
    async ({ formData, id }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.updateProductApi({ formData, id });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    '/product/delete-product',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteProductApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFormProductValue: (state, action) => {
            state.formProductValue = { ...action.payload.formValue };
            state.urlImgProducts = [...action.payload.urlImgProducts];
        },
        setUrlImgProduct: (state, action) => {
            state.urlImgProducts = [action.payload, ...state.urlImgProducts];
        },
        deleteImgProduct: (state, action) => {
            state.urlImgProducts = state.urlImgProducts.filter(
                (img, index) => !action.payload.includes(index)
            );
            state.arrImgSelected = [];
        },
        setImgSelected: (state, action) => {
            state.arrImgSelected = state.arrImgSelected.includes(action.payload)
                ? state.arrImgSelected.filter((img) => img !== action.payload)
                : [action.payload, ...state.arrImgSelected];
        },

        resetUrlImgProduct: (state) => {
            state.urlImgProducts = [];
        },
        handleDeleteImage: (state, action) => {
            state.urlImgProducts = state.urlImgProducts.filter(
                (img, index) => index !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //getProductsPageByCategory
            .addCase(getProductsPageByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsPageByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(getProductsPageByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //getProductBySlug
            .addCase(getProductBySlug.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.formProductValue = {
                    nameProduct: action.payload?.data?.name,
                    categoryDishes: action.payload?.data?.categoryDishes._id,
                    unit: action.payload?.data?.unit._id,
                    quantity: action.payload?.data?.quantity,
                    note: action.payload?.data?.note,
                    promotion: action.payload?.data?.promotion,
                    selling: action.payload?.data?.selling,
                    description: action.payload?.data?.description,
                    cost: action.payload?.data?.cost,
                };
                state.urlImgProducts = action.payload?.success && [
                    ...action.payload.data.images,
                ];
                state.currentProductId = action.payload?.data?._id;
                state.error = null;
            })
            .addCase(getProductBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //addProduct
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setFormProductValue,
    setUrlImgProduct,
    resetUrlImgProduct,
    handleDeleteImage,
    deleteImgProduct,
    setImgSelected,
} = productSlice.actions;
export default productSlice.reducer;
