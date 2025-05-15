// redux/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modals: [], // Danh sách các modal đang mở, mỗi modal sẽ có type và props riêng
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action) => {
            const { type, props } = action.payload;
            // Nếu modal đã mở thì không mở lại, tránh mở trùng
            if (!state.modals.find((modal) => modal.type === type)) {
                state.modals.push({ type, props });
            }
        },
        hideModal: (state, action) => {
            const { type } = action.payload;
            state.modals = state.modals.filter((modal) => modal.type !== type);
        },
        closeAllModals: (state) => {
            state.modals = [];
        },
    },
});

export const { showModal, hideModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
