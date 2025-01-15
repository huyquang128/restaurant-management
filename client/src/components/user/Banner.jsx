import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentImgIndex } from '@/redux/user';
import { motion } from 'framer-motion';

const imageCarousel = [
    {
        sub_title: 'Trải nghiệm ẩm thực đỉnh cao',
        title: 'Chào mừng đến nhà hàng SAVOR.',
    },
    {
        sub_title: 'Không gian ấm cúng, ẩm thực hoàn hảo.',
        title: 'Thế giới ẩm thực đậm chất sáng tạo.',
    },
    {
        sub_title: 'Mỗi món ăn kể một câu chuyện.',
        title: 'Hành trình khám phá ẩm thực tinh tế',
    },
];

function Banner() {
    const dispatch = useDispatch();

    const currentImgIndex = useSelector((state) => state.user?.currentImgIndex);

    const handleSlideChange = (swiper) => {
        dispatch(setCurrentImgIndex(swiper.realIndex));
    };

    return (
        <div className="">
            <div className="relative flex items-center w-full h-screen ">
                <Swiper
                    loop={true}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    autoplay={{
                        delay: 10000,
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
                    {imageCarousel.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-center">
                                <div
                                    className="font-great text-yellow-primary text-5xl
                                             max-sm:text-4xl max-xs:text-3xl  
                                               py-2 flex justify-center gap-1 flex-wrap"
                                >
                                    {item.sub_title
                                        .split('')
                                        .map((char, indexChar) => (
                                            <motion.div
                                                key={`${index}-${indexChar}-${char}`}
                                                className=""
                                                initial={{
                                                    opacity: 0,
                                                    y: '-100%',
                                                }}
                                                animate={
                                                    currentImgIndex === index
                                                        ? {
                                                              opacity: 1,
                                                              y: '0',
                                                          }
                                                        : {
                                                              opacity: 0,
                                                              y: '-100%',
                                                          }
                                                }
                                                transition={{
                                                    delay: indexChar * 0.1,
                                                    duration: 0.5,
                                                }}
                                            >
                                                {char}
                                            </motion.div>
                                        ))}
                                </div>
                                <div
                                    className="font-oswald text-5xl text-white mb-10 whitespace-nowrap
                                                 max-sm:text-4xl max-xs:text-[26px]"
                                >
                                    {item.title
                                        .split('')
                                        .map((char, indexChar) => (
                                            <motion.span
                                                key={`${index}-${indexChar}-${char}`}
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={
                                                    currentImgIndex === index
                                                        ? { opacity: 1 }
                                                        : {
                                                              opacity: 0,
                                                          }
                                                }
                                                transition={{
                                                    delay: indexChar * 0.1,
                                                    duration: 0.3,
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                </div>
                                <motion.button
                                    initial={{ opacity: 0, y: '50%' }}
                                    animate={
                                        currentImgIndex === index
                                            ? { opacity: 1, y: '0' }
                                            : { opacity: 0, y: '50%' }
                                    }
                                    transition={{ duration: 1 }}
                                    className="border-2 text-sm w-40 h-12 text-white font-cabin
                                            hover:bg-yellow-primary hover:border-yellow-primary
                                            transition-colors ease-linear max-sm:w-32 max-sm:h-10"
                                >
                                    ĐẶT BÀN
                                </motion.button>
                            </div>
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
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-white"
                    />
                </button>
            </div>
        </div>
    );
}

export default Banner;
