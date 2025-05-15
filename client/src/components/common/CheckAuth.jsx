/* eslint-disable react/prop-types */

import { Navigate, useLocation } from 'react-router';

function CheckAuth({ isAuthenticated, role, children }) {
    const location = useLocation();

    if (location.pathname === '/') {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        if (role === 'admin') return <Navigate to="/admin/dashboard" />;
    }

    if (
        !isAuthenticated &&
        !['/login', '/register'].some((path) =>
            location.pathname.startsWith(path)
        )
    ) {
        return <Navigate to="/login" />;
    }

    if (
        isAuthenticated &&
        ['/login', '/register'].some((path) =>
            location.pathname.startsWith(path)
        )
    ) {
        return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/'} />;
    }

    if (
        isAuthenticated &&
        role !== 'admin' &&
        location.pathname.startsWith('/admin')
    ) {
        return <Navigate to="/unauth-page" />;
    }

    if (
        isAuthenticated &&
        role === 'admin' &&
        !location.pathname.startsWith('/admin')
    ) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
