import {
    GetDistrictsFromVnApi,
    GetProvincesFromVnApi,
    GetWardsFromVnApi,
} from '@/api/cityVnService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

export const GetProvincesFromVn = createAsyncThunk(
    '/city/get-city-api',
    async () => {
        try {
            const response = await GetProvincesFromVnApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetDistrictsFromVn = createAsyncThunk(
    '/city/get-province-api',
    async () => {
        try {
            const response = await GetDistrictsFromVnApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetWardsFromVn = createAsyncThunk(
    '/city/get-ward-api',
    async () => {
        try {
            const response = await GetWardsFromVnApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProvincesFromVn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GetProvincesFromVn.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(GetProvincesFromVn.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(GetDistrictsFromVn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GetDistrictsFromVn.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(GetDistrictsFromVn.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(GetWardsFromVn.pending, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(GetWardsFromVn.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(GetWardsFromVn.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default citySlice.reducer;
