import { Routes, Route, Navigate } from 'react-router';
import { routerPublic } from './routes';
import HomeLayout from './pages/User/HomeLayout';
import AuthLayout from './pages/auth/AuthLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, setAppLoading } from './redux/userSlice';
import AdminLayout from './components/admin/AdminLayout';
import useTheme from './components/hooks/useTheme';
import CheckAuth from './components/common/CheckAuth';
import GlobalLoading from './components/LoadingGlobal';
import { refreshToken } from './redux/authSlice';
// import RotatingLinesCommon from './components/common/spinnerAnimation/RotatingLinesCommon';

function App() {
    const dispatch = useDispatch();

    const { isAuthenticated, user, theme, isRefreshingToken, isAppLoading } =
        useSelector((state) => state?.auth);

    const role = user?.role;
    const id = user?._id;

    useEffect(() => {
        dispatch(setAppLoading(true)); // ✅ Đảm bảo bật loading từ đầu

        const loadApp = async () => {
            try {
                const start = Date.now();

                await dispatch(refreshToken()).unwrap(); // Gọi refresh

                const elapsed = Date.now() - start;
                const minDelay = 3000;

                if (elapsed < minDelay) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, minDelay - elapsed)
                    );
                }
            } catch (err) {
                console.error('Refresh token failed:', err);
            } finally {
                dispatch(setAppLoading(false));
            }
        };

        loadApp();
    }, [dispatch]);

    // Gọi API lấy user nếu có ID
    useEffect(() => {
        if (isAuthenticated && id) {
            dispatch(getUserById(id));
        }
    }, [isAuthenticated, id, dispatch, isRefreshingToken]);

    // theme change
    useTheme(theme);

    // Tránh render layout khi role chưa sẵn sàng
    if (isAppLoading || (isAuthenticated && (!role || isRefreshingToken))) {
        return <GlobalLoading />;
    }

    return (
        <>
            <Routes>
                {routerPublic.map((route, index) => {
                    let Layout;

                    switch (route.layout) {
                        case 'auth':
                            Layout = <AuthLayout />;
                            break;
                        case 'admin':
                            Layout = <AdminLayout />;
                            break;
                        default:
                            Layout = <HomeLayout />;
                    }

                    const WrappedLayout = (
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            role={role}
                        >
                            {Layout}
                        </CheckAuth>
                    );

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={WrappedLayout}
                        >
                            <Route path={route.path} element={route.components}>
                                {route.child && route.child.length > 0 && (
                                    <Route
                                        index
                                        element={
                                            <Navigate
                                                to={route.child[0].path}
                                                replace
                                            />
                                        }
                                    />
                                )}
                                {route.child?.map((routeChild, indexChild) => (
                                    <Route
                                        key={indexChild}
                                        path={routeChild.path}
                                        index
                                        element={routeChild.components}
                                    />
                                ))}
                            </Route>
                        </Route>
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
