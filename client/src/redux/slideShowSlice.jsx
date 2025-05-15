/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */

import {
    addSlideApi,
    getAllSlideApi,
    getSlidePageApi,
    removeSlideApi,
} from '@/api/slideService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialValues = {
    isLoading: false,
    slide: null,
    formSlideValue: {
        titlePrimary: '',
        titleSecondary: '',
        order: '',
    },
    productFromCombo: null,
    error: null,
    arrProductIdRemoved: [],
    arrProductOriginal: [],
};

export const getSlidePage = createAsyncThunk(
    '/slide/get-slide-page',
    async (page) => {
        try {
            const response = await getSlidePageApi(page);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getAllSlide = createAsyncThunk(
    '/slide/get-all-slide',
    async () => {
        try {
            const response = await getAllSlideApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addSlide = createAsyncThunk(
    '/slide/add-slide',
    async (formData) => {
        try {
            const response = await addSlideApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const removeSlide = createAsyncThunk(
    '/slide/remove-slide',
    async ({ titlePrimary, titleSecondary, order, imgSlide }) => {
        try {
            const response = await removeSlideApi(
                titlePrimary,
                titleSecondary,
                order,
                imgSlide
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const slideShowSlice = createSlice({
    name: 'slide',
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSlidePage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSlidePage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.slide = action.payload;
            })
            .addCase(getSlidePage.rejected, (state) => {
                state.isLoading = false;
            })

            //get All Slide
            .addCase(getAllSlide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSlide.fulfilled, (state, action) => {
                state.isLoading = false;
                state.slide = action.payload.data;
            })
            .addCase(getAllSlide.rejected, (state) => {
                state.isLoading = false;
            })

            //add 
            .addCase(addSlide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addSlide.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addSlide.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //delete 
            .addCase(removeSlide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeSlide.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(removeSlide.rejected, (state, action) => {
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
} = slideShowSlice.actions;
export default slideShowSlice.reducer;
