import banner_1 from '@/assets/image/banner_1.jpg';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const listDishes = [
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
    { name: 'Món ăn a', price: 10000, img: banner_1 },
];

const arrMenuCategory = [
    { title: 'Món lẩu' },
    { title: 'Món Nướng' },
    { title: 'Món Khai vị' },
    { title: 'Món chính' },
];
function Menu() {
    const ref = useRef(null);
    const location = useLocation();
    const decodedString = decodeURIComponent(location.pathname.split('/')[1]);

    const [activeCategory, setActiveCategory] = useState(0);
    const [activeProductAct, setActiveProductAct] = useState(null);

    //handle events
    const handleHoverProduct = (index) => {
        setActiveProductAct(index);
    };

    const handleOutSide = () => {
        setActiveProductAct(null);
    };

    return (
        <div className="relative">
            <img
                src={banner_1}
                alt=""
                className="h-[500px] w-full object-cover"
            />
            <div
                className="absolute text-5xl top-28 translate-y-28 font-oswald
                                right-1/2 translate-x-1/2 text-white"
            >
                Thực đơn
            </div>

            <div className="bg-white pb-10 pt-5">
                <div
                    className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                               font-cabin "
                >
                    {/* link */}
                    <div className="flex gap-2 items-center mb-5">
                        <Link to="/">
                            <span>Trang chủ</span>
                        </Link>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-xs"
                        />
                        <span className="text-yellow-primary">
                            {decodedString}
                        </span>
                    </div>
                    {/* list menu category */}
                    <div className="flex items-center gap-5 mb-5">
                        {arrMenuCategory.map((item, index) => (
                            <div
                                key={index}
                                className="cursor-pointer relative"
                                onClick={() => setActiveCategory(index)}
                            >
                                <div
                                    className={`${
                                        activeCategory === index
                                            ? 'text-yellow-primary'
                                            : ''
                                    }`}
                                >
                                    {item.title.toLocaleUpperCase()}
                                </div>
                                <div
                                    className={`absolute bottom-0 h-[2px] bg-yellow-primary 
                                                transition-all ease-in-out duration-300 ${
                                                    activeCategory === index
                                                        ? 'w-full'
                                                        : 'w-0'
                                                }`}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mb-5 ">
                        <div className="text-gray-primary">
                            Hiển thị 1-9 trên 12 kết quả
                        </div>
                        <div className="">Lọc món ăn</div>
                    </div>
                    {/* list dishes */}
                    <div
                        className="grid grid-cols-3 gap-x-6 gap-y-10 font-oswald
                                    max-md:grid-cols-2 max-sm:grid-cols-1"
                    >
                        {listDishes.map((item, index) => (
                            <div
                                key={index}
                                className=""
                                ref={ref}
                                onMouseEnter={() => handleHoverProduct(index)}
                                onMouseLeave={handleOutSide}
                            >
                                <div className="relative">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="w-full h-[341px] mb-5 object-cover"
                                    />
                                    <div
                                        className="absolute top-0 right-0  bottom-0 left-0 flex flex-col gap-5
                                                        justify-center items-center cursor-pointer"
                                        style={{
                                            background: `${
                                                activeProductAct === index
                                                    ? 'rgba(0,0,0,0.5)'
                                                    : 'transparent'
                                            }`,
                                        }}
                                    >
                                        <Link key={index} to={item.name}>
                                            <button
                                                className={`text-white border border-white hover:bg-yellow-primary
                                                            hover:border-yellow-primary w-40 py-3 transition-all ease-linear
                                                            duration-500 ${
                                                                activeProductAct ===
                                                                index
                                                                    ? 'translate-y-0 opacity-100'
                                                                    : '-translate-y-20 opacity-0'
                                                            }`}
                                            >
                                                Xem chi tiết
                                            </button>
                                        </Link>
                                        <button
                                            className={`text-white border border-white hover:bg-yellow-primary
                                                            hover:border-yellow-primary w-40 py-3 transition-all ease-linear
                                                            duration-500 ${
                                                                activeProductAct ===
                                                                index
                                                                    ? 'translate-y-0 opacity-100'
                                                                    : 'translate-y-20 opacity-0'
                                                            }`}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-center mb-3">
                                    {item.name.toLocaleUpperCase()}
                                </h3>
                                <div className="dots-menu "></div>
                                <div className="flex justify-center items-center gap-2 mt-3">
                                    <p className="text-gray-secondary text-center line-through decoration-1">
                                        {item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                    <p className=" text-center">
                                        {item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;
