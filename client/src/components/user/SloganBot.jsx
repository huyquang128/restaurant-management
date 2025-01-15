import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function SloganBot() {
    const { ref, inView } = useInView({
        threshold: 0.6,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            className="h-96 py-10 flex flex-col justify-center text-center w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                  bg-transparent"
        >
            <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={
                    inView
                        ? { opacity: 1, y: '0%' }
                        : { opacity: 0, y: '-100%' }
                }
                transition={{ duration: 1 }}
                className="font-great text-yellow-primary text-5xl
                        max-sm:text-3xl"
            >
                Những món ăn ngon nhất được sinh ra từ lòng nhiệt thành.
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={
                    inView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }
                }
                transition={{ duration: 1 }}
                className="font-oswald text-5xl max-sm:text-3xl text-white"
            >
                Mỗi món ăn là một hành trình đầy cảm xúc.
            </motion.div>
        </div>
    );
}

export default SloganBot;
