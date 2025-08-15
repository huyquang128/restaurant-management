import Button from '@/components/common/Button/Button';
import add_white from '@/assets/icon/add_white.svg';
import more_white from '@/assets/icon/more_white.svg';
import more_black from '@/assets/icon/more_black.svg';
import users from '@/assets/icon/users.svg';
import dola from '@/assets/icon/dola.svg';
import order_empty from '@/assets/image/order_empty.png';
import question from '@/assets/icon/question.svg';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '@/components/common/FormatVND';
import { useEffect, useState } from 'react';
import TooltipCommon from '@/components/common/TooltipCommon';
import CapitalizeWord from '@/components/common/CapitalizeWord';
import MoreSetTableTooltip from '@/components/tooltipsContent/MoreSetTableTooltip';
import { getAllOrder, setCurrentOrderIdSeleted } from '@/redux/orderSlice';
import {
    setTableIdSelected,
    updateStatusTableWhenInUse,
} from '@/redux/tableSlice';
import time from '@/assets/icon/time.svg';
import ToastMsg from '@/components/common/ToastMsg';
import { useLocation, useNavigate } from 'react-router';
import ConfirmRemoveOrder from '@/components/modals/ConfirmRemoveOrder';
import TimerIncrease from '@/components/common/TimerIncrease';
import PaymentOrderModal from '@/components/modals/PaymentOrderModal';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';

function OrderCurrent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStore = useSelector((state) => state.auth);
    const orderStore = useSelector((state) => state.order);

    const [isStopTimer, setIsStopTimer] = useState(false);

    const [mealDuration, setMealDuration] = useState(null);

    const [isOpenTooltipMore, setIsOpenTooltipMore] = useState(false);
    const [isCloseTooltipMoreAnimation, setIsCloseTooltipMoreAnimation] =
        useState(false);

    const [tableId, setTableId] = useState(null);

    const [isOpenModalConfirmRemoveOrder, setIsOpenModalConfirmRemoveOrder] =
        useState(false);

    const [isOpenModalConfirmPaymentOrder, setIsOpenModalConfirmPaymentOrder] =
        useState(false);

    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);

    // HANDLE EVENT
    const handleCloseTooltipMore = () => {
        setIsCloseTooltipMoreAnimation(true);
        setTimeout(() => {
            setIsCloseTooltipMoreAnimation(false);
            setIsOpenTooltipMore(false);
        }, 200);
    };

    const activeOrders = orderStore.orders?.filter(
        (item) =>
            item.tableSeleted?.status === 'in_use' &&
            item.paymentStatus !== 'paid' &&
            item.paymentStatus !== 'canceled'
    );

    const handleCustomerInUseTable = (
        tableId,
        statusTable,
        selectedTable,
        orderId
    ) => {
        if (statusTable === 'in_use') {
            setIsStopTimer(true);

            setIsOpenModalConfirmPaymentOrder(true);
            return ToastMsg({
                status: 'warning',
                msg: 'Khách đang sử dụng bàn.',
            });
        }

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
                Đơn hiện thời
            </h1>

            {/* list table restaurant */}
            <div className="grid grid-cols-3 text-sm gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1 ">
                {activeOrders?.length > 0 ? (
                    activeOrders?.map((item, index) => (
                        <div
                            key={index}
                            className="border border-color-active text-center bg-bg-tertiary rounded-lg  text-text-primary"
                        >
                            <div className="w-full border-b border-color-active bg-color-active rounded-lg">
                                <div className="py-5 text-yellow-primary">
                                    {CapitalizeWord(item.nameCustomer)} -{' '}
                                    {item.phoneCustomer}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className="w-5/12 flex justify-center items-center text-yellow-primary
                                            text-xl"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <span className="">
                                            {CapitalizeFirstLetter(
                                                item?.tableSeleted?.area
                                                    ?.name || ''
                                            )}
                                        </span>
                                        <span>
                                            {CapitalizeFirstLetter(
                                                item?.tableSeleted?.name || ''
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-7/12 border-l border-color-active">
                                    <div className="flex items-center justify-between px-4 gap-2 py-5 border-b border-color-active">
                                        <span className="flex items-center gap-1">
                                            <img src={time} alt="" />
                                            <TimerIncrease
                                                orderId={item._id}
                                                isStopTimer={isStopTimer}
                                                setMealDuration={
                                                    setMealDuration
                                                }
                                            />
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <img src={users} alt="" />
                                            <span>{item.quantityCustomer}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 justify-center py-5">
                                        <img src={dola} alt="" />
                                        <span>
                                            {FormatVND(item.totalPrice)}
                                        </span>
                                        <div>
                                            - ({'Cọc '}
                                            {FormatVND(item.totalPrice / 2)})
                                        </div>
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
                                                item.tableSeleted?._id || null
                                            )
                                        ),
                                        dispatch(
                                            setCurrentOrderIdSeleted(item._id)
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
                                    {tableId === index && isOpenTooltipMore && (
                                        <TooltipCommon
                                            isOpenTooltip={isOpenTooltipMore}
                                            content={
                                                <MoreSetTableTooltip
                                                    orderAct={true}
                                                    isOpenModalConfirmRemoveOrder={
                                                        isOpenModalConfirmRemoveOrder
                                                    }
                                                    setIsOpenModalConfirmRemoveOrder={
                                                        setIsOpenModalConfirmRemoveOrder
                                                    }
                                                    type="order_current"
                                                />
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
                                    Thanh toán
                                </div>

                                {/* modal payment */}
                                {isOpenModalConfirmPaymentOrder && (
                                    <PaymentOrderModal
                                        isOpenModal={
                                            isOpenModalConfirmPaymentOrder
                                        }
                                        setIsOpenModal={
                                            setIsOpenModalConfirmPaymentOrder
                                        }
                                        item={item}
                                        setIsStopTimer={setIsStopTimer}
                                        mealDuration={mealDuration}
                                    />
                                )}

                                {isOpenModalConfirmRemoveOrder && (
                                    <ConfirmRemoveOrder
                                        isOpenModal={
                                            isOpenModalConfirmRemoveOrder
                                        }
                                        setIsOpenModal={
                                            setIsOpenModalConfirmRemoveOrder
                                        }
                                        orderId={item._id}
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
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
                )}
            </div>

            {/* modal */}
        </div>
    );
}

export default OrderCurrent;
