import Button from '@/components/common/Button/Button';
import InputCommon from '@/components/common/InputCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnit, getAllUnit } from '@/redux/unitSlice';
import ToastMsg from '../common/ToastMsg';

function AddUnitModal({ isOpenModal, setIsOpenModal }) {
    const dispatch = useDispatch();

    const unitStore = useSelector((state) => state.unit);

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    const formik = useFormik({
        initialValues: {
            unit: '',
        },
        validationSchema: Yup.object({
            unit: Yup.string().required('Tên đơn đơn vị không được để trống'),
        }),

        onSubmit: (values) => {
            dispatch(addUnit(values.unit)).then((data) => {
                if (data.payload?.success) {
                    dispatch(getAllUnit());

                    closeModal();

                    ToastMsg({
                        status: 'success',
                        msg: data.payload.message,
                    });
                } else {
                    ToastMsg({
                        status: 'error',
                        msg: unitStore.error,
                    });
                }
            });
        },
    });

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-15 ">
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-tertiary w-[380px] p-3 rounded-lg shadow-lg"
            >
                <div className="flex justify-end ">
                    <FontAwesomeIcon
                        onClick={closeModal}
                        icon={faXmark}
                        className=" cursor-pointer"
                    />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-5 text-xl">
                        Thêm đơn vị tính
                    </h1>
                    <InputCommon
                        id="unit"
                        label="Tên đơn vị tính"
                        type="text"
                        placeholder="Tên đơn vị tính"
                        formik={formik}
                    />
                    <div className="flex gap-2 mt-5">
                        <Button
                            bg="exit"
                            title="Thoát"
                            text_color="black"
                            handleClick={closeModal}
                            type="button"
                        />
                        <Button bg="save" title="Lưu" text_color="white" />
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default AddUnitModal;
