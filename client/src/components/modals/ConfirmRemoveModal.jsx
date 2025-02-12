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
        slug,
        currentId,
        arrRemove,
        removeFileImgUploadNew,
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
        type === 'delete-image'
            ? (dispatch(funcCallApiDelete(arrRemove)),
              ToastMsg({
                  status: 'success',
                  msg: `Xóa ${arrRemove.length} ảnh thành công`,
              }),
              closeModal(),
              handleHideBlock(),
              removeFileImgUploadNew(arrRemove))
            : dispatch(funcCallApiDelete(arr)).then((data) => {
                  if (data.payload?.success) {
                      ToastMsg({
                          status: 'success',
                          msg: data.payload.message,
                      });
                      closeModal();
                      handleHideBlock();
                      dispatch(
                          funcCallApiGet(productStore.products.currentPage)
                      );
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
                className="bg-bg-tertiary w-[380px] p-3 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center">
                    <div className="text-xl">Xóa {title}</div>
                    <FontAwesomeIcon
                        onClick={closeModal}
                        icon={faXmark}
                        className=" cursor-pointer"
                    />
                </div>

                <div className="py-5">
                    <div>Bạn có chắc là bạn muốn xóa {title} đã chọn?</div>
                    <div className="flex gap-1 items-center">
                        <img src={warning} alt="" />
                        <div className="text-yellow-primary">
                            ( {title} đã xóa không thể khôi phục )
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 pt-5 border-t border-bg-secondary">
                    <Button
                        bg="white"
                        title="Thoát"
                        text_color="black"
                        bg_border="black"
                        handleClick={closeModal}
                        type="button"
                    />
                    <Button
                        bg="black"
                        title="Xóa"
                        text_color="white"
                        type="button"
                        handleClick={handleRemove}
                        color_ring={productStore.isLoading ? true : false}
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default ConfirmRemoveModal;
