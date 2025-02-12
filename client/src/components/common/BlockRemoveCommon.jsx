/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import trash_red from '@/assets/icon/trash_red.svg';
import { useState } from 'react';
import ConfirmRemoveModal from '../modals/ConfirmRemoveModal';

// eslint-disable-next-line react/prop-types
function BlockRemoveCommon({ ...props }) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const {
        arr,
        isShowBlock,
        isAnimationHide,
        handleHideBlock,
        funcCallApiDelete,
        funcCallApiGet,
        title,
        type,
        slug,
        currentId,
        arrRemove,
        removeFileImgUploadNew,
    } = props;

    const handleRemove = () => {
        setIsOpenModal(true);
    };

    return (
        <motion.div
            initial={{ y: '-50%', opacity: 0 }}
            animate={
                isShowBlock && !isAnimationHide
                    ? { y: '0%', opacity: 1 }
                    : { y: '-50%', opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="py-3 rounded-md text-text-primary mb-5 bg-bg-tertiary flex justify-between items-center px-10"
        >
            <div>
                Xóa {arr.length} {title} được chọn
            </div>
            <img
                onClick={handleRemove}
                src={trash_red}
                alt=""
                className="cursor-pointer"
            />
            {isOpenModal && (
                <ConfirmRemoveModal
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    arr={arr}
                    handleHideBlock={handleHideBlock}
                    funcCallApiDelete={funcCallApiDelete}
                    funcCallApiGet={funcCallApiGet}
                    title={title}
                    type={type}
                    slug={slug}
                    currentId={currentId}
                    arrRemove={arrRemove}
                    removeFileImgUploadNew={removeFileImgUploadNew}
                />
            )}
        </motion.div>
    );
}

export default BlockRemoveCommon;
