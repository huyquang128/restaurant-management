import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const arrMenuCategory = [
    { title: 'Món lẩu' },
    { title: 'Món Nướng' },
    { title: 'Món Khai vị' },
    { title: 'Món chính' },
];

const dishs = [
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
    { name: 'SMOKED SWORDFISH DIP', price: 270000 },
];

function DiscoverMenu() {
    const { ref, inView } = useInView({
        threshold: 0.7,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className="bg-white">
            <div
                className="justify-center text-center w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            py-10 max-xs:px-3"
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
                    className="flex font-cabin gap-5 mb-5"
                >
                    {arrMenuCategory.map((item, index) => (
                        <div key={index}>{item.title.toLocaleUpperCase()}</div>
                    ))}
                </motion.div>

                {/* list dish */}
                <div className="grid grid-cols-2 gap-12 max-sm:grid-cols-1 mb-10">
                    {dishs.map((dish, index) => (
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
                                          x: index % 2 === 0 ? '-100%' : '100%',
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
                                {dish.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
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
