import Button from '@/components/common/Button/Button';
import add_white from '@/assets/icon/add_white.svg';
import in_white from '@/assets/icon/in_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import { getOrderPage } from '@/redux/orderSlice';
import FormatVND from '@/components/common/FormatVND';
import formatDate from '@/components/common/formatDate';
import formatFullDate from '@/components/common/formatFullDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const listStatusOrder = [
    { name: 'Tất cả', value: 'all' },
    { name: 'Chưa nhận bàn', value: 'pending' },
    { name: 'Đã nhận bàn', value: 'pending' },
    { name: 'Đã hủy', value: 'canceled' },
    { name: 'Đã hoàn thành', value: 'paid' },
];

const categoryOrderAll = [
    { name: 'Dự kiến nhận bàn' },
    { name: 'Khách hàng' },
    { name: 'Đặt cọc' },
    { name: 'Số khách' },
    { name: 'Khu vực/Bàn' },
    { name: 'Trạng thái' },
];

const categoryOrderPending = [
    { name: 'Dự kiến nhận bàn' },
    { name: 'Khách hàng' },
    { name: 'Đặt cọc' },
    { name: 'Số khách' },
    { name: 'Khu vực/Bàn' },
    { name: 'Trạng thái' },
];

const categoryOrderPaid = [
    { name: 'STT' },
    { name: 'Thu ngân' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Thời gian thanh toán' },
    { name: 'Tổng tiền' },
];

const categoryOrderCancel = [
    { name: 'STT' },
    { name: 'Người hủy' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Thời gian hủy' },
    { name: 'Tổng tiền' },
];

function HistorySetTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state.user);
    const orderStore = useSelector((state) => state.order);

    const [currentPage, setCurrentPage] = useState(1);

    const [statusOrderCurrent, setStatusOrderCurrent] = useState('all');

    useEffect(() => {
        dispatch(getOrderPage(currentPage));
    }, [dispatch]);

    const renderCategoryStatusOrder = (arr) => {
        return arr.map((item, index) => (
            <div
                key={index}
                className={`text-text-primary ${
                    index === 0
                        ? 'col-span-1 text-center'
                        : 'col-span-2 text-center'
                }`}
            >
                {item.name}
            </div>
        ));
    };

    return (
        <div className="font-cabin text-text-primary">
            <h1 className="mb-5 text-text-primary text-xl font-medium">
                Lịch sử đơn hàng
            </h1>
            <div className="w-44 mb-5">
                <Button
                    icon={add_white}
                    title="Tạo đơn đặt bàn"
                    bg="add"
                    text_color="white"
                />
            </div>

            {/* list status order */}
            <div className="flex pb-4 border-b border-border-primary">
                {listStatusOrder.map((item, index) => (
                    <div
                        onClick={() => setStatusOrderCurrent(item.value)}
                        key={index}
                        className={` px-4 py-1 cursor-pointer ${
                            item.value === statusOrderCurrent &&
                            'text-yellow-primary'
                        }`}
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            {/* list category */}
            <div className="grid grid-cols-12 items-center py-5 ">
                {renderCategoryStatusOrder(
                    (statusOrderCurrent === 'all' && categoryOrderAll) ||
                        (statusOrderCurrent === 'pending' &&
                            categoryOrderPending) ||
                        (statusOrderCurrent === 'paid' && categoryOrderPaid) ||
                        (statusOrderCurrent === 'canceled' &&
                            categoryOrderCancel)
                )}
            </div>

            {/* list order */}
            <div>
                {orderStore.ordersPage?.data?.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-12 items-center py-2 mb-5 bg-bg-tertiary
                                    rounded-md hover:bg-color-active cursor-pointer"
                        onClick={() =>
                            navigate(`/admin/order/history-order/${item._id}`)
                        }
                    >
                        <div className="col-span-1 text-center">
                            {index + 1}
                        </div>
                        <div className="col-span-2 text-center">
                            {userStore.user?.username}
                        </div>
                        <div className="col-span-2 text-center">
                            {item.tableSeleted.name +
                                ' - ' +
                                item.tableSeleted.area.name}
                        </div>
                        <div className="flex flex-col col-span-2 text-center">
                            <span>{item.customer?.username}</span>
                            <span>{item.phoneCustomer}</span>
                        </div>
                        <div
                            className={`col-span-2  text-center 
                                    rounded-xl py-1 ${
                                        ['all', 'pending'].includes(
                                            statusOrderCurrent
                                        )
                                            ? item.paymentStatus === 'paid'
                                                ? 'text-green-500 bg-green-100'
                                                : 'text-yellow-500 bg-yellow-100'
                                            : 'text-gray-500 bg-gray-100'
                                    }`}
                        >
                            {['all', 'pending'].includes(statusOrderCurrent)
                                ? item.paymentStatus === 'paid'
                                    ? 'Đã thanh toán'
                                    : 'Đang chờ'
                                : item.updatedAt
                                ? formatFullDate(item.updatedAt)
                                : '---'}
                        </div>
                        <div className="col-span-2 text-center">
                            {FormatVND(item.totalPrice)}
                        </div>
                        <div className="flex justify-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className="text-gray-400 hover:text-orange-400 
                                                                   transition-all duration-200 ease-linear"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20">
                <PaginationCommon
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={orderStore.orders?.totalOrder}
                    pageSize={orderStore.orders?.pageSize}
                    getPageFunc={getOrderPage}
                    dataUpload={currentPage}
                    type="order"
                />
            </div>
        </div>
    );
}

export default HistorySetTable;
