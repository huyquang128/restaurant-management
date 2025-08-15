/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button/Button';
import { motion } from 'framer-motion';
import FormatVND from '../common/FormatVND';
import FormatNumberToVND from '../common/FormatNumberToVND';
import { useDispatch } from 'react-redux';
import { getAllOrder, updateStatusPaymentOrder } from '@/redux/orderSlice';
import ToastMsg from '../common/ToastMsg';
import useOutsideClickModal from '../hooks/useOutsideClickModal';

function PaymentOrderModal({ ...props }) {
    const { isOpenModal, setIsOpenModal, item, setIsStopTimer, mealDuration } =
        props;
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const modalRef = useRef();

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const [valueCashReceived, setValueCashReceived] = useState('');
    const [valueChange, setValueChange] = useState(0);

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    useOutsideClickModal(modalRef, closeModal);

    useEffect(() => {
        const moneyChange = Number(valueCashReceived) - item.totalPrice / 2;
        setValueChange(moneyChange);
    }, [valueCashReceived]);

    const MAX_AMOUNT = 999999999; // Giới hạn tối đa 999.999.999 đ

    const handleChange = (e) => {
        const input = e.target;
        const rawInput = input.value;

        const prevLength = rawInput.length;
        const caretPosition = input.selectionStart;

        // Lấy số, bỏ tất cả ký tự không phải số
        let onlyNumbers = rawInput.replace(/\D/g, '');
        onlyNumbers = onlyNumbers.replace(/^0+/, ''); // Bỏ số 0 đầu

        // Giới hạn giá trị tối đa
        if (Number(onlyNumbers) > MAX_AMOUNT) {
            onlyNumbers = MAX_AMOUNT.toString();
        }

        setValueCashReceived(onlyNumbers);

        // Cập nhật lại vị trí con trỏ (mượt mà khi xóa/gõ)
        setTimeout(() => {
            const newFormatted = FormatNumberToVND(onlyNumbers);
            const newLength = newFormatted.length;
            const diff = newLength - prevLength;
            const newCaret = Math.max(0, caretPosition + diff);
            inputRef.current.setSelectionRange(newCaret, newCaret);
        }, 0);
    };

    const handleConfirmPayment = () => {
        valueChange >= 0
            ? dispatch(
                  updateStatusPaymentOrder({
                      orderId: item._id,
                      statusPayment: 'paid',
                      type: 'delete_table_selected',
                      mealDuration,
                  })
              ).then((data) => {
                  if (data.payload.success) {
                      ToastMsg({ msg: `Thanh toán thành công` });
                      dispatch(getAllOrder());
                      closeModal();
                  }
              })
            : ToastMsg({ msg: `Bạn chưa thanh toán`, status: 'warning' });
    };

    const handleExit = () => {
        closeModal();
        setIsStopTimer(false);
    };

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center
                         bg-black bg-opacity-15 z-50"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-tertiary  w-[500px] text-text-primary 
                            py-3 px-6 rounded-lg shadow-lg text-base"
            >
                <div className="font-bold text-lg text-center gap-2 mb-5">
                    Thanh toán - {item.tableSeleted?.name} -{' '}
                    {item.tableSeleted?.area.name}
                </div>

                <div>
                    <div
                        className="flex items-center text-text-primary 
                                    border border-color-active p-3
                                    rounded-md bg-color-active mb-4"
                    >
                        <span className=" w-32 text-yellow-primary font-bold">
                            Tổng đơn giá
                        </span>
                        <input
                            type="text"
                            className="font-semibold text-lg bg-color-active placeholder:text-text-primary 
                                    text-center flex-1 "
                            placeholder="000"
                            value={FormatVND(item.totalPrice)}
                            disabled
                        />
                    </div>
                    <div
                        className="flex items-center text-text-primary border border-color-active p-3
                                    rounded-md bg-color-active mb-4"
                    >
                        <span className=" w-32 text-yellow-primary font-bold">
                            Tiền đã cọc
                        </span>
                        <input
                            type="text"
                            className="font-semibold text-lg bg-color-active placeholder:text-text-primary 
                                    text-center flex-1 "
                            placeholder="000"
                            value={FormatVND(item.totalPrice / 2)}
                            disabled
                        />
                    </div>

                    <div
                        className="flex items-center text-text-primary border border-color-active p-3
                                    rounded-md bg-color-active mb-4"
                    >
                        <span className=" w-32 text-blue-500 font-bold">
                            Khách trả
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="font-semibold outline-none border-none 
                                    text-lg bg-color-active 
                                    placeholder:text-blue-500 text-center flex-1
                                    text-blue-500"
                            placeholder=""
                            value={FormatNumberToVND(valueCashReceived)}
                            onChange={handleChange}
                            inputMode="numeric"
                        />
                    </div>

                    <div
                        className="flex items-center text-text-primary border border-color-active p-3
                                    rounded-md bg-color-active mb-4"
                    >
                        <span className=" w-32 text-yellow-primary font-bold">
                            {Number(valueCashReceived) >
                            (item.deposit || item.totalPrice)
                                ? 'Tiền thừa'
                                : 'Tiền thiếu'}
                        </span>
                        <input
                            type="text"
                            className=" bg-color-active placeholder:text-text-primary text-center flex-1
                                        font-semibold text-lg"
                            placeholder="000"
                            value={FormatNumberToVND(valueChange)}
                            disabled
                        />
                    </div>
                </div>

                <div className="flex gap-2 pt-5 border-t border-bg-secondary justify-end">
                    <div className="w-28">
                        <Button
                            bg="exit"
                            title="Thoát"
                            handleClick={handleExit}
                            type="button"
                        />
                    </div>
                    <div className="w-28">
                        <Button
                            bg="delete"
                            title="Xác nhận"
                            type="button"
                            handleClick={handleConfirmPayment}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default PaymentOrderModal;
