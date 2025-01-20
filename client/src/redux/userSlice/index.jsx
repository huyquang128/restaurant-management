import { getUserByIdApi } from '@/api/userService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    currentImgIndex: 0,
    user: null,
};

export const getUserById = createAsyncThunk(
    '/user/get-user-by-id',
    async (formData) => {
        try {
            const response = await getUserByIdApi(formData);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentImgIndex: (state, action) => {
            state.currentImgIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.data;
            })
            .addCase(getUserById.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default userSlice.reducer;
export const { setCurrentImgIndex } = userSlice.actions;
