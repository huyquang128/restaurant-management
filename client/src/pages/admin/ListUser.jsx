import { useSelector } from 'react-redux';
import { useState } from 'react';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';
import { deleteUsers, getAllUserRole, getUserPage } from '@/redux/userSlice';

const categories = [
    { name: 'Tài khoản' },
    { name: 'Email' },
    { name: 'Họ và tên' },
    { name: 'Ngày sinh' },
    { name: 'Điện thoại' },
];

function ListUser() {
    const userStore = useSelector((state) => state.user);

    // const [charSearch, setCharSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="font-cabin ">
            {userStore.isLoading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                    <span>Đang tải...</span>
                </div>
            )}

            <div
                className="text-xl font-medium mb-5 text-text-primary flex justify-between
                             flex-wrap items-center"
            >
                <h2>Danh sách khách hàng</h2>
            </div>

            {/* search product */}
            <div
                className="mb-5 flex justify-between text-text-primary items-center
                        max-sm:flex-col-reverse max-sm:items-end opacity-80"
            >
                <div className="max-sm:mt-5">
                    <span className="">Hiển thị </span>(
                    {userStore.users
                        ? (userStore.users?.data?.length || 0) +
                          ' / ' +
                          (userStore.users?.totalUser || 0)
                        : 0}
                    ) <span className="">Khách hàng</span>
                </div>
            </div>

            <BlockListItemCommon
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                arr={userStore.users?.data}
                arrCategory={categories}
                isLoading={userStore.isLoading}
                totalProducts={userStore?.users?.totalUser}
                pageSize={userStore?.users?.pageSize}
                getPageFunc={getUserPage}
                dataUpload={currentPage}
                intro="Quản lý thông tin khách hàng"
                type="customer-admin"
                linkToDetailItem="/admin/customer/customer-detail"
                title="Menu"
                funcCallApiDelete={deleteUsers}
                funcCallApiGet={getAllUserRole}
            />
        </div>
    );
}

export default ListUser;
