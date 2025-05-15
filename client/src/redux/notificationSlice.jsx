import {
    deleteNotifySingleApi,
    getAllNotificationTypeAdminApi,
    setAllNotifyReadedApi,
    setNotifySingleReadedApi,
} from '@/api/notificationService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    notifications: [],
};

export const getAllNotificationTypeAdmin = createAsyncThunk(
    '/notification/get-notification-admin',
    async () => {
        try {
            const response = await getAllNotificationTypeAdminApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const setAllNotifyReaded = createAsyncThunk(
    '/notification/set-all-notify-readed',
    async () => {
        try {
            const response = await setAllNotifyReadedApi();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const setNotifySingleReaded = createAsyncThunk(
    '/notification/set-single-notify-readed',
    async (id) => {
        try {
            const response = await setNotifySingleReadedApi(id);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const deleteNotifySingle = createAsyncThunk(
    '/notification/delete-single-notify',
    async (id) => {
        try {
            const response = await deleteNotifySingleApi(id);
            return response;
        } catch (error) {
            return error;
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotificationTypeAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotificationTypeAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload.data;
            })
            .addCase(getAllNotificationTypeAdmin.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(setAllNotifyReaded.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setAllNotifyReaded.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(setAllNotifyReaded.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(setNotifySingleReaded.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setNotifySingleReaded.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(setNotifySingleReaded.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(deleteNotifySingle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNotifySingle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteNotifySingle.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default notificationSlice.reducer;
