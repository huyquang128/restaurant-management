/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import axiosInstancePrivate from '@/api/axiosInstance';

import comboPrivate, {
    getAllComboDishesApi,
    getComboPageApi,
    getComboSlugApi,
} from '@/api/comboService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialValues = {
    isLoading: false,
    combo: null,
    formComboValue: {
        name: '',
        comboPrice: '',
    },
    productFromCombo: null,
    error: null,
    arrProductIdRemoved: [],
    arrProductOriginal: [],
    productSelectedInComboAdd: [],
};

export const getComboPage = createAsyncThunk(
    '/combo/get-combo-page',
    async (page) => {
        try {
            const response = await getComboPageApi(page);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getAllComboDishes = createAsyncThunk(
    '/combo/get-all-combo',
    async () => {
        try {
            const response = await getAllComboDishesApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getComboSlug = createAsyncThunk(
    '/combo/get-combo-slug',
    async (slug) => {
        try {
            const response = await getComboSlugApi(slug);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addCombo = createAsyncThunk(
    '/combo/add-comb',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = comboPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.addComboApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const updateCombo = createAsyncThunk(
    '/combo/update-combo',
    async ({ formData, comboId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = comboPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.updateComboApi({
                formData,
                comboId,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const deleteCombo = createAsyncThunk(
    '/combo/remove-combo',
    async (categoryIds, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = comboPrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.deleteComboApi(categoryIds);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

const comboSlice = createSlice({
    name: 'combo',
    initialState: initialValues,
    reducers: {
        resetForm: (state) => {
            state.formComboValue.name = '';
            state.formComboValue.comboPrice = '';
        },
        setProductSelectedCombo: (state, action) => {
            let currentProducts = Array.isArray(state.combo?.products)
                ? [...state.combo?.products]
                : [];

            currentProducts = action.payload.reduce(
                (acc, item) => {
                    const existed = acc?.findIndex(
                        (obj) => obj._id === item._id
                    );

                    if (existed === -1) {
                        return [...acc, item];
                    } else {
                        acc.filter((i) => i._id !== item._id);
                        return [...acc];
                    }
                },
                [...currentProducts]
            );

            state.combo && (state.combo.products = [...currentProducts]);
        },
        deleteProductTemp: (state, action) => {
            state.combo &&
                (state.combo.products = state.combo?.products?.filter(
                    (product) => product._id !== action.payload
                ));

            state.productSelectedInComboAdd =
                state.productSelectedInComboAdd.filter(
                    (item) => item._id !== action.payload
                );
        },

        setProductSelectedInCombo: (state, action) => {
            state.productSelectedInComboAdd = action.payload;
        },
        deleteProductSelectedInCombo: (state, action) => {
            state.productSelectedInComboAdd =
                state.productSelectedInComboAdd.filter(
                    (item) => item._id !== action.payload
                );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComboPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComboPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.combo = action.payload;
            })
            .addCase(getComboPage.rejected, (state) => {
                state.isLoading = false;
            })

            //get all category dishes
            .addCase(getAllComboDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllComboDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.combo = action.payload.data;
            })
            .addCase(getAllComboDishes.rejected, (state) => {
                state.isLoading = false;
            })

            //get Category Dishes by slug
            .addCase(getComboSlug.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComboSlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.formComboValue = {
                    name: action.payload?.data.name,
                    comboPrice: action.payload?.data.comboPrice,
                };
                state.combo = action.payload?.data;
                state.arrProductOriginal = action.payload?.data && [
                    ...action.payload.data.products,
                ];
                state.productSelectedInComboAdd = action.payload.data?.products;
            })
            .addCase(getComboSlug.rejected, (state) => {
                state.isLoading = false;
            })

            //add Category Dishes
            .addCase(addCombo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCombo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addCombo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //update Category Dishes
            .addCase(updateCombo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCombo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCombo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //delete Category Dishes
            .addCase(deleteCombo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCombo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteCombo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    resetForm,
    deleteProductTemp,
    selectedProductTemp,
    setProductSelectedCombo,
    setProductSelectedInCombo,
    deleteProductSelectedInCombo,
} = comboSlice.actions;
export default comboSlice.reducer;
