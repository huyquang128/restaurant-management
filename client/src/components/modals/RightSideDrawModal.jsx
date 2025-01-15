import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const category = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Thực đơn', link: '/thực-đơn' },
    { name: 'Đặt bàn' },
    { name: 'Shop' },
    { name: 'Liên hệ' },
];

function RightSideDrawModal({ isOpenModalMenu, setIsOpenModalMenu }) {
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const closeModal = () => {
        setIsCloseModalAnimation(true);

        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModalMenu(false);
        }, 300);
    };

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-end">
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={
                    isOpenModalMenu && !isCloseModalAnimation
                        ? { opacity: 1, x: '0' }
                        : { opacity: 0, x: '100%' }
                }
                transition={{ duration: 0.3 }}
                className=" w-96 min-h-screen flex gap-1 "
            >
                <FontAwesomeIcon
                    onClick={closeModal}
                    icon={faXmark}
                    className="h-30 w-30 px-3 py-2.5 bg-gray-200 text-black mt-2 shadow-2xl 
                            rounded-full cursor-pointer"
                />
                <div className="bg-white flex-1 p-8 shadow-header-shadow">
                    {category.map((item, index) => (
                        <Link key={index} to={item.link}>
                            <div className="cursor-pointer text-black">
                                <div>{item.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default RightSideDrawModal;
