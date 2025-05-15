import { Outlet } from 'react-router';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';
import { useSelector } from 'react-redux';

function AdminLayout() {
    const authStore = useSelector((state) => state.auth);

    if (authStore.isLoading) return null;

    return (
        <div className="bg-bg-primary transition-colors ease-linear duration-300">
            <SidebarAdmin />
            <div className="pb-5 pt-24 bg-bg-primary shadow-header-shadow">
                <HeaderAdmin />
                <div
                    className="ml-64 p-5 bg-bg-primary rounded-lg max-md:ml-0 
                            hover:shadow-header-shadow transition-shadow ease-in-out duration-500
                            min-h-screen"
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
