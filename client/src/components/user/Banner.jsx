import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentImgIndex } from '@/redux/userSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { getAllSlide } from '@/redux/slideShowSlice';

function Banner() {
    const dispatch = useDispatch();

    const currentImgIndex = useSelector((state) => state.user?.currentImgIndex);
    const slideStore = useSelector((state) => state.slide);

    useEffect(() => {
        dispatch(getAllSlide());
    }, [dispatch]);

    const handleSlideChange = (swiper) => {
        dispatch(setCurrentImgIndex(swiper.realIndex));
    };

    return (
        <div className="relative flex items-center w-full h-screen ">
            <Swiper
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                allowSlideNext={true}
                allowSlidePrev={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation, EffectFade, Autoplay]}
                onSlideChange={handleSlideChange}
            >
                {slideStore.slide?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <AnimatePresence mode="await">
                            <div className="text-center">
                                <motion.div
                                    exit={{ y: 100 }}
                                    className="font-great text-yellow-primary text-5xl
                                             max-sm:text-4xl max-xs:text-3xl  
                                               py-2 flex justify-center gap-1 
                                               flex-wrap brightness-125 "
                                >
                                    {item.titlePrimary.split('').map(
                                        (char, indexChar) =>
                                            currentImgIndex === index && (
                                                <motion.div
                                                    key={`${index}-${indexChar}-${char}`}
                                                    // key={index}
                                                    className=""
                                                    initial={{
                                                        opacity: 0,
                                                        y: -100,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -100,
                                                    }}
                                                    transition={{
                                                        delay: indexChar * 0.05,
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    {char}
                                                </motion.div>
                                            )
                                    )}
                                </motion.div>
                                <div
                                    className="font-oswald text-5xl text-white mb-10 whitespace-nowrap
                                                 max-sm:text-4xl max-xs:text-[26px]"
                                >
                                    {item.titleSecondary.split('').map(
                                        (char, indexChar) =>
                                            currentImgIndex === index && (
                                                <motion.span
                                                    key={`${index}-${indexChar}-${char}`}
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        delay: indexChar * 0.04,
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    {char}
                                                </motion.span>
                                            )
                                    )}
                                </div>

                                {currentImgIndex === index && (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        transition={{ duration: 2 }}
                                        className="border-2 text-sm w-40 h-12 text-white font-cabin
                                            hover:bg-yellow-primary hover:border-yellow-primary
                                            transition-colors ease-linear max-sm:w-32 max-sm:h-10"
                                    >
                                        ĐẶT BÀN
                                    </motion.button>
                                )}
                            </div>
                        </AnimatePresence>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                className="swiper-button-next border-none outline-none hover:bg-black transition-colors
                                    ease-in-out duration-300"
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-white arr-right-banner"
                />
            </button>
            <button
                className="swiper-button-prev border-none outline-none hover:bg-black transition-colors
                                    ease-in-out duration-300"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
            </button>
        </div>
    );
}

export default Banner;
