import heading_hori_right_shap from '@/assets/image/heading_hori_right_shap.webp';
import heading_hori_left_shap from '@/assets/image/heading_hori_left_shap.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '@/redux/productSlice';
import FormatVND from '../common/FormatVND';

function SpecialDishes() {
    const dispatch = useDispatch();

    const productStore = useSelector((state) => state.product);

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <div ref={ref} className="bg-white">
            <div
                className="flex flex-col justify-center text-center w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto bg-white py-10
            max-xs:px-3 "
            >
                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '-100%' }
                    }
                    transition={{ duration: 1 }}
                    className="text-yellow-primary font-great text-5xl"
                >
                    Món ăn đặc biệt
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '100%' }
                    }
                    transition={{ duration: 1 }}
                    className="relative text-center z-10 mb-10"
                >
                    <img
                        src={heading_hori_left_shap}
                        alt=""
                        className="absolute left-[29%] top-1/2 translate-y-1/2
                                    max-lg:left-1/4 max-md:left-[16%] max-sm:-left-[5%]
                                    max-xs:hidden"
                    />
                    <h2 className="font-oswald text-4xl ">
                        Đặc sản từ bếp trưởng
                    </h2>
                    <img
                        src={heading_hori_right_shap}
                        alt=""
                        className="absolute right-[29%] top-1/2 translate-y-1/2
                                  max-lg:right-1/4 max-md:right-[16%] max-sm:-right-[5%]
                                    max-xs:hidden"
                    />
                </motion.div>
                <div className="relative cursor-pointer z-10 ">
                    <Swiper
                        loop={true}
                        modules={[Pagination, Autoplay]}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 32,
                            },
                            // when window width is >= 480px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 32,
                            },
                            // when window width is >= 640px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="my-swiper"
                    >
                        {productStore?.products?.data
                            ?.slice(12, 19)
                            .map((item, index) => (
                                <SwiperSlide key={index}>
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y:
                                                index % 2 === 0
                                                    ? '100%'
                                                    : '-100%',
                                        }}
                                        animate={
                                            inView
                                                ? {
                                                      opacity: 1,
                                                      y: '0',
                                                  }
                                                : {
                                                      opacity: 0,
                                                      y:
                                                          index % 2 === 0
                                                              ? '100%'
                                                              : '-100%',
                                                  }
                                        }
                                        transition={{ duration: 1 }}
                                        className="relative flex flex-col justify-center items-center
                                                "
                                    >
                                        <img
                                            src={
                                                item?.images &&
                                                item.images[0]?.url
                                            }
                                            alt=""
                                            className="w-full h-full rounded-sm object-cover"
                                        />
                                        <div className="font-oswald text-xl font-medium mt-5">
                                            {item.name}
                                        </div>
                                        <div className="">
                                            {item?.categoryDishes?.name}
                                        </div>
                                        <div
                                            className="absolute bg-yellow-primary font-cabin text-white
                                                    py-1.5 px-2 top-4 left-4 "
                                        >
                                            Chỉ{' '}
                                            {FormatVND(
                                                item.promotion || item.selling
                                            )}
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default SpecialDishes;
