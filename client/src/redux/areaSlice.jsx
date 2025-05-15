import { getAllAreaApi } from '@/api/areaService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    areas: null,
};

export const getAllAreas = createAsyncThunk('/area/get-all-areas', async () => {
    try {
        const response = await getAllAreaApi();
        return response;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
});

const areaSlice = createSlice({
    name: 'areas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAreas.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllAreas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.areas = action.payload.data;
            })
            .addCase(getAllAreas.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export default areaSlice.reducer;
