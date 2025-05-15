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
    isRefreshingToken: false,
    isAuthenticated: false,
    accessToken: null,
    theme: 'light',
    user: null,
};

export const register = createAsyncThunk('/auth/register', async (formData) => {
    try {
        const response = await registerApi(formData);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const login = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await loginApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

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
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshTokenApi();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
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
        setTheme: (state, action) => {
            state.theme = action.payload;
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
                state.user = action.payload?.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(refreshToken.pending, (state) => {
                state.isRefreshingToken = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isRefreshingToken = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload?.accessToken;
                state.user = action.payload?.user;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isRefreshingToken = false;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;
export const { setRefreshToken, setTheme } = authSlice.actions;
