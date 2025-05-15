/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

function UnderLineCategoryCommon({ underlineProps }) {
    return (
        <motion.div
            layout
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
            }}
            className="absolute bottom-0 h-[1.5px] bg-yellow-primary rounded-full"
            style={{
                left: underlineProps.left,
                width: underlineProps.width,
            }}
        />
    );
}

export default UnderLineCategoryCommon;
