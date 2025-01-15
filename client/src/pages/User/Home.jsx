import Banner from '@/components/user/Banner';
import ClientFeedback from '@/components/user/ClientFeedback';
import DiscoverMenu from '@/components/user/DiscoverMenu';
import RestaurantGallery from '@/components/user/RestaurantGallery';
import SectionMap from '@/components/user/SectionMap';
import SloganBot from '@/components/user/SloganBot';
import SloganCenter from '@/components/user/SloganCenter';
import SloganTop from '@/components/user/SloganTop';
import SpecialDishes from '@/components/user/SpecialDishes';
import WelcomeSection from '@/components/user/WelcomeSection';

function Home() {
    return (
        <>
            <Banner />
            <WelcomeSection />
            <SloganTop />
            <SpecialDishes />
            <SloganCenter />
            <DiscoverMenu />
            <RestaurantGallery />
            <ClientFeedback />
            <SloganBot />
            <SectionMap />
        </>
    );
}

export default Home;
