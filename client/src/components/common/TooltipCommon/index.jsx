/* eslint-disable react/prop-types */
import useOutsideClick from '@/components/hooks/useOutsideClick';
import { motion } from 'framer-motion';

function TooltipCommon({ content, ...props }) {
    const { type, isOpenTooltip, isCloseTooltipAnimation, handleOutSide } =
        props;
    const { ref } = useOutsideClick(handleOutSide);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={
                isOpenTooltip && !isCloseTooltipAnimation
                    ? { opacity: 1 }
                    : { opacity: 0 }
            }
            transition={{ duration: 0.2 }}
            className={`absolute top-10 bg-bg-tertiary text-text-primary px-1 ${
                (type === 'avatar' && 'w-52') ||
                (type === 'imp-exp' && 'w-48 px-2') ||
                'w-36'
            } rounded-lg py-2 right-0 shadow-header-shadow z-20`}
        >
            {content}
        </motion.div>
    );
}

export default TooltipCommon;
