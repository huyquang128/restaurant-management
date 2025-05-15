import {
    addReviewApi,
    getAllReviewApi,
    respondToReviewApi,
    updateReviewApi,
} from '@/api/reviewService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: null,
    isLoading: false,
    contentReviewer: '',
    starSelected: null,
};

export const getAllReview = createAsyncThunk(
    '/review/get-all-review',
    async () => {
        try {
            const response = await getAllReviewApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const addReview = createAsyncThunk(
    '/review/add-review',
    async (formData) => {
        try {
            const response = await addReviewApi(formData);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const updateReview = createAsyncThunk(
    '/review/update-review/',
    async ({ id, formData }) => {
        try {
            const response = await updateReviewApi(id, formData);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const respondToReview = createAsyncThunk(
    '/review/response-review',
    async ({ id, formData }) => {
        try {
            const response = await respondToReviewApi(id, formData);
            return response;
        } catch (error) {
            return error;
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setContentReviewer: (state, action) => {
            state.contentReviewer = action.payload;
        },

        setStarSelected: (state, action) => {
            state.starSelected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(updateReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(respondToReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(respondToReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(respondToReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(getAllReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getAllReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const { setContentReviewer, setStarSelected } = reviewSlice.actions;
export default reviewSlice.reducer;
