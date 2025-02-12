import { motion } from 'framer-motion';
import Button from '../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import warning from '@/assets/icon/warning.svg';
import { useDispatch, useSelector } from 'react-redux';
import ToastMsg from '../common/ToastMsg';

function ConfirmSaveDirect({ ...props }) {
    const { isOpenModal } = props;
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center
                     bg-black bg-opacity-15 z-20"
        >
            <motion.div
                // initial={{ opacity: 0 }}
                // animate={
                //     isOpenModal && !isCloseModalAnimation
                //         ? { opacity: 1 }
                //         : { opacity: 0 }
                // }
                // transition={{ duration: 0.3 }}
                className="bg-bg-tertiary w-[380px] p-3 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center">
                    <FontAwesomeIcon
                        // onClick={closeModal}
                        icon={faXmark}
                        className=" cursor-pointer"
                    />
                </div>

                <div className="py-5">
                    <div className="flex gap-1 items-center">
                        <img src={warning} alt="" />
                        <div className="text-yellow-primary">
                            <div>
                                Bạn có chắc là bạn muốn thoát khi chưa lưu?
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 pt-5 border-t border-bg-secondary">
                    <Button
                        bg="white"
                        title="Thoát"
                        text_color="black"
                        bg_border="black"
                        // handleClick={closeModal}
                        type="button"
                    />
                    <Button
                        bg="black"
                        title="lưu"
                        text_color="white"
                        type="button"
                        // handleClick={handleRemove}
                        // color_ring={productStore.isLoading ? true : false}
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default ConfirmSaveDirect;
