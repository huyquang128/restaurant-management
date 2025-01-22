import { Routes, Route } from 'react-router';
import { routerPublic } from './routes';
import HomeLayout from './pages/User/HomeLayout';
import AuthLayout from './pages/auth/AuthLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from './redux/userSlice';
import axiosInstance from './api/axiosInstance';
import { store } from './redux/store';
import AdminLayout from './components/admin/AdminLayout';

function App() {
    const dispatch = useDispatch();
    let decode = null;

    const authStore = useSelector((state) => state.auth);
    const token = useSelector((state) => state?.auth?.accessToken);

    useEffect(() => {
        if (authStore?.isAuthenticated) {
            decode = jwtDecode(token);

            const result = axiosInstance(store);

            if (token) {
                const formData = {
                    id: decode._id,
                    result,
                };

                dispatch(getUserById(formData));
            }
        }
    }, [decode?._id, token]);

    return (
        <Routes>
            {routerPublic.map((route, index) => {
                let LayoutCommon;

                if (route.layout === 'auth') {
                    LayoutCommon = <AuthLayout />;
                } else if (route.layout === 'admin') {
                    LayoutCommon = <AdminLayout />;
                } else {
                    LayoutCommon = <HomeLayout />;
                }

                return (
                    <Route key={index} path={route.path} element={LayoutCommon}>
                        <Route
                            path={route.path}
                            index
                            element={route.components}
                        />
                    </Route>
                );
            })}
        </Routes>
    );
}

export default App;
