/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import axiosInstancePrivate from '@/api/axiosInstance';
import categoryDishesPrivate, {
    getAllCategoriesDishesApi,
    getCategoryDishesSlugApi,
} from '@/api/categoryDishesService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialValues = {
    isLoading: false,
    category_dishes: null,
    formMenuCategoryValue: {
        name: '',
    },
    productFromCategory: null,
    error: null,
    arrProductIdRemoved: [],
    arrProductOriginal: [],
};

export const getAllCategoriesDishes = createAsyncThunk(
    '/category-dishes/get-all-category-dishes',
    async (page) => {
        try {
            const response = await getAllCategoriesDishesApi(page);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getCategoryDishesSlug = createAsyncThunk(
    '/category-dishes/get-category-slug',
    async (page) => {
        try {
            const response = await getCategoryDishesSlugApi(page);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addCategoryDishes = createAsyncThunk(
    '/category-dishes/add-category-dishes',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = categoryDishesPrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addCategoriesDishesApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const updateCategoryDishes = createAsyncThunk(
    '/category-dishes/update-category-dishes',
    async (
        { formData, categoryId },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = categoryDishesPrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.updateCategoriesDishesApi({
                formData,
                categoryId,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const deleteCategoryDishes = createAsyncThunk(
    '/category-dishes/remove-category-dishes',
    async (categoryIds, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = categoryDishesPrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteCategoriesDishesApi(categoryIds);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

const categoryDishesSlice = createSlice({
    name: 'category_dishes',
    initialState: initialValues,
    reducers: {
        resetForm: (state) => {
            state.formMenuCategoryValue.name = '';
        },
        setProductSelectedCategory: (state, action) => {
            let currentProducts = Array.isArray(state.category_dishes?.products)
                ? [...state.category_dishes?.products]
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

            state.category_dishes &&
                (state.category_dishes.products = [...currentProducts]);
        },
        deleteProductTemp: (state, action) => {
            state.category_dishes &&
                (state.category_dishes.products =
                    state.category_dishes?.products?.filter(
                        (product) => product._id !== action.payload
                    ));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategoriesDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategoriesDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category_dishes = action.payload;
            })
            .addCase(getAllCategoriesDishes.rejected, (state) => {
                state.isLoading = false;
            })

            //get Category Dishes by slug
            .addCase(getCategoryDishesSlug.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryDishesSlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.formMenuCategoryValue = {
                    name: action.payload?.data.name,
                };
                state.category_dishes = action.payload?.data;
                state.arrProductOriginal = action.payload?.data && [
                    ...action.payload.data.products,
                ];
            })
            .addCase(getCategoryDishesSlug.rejected, (state) => {
                state.isLoading = false;
            })

            //add Category Dishes
            .addCase(addCategoryDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategoryDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addCategoryDishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //update Category Dishes
            .addCase(updateCategoryDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategoryDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCategoryDishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //delete Category Dishes
            .addCase(deleteCategoryDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategoryDishes.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteCategoryDishes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    resetForm,
    deleteProductTemp,
    selectedProductTemp,
    setProductSelectedCategory,
} = categoryDishesSlice.actions;
export default categoryDishesSlice.reducer;
