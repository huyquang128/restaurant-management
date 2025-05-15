import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';
import { deleteUsers, getAllStaffRole, getStaffPage } from '@/redux/userSlice';

const categories = [
    { name: 'Tài khoản' },
    { name: 'Email' },
    { name: 'Họ và tên' },
    { name: 'Ngày sinh' },
    { name: 'Điện thoại' },
];

function ListStaff() {
    const userStore = useSelector((state) => state.user);

    // const [charSearch, setCharSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="font-cabin ">
            <div
                className="text-xl font-medium mb-5 text-text-primary flex justify-between
                             flex-wrap items-center"
            >
                <h2>Danh sách nhân viên</h2>
                <div className="items-center">
                    <Link to="/admin/staff/add-staff">
                        <Button
                            icon={add_white}
                            title="Thêm nhân viên"
                            bg="add"
                            text_color="white"
                            bg_border="black"
                        />
                    </Link>
                </div>
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
                    ) <span className="">nhân viên</span>
                </div>
            </div>

            <BlockListItemCommon
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                arr={userStore.users?.data}
                arrCategory={categories}
                isLoading={userStore.isLoading}
                totalProducts={userStore.userStore?.totalStaff}
                pageSize={userStore.userStore?.pageSize}
                getPageFunc={getStaffPage}
                dataUpload={currentPage}
                intro="Quản lý thông tin nhân viên"
                type="customer-admin"
                linkToDetailItem="/admin/menus"
                title="Menu"
                funcCallApiDelete={deleteUsers}
                funcCallApiGet={getAllStaffRole}
            />
        </div>
    );
}

export default ListStaff;
