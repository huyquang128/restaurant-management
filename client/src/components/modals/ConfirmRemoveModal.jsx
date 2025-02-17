/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import Button from '../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import warning from '@/assets/icon/warning.svg';
import { useDispatch, useSelector } from 'react-redux';
import ToastMsg from '../common/ToastMsg';

function ConfirmRemoveModal({ ...props }) {
    const dispatch = useDispatch();
    const productStore = useSelector((state) => state.product);
    const {
        isOpenModal,
        setIsOpenModal,
        arr,
        funcCallApiDelete,
        funcCallApiGet,
        handleHideBlock,
        title,
        type,
        arrRemove,
        removeFileImgUploadNew,
        setIsCheckedAll,
        dataRemove,
    } = props;

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    const handleRemove = () => {
        //delete images product
        (type === 'delete-image' &&
            (dispatch(funcCallApiDelete(arrRemove)),
            ToastMsg({
                status: 'success',
                msg: `Xóa ${arrRemove.length} ảnh thành công`,
            }),
            closeModal(),
            handleHideBlock(),
            removeFileImgUploadNew(arrRemove))) ||
            // delete category dishes (menu)
            (type === 'del-product-category' &&
                dispatch(
                    funcCallApiDelete(dataRemove),
                    ToastMsg({
                        status: 'success',
                        msg: `Xóa ${title} ảnh thành công`,
                    }),
                    closeModal()
                )) ||
            //call api delete
            dispatch(funcCallApiDelete(arr)).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        status: 'success',
                        msg: data.payload.message,
                    });

                    closeModal();
                    handleHideBlock();
                    setIsCheckedAll(false);
                    dispatch(funcCallApiGet(productStore.products.currentPage));
                } else {
                    ToastMsg({
                        status: 'error',
                        msg: `Vui lòng chọn ${title} để xóa`,
                    });
                }
            });
    };

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center
                         bg-black bg-opacity-15 z-20"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-tertiary w-[380px] text-text-primary p-3 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center">
                    <div className="text-xl flex items-center gap-2 ">
                        <img src={warning} alt="" /> Xóa {title}
                    </div>
                    <FontAwesomeIcon
                        onClick={closeModal}
                        icon={faXmark}
                        className=" cursor-pointer"
                    />
                </div>

                <div className="py-5 ">
                    <div className="">
                        Bạn có chắc là bạn muốn xóa{' '}
                        <span className="text-yellow-primary">{title}</span> đã
                        chọn?
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
                            title="Xóa"
                            type="button"
                            handleClick={handleRemove}
                            color_ring={productStore.isLoading ? true : false}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ConfirmRemoveModal;
