// components/ModalManager.js
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import ProductDetailModal from './modals/ProductDetailModal';
import { hideModal } from '@/redux/modalSlice';

const ModalManager = () => {
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modal.modals);

    const handleClose = (type) => {
        dispatch(hideModal({ type })); // Đóng modal khi nhấn đóng
    };

    const renderModal = (modal) => {
        switch (modal.type) {
            case 'PRODUCT_DETAIL_MODAL':
                return (
                    <ProductDetailModal
                        key={modal.type}
                        {...modal.props}
                        onClose={() => handleClose('PRODUCT_DETAIL_MODAL')}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {modals.map((modal) => (
                <motion.div
                    key={modal.type}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderModal(modal)}
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default ModalManager;
