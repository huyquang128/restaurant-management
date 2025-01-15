import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function SloganTop() {
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
                Chúng tôi mang lại trải nghiệm ẩm thực khó quên.
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={
                    inView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }
                }
                transition={{ duration: 1 }}
                className="font-oswald text-5xl max-sm:text-3xl text-white"
            >
                Kiên nhẫn là bí quyết để có món ăn ngon
            </motion.div>
        </div>
    );
}

export default SloganTop;
