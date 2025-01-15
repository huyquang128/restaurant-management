import story_1 from '@/assets/image/story-1.webp';
import story_2 from '@/assets/image/story-2.webp';
import welcome_Section from '@/assets/image/welcome_Section.webp';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function WelcomeSection() {
    const { ref, inView } = useInView({
        threshold: 0.6,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className="bg-96 bg-white">
            <div className="py-16">
                <div className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto flex max-md:flex-wrap">
                    {/* block right */}
                    <div className="w-1/2 text-center max-sm:w-full">
                        <motion.h1
                            initial={{ opacity: 0, y: '-50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '-50%' }
                            }
                            transition={{ duration: 1 }}
                            className="font-great text-5xl text-yellow-primary whitespace-nowrap"
                        >
                            Welcome to Savor
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: '-50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '-50%' }
                            }
                            transition={{ duration: 1.2 }}
                            className="font-oswald text-4xl mb-3"
                        >
                            Khám phá chúng tôi
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: '-50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '-50%' }
                            }
                            transition={{ duration: 1.4 }}
                            className="flex justify-center mb-3"
                        >
                            <img src={welcome_Section} alt="" />
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: '50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '50%' }
                            }
                            transition={{ duration: 1.6 }}
                            className="font-cabin text-gray-primary mb-5 px-10"
                        >
                            "Con người, ẩm thực và vị trí đắc địa khiến Rodich
                            trở thành nơi hoàn hảo cho những người bạn và gia
                            đình tốt để đến với nhau và có khoảng thời gian
                            tuyệt vời. Mỗi khi bạn dùng bữa hoàn hảo với chúng
                            tôi, bạn sẽ rất vui khi được thưởng thức những món
                            ăn tuyệt vời đầy cảm hứng trong một môi trường được
                            thiết kế với những nét riêng độc đáo của khu vực địa
                            phương."
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: '50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '50%' }
                            }
                            transition={{ duration: 1.8 }}
                            className="font-cabin underline underline-offset-8 decoration-yellow-primary
                         hover:text-yellow-primary transition-colors ease-linear duration-150"
                        >
                            Khám phá
                        </motion.button>
                    </div>

                    {/* block left img */}
                    <div
                        className="flex w-1/2 gap-2 justify-center max-md:mt-9
                            max-sm:w-full"
                    >
                        <motion.img
                            initial={{ opacity: 0, y: '-50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '-50%' }
                            }
                            transition={{ duration: 1.1 }}
                            src={story_1}
                            alt=""
                            className="w-48 h-72 max-md:w-32 max-md:h-44"
                        />
                        <motion.img
                            initial={{ opacity: 0, y: '50%' }}
                            animate={
                                inView
                                    ? { opacity: 1, y: '0%' }
                                    : { opacity: 0, y: '50%' }
                            }
                            transition={{ duration: 1.1 }}
                            src={story_2}
                            alt=""
                            className="w-48 h-72 max-md:w-32 max-md:h-44"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeSection;
