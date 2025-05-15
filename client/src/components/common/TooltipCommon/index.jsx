/* eslint-disable react/prop-types */
import useOutsideClick from '@/components/hooks/useOutsideClick';
import { motion } from 'framer-motion';
import arr_drop_down_white from '@/assets/icon/arr_drop_down_white.svg';
import useOutsideHover from '@/components/hooks/useOutsideHover';

function TooltipCommon({ content, ...props }) {
    const { type, isOpenTooltip, isCloseTooltipAnimation, handleOutSide } =
        props;
    // const { ref } = useOutsideClick(handleOutSide);
    const { refHover } = useOutsideHover(handleOutSide);

    return (
        <motion.div
            // ref={type === 'fast-view' ? refHover : ref}
            initial={{ opacity: 0 }}
            animate={
                isOpenTooltip && !isCloseTooltipAnimation
                    ? { opacity: 1 }
                    : { opacity: 0 }
            }
            transition={{ duration: 0.2 }}
            className={`absolute ${
                type === 'fast-view' ? '-top-11' : 'top-10'
            }  bg-bg-tertiary text-text-primary px-1 ${
                (type === 'avatar' && 'w-52') ||
                (type === 'imp-exp' && 'w-48 px-2') ||
                (type === 'sort-dishes' && 'w-[157px] px-2 top-11') ||
                (type === 'fast-view' && 'w-20 right-1/2 translate-x-1/2') ||
                'w-36'
            } rounded-lg py-2 right-0 shadow-header-shadow z-50`}
        >
            {type === 'fast-view' && (
                <img
                    src={arr_drop_down_white}
                    alt=""
                    className="absolute -bottom-2 right-1/2 translate-x-1/2"
                />
            )}

            {content}
        </motion.div>
    );
}

export default TooltipCommon;
