/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import arr_top_white from '@/assets/icon/arr_top_white.svg';
import arr_top_black from '@/assets/icon/arr_top_black.svg';
import trash_red from '@/assets/icon/trash_red.svg';
import { useDispatch, useSelector } from 'react-redux';
import bag_2 from '@/assets/icon/bag_2.svg';
import bell_italic from '@/assets/icon/bell_italic.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import socket from '@/sockets/socket';
import codeOrderId from '../common/codeOrderId';
import CapitalizeFirstLetter from '../common/CapitalizeFirstLetter';
import { formatTimeAgo } from '../common/formatTimeAgo';
import useStopScrollPropagation from '../hooks/useStopScrollPropagation';
import { useNavigate } from 'react-router';
import order_3 from '@/assets/icon/order_3.svg';
import {
    deleteNotifySingle,
    getAllNotificationTypeAdmin,
    setAllNotifyReaded,
    setNotifySingleReaded,
} from '@/redux/notificationSlice';
const arrCategory = [
    { name: 'Tất cả', value: 'all' },
    { name: 'Chưa đọc', value: 'not_read' },
];
function NotificationAdmin({ ...props }) {
    const refChild = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        isOpenTooltip,
        setIsCheckNotificationNew,
        setIsOpenTooltipNotification,
        isCheckNotificationNew,
    } = props;

    const [categoryActive, setCategoryActive] = useState('all');
    const [isShowMoreAct, setIsShowMoreAct] = useState(null);
    const [isDeleteNotify, setIsDeleteNotify] = useState(false);

    const authStore = useSelector((state) => state.auth);
    const notificationStore = useSelector((state) => state.notification);

    useEffect(() => {
        // Lắng nghe sự kiện từ server

        socket.on('new_review', (data) => {
            data && dispatch(getAllNotificationTypeAdmin());
        });

        // Cleanup khi component bị unmount
        return () => {
            socket.off('new_review');
        };
    }, [dispatch]);

    useStopScrollPropagation(refChild);

    const filterArrNotify = useMemo(() => {
        return categoryActive === 'all'
            ? notificationStore.notifications
            : notificationStore.notifications.filter((item) => !item.read);
    }, [categoryActive, isDeleteNotify]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -160, x: 100 }}
            animate={
                isOpenTooltip
                    ? { opacity: 1, scale: 1, y: 0, x: 0 }
                    : { opacity: 0, scale: 0.5, y: -160, x: 100 }
            }
            exit={{ opacity: 0, scale: 0.5, y: -160, x: 100 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14  right-0 text-text-primary"
        >
            <div className="bg-bg-tertiary w-[380px] rounded-lg shadow-header-shadow px-3 ">
                <h3 className="text-xl font-semibold py-4 ">
                    Thông báo{' '}
                    <span className="opacity-70 text-base text-blue-500">
                        ({filterArrNotify.length})
                    </span>
                </h3>

                <div className="flex gap-2 mb-3">
                    {arrCategory.map((item, index) => (
                        <span
                            onClick={() => setCategoryActive(item.value)}
                            key={index}
                            className={`py-1.5 px-5 hover:bg-border-primary rounded-full
                                        font-semibold ${
                                            categoryActive === item.value
                                                ? 'bg-blue-200 text-blue-500'
                                                : ''
                                        } transition-all duration-200 ease-linear`}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>

                {/* list notification */}
                <div
                    ref={refChild}
                    className={`${
                        filterArrNotify.length > 0 ? 'h-[400px]' : 'h-60'
                    }  overflow-y-scroll no-scrollbar`}
                >
                    {filterArrNotify?.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setIsShowMoreAct(index + 1)}
                            onMouseLeave={() => setIsShowMoreAct(null)}
                            className={`flex items-center justify-between py-3 border-t
                                        border-border-primary hover:bg-border-primary px-2 
                                        rounded-lg relative ${
                                            item.read && 'opacity-50'
                                        }`}
                        >
                            {/* danh sách đơn hàng mới */}
                            <div
                                onClick={() => (
                                    navigate(
                                        `${
                                            item.type === 'comment'
                                                ? '/admin/reviews'
                                                : '/admin/set-table/booking-schedule'
                                        }`
                                    ),
                                    dispatch(
                                        setNotifySingleReaded(item._id)
                                    ).then((data) => {
                                        if (data.payload.success) {
                                            dispatch(
                                                getAllNotificationTypeAdmin()
                                            );
                                        }
                                    }),
                                    setIsOpenTooltipNotification(false)
                                )}
                                className="flex items-center gap-3"
                            >
                                {item.type === 'comment' ? (
                                    <div>
                                        <img
                                            src="https://img.icons8.com/bubbles/100/review.png"
                                            alt="review"
                                            className="w-16 h-16"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center w-16 w-16">
                                        <div className=" w-12 h-12">
                                            <img
                                                src={order_3}
                                                alt=""
                                                className=""
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div>
                                        {item.type === 'comment'
                                            ? 'Đánh giá mới từ'
                                            : 'Đơn hàng mới từ'}{' '}
                                        <span className="text-yellow-primary font-medium">
                                            {CapitalizeFirstLetter(
                                                item?.nameCustomer
                                            )}
                                        </span>
                                    </div>
                                    {item.type === 'order' && (
                                        <div>
                                            Mã đơn hàng :{' '}
                                            <span className="text-yellow-primary font-medium">
                                                {codeOrderId(item?.relatedId)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-blue-500 text-sm">
                                        {formatTimeAgo(item?.createdAt)}
                                    </div>
                                </div>
                            </div>

                            {!item.read && (
                                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                            )}

                            <AnimatePresence>
                                {isShowMoreAct === index + 1 && (
                                    <motion.div
                                        initial={{ y: 20 }}
                                        animate={
                                            isShowMoreAct ? { y: 0 } : { y: 20 }
                                        }
                                        exit={{ y: 20 }}
                                        transition={{ duration: 0.1 }}
                                        className="bg-bg-tertiary h-10 w-10 rounded-full
                                                        flex justify-center items-center
                                                        absolute right-10"
                                        onClick={() =>
                                            dispatch(
                                                deleteNotifySingle(item._id)
                                            ).then((data) => {
                                                if (data.payload.success) {
                                                    dispatch(
                                                        getAllNotificationTypeAdmin()
                                                    );
                                                }
                                            })
                                        }
                                    >
                                        <img src={trash_red} alt="" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {filterArrNotify <= 0 && (
                        <div className="flex justify-center flex-col  
                                        items-center mt-10 gap-5">
                            <img src={bell_italic} alt="" className="h-28" />
                            <div className="font-bold text-xl">Bạn không có thông báo nào</div>
                        </div>
                    )}
                </div>

                {filterArrNotify.length > 0 && (
                    <div
                        className="flex items-center gap-2
                                border-t py-3 justify-between "
                    >
                        <div
                            onClick={() =>
                                dispatch(setAllNotifyReaded()).then((data) => {
                                    if (data.payload.success) {
                                        dispatch(getAllNotificationTypeAdmin());
                                    }
                                })
                            }
                            className="flex items-center gap-2  hover:text-blue-500
                                transition-colors ease-linear duration-200"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Đánh dấu tất cả là đã đọc</span>
                        </div>
                        {/* <div
                        className=" hover:text-red-500
                                transition-colors ease-linear duration-200"
                    >
                        Xóa tất cả
                    </div> */}
                    </div>
                )}
            </div>
            <img
                src={
                    authStore.theme === 'light' ? arr_top_white : arr_top_black
                }
                alt=""
                className="absolute -top-6 right-2 h-10"
            />
        </motion.div>
    );
}

export default NotificationAdmin;
