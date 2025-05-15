import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import banner_1 from '@/assets/image/banner_1.jpg';
import { Link } from 'react-router';

const iconSocial = [
    { icon: <FontAwesomeIcon icon={faFacebookF} /> },
    { icon: <FontAwesomeIcon icon={faTwitter} /> },
    { icon: <FontAwesomeIcon icon={faInstagram} /> },
];

const GalleryImg = [
    { src: banner_1 },
    { src: banner_1 },
    { src: banner_1 },
    { src: banner_1 },
    { src: banner_1 },
    { src: banner_1 },
];

const openHours = [
    { name: 'Monday - Friday', hours: '9am - 6pm' },
    { name: 'Monday - Friday', hours: '9am - 6pm' },
    { name: 'Monday - Friday', hours: '9am - 6pm' },
];

const category = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Thực đơn', link: '/menu' },
    { name: 'Ưu đãi' },
    { name: 'Liên hệ', link: '/contact' },
    { name: 'Đặt bàn' },
];

function Footer() {
    return (
        <div className="bg-black-primary py-20 ">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            grid grid-cols-4 max-md:grid-cols-2 max-md:gap-10 max-sm:grid-cols-1"
            >
                <div className="px-5">
                    <h3 className="text-white mb-5">SAVOR.</h3>
                    <button
                        className="border border-yellow-primary text-white 
                                        px-3 py-2 rounded-lg hover:bg-yellow-primary
                                        transition-all duration-300 ease-linear"
                    >
                        ĐẶT BÀN
                    </button>
                </div>

                <div className="px-5 flex flex-col text-white gap-4">
                    {category.map((item, index) => (
                        <Link key={index} to={item.link}>
                            <div className="cursor-pointer hover:text-yellow-primary">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="pr-12 max-sm:px-5 flex flex-col ">
                    <div className="text-white  font-cabin">Hotline:</div>
                    <div className="mb-2 text-yellow-primary">*999</div>
                    <div className="text-white mb-2 font-cabin">Email:</div>
                    <div className="mb-5 text-yellow-primary">
                        savor@gmail.com
                    </div>
                </div>

                <div className="px-2 max-sm:px-5">
                    <div className="flex gap-5 mb-4">
                        {iconSocial.map((item, index) => (
                            <div
                                key={index}
                                className="text-white h-8 w-8 rounded-full bg-black-secondary
                                        flex justify-center items-center"
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>
                    <div className="font-cabin text-white">@2023 SAVOR</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
