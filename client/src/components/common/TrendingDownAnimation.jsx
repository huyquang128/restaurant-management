import { motion } from 'framer-motion';

function TrendingDownAnimation() {
    return (
        <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
                fill="none" // Bỏ fill để chỉ vẽ đường viền
                stroke="#F93C65" // Màu đỏ
                strokeWidth="1.5" // Độ dày nét vẽ
                strokeDasharray="100" // Chiều dài đường vẽ
                strokeDashoffset="100" // Ban đầu chưa vẽ gì
                animate={{
                    strokeDashoffset: 0, // Vẽ dần đến hết
                }}
                transition={{
                    duration: 2, // 2 giây vẽ hoàn tất
                    ease: 'easeInOut',
                }}
            />
        </motion.svg>
    );
}

export default TrendingDownAnimation;
