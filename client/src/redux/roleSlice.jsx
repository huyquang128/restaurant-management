import {
    getAllRoleApi,
    getRoleNameApi,
    getRoleUserApi,
    updatePermessionsApi,
} from '@/api/roleService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    role: null,
    roles: null,
    formValueRole: {
        name: '',
    },
    selectedCategories: [],
};

export const getRoleUser = createAsyncThunk('/role/get-role-user', async () => {
    try {
        const response = await getRoleUserApi();
        return response;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
});

export const getAllRole = createAsyncThunk('/role/get-all-role', async () => {
    try {
        const response = await getAllRoleApi();
        return response;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
});

export const getRoleName = createAsyncThunk(
    '/role/get-role-name',
    async (name) => {
        try {
            const response = await getRoleNameApi(name);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }
);

export const updatePermessions = createAsyncThunk(
    '/role/update-permessions-role',
    async ({ roleId, permissions }) => {
        try {
            const response = await updatePermessionsApi(roleId, permissions);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }
);

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setArrPermessions: (state, action) => {
            state.selectedCategories =
                state.selectedCategories &&
                state.selectedCategories.includes(action.payload)
                    ? state.selectedCategories.filter(
                          (item) => item !== action.payload
                      )
                    : [...state.selectedCategories, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoleUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRoleUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.role = action.payload.data;
            })
            .addCase(getRoleUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(getAllRole.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload.data;
            })
            .addCase(getAllRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(getRoleName.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRoleName.fulfilled, (state, action) => {
                state.isLoading = false;
                state.role = action.payload.data;
                state.formValueRole = {
                    name:
                        (action.payload.data?.name === 'staff' &&
                            'Nhân viên') ||
                        (action.payload.data?.name === 'user' &&
                            'Khách hàng') ||
                        'admin',
                };
                state.selectedCategories = [...action.payload.data.permissions];
            })
            .addCase(getRoleName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            //
            .addCase(updatePermessions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePermessions.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updatePermessions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export const { setArrPermessions } = roleSlice.actions;
export default roleSlice.reducer;
