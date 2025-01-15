import Banner from '@/components/user/Banner';
import Header from '@/components/user/Header';
import TopHeder from '@/components/user/TopHeder';
import WelcomeSection from '@/components/user/WelcomeSection';
import { Outlet } from 'react-router';
import banner_1 from '@/assets/image/banner_1.jpg';
import banner_2 from '@/assets/image/banner_2.webp';
import banner_3 from '@/assets/image/banner_3.jpg';
import useScrollHandling from '@/components/hooks/useScrollHandling';
import { useEffect, useRef, useState } from 'react';
import SpecialDishes from '@/components/user/SpecialDishes';
import DiscoverMenu from '@/components/user/DiscoverMenu';
import RestaurantGallery from '@/components/user/RestaurantGallery';
import ClientFeedback from '@/components/user/ClientFeedback';
import SectionMakeReservation from '@/components/user/SectionMakeReservation';
import Footer from '@/components/user/Footer';
import CopyrightFooter from '@/components/user/CopyrightFooter';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SloganTop from '@/components/user/SloganTop';
import SloganBot from '@/components/user/SloganBot';
import SloganCenter from '@/components/user/SloganCenter';
import SectionMap from '@/components/user/SectionMap';

const arrListImage = [{ src: banner_2 }, { src: banner_1 }, { src: banner_3 }];

function HomeLayout() {
    //
    const currentImgIndex = useSelector((state) => state.user?.currentImgIndex);

    //
    const [fixedPosition, setFixedPosition] = useState(false);
    let positionTranslate = useRef(0);

    const { scrollPosition } = useScrollHandling();

    //
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
            {arrListImage.map((item, index) => (
                <motion.div
                    initial={{ scale: '100%' }}
                    animate={
                        currentImgIndex === index
                            ? { scale: '125%' }
                            : { scale: '100%' }
                    }
                    transition={{ duration: 2 }}
                    key={index}
                    className="fixed top-0 flex flex-col w-full h-full"
                >
                    {currentImgIndex === index && (
                        <img
                            src={item.src}
                            alt=""
                            className={`w-full h-full object-cover brightness-75 ${
                                fixedPosition
                                    ? `translate-y-[${positionTranslate}px]`
                                    : ''
                            }`}
                        />
                    )}
                </motion.div>
            ))}

            <TopHeder />
            <Header />
            <div className="absolute z-20 top-0 w-full overflow-x-hidden">
                <Outlet />
                <Footer />
                <CopyrightFooter />
            </div>
        </div>
    );
}

export default HomeLayout;
