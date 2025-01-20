import banner_1 from '@/assets/image/banner_1.jpg';
import { useState } from 'react';
import { motion } from 'framer-motion';

function TooltipCommon({
    isOpenTooltip,
    setIsOpenTooltip,
    isCloseTooltipAnimation,
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={
                isOpenTooltip && !isCloseTooltipAnimation
                    ? { opacity: 1 }
                    : { opacity: 0 }
            }
            onMouseEnter={() => setIsOpenTooltip(true)}
            transition={{ duration: 0.2 }}
            className="absolute top-10 bg-white text-black px-5 w-52 rounded-lg py-2 right-0
                    shadow-header-shadow"
        >
            <div className="flex flex-col justify-center items-center mt-5">
                <div
                    className="h-12 w-12 rounded-full bg-black
                            overflow-hidden border flex-col "
                >
                    <img
                        src={banner_1}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>username</div>
            </div>
            <div className="border-b ">
                <div className="py-2 hover:text-yellow-primary transition-colors ease-linear duration-300">
                    Thông tin cá nhân
                </div>
                <div className="pb-2 hover:text-yellow-primary transition-colors ease-linear duration-300">
                    Đơn hàng
                </div>
            </div>
            <div className="py-2 hover:text-yellow-primary transition-colors ease-linear duration-300">
                logout
            </div>
        </motion.div>
    );
}

export default TooltipCommon;
