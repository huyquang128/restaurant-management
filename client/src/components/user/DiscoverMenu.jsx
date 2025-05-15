import { getAllCategoriesDishes } from '@/redux/categoryDishesSlice';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '../common/FormatVND';
import { useUnderlinePosition } from '../hooks/useUnderlinePosition';

function DiscoverMenu() {
    const dispatch = useDispatch();

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const [activeCategory, setActiveCategory] = useState(0);

    const { itemsRef, underlineProps } = useUnderlinePosition(
        activeCategory,
        [categoryDishesStore.category_dishes] // phụ thuộc vào danh mục
    );

    const { ref, inView } = useInView({
        threshold: 0.7,
        triggerOnce: true,
    });

    useEffect(() => {
        dispatch(getAllCategoriesDishes());
    }, [dispatch]);

    return (
        <div ref={ref} className="bg-white">
            <div
                className="justify-center text-center w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            py-10 max-xs:px-3 "
            >
                <motion.h2
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '-100%' }
                    }
                    transition={{ duration: 1 }}
                    className="text-yellow-primary font-great text-5xl"
                >
                    Khám phá thực đơn
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: '100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '100%' }
                    }
                    transition={{ duration: 1 }}
                    className="font-oswald text-4xl mb-10"
                >
                    Chọn món ăn của bạn từ thực đơn
                </motion.h2>

                {/* category */}
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '100%' }
                    }
                    transition={{ duration: 1.2 }}
                    className="flex font-cabin gap-5 mb-5 relative"
                >
                    {categoryDishesStore.category_dishes?.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (itemsRef.current[index] = el)}
                            onClick={() => setActiveCategory(index)}
                            className={`relative cursor-pointer hover:text-yellow-primary ${
                                activeCategory === index
                                    ? 'text-yellow-primary'
                                    : ''
                            }`}
                        >
                            {item.name.toLocaleUpperCase()}
                        </div>
                    ))}

                    {/* Single underline line that moves */}
                    <motion.div
                        layout
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                        }}
                        className="absolute bottom-0 h-[1.5px] bg-yellow-primary rounded-full"
                        style={{
                            left: underlineProps.left,
                            width: underlineProps.width,
                        }}
                    />
                </motion.div>

                {/* list dish */}
                <div className="grid grid-cols-2 gap-12 max-sm:grid-cols-1 mb-10">
                    {categoryDishesStore.category_dishes?.length > 0 &&
                        categoryDishesStore.category_dishes[
                            activeCategory
                        ].products?.map((dish, index) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? '-100%' : '100%',
                                }}
                                animate={
                                    inView
                                        ? {
                                              opacity: 1,
                                              x: '0',
                                          }
                                        : {
                                              opacity: 0,
                                              x:
                                                  index % 2 === 0
                                                      ? '-100%'
                                                      : '100%',
                                          }
                                }
                                transition={{ duration: 1.4 }}
                                key={index}
                                className="relative flex justify-between items-center gap-5 "
                            >
                                <div className="font-oswald font-medium bg-white z-20 pr-2">
                                    {dish.name}
                                </div>
                                <div className="dots-menu absolute "></div>
                                <div className="bg-white z-20 pl-2">
                                    {FormatVND(dish.promotion || dish.selling)}
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* <div> */}
                <motion.button
                    initial={{ opacity: 0, y: '100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '100%' }
                    }
                    transition={{ duration: 1.5 }}
                    className="bg-black font-cabin text-white px-7 py-3"
                >
                    Xem thực đơn đầy đủ
                </motion.button>
                {/* </div> */}
            </div>
        </div>
    );
}

export default DiscoverMenu;
