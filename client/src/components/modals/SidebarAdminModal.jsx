/* eslint-disable react/prop-types */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';

function SidebarAdminModal({ ...props }) {
    const { isOpenrModal, arr, isCloseModalAnimation, closeModal } = props;
    const authStore = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-start bg-black bg-opacity-30">
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={
                    isOpenrModal && !isCloseModalAnimation
                        ? { opacity: 1, x: '0' }
                        : { opacity: 0, x: '-100%' }
                }
                transition={{ duration: 0.3 }}
                className=" w-80 min-h-screen flex gap-1 "
            >
                <div className="bg-bg-tertiary flex-1 shadow-header-shadow">
                    <h1 className="text-center py-6 text-2xl text-yellow-primary border-b border-gray-100 ">
                        SAVOR.
                    </h1>
                    {/* category */}
                    {arr.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between px-5 py-4 cursor-pointer"
                        >
                            <div className="flex items-center justify-start gap-2 text-text-primary">
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? item.icon_black
                                            : item.icon_white
                                    }
                                    alt=""
                                    className="h-5 -translate-y-[2px]"
                                />
                                <div
                                    onClick={() => (
                                        navigate(item.link), closeModal()
                                    )}
                                >
                                    {item.name}
                                </div>
                            </div>
                            <img
                                src={
                                    authStore.theme === 'light'
                                        ? arr_down_black
                                        : arr_down_white
                                }
                                alt=""
                            />
                        </div>
                    ))}
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
