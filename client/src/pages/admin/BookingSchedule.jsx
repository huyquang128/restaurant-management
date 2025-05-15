import Button from '@/components/common/Button/Button';
import add_white from '@/assets/icon/add_white.svg';
import more_white from '@/assets/icon/more_white.svg';
import more_black from '@/assets/icon/more_black.svg';
import time from '@/assets/icon/time.svg';
import users from '@/assets/icon/users.svg';
import dola from '@/assets/icon/dola.svg';
import question from '@/assets/icon/question.svg';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '@/components/common/FormatVND';
import { useEffect, useMemo, useState } from 'react';
import TooltipCommon from '@/components/common/TooltipCommon';
import CapitalizeWord from '@/components/common/CapitalizeWord';
import MoreSetTableTooltip from '@/components/tooltipsContent/MoreSetTableTooltip';
import { getAllOrder, setCurrentOrderIdSeleted } from '@/redux/orderSlice';
import {
    setTableIdSelected,
    updateStatusTableWhenInUse,
} from '@/redux/tableSlice';
import ToastMsg from '@/components/common/ToastMsg';
import { Link, useNavigate } from 'react-router';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import socket from '@/sockets/socket';
import codeOrderId from '@/components/common/codeOrderId';
import footer_bill from '@/assets/icon/footer_bill.svg';
import { getTimeIfUnder1Hour } from '@/components/common/getTimeIfUnder1Hour';
import order_empty from '@/assets/image/order_empty.png';

function BookingSchedule() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStore = useSelector((state) => state.auth);
    const orderStore = useSelector((state) => state.order);

    const [isOpenTooltipMore, setIsOpenTooltipMore] = useState(false);
    const [isCloseTooltipMoreAnimation, setIsCloseTooltipMoreAnimation] =
        useState(false);
    const [tableId, setTableId] = useState(null);

    const [isCheckOrderNew, setIsCheckOrderNew] = useState(false);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    useEffect(() => {
        // Lắng nghe sự kiện từ server
        socket.on('new_order', (data) => {
            dispatch(getAllOrder());
        });

        // Cleanup khi component bị unmount
        return () => {
            socket.off('new_order');
        };
    }, []);

    const arrOrderFilter = useMemo(() => {
        const result = orderStore.orders?.filter(
            (item, index) =>
                item.paymentStatus !== 'paid' &&
                item.tableSeleted?.status !== 'in_use'
        );

        return result;
    }, [orderStore.orders.length]);

    // HANDLE EVENT
    const handleCloseTooltipMore = () => {
        setIsCloseTooltipMoreAnimation(true);
        setTimeout(() => {
            setIsCloseTooltipMoreAnimation(false);
            setIsOpenTooltipMore(false);
        }, 200);
    };

    const handleCustomerInUseTable = (
        tableId,
        statusTable,
        selectedTable,
        orderId
    ) => {
        if (!selectedTable) {
            return ToastMsg({
                status: 'warning',
                msg: 'Chưa chọn bàn cho khách',
            });
        }

        if (statusTable === 'in_use') {
            navigate(
                `/admin/set-table/booking-schedule/select-product/${orderId}`
            );
            return ToastMsg({
                status: 'warning',
                msg: 'Khách đang sử dụng bàn.',
            });
        }

        //chuyển đổi trạng thái thành sử dụng bàn
        dispatch(updateStatusTableWhenInUse(tableId)).then((data) => {
            if (data.payload?.success) {
                ToastMsg({ msg: data.payload.message });
                dispatch(getAllOrder()).then((data) => {
                    if (data.payload.success) {
                        navigate(
                            `/admin/set-table/booking-schedule/select-product/${orderId}`
                        );
                    }
                });
            }
        });
    };

    return (
        <div className="font-cabin">
            <h1 className="mb-5 text-text-primary text-xl font-medium">
                Lịch đặt bàn
            </h1>
            <div className="w-44 mb-5">
                <Link to="/admin/set-table/add-table">
                    <Button
                        icon={add_white}
                        title="Tạo đơn đặt bàn"
                        bg="add"
                        text_color="white"
                    />
                </Link>
            </div>

            {/* list table restaurant */}
            <div className="grid grid-cols-3 text-sm gap-8 max-xl:grid-cols-2 max-sm:grid-cols-1 ">
                {arrOrderFilter.length <= 0 ? (
                    <div
                        className="col-span-1 col-start-2 flex flex-col 
                                                justify-center items-center max-xl:col-span-2
                                                mt-5"
                    >
                        <img
                            src={order_empty}
                            alt=""
                            className="object-cover max-xl:h-[400px]"
                        />
                        <div className="text-4xl font-great text-yellow-primary">
                            Đơn hàng đang trống !!!
                        </div>
                    </div>
                ) : (
                    arrOrderFilter?.map(
                        (item, index) =>
                            item.paymentStatus !== 'paid' &&
                            item.tableSeleted?.status !== 'in_use' && (
                                <div
                                    key={index}
                                    className="border border-color-active text-center bg-bg-tertiary 
                                            rounded-lg text-text-primary relative"
                                >
                                    <div className="w-full border-b border-color-active bg-color-active rounded-lg">
                                        <div className="py-5 text-yellow-primary">
                                            {CapitalizeWord(
                                                item.nameCustomer ||
                                                    item.customer?.username
                                            )}{' '}
                                            - {item.phoneCustomer} - (
                                            {codeOrderId(item._id)})
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-5/12 flex justify-center items-center text-yellow-primary text-lg">
                                            {item.tableSeleted ? (
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <span className="">
                                                        {CapitalizeFirstLetter(
                                                            item?.tableSeleted
                                                                ?.area?.name ||
                                                                ''
                                                        )}
                                                    </span>
                                                    <span>
                                                        {CapitalizeFirstLetter(
                                                            item?.tableSeleted
                                                                ?.name || ''
                                                        )}
                                                    </span>
                                                </div>
                                            ) : (
                                                <img
                                                    src={question}
                                                    alt=""
                                                    className="h-20"
                                                />
                                            )}
                                        </div>
                                        <div className="w-7/12 border-l border-color-active">
                                            <div className="flex items-center justify-between px-4 gap-2 py-5 border-b border-color-active">
                                                <span className="flex items-center gap-1">
                                                    <img src={time} alt="" />
                                                    <span>
                                                        {item.diningTime}
                                                    </span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <img src={users} alt="" />
                                                    <span>
                                                        {item.quantityCustomer}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 justify-center py-5">
                                                <img src={dola} alt="" />
                                                <span>
                                                    {FormatVND(item.totalPrice)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-color-active flex justify-between py-5 w-full">
                                        <div
                                            onClick={() => (
                                                setTableId(index),
                                                setIsOpenTooltipMore(true),
                                                dispatch(
                                                    setTableIdSelected(
                                                        item.tableSeleted
                                                            ?._id || null
                                                    )
                                                ),
                                                dispatch(
                                                    setCurrentOrderIdSeleted(
                                                        item._id
                                                    )
                                                )
                                            )}
                                            className="w-1/2 flex justify-center relative"
                                        >
                                            <img
                                                src={
                                                    authStore.theme === 'dark'
                                                        ? more_white
                                                        : more_black
                                                }
                                                alt="more"
                                                className="cursor-pointer"
                                            />
                                            {tableId === index &&
                                                isOpenTooltipMore && (
                                                    <TooltipCommon
                                                        isOpenTooltip={
                                                            isOpenTooltipMore
                                                        }
                                                        content={
                                                            <MoreSetTableTooltip type="booking_table" />
                                                        }
                                                        isCloseTooltipAnimation={
                                                            isCloseTooltipMoreAnimation
                                                        }
                                                        handleOutSide={
                                                            handleCloseTooltipMore
                                                        }
                                                    />
                                                )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleCustomerInUseTable(
                                                    item.tableSeleted?._id,
                                                    item.tableSeleted?.status,
                                                    item.tableSeleted,
                                                    item._id
                                                )
                                            }
                                            className="hover:text-yellow-primary text-blue-500 cursor-pointer w-1/2 flex justify-center"
                                        >
                                            {item?.tableSeleted?.status ===
                                            'in_use'
                                                ? 'Khách đã nhận bàn'
                                                : 'Khách nhận bàn'}
                                        </div>
                                    </div>

                                    {getTimeIfUnder1Hour(item.createdAt) && (
                                        <div
                                            className="absolute -top-4 -right-5 px-3 py-2
                                                 bg-yellow-500 text-white 
                                                rounded-full"
                                        >
                                            <div className="">Mới đặt</div>
                                        </div>
                                    )}
                                </div>
                            )
                    )
                )}
            </div>
        </div>
    );
}

export default BookingSchedule;
