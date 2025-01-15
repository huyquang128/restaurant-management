/* eslint-disable react/prop-types */

import { Outlet } from 'react-router';

function AuthLayout({ type }) {
    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthLayout;
