import { Outlet } from 'react-router';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';

function AdminLayout() {
    return (
        <div className="flex bg-bg-primary">
            <SidebarAdmin />
            <div className="flex-1">
                <HeaderAdmin />
                <div className="p-5 bg-bg-secondary rounded-lg m-4 h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
