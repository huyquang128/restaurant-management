import { useSelector } from 'react-redux';
import RotatingLinesCommon from './common/spinnerAnimation/RotatingLinesCommon';
import { AnimatePresence, motion } from 'framer-motion';
export default function GlobalLoading() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] bg-yellow-primary bg-opacity-40 
                flex flex-col items-center justify-center gap-10"
            >
                <div className="text-yellow-primary text-3xl font-semibold font-oswald">
                    SAVOR
                </div>
                <span className="loader"></span>
            </motion.div>
        </AnimatePresence>
    );
}
