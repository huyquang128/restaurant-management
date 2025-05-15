import Button from '@/components/common/Button/Button';
import InputCommon from '@/components/common/InputCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategoryDishes,
    getAllCategoriesDishes,
} from '@/redux/categoryDishesSlice';
import ToastMsg from '../common/ToastMsg';
import SelectOptCommon from '../common/SelectOptCommon';
import { listTimeSetTable } from '../common/listTimeSetTable';
import DatePicker from 'react-datepicker';
import { vi } from 'date-fns/locale';
import arr_right_2_yellow from '@/assets/icon/arr_right_2_yellow.svg';
import arr_left_2_yellow from '@/assets/icon/arr_left_2_yellow.svg';
import { format } from 'date-fns';
import calendar_black from '@/assets/icon/calendar_black.svg';
import TextAreaCommon from '../common/TextAreaCommon';
import footer_bill from '@/assets/icon/footer_bill.svg';
import useStopScrollPropagation from '../hooks/useStopScrollPropagation';
import useOutsideClick from '../hooks/useOutsideClick';
import useOutsideClickModal from '../hooks/useOutsideClickModal';

const listPromotion = [{ name: 'Đầy tiền, không cần ưu đãi' }];

const listAddressRestaurant = [{ name: 'Cở sở 1: Đại học mỏ đỉa chất' }];

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function SetTableNow({ isOpenModal, setIsOpenModal }) {
    const dispatch = useDispatch();
    const childRef = useRef();

    useStopScrollPropagation(childRef);

    const categoryDishes = useSelector((state) => state.categoryDishes);

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const [startDate, setStartDate] = useState(new Date());

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    useOutsideClickModal(childRef, closeModal);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên đơn danh mục không được để trống'),
        }),
        onSubmit: (values) => {
            dispatch(addCategoryDishes(values.name)).then((data) => {
                if (data.payload?.success) {
                    dispatch(getAllCategoriesDishes());
                    closeModal();

                    ToastMsg({
                        status: 'success',
                        msg: data.payload?.message,
                        type: 'simpleNotification',
                    });
                } else {
                    ToastMsg({
                        status: 'error',
                        msg: categoryDishes.error,
                        type: 'simpleNotification',
                    });
                }
            });
        },
    });

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex 
                        justify-center items-center bg-black 
                        bg-opacity-30 z-50 font-cabin"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
            >
                <div
                    ref={childRef}
                    className="bg-bg-secondary w-[550px] h-[700px] p-3 rounded-t-lg shadow-lg 
                            overflow-y-scroll no-scrollbar px-[50px] py-10"
                >
                    <form
                        onSubmit={formik.handleSubmit}
                        className="grid grid-cols-3"
                    >
                        <h3 className=" mb-5 text-4xl font-bold text-yellow-primary col-span-3">
                            Đặt bàn
                        </h3>

                        {/* info user while set table */}
                        <div className="col-span-3 gap-x-10 gap-y-3 mb-5">
                            <div
                                className=" border-l-4 pl-2 border-yellow-500 leading-4 font-medium
                                            mb-3"
                            >
                                Thông tin của bạn
                            </div>
                            <div className="cols-span-1">
                                <InputCommon
                                    id="nameCustomer"
                                    label="Họ tên"
                                    type="text"
                                    placeholder="Tên của bạn"
                                    formik={formik}
                                />
                            </div>
                            <div>
                                <InputCommon
                                    id="phoneCustomer"
                                    label="Số điện thoại"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    formik={formik}
                                />
                            </div>
                        </div>

                        {/* info restaurant while set table*/}
                        <div
                            className="col-span-3 grid grid-cols-3 
                                        gap-x-3 gap-y-3 mb-5"
                        >
                            <div
                                className="col-span-3 border-l-4 pl-2 border-yellow-500 leading-4
                                             font-medium  mb-3"
                            >
                                Thông tin đặt bàn
                            </div>
                            <div className="col-span-3">
                                <SelectOptCommon
                                    id="addressRestaurant"
                                    label="Lựa chọn cơ sở"
                                    formik={formik}
                                    list_opt={listAddressRestaurant}
                                />
                            </div>
                            <div>
                                <InputCommon
                                    id="quantityCustomer"
                                    label="Số lượng khách"
                                    type="text"
                                    placeholder="Số lượng khách"
                                    formik={formik}
                                />
                            </div>

                            {/* date set table */}
                            <div className="">
                                <div className="mb-2">Ngày đặt</div>
                                <div className="w-full relative">
                                    <div>
                                        <div>
                                            <div>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) =>
                                                        setStartDate(date)
                                                    }
                                                    className="custom-input-date "
                                                    wrapperClassName="w-full block"
                                                    dateFormat="dd 'tháng' M"
                                                    locale={vi}
                                                    renderCustomHeader={({
                                                        date,
                                                        decreaseMonth,
                                                        increaseMonth,
                                                        prevMonthButtonDisabled,
                                                        nextMonthButtonDisabled,
                                                    }) => (
                                                        <div className="bg-white">
                                                            <div className="flex justify-between items-center px-4 rounded-t-lg">
                                                                <button
                                                                    onClick={
                                                                        decreaseMonth
                                                                    }
                                                                    disabled={
                                                                        prevMonthButtonDisabled
                                                                    }
                                                                    className=" px-2"
                                                                >
                                                                    <img
                                                                        src={
                                                                            arr_left_2_yellow
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </button>
                                                                <div className="font-cabin">
                                                                    <span className="text-lg text-yellow-primary mr-7">
                                                                        {`Tháng ${format(
                                                                            date,
                                                                            'MM'
                                                                        )}`}
                                                                    </span>
                                                                    <span className="text-sm absolute translate-y-[2px] -translate-x-5 text-gray-500">
                                                                        {` ${format(
                                                                            date,
                                                                            'yyyy'
                                                                        )}`}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={
                                                                        increaseMonth
                                                                    }
                                                                    disabled={
                                                                        nextMonthButtonDisabled
                                                                    }
                                                                    className="text-gray-700 px-2"
                                                                >
                                                                    <img
                                                                        src={
                                                                            arr_right_2_yellow
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-7 text-center  py-1">
                                                                {weekDays.map(
                                                                    (
                                                                        day,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-yellow-primary font-medium"
                                                                        >
                                                                            {
                                                                                day
                                                                            }
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <img
                                        src={calendar_black}
                                        alt=""
                                        className="absolute top-1/2 -translate-y-1/2 right-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <SelectOptCommon
                                    label="Khung giờ"
                                    id="diningTime"
                                    formik={formik}
                                    list_opt={listTimeSetTable}
                                />
                            </div>
                            <div className="col-span-3">
                                <SelectOptCommon
                                    label="Chọn ưu đãi"
                                    id="promotion"
                                    formik={formik}
                                    list_opt={listPromotion}
                                />
                            </div>
                            <div className="col-span-3">
                                <TextAreaCommon
                                    id="note"
                                    label="Lời nhắn với nhà hàng"
                                    type="text"
                                    placeholder="Lời nhắn với nhà hàng..."
                                    formik={formik}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between col-span-3 item-center">
                            <div
                                className="w-40 text-gray-primary text-lg font-medium
                                            cursor-pointer"
                                onClick={() => closeModal()}
                            >
                                Đóng
                            </div>
                            <div
                                className="w-40"

                                // onClick={() => navigate('/cart/checkout')}
                            >
                                <Button title="Đặt bàn" bg="save" />
                            </div>
                        </div>
                    </form>
                </div>
                <img src={footer_bill} alt="" />
            </motion.div>
        </div>
    );
}

export default SetTableNow;
