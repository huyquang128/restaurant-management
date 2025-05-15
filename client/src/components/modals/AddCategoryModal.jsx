import Button from '@/components/common/Button/Button';
import InputCommon from '@/components/common/InputCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategoryDishes,
    getAllCategoriesDishes,
} from '@/redux/categoryDishesSlice';
import ToastMsg from '../common/ToastMsg';

function AddCategoryModal({ isOpenModal, setIsOpenModal }) {
    const dispatch = useDispatch();
    const categoryDishes = useSelector((state) => state.categoryDishes);

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
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-15 ">
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-secondary w-[380px] p-3 rounded-lg shadow-lg"
            >
                <div className="flex justify-end ">
                    <FontAwesomeIcon
                        onClick={closeModal}
                        icon={faXmark}
                        className=" cursor-pointer"
                    />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-5 text-xl text-text-primary">
                        Thêm danh mục mặt hàng
                    </h1>
                    <InputCommon
                        id="name"
                        label="Tên danh mục"
                        type="text"
                        placeholder="Tên danh mục"
                        formik={formik}
                    />
                    <div className="flex gap-2 mt-5">
                        <Button
                            bg="exit"
                            title="Thoát"
                            text_color="white"
                            handleClick={closeModal}
                            type="button"
                        />
                        <Button bg="save" title="Lưu" text_color="white" />
                    </div>
                </form>
            </motion.div>

            {/* modal */}
            {isCloseModalSetTableNow && (
                <SetTableNow
                    isOpenModal={isOpenModalSetTableNow}
                    isCloseModalSetTableNow={isCloseModalSetTableNow}
                    closeModal={closeModalSetTableNow}
                />
            )}
        </div>
    );
}

export default AddCategoryModal;
