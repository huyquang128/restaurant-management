import {
    loginApi,
    logoutApi,
    refreshTokenApi,
    // refreshTokenApi,
    registerApi,
} from '@/api/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    accessToken: null,
};

export const register = createAsyncThunk('/auth/register', async (formData) => {
    try {
        const response = await registerApi(formData);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const login = createAsyncThunk('/auth/login', async (formData) => {
    try {
        const response = await loginApi(formData);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        const response = await logoutApi();
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const refreshToken = createAsyncThunk(
    '/auth/refresh-token',
    async () => {
        try {
            const response = await refreshTokenApi();
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRefreshToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload?.accessToken;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(refreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload?.accessToken;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;
export const { setRefreshToken } = authSlice.actions;
