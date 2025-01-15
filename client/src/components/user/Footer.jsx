import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import banner_1 from '@/assets/image/banner_1.jpg';

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

function Footer() {
    return (
        <div className="bg-black-primary py-20 ">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                            grid grid-cols-4 max-md:grid-cols-2 max-md:gap-10 max-sm:grid-cols-1"
            >
                {/*  */}
                <div className="px-5">
                    <h3 className="text-white mb-5">SAVOR.</h3>
                    <p className="text-gray-primary mb-3">
                        Con người, ẩm thực và vị trí đắc địa khiến Rodich trở
                        thành nơi hoàn hảo để những khách hàng thân thiết có
                        khoảng thời gian tuyệt vời. Chúng tôi mong được chào đón
                        bạn sớm.
                    </p>
                    <div className="flex gap-2">
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
                </div>

                {/* Recent Posts */}
                <div className="px-5">
                    <h3 className="text-white mb-5 font-cabin">
                        BÀI ĐĂNG GẦN ĐÂY
                    </h3>
                </div>

                {/* BỘ SƯU TẬP TRÊN FLICKR */}
                <div className="pr-12 max-sm:px-5">
                    <div className="text-white mb-5 font-cabin">BỘ SƯU TẬP</div>
                    <div className="grid grid-cols-2 gap-2">
                        {GalleryImg.map((item, index) => (
                            <div key={index}>
                                <img
                                    src={item.src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* GIỜ MỞ CỬA */}
                <div className="px-2 max-sm:px-5">
                    <div className="text-white mb-5 font-cabin">GIỜ MỞ CỬA</div>
                    <div>
                        {openHours.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex text-gray-primary justify-between items-center mb-4"
                            >
                                <div className="bg-black-primary z-10 pr-1">
                                    {item.name}
                                </div>
                                <div className="dots absolute bottom-0"></div>
                                <div className="bg-black-primary z-10 pl-1">
                                    {item.hours}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="font-cabin text-white underline underline-offset-8 decoration-yellow-primary">
                        Đặt bàn
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
