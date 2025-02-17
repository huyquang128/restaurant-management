import { useState } from 'react';
import ColorRingAnimation from '../spinnerAnimation/ColorRingAnimation';
import { motion } from 'framer-motion';
/* eslint-disable react/prop-types */
function Button({ ...props }) {
    const { icon, title, bg, no_rounded, handleClick, type, color_ring } =
        props;
    const [isHoverBtn, setIsHoverBtn] = useState(false);

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHoverBtn(true)}
            onMouseLeave={() => setIsHoverBtn(false)}
            type={type || 'submit'}
            className={`relative z-0 flex items-center  gap-2 py-2.5 px-3 
            ${
                (bg === 'save' && 'bg-black') ||
                (bg === 'import' && 'bg-green-600') ||
                (bg === 'export' && 'bg-green-600') ||
                (bg === 'add' && 'bg-black') ||
                (bg === 'exit' && 'bg-blue-700') ||
                (bg === 'delete' && 'bg-red-600') ||
                (bg === 'blue' && 'bg-blue-700')
            } 
            ${no_rounded ? 'rounded-none' : 'rounded-[4px]'} 
            w-full justify-center overflow-hidden`}
        >
            {/* Icon và Text đảm bảo luôn trên cùng */}
            {icon && <img src={icon} alt="" className="relative z-20" />}
            <span className={` text-white relative z-20`}>
                {color_ring ? ColorRingAnimation() : title}
            </span>

            {/* Hiệu ứng phủ màu */}
            <motion.div
                className={`absolute w-[180%] h-full z-0  ${
                    (bg === 'save' && 'bg-yellow-primary') ||
                    (bg === 'add' && 'bg-black-secondary') ||
                    (bg === 'import' && 'bg-green-500') ||
                    (bg === 'export' && 'bg-green-500') ||
                    (bg === 'delete' && 'bg-red-500') ||
                    (bg === 'exit' && 'bg-blue-500 ') ||
                    (bg === 'blue' && 'bg-blue-700')
                }`}
                style={{
                    clipPath: 'polygon(0% 0%, 80% 0%, 85% 100%, 0% 100%)',
                }}
                initial={{ x: '-120%' }}
                animate={isHoverBtn ? { x: '0%' } : { x: '-120%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            ></motion.div>
        </button>
    );
}

export default Button;
