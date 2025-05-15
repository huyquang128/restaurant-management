import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import { getAllRole } from '@/redux/roleSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

function ListRole() {
    const dispatch = useDispatch();

    const roleStore = useSelector((state) => state.role);
    useEffect(() => {
        dispatch(getAllRole());
    }, [dispatch]);

    return (
        <div className="font-cabin ">
            <div className="flex justify-between items-center">
                <div className="text-xl font-medium mb-5 text-text-primary">
                    Phân quyền người dùng
                </div>

                <div className="flex justify-between mb-5 flex-wrap items-center">
                    <Link to="/admin/combo/add-combo">
                        <Button
                            icon={add_white}
                            title="Thêm vai trò"
                            bg="add"
                            text_color="white"
                            bg_border="black"
                        />
                    </Link>
                </div>
            </div>

            {/* list role */}
            <div>
                <div className="text-lg font-medium mb-5 text-text-primary border-b py-3">
                    Danh sách vai trò
                </div>
                <div className="flex flex-col gap-4">
                    {roleStore.roles?.map((item, index) => (
                        <Link
                            key={index}
                            to={`/admin/staff/list-staff/access-control/${item.name}`}
                        >
                            <div
                                className="text-text-primary bg-bg-tertiary p-3 
                                         rounded-md cursor-pointer hover:bg-color-active"
                            >
                                {(item.name === 'user' && 'Khách hàng') ||
                                    (item.name === 'staff' && 'Nhân viên') ||
                                    item.name}
                            </div>
                        </Link>
                    ))}
                </div>

                <div></div>
            </div>
        </div>
    );
}

export default ListRole;
