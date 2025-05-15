import axiosInstancePrivate from '@/api/axiosInstance';
import userService from '@/api/userService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../authSlice';

const initialState = {
    isLoading: false,
    currentImgIndex: 0,
    user: null,
    users: null,
    formInfoUser: {
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        detailed: '',
    },
    urlImgAvatar: null,
    isAppLoading: true,
};

export const getUserById = createAsyncThunk(
    '/user/get-user-by-id',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.getUserByIdApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllUserRole = createAsyncThunk(
    '/user/get-all-user-role',
    async ({ rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.getAllUserRoleApi();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUserPage = createAsyncThunk(
    '/user/get-user-page',
    async (page, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.getUserPageApi(page);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllStaffRole = createAsyncThunk(
    '/user/get-all-staff-role',
    async ({ rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.getAllStaffRoleApi();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getStaffPage = createAsyncThunk(
    '/user/get-staff-page',
    async (page, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.getStaffPageApi(page);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addStaff = createAsyncThunk(
    '/user/add-staff',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.addStaffApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUsers = createAsyncThunk(
    '/user/remove-user',
    async (userIds, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = userService(axiosInstancePrivate(getState, dispatch));
            const response = await api.deleteUsersApi(userIds);
            return response;
        } catch (error) {
            return rejectWithValue(error);
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
        setAppLoading: (state, action) => {
            state.isAppLoading = action.payload;
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
            })

            //
            .addCase(getAllUserRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUserRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.data;
            })
            .addCase(getAllUserRole.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getUserPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUserPage.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getAllStaffRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStaffRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.data;
            })
            .addCase(getAllStaffRole.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getStaffPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStaffPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getStaffPage.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(addStaff.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addStaff.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addStaff.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(deleteUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUsers.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteUsers.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default userSlice.reducer;
export const { setCurrentImgIndex, setAppLoading } = userSlice.actions;
