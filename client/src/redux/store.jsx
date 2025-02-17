import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice/index';
import authReducer from './authSlice/index';
import categoryDishesReducer from './categoryDishesSlice';
import unitReducer from './unitSlice';
import productReducer from './productSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'unit', 'product', 'categoryDishes'],
};

const rootReducer = {
    auth: authReducer,
    user: userReducer,
    categoryDishes: categoryDishesReducer,
    unit: unitReducer,
    product: productReducer,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(rootReducer)
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, //Action này dọn dẹp các cập nhật trạng thái chưa được lưu vào storage, đảm bảo rằng mọi thay đổi trong Redux store sẽ được đồng bộ hoàn toàn vào storage
                    REHYDRATE, //  khôi phục lại (rehydrate) state từ storage vào Redux store khi ứng dụng khởi động
                    PAUSE, //Action này tạm dừng quá trình lưu trữ. Khi PAUSE được kích hoạt, Redux sẽ ngừng lưu state vào storage cho đến khi PERSIST được gọi lại.
                    PERSIST, //kích hoạt quá trình lưu trữ (persist) state của Redux vào storage
                    PURGE, //xóa dữ liệu đã được lưu trữ trong storage
                    REGISTER, //Action này được dispatch khi một reducer được đăng ký (register) với Redux Persist. Nó giúp xác định reducer nào đang sử dụng persist trong store.
                ],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
