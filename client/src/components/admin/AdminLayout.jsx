import { Outlet } from 'react-router';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';

function AdminLayout() {
    return (
        <div className="bg-bg-primary transition-colors ease-linear duration-300">
            <SidebarAdmin />
            <div className="flex-1 ml-56 max-md:ml-0 pb-5">
                <HeaderAdmin />
                <div className="p-5 bg-bg-secondary rounded-lg m-4 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
