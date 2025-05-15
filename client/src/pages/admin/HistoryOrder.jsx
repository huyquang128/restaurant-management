import Button from '@/components/common/Button/Button';
import add_white from '@/assets/icon/add_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import {
    getOrderPage,
    getOrderPageCanceled,
    getOrderPagePaid,
    getOrderPagePending,
} from '@/redux/orderSlice';
import FormatVND from '@/components/common/FormatVND';
import formatDate from '@/components/common/formatDate';
import formatFullDate from '@/components/common/formatFullDate';
import arr_down_3 from '@/assets/icon/arr_down_3.svg';
import arr_down_3_white from '@/assets/icon/arr_down_3_white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import CapitalizeWord from '@/components/common/CapitalizeWord';
import codeOrderId from '@/components/common/codeOrderId';

const listStatusOrder = [
    { name: 'Tất cả', value: 'all' },
    { name: 'Đang chờ thanh toán', value: 'pending' },
    { name: 'Đã thanh toán', value: 'paid' },
    { name: 'Đã hủy', value: 'canceled' },
];

const categoryOrderAll = [
    { name: 'Mã ĐH' },
    { name: 'Thu ngân' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Trạng thái' },
    { name: 'Tổng tiền' },
];

const categoryOrderPending = [
    { name: 'Mã ĐH' },
    { name: 'Thu ngân' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Trạng thái' },
    { name: 'Tổng tiền' },
];

const categoryOrderPaid = [
    { name: 'Mã ĐH' },
    { name: 'Thu ngân' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Thời gian TT' },
    { name: 'Tổng tiền' },
];

const categoryOrderCancel = [
    { name: 'Mã ĐH' },
    { name: 'Người hủy' },
    { name: 'Khu vực/Bàn' },
    { name: 'Thông tin KH' },
    { name: 'Thời gian hủy' },
    { name: 'Tổng tiền' },
];

function HistoryOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state.user);
    const authStore = useSelector((state) => state.auth);
    const orderStore = useSelector((state) => state.order);

    const [currentPage, setCurrentPage] = useState(1);

    const [statusOrderCurrent, setStatusOrderCurrent] = useState('all');

    useEffect(() => {
        dispatch(
            (statusOrderCurrent === 'all' && getOrderPage(currentPage)) ||
                (statusOrderCurrent === 'pending' &&
                    getOrderPagePending(currentPage)) ||
                (statusOrderCurrent === 'paid' &&
                    getOrderPagePaid(currentPage)) ||
                (statusOrderCurrent === 'canceled' &&
                    getOrderPageCanceled(currentPage))
        );
        setCurrentPage(1);
    }, [dispatch, statusOrderCurrent]);

    const renderCategoryStatusOrder = (arr) => {
        return arr.map((item, index) => (
            <div
                key={index}
                className={` ${
                    index === 0
                        ? 'col-span-2 text-center justify-center'
                        : 'col-span-2 text-center justify-center'
                }  flex items-center gap-3`}
            >
                {item.name}
                <img
                    src={
                        authStore.theme === 'light'
                            ? arr_down_3
                            : arr_down_3_white
                    }
                    alt=""
                    className="h-2 translate-y-0.5"
                />
            </div>
        ));
    };

    return (
        <div className="font-cabin text-text-primary">
            <h1 className="mb-5 text-text-primary text-xl font-medium">
                Lịch sử đơn hàng
            </h1>

            {/* list status order */}
            <div className="flex pb-4 border-b border-border-primary font-semibold opacity-80">
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
            <div
                className={`grid grid-cols-12 items-center py-3 ${
                    authStore.theme === 'light'
                        ? 'bg-[#01b075]'
                        : 'bg-[#246851]'
                }  rounded-lg text-white`}
            >
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
            <div className="bg-bg-secondary mt-5 rounded-lg">
                {orderStore.ordersPage?.data?.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-12 items-center py-4 
                                    rounded-md hover:bg-color-active cursor-pointer"
                        onClick={() =>
                            navigate(`/admin/order/history-order/${item._id}`)
                        }
                    >
                        <div className="col-span-2 text-center">
                            {codeOrderId(item?._id)}
                        </div>
                        <div className="col-span-2 text-center">
                            {statusOrderCurrent === 'canceled'
                                ? CapitalizeFirstLetter(item.customer?.name)
                                : CapitalizeFirstLetter(
                                      userStore.user?.username
                                  )}
                        </div>
                        <div className="col-span-2 text-center">
                            {(item.tableSeleted?.name || '--') +
                                ' - ' +
                                (item.tableSeleted?.area?.name || '--')}
                        </div>
                        <div className="flex flex-col col-span-2 text-center">
                            <span>
                                {CapitalizeWord(item.customer?.name || '') ||
                                    item.customer?.username}
                            </span>
                            <span>{item.phoneCustomer}</span>
                        </div>
                        <div
                            className={`col-span-2 text-center
                                                rounded-xl py-2 font-semibold ${
                                                    ([
                                                        'all',
                                                        'pending',
                                                    ].includes(
                                                        statusOrderCurrent
                                                    ) &&
                                                        item.paymentStatus ===
                                                            'paid' &&
                                                        'text-green-500 bg-green-100') ||
                                                    (item.paymentStatus ===
                                                        'pending' &&
                                                        'text-yellow-500 bg-orange-100') ||
                                                    (item.paymentStatus ===
                                                        'canceled' &&
                                                        'text-red-500 bg-red-100') ||
                                                    (['paid'].includes(
                                                        statusOrderCurrent
                                                    ) &&
                                                        'text-green-500 bg-green-100') ||
                                                    (['canceled'].includes(
                                                        statusOrderCurrent
                                                    ) &&
                                                        'text-red-500 bg-red-100')
                                                }`}
                        >
                            {['all', 'pending'].includes(statusOrderCurrent)
                                ? (item.paymentStatus === 'pending' &&
                                      'Đang chờ') ||
                                  (item.paymentStatus === 'paid' &&
                                      'Đã thanh toán') ||
                                  (item.paymentStatus === 'canceled' &&
                                      'Đã hủy')
                                : item.updatedAt
                                ? formatFullDate(item.updatedAt)
                                : '---'}
                        </div>
                        <div className="col-span-2 text-center">
                            {FormatVND(item.totalPrice)}
                        </div>
                        {/* <div className="flex justify-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className="text-gray-400 hover:text-orange-400
                                                 transition-all duration-200 ease-linear"
                            />
                        </div> */}
                    </div>
                ))}
            </div>

            <div className="mt-20 flex justify-end">
                <PaginationCommon
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={orderStore.ordersPage?.totalOrders}
                    pageSize={orderStore.ordersPage?.pageSize}
                    getPageFunc={
                        (statusOrderCurrent === 'all' && getOrderPage) ||
                        (statusOrderCurrent === 'pending' &&
                            getOrderPagePending) ||
                        (statusOrderCurrent === 'paid' && getOrderPagePaid) ||
                        (statusOrderCurrent === 'canceled' &&
                            getOrderPageCanceled)
                    }
                    dataUpload={currentPage}
                    type="order"
                />
            </div>
        </div>
    );
}

export default HistoryOrder;
