import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import banner_1 from '@/assets/image/banner_1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReview } from '@/redux/reviewSlice';
import CapitalizeFirstLetter from '../common/CapitalizeFirstLetter';

const recomends = [
    {
        name: 'Nguyễn văn a',
        address: 'hà nội',
        content:
            "I have visited this fantastic restaurant on several occasions, Rodich's food is absolutely outstanding and the attention to detail is in  league of its own.",
    },
    {
        name: 'Nguyễn văn b',
        address: 'Đà nẵng',
        content:
            "I have visited this fantastic restaurant on several occasions, Rodich's food is absolutely outstanding and the attention to detail is in  league of its own.",
    },
    {
        name: 'Nguyễn văn c',
        address: 'quảng ninh',
        content:
            "I have visited this fantastic restaurant on several occasions, Rodich's food is absolutely outstanding and the attention to detail is in  league of its own.",
    },
    {
        name: 'Nguyễn văn d',
        address: 'hà nội',
        content:
            "I have visited this fantastic restaurant on several occasions, Rodich's food is absolutely outstanding and the attention to detail is in  league of its own.",
    },
];

function ClientFeedback() {
    const dispatch = useDispatch();
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const reviewStore = useSelector((state) => state.review);

    useEffect(() => {
        dispatch(getAllReview());
    }, [dispatch]);

    return (
        <div ref={ref} className="bg-white py-32">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            flex items-center flex-wrap max-xs:px-2"
            >
                {/* block left */}
                <div className="w-1/2 px-5 max-md:px-0 max-sm:w-full max-sm:mb-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '-100%' }
                        }
                        transition={{ duration: 1 }}
                        className="font-great text-5xl text-yellow-primary"
                    >
                        Khách hàng phản hồi
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '-100%' }
                        }
                        transition={{ duration: 1.2 }}
                        className="font-oswald text-4xl mb-5"
                    >
                        Lời nói hay của khách hàng
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '100%' }
                        }
                        transition={{ duration: 1.4 }}
                        className="font-cabin text-gray-primary mb-5"
                    >
                        Chúng tôi rất mong nhận được phản hồi từ khách hàng để
                        nâng cao chất lượng của nhà hàng
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '100%' }
                        }
                        transition={{ duration: 1.6 }}
                        className="dots-menu"
                    ></motion.div>
                    <div className="mt-6 mb-10">
                        <Swiper
                            loop={true}
                            navigation={{
                                nextEl: '.swiper-button-next-recommend',
                                prevEl: '.swiper-button-prev-recommend',
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            allowSlideNext={true}
                            allowSlidePrev={true}
                            modules={[Navigation, Autoplay]}
                        >
                            {reviewStore.reviews?.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: '100%' }}
                                        animate={
                                            inView
                                                ? { opacity: 1, y: '0%' }
                                                : { opacity: 0, y: '100%' }
                                        }
                                        transition={{ duration: 1.6 }}
                                        className="flex gap-3"
                                    >
                                        <img
                                            src={banner_1}
                                            alt=""
                                            className="h-16 w-16 rounded-lg object-cover"
                                        />
                                        <div className="font-cabin text-gray-primary">
                                            <div className="font-oswald text-black">
                                                {item.reviewer?.name ||
                                                    item.reviewer?.username}
                                            </div>
                                            <div className="mb-5">
                                                {item.reviewer.address
                                                    ?.addressDetail || ''}
                                            </div>
                                            <q className="">
                                                {CapitalizeFirstLetter(
                                                    item.content
                                                )}
                                            </q>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '100%' }
                        }
                        transition={{ duration: 1.6 }}
                        className="dots-menu relative "
                    >
                        <button
                            className="swiper-button-next-recommend absolute -translate-y-3 right-0 
                                        border w-6 h-6 flex justify-center items-center 
                                        rounded-full text-gray-400 bg-white hover:bg-black hover:text-white
                                        transition-colors ease-linear duration-300"
                        >
                            {' '}
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-[10px]"
                            />
                        </button>
                        <button
                            className="swiper-button-prev-recommend absolute -translate-y-3 left-0 
                                        border w-6 h-6 flex justify-center items-center 
                                        rounded-full text-gray-400 bg-white hover:bg-black hover:text-white
                                        transition-colors ease-linear duration-300"
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="text-[10px]"
                            />
                        </button>
                    </motion.div>
                </div>

                {/* block right images */}
                <div className="w-1/2 flex h-full px-4 max-sm:w-full ">
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '-100%' }
                        }
                        transition={{ duration: 1.6 }}
                        className="w-1/2 h-[620px] max-sm:h-[500px] flex items-center"
                    >
                        <img
                            src={banner_1}
                            alt=""
                            className="w-full h-[540px] max-lg:h-[410px] max-md:h-[314px] 
                                        max-sm:h-[400px]  object-cover px-1 -translate-y-16
                                        max-xs:h-[300px] "
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={
                            inView
                                ? { opacity: 1, y: '0%' }
                                : { opacity: 0, y: '100%' }
                        }
                        transition={{ duration: 1.6 }}
                        className="w-1/2 h-[620px] max-sm:h-[500px] flex items-center"
                    >
                        <img
                            src={banner_1}
                            alt=""
                            className="w-full h-[540px] max-lg:h-[410px] max-md:h-[314px] max-sm:h-[400px] 
                                    max-xs:h-[300px] object-cover px-1 "
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ClientFeedback;
