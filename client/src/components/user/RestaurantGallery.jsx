import nhahang1 from '@/assets/image/nhahang1.jpg';
import nhahang3 from '@/assets/image/nhahang3.jpeg';
import nhahang2 from '@/assets/image/nhahang2.jpg';
import nhahang4 from '@/assets/image/nhahang4.jpg';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const GalleryImg = [
    { src: nhahang1 },
    { src: nhahang3 },
    { src: nhahang2 },
    { src: nhahang4 },
];
function RestaurantGallery() {
    const { ref, inView } = useInView({
        threshold: 0.6,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className=" pt-20 bg-transparent ">
            <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={
                    inView
                        ? { opacity: 1, y: '0%' }
                        : { opacity: 0, y: '-100%' }
                }
                transition={{ duration: 1 }}
                className="text-white text-center mb-10 font-oswald text-5xl"
            >
                Bộ sưu tập của nhà hàng
            </motion.div>
            <div className="h-96 grid grid-cols-4 max-sm:grid-cols-2 w-full cursor-pointer">
                {GalleryImg.map((item, index) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: index % 2 === 0 ? '50%' : '-50%',
                        }}
                        animate={
                            inView
                                ? {
                                      opacity: 1,
                                      y: '0',
                                  }
                                : {
                                      opacity: 0,
                                      y: index % 2 === 0 ? '50%' : '-50%',
                                  }
                        }
                        transition={{ duration: 1 }}
                        key={index}
                        className="overflow-hidden"
                    >
                        <img
                            src={item.src}
                            alt="gallery"
                            className="w-full h-full hover:scale-110 transition-all ease-linear duration-300
                                        object-cover object-center"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantGallery;
