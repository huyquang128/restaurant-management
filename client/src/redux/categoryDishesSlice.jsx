import axiosInstancePrivate from '@/api/axiosInstance';
import categoryDishesPrivate, {
    getAllCategoriesDishesApi,
} from '@/api/categoryDishesService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialValues = {
    isLoading: false,
    category_dishes: null,
    error: null,
};

export const getAllCategoriesDishes = createAsyncThunk(
    '/category-dishes/get-all-category-dishes',
    async () => {
        try {
            const response = await getAllCategoriesDishesApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addCategoryDishes = createAsyncThunk(
    '/category-dishes/add-category-dishes',
    async (name, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = categoryDishesPrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addCategoriesDishesApi(name);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const deleteCategoryDishes = createAsyncThunk(
    '/category-dishes/delete-category-dishes',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = categoryDishesPrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteCategoriesDishesApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

const categoryDishesSlice = createSlice({
    name: 'category_dishes',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategoriesDishes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategoriesDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category_dishes = action.payload?.data;
            })
            .addCase(getAllCategoriesDishes.rejected, (state) => {
                state.isLoading = false;
            })
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

export default categoryDishesSlice.reducer;
