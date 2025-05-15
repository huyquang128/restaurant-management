/* eslint-disable react/prop-types */
import Button from '../common/Button/Button';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useOutsideClickModal from '../hooks/useOutsideClickModal';
import { useDispatch } from 'react-redux';
import { getAllOrder, updateStatusPaymentOrder } from '@/redux/orderSlice';
import ToastMsg from '../common/ToastMsg';

const valueRemoveOrder = [
    { title: 'Khách yêu cầu hủy', name: 'remove_order' },
    { title: 'Hết bàn', name: 'remove_order' },
    { title: 'lý do khác', name: 'remove_order' },
];
function ConfirmRemoveOrder({ ...props }) {
    const { isOpenModal, setIsOpenModal, orderId } = props;
    const modalRef = useRef();
    const textareaRef = useRef();
    const dispatch = useDispatch();

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const [valueCancelOrder, setValueCancelOrder] =
        useState('Khách yêu cầu hủy');
    console.log(
        '🚀 ~ ConfirmRemoveOrder ~ valueCancelOrder:',
        valueCancelOrder
    );

    const [valueReasonCancelOrder, setValueReasonCancelOrder] = useState('');
    console.log(
        '🚀 ~ ConfirmRemoveOrder ~ valueReasonCancelOrder:',
        valueReasonCancelOrder
    );

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    useOutsideClickModal(modalRef, closeModal);

    const handleOtherReasonClick = () => {
        // Focus vào ô textarea
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const handleConfirmCancel = () => {
        dispatch(
            updateStatusPaymentOrder({
                orderId,
                statusPayment: 'canceled',
                type: 'delete_table_selected',
                cancelReason:
                    valueCancelOrder === 'lý do khác'
                        ? valueReasonCancelOrder
                        : valueCancelOrder,
            })
        ).then((data) => {
            if (data.payload.success) {
                ToastMsg({ msg: `Hủy đơn thành công` });
                dispatch(getAllOrder());
                closeModal();
            }
        });
    };

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center
                     bg-black bg-opacity-15 z-50"
        >
            <motion.div
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-tertiary  w-[500px] text-text-primary py-3 px-6 rounded-lg shadow-lg"
            >
                <div className="text-xl text-center gap-2 mb-5">Hủy đơn</div>

                <div>
                    <div className="mb-5">Lý do hủy đơn</div>
                    <div className="flex flex-col gap-3">
                        {valueRemoveOrder.map((item, index) => (
                            <label
                                className="flex gap-2 cursor-pointer"
                                key={index}
                                htmlFor={item.title}
                                onClick={
                                    index === 2
                                        ? handleOtherReasonClick
                                        : undefined
                                }
                            >
                                <input
                                    type="radio"
                                    id={item.title}
                                    name={item.name}
                                    checked={valueCancelOrder === item.title}
                                    onChange={(e) =>
                                        setValueCancelOrder(e.target.id)
                                    }
                                />
                                <span>{item.title}</span>
                            </label>
                        ))}

                        <textarea
                            ref={textareaRef}
                            className="w-full rounded-md h-32 p-3 outline-bg-tertiary focus:outline 
                                        focus:outline-1 focus:outline-yellow-primary
                                        transition-all ease-linear duration-300 bg-bg-secondary"
                            placeholder="Lý do hủy đơn..."
                            value={valueReasonCancelOrder}
                            onChange={(e) =>
                                setValueReasonCancelOrder(e.target.value)
                            }
                        ></textarea>
                    </div>
                </div>

                <div className="flex gap-2 pt-5 border-t border-bg-secondary justify-end">
                    <div className="w-28">
                        <Button
                            bg="exit"
                            title="Thoát"
                            handleClick={closeModal}
                            type="button"
                        />
                    </div>
                    <div className="w-28">
                        <Button
                            bg="delete"
                            title="Xác nhận"
                            type="button"
                            handleClick={handleConfirmCancel}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ConfirmRemoveOrder;
