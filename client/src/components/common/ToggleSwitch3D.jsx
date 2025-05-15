/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const ToggleSwitch3D = ({ ...props }) => {
    const { handleClick, isOn } = props;

    return (
        <div
            onClick={handleClick}
            className={`w-12 h-6 rounded-full px-1 flex items-center cursor-pointer transition-colors duration-300 
                ${
                    isOn
                        ? 'bg-gradient-to-r from-green-400 to-green-600 justify-end'
                        : 'bg-gradient-to-r from-gray-300 to-gray-400 justify-start'
                } 
                shadow-inner`}
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                className="w-4 h-4 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                style={{
                    background:
                        'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0)',
                }}
            />
        </div>
    );
};

export default ToggleSwitch3D;
