import { motion } from 'framer-motion';

function TrendingUpAnimation() {
    return (
        <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                fill="none"
                stroke="#00B69B"
                strokeWidth="1.5"
                strokeDasharray="100" // Tổng chiều dài của đường vẽ
                strokeDashoffset="100" // Bắt đầu chưa vẽ
                animate={{
                    strokeDashoffset: 0, // Vẽ từ từ cho đến hết
                }}
                transition={{
                    duration: 2, // Thời gian để vẽ xong
                    ease: 'easeInOut',
                }}
            />
        </motion.svg>
    );
}

export default TrendingUpAnimation;
