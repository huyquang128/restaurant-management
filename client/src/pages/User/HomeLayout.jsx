import { useEffect, useRef, useState } from 'react';
import Footer from '@/components/user/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router';

import Header from '@/components/user/Header';
import TopHeder from '@/components/user/TopHeder';
import banner_1 from '@/assets/image/banner_1.jpg';
import banner_3 from '@/assets/image/banner_3.jpg';
import banner_2 from '@/assets/image/banner_2.webp';
import CopyrightFooter from '@/components/user/CopyrightFooter';
import useScrollHandling from '@/components/hooks/useScrollHandling';
import ModalManager from '@/components/ModalManager';
import { getAllSlide } from '@/redux/slideShowSlice';

const arrListImage = [{ src: banner_2 }, { src: banner_1 }, { src: banner_3 }];

function HomeLayout() {
    const dispatch = useDispatch();
    const currentImgIndex = useSelector((state) => state.user?.currentImgIndex);
    const slideStore = useSelector((state) => state.slide);

    const [fixedPosition, setFixedPosition] = useState(false);
    let positionTranslate = useRef(0);

    const { scrollPosition } = useScrollHandling();

    useEffect(() => {
        dispatch(getAllSlide());
    }, [dispatch]);

    useEffect(() => {
        if (scrollPosition > 44) {
            setFixedPosition(true);
            positionTranslate.current += 1;
        } else {
            setFixedPosition(false);
            positionTranslate.current -= 1;
        }
    }, [scrollPosition]);

    return (
        <div className="relative ">
            {slideStore.slide?.map((item, index) => (
                <AnimatePresence key={index}>
                    {currentImgIndex === index && (
                        <motion.div
                            key={item.urlImg.url}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                ease: 'easeInOut',
                            }}
                            className="fixed top-0 flex flex-col w-full h-full z-10"
                        >
                            <motion.div
                                style={{
                                    backgroundImage: `url(${item.urlImg.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(50%)',
                                }}
                                className="fixed top-0 w-full h-full z-10"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            ))}

            <TopHeder />
            <Header />
            <div className="absolute z-20 top-0 w-full overflow-x-hidden">
                <Outlet />
                <Footer />
                <CopyrightFooter />
            </div>
            <ModalManager />
        </div>
    );
}

export default HomeLayout;
