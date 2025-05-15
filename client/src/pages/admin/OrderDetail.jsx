import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getOrderById } from '@/redux/orderSlice';

import arr_down_yellow from '@/assets/icon/arr_down_yellow.svg';
import formatFullDate from '@/components/common/formatFullDate';
import ButtonExit from '@/components/common/Button/ButtonExit';
import Button from '@/components/common/Button/Button';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVND';
import { AnimatePresence, motion } from 'framer-motion';
import formarTime from '@/components/common/formarTime';

const arrCategory = [
    { name: 'Thông tin hóa đơn' },
    { name: 'Bàn và khu vực' },
    { name: 'Thông tin khách hàng' },
    { name: 'Chi tiết hóa đơn' },
];

function OrderDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderId } = useParams();

    const orderStore = useSelector((state) => state.order);

    const [categorySelected, setCategorySelected] = useState([]);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch]);

    const handleSelectedCategory = (indexCategory) => {
        setCategorySelected((prev) => {
            return categorySelected.includes(indexCategory)
                ? categorySelected.filter((item) => item !== indexCategory)
                : [...prev, indexCategory];
        });
    };

    const handlePrintBill = () => {
        orderStore.order &&
            navigate(`/admin/order/print/${orderStore.order._id}`);
    };

    return (
        <div className="font-cabin text-text-primary">
            <h1 className="mb-5 text-text-primary text-xl font-medium">
                Chi tiết đơn hàng
            </h1>

            <div>
                {arrCategory.map((item, index) => (
                    <div key={index}>
                        <div
                            onClick={() => handleSelectedCategory(index)}
                            className="bg-color-active p-3 rounded-md
                                    text-yellow-primary flex justify-between
                                    mt-2 cursor-pointer"
                        >
                            <span>{item.name}</span>
                            <img
                                src={arr_down_yellow}
                                alt=""
                                className={`transition-transform ease-linear duration-300 ${
                                    categorySelected.includes(index)
                                        ? 'rotate-0'
                                        : '-rotate-90'
                                } `}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {categorySelected.includes(index) &&
                                index === 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'easeInOut',
                                        }}
                                        className={`flex flex-col gap-3 p-4 transition-transform 
                                            ease-linear duration-300 `}
                                    >
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Thời gian lập hóa đơn
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {formatFullDate(
                                                    orderStore.order?.createdAt
                                                )}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Thời gian cho khách vào
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order?.diningTime}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Thời gian khách ra
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order?.updatedAt
                                                    ? formarTime(
                                                          orderStore.order
                                                              ?.updatedAt
                                                      )
                                                    : '---'}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Thời gian dùng bữa
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order
                                                    ?.mealDuration || '---'}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Phương thức thanh toán
                                            </span>
                                            <span>:</span>
                                            <span>Banking</span>
                                        </div>{' '}
                                        <div className="flex gap-2 ">
                                            <span className="w-60">
                                                Trạng thái đơn
                                            </span>
                                            <span>:</span>
                                            <span
                                                className={` ${
                                                    (orderStore.order
                                                        ?.paymentStatus ===
                                                        'paid' &&
                                                        'text-green-400 bg-green-100') ||
                                                    (orderStore.order
                                                        ?.paymentStatus ===
                                                        'pending' &&
                                                        'text-yellow-500 bg-orange-100') ||
                                                    (orderStore.order
                                                        ?.paymentStatus ===
                                                        'canceled' &&
                                                        'text-red-500 bg-red-100')
                                                }}`}
                                            >
                                                {orderStore.order
                                                    ?.paymentStatus ===
                                                    'paid' && 'Đã thanh toán'}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {categorySelected.includes(index) &&
                                index === 1 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                        className="flex flex-col gap-3 p-4"
                                    >
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Khu vực
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {formatFullDate(
                                                    orderStore.order?.createdAt
                                                )}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">Bàn</span>
                                            <span>:</span>
                                            <span>
                                                {(orderStore.order?.tableSeleted
                                                    ?.area?.name
                                                    ? CapitalizeFirstLetter(
                                                          orderStore.order
                                                              ?.tableSeleted
                                                              ?.area?.name
                                                      )
                                                    : '---') +
                                                    '-' +
                                                    (orderStore.order
                                                        ?.tableSeleted?.name ||
                                                        '---')}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Loại bàn
                                            </span>
                                            <span>:</span>
                                            <span>Thời gian lập hóa đơn</span>
                                        </div>{' '}
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {categorySelected.includes(index) &&
                                index === 2 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                        className="flex flex-col gap-3 p-4"
                                    >
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Họ và tên
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order?.customer
                                                    ?.username || '---'}
                                            </span>
                                        </div>{' '}
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Số điện thoại
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order
                                                    ?.phoneCustomer || '---'}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="w-60">Email</span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order?.customer
                                                    ?.email || '---'}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="w-60">
                                                Địa chỉ
                                            </span>
                                            <span>:</span>
                                            <span>
                                                {orderStore.order?.customer
                                                    ?.address || '---'}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {categorySelected.includes(index) &&
                                index === 3 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        }}
                                        className="border border-border-primary  rounded-md col-span-2 
                                                    max-lg:col-span-5 overflow:hidden px-5"
                                    >
                                        <div
                                            className="grid grid-cols-8 p-3
                                                     text-yellow-primary font-semibold"
                                        >
                                            <div className="col-span-2">
                                                Mặt hàng
                                            </div>
                                            <div className="col-span-5 text-center">
                                                SL
                                            </div>
                                            <div className="col-span-1 text-center">
                                                Thành tiền
                                            </div>
                                        </div>

                                        <div className="">
                                            {orderStore.order?.dishes?.map(
                                                (item) => (
                                                    <div
                                                        key={item._id}
                                                        className="grid grid-cols-8 p-4  
                                                                items-center border-t border-border-primary"
                                                    >
                                                        <div
                                                            className="col-span-2 flex flex-col
                                                "
                                                        >
                                                            <span className="font-semibold">
                                                                {CapitalizeFirstLetter(
                                                                    item.product
                                                                        ?.name ||
                                                                        '---'
                                                                )}
                                                            </span>
                                                            <span className="text-gray-primary text-sm">
                                                                {FormatVND(
                                                                    item.product
                                                                        ?.selling ||
                                                                        '---'
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="col-span-5 text-center ">
                                                            {item.quantity}
                                                        </div>
                                                        <div className="col-span-1 text-center font-medium">
                                                            {FormatVND(
                                                                item.quantity *
                                                                    item.price
                                                            ) || '---'}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* total price order  */}
                                        <div
                                            className="border-t border-border-primary p-4 flex justify-between
                                    font-semibold text-lg"
                                        >
                                            <span>Tổng tiền:</span>
                                            <span className="text-yellow-primary">
                                                {FormatVND(
                                                    orderStore.order?.totalPrice
                                                )}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center py-4">
                <ButtonExit />
                <div className="w-32">
                    <Button
                        title="In hóa đơn"
                        bg="import"
                        handleClick={handlePrintBill}
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
