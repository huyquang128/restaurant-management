import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    currentImgIndex: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentImgIndex: (state, action) => {
            state.currentImgIndex = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export default userSlice.reducer;
export const { setCurrentImgIndex } = userSlice.actions;
