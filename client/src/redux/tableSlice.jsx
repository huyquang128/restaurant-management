import axiosInstancePrivate from '@/api/axiosInstance';
import tablePrivate from '@/api/tableService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    table: null,
    statusTable: null,
    tableIdSelected: null,
};

export const updateStatusTable = createAsyncThunk(
    '/table/update-status-table',
    async (
        { tableId, status, orderId },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            const api = tablePrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.updateStatusTableApi(
                tableId,
                status,
                orderId
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const updateStatusTableWhenInUse = createAsyncThunk(
    '/table/update-status-in-use-table',
    async (tableId, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = tablePrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.updateStatusTableWhenInUseApi(tableId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

export const deleteSetTable = createAsyncThunk(
    '/table/delete-set-table',
    async ({ tableId, orderId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = tablePrivate(axiosInstancePrivate(getState, dispatch));
            const response = await api.deleteSetTableApi(tableId, orderId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setStatusTable: (state, action) => {
            state.statusTable = action.payload;
        },

        setTableIdSelected: (state, action) => {
            state.tableIdSelected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateStatusTable.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateStatusTable.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateStatusTable.rejected, (state) => {
                state.isLoading = false;
            })

            //update-status-in-use-table
            .addCase(updateStatusTableWhenInUse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateStatusTableWhenInUse.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateStatusTableWhenInUse.rejected, (state) => {
                state.isLoading = false;
            })

            //delete Set Table
            .addCase(deleteSetTable.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSetTable.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteSetTable.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setStatusTable, setTableIdSelected } = tableSlice.actions;

export default tableSlice.reducer;
