import axiosInstancePrivate from '@/api/axiosInstance';
import unitServicePrivate, { getAllUnitApi } from '@/api/unitService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: null,
    units: null,
};
export const getAllUnit = createAsyncThunk('/unit/get-all-unit', async () => {
    try {
        const response = await getAllUnitApi();
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const addUnit = createAsyncThunk(
    '/unit/add-unit',
    async (name, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = unitServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addUnitApi(name);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteUnit = createAsyncThunk(
    '/unit/delete-unit',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = unitServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteUnitApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const unitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUnit.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUnit.fulfilled, (state, action) => {
                state.isLoading = false;
                state.units = action.payload?.data;
                state.error = null;
            })
            .addCase(getAllUnit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            .addCase(addUnit.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addUnit.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addUnit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteUnit.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            });
    },
});

export default unitSlice.reducer;
