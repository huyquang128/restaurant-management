/* eslint-disable react/prop-types */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

import CategoryListContent from '../common/CategoryListContent';

function SidebarAdminModal({ ...props }) {
    const { isOpenrModal, isCloseModalAnimation, closeModal, type } = props;

    return (
        <div
            className="fixed top-0 z-20 left-0 bottom-0 right-0 flex 
                        justify-start bg-black bg-opacity-30 "
        >
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={
                    isOpenrModal && !isCloseModalAnimation
                        ? { opacity: 1, x: '0' }
                        : { opacity: 0, x: '-100%' }
                }
                transition={{ duration: 0.3 }}
                className=" w-80 h-full flex gap-1 "
            >
                <div className="bg-bg-secondary flex-1 shadow-header-shadow overflow-y-scroll">
                    <CategoryListContent closeModal={closeModal} type={type} />
                </div>

                <FontAwesomeIcon
                    onClick={closeModal}
                    icon={faXmark}
                    className="h-30 w-30 px-3 py-2.5 bg-gray-200 text-black mt-2 shadow-2xl 
                        rounded-full cursor-pointer"
                />
            </motion.div>
        </div>
    );
}

export default SidebarAdminModal;
