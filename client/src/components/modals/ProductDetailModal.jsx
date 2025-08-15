/* eslint-disable react/prop-types */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ProductDetailCardCommon from '../common/CardCommon/ProductDetailCardCommon';

function ProductDetailModal({ ...props }) {
    const { onClose } = props;
    const productStore = useSelector((state) => state.product);
    // const refModal = useRef();

    // useOutsideClickModal(refModal, closeModal);

    return (
        <div
            className="fixed inset-0
                        flex justify-center items-center bg-black 
                        bg-opacity-15  font-cabin z-50 "
        >
            <motion.div
                // ref={refModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-bg-secondary w-[600px] relative    
                shadow-lg h-[650px] rounded-lg"
            >
                <div
                    onClick={onClose}
                    className="absolute z-20 bg-white h-8 w-8 rounded-full 
                            flex justify-center items-center right-2 top-2
                            hover:bg-color-active transition-colors ease-linear 
                            duration-200 hover:text-yellow-primary cursor-pointer "
                >
                    <FontAwesomeIcon icon={faXmark} className=" " />
                </div>
                <ProductDetailCardCommon
                    itemProduct={productStore.productSelected}
                    type="modal"
                    modal={true}
                    onClose={onClose}
                />
            </motion.div>
        </div>
    );
}

export default ProductDetailModal;
