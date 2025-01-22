import bag_white from '@/assets/icon/bag_white.svg';
import bag_black from '@/assets/icon/bag_black.svg';
import search_white from '@/assets/icon/search_white.svg';
import search_black from '@/assets/icon/search_black.svg';
import menu_white from '@/assets/icon/menu_white.svg';
import menu_black from '@/assets/icon/menu_black.svg';
import useScrollHandling from '../hooks/useScrollHandling';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import RightSideDrawModal from '../modals/RightSideDrawModal';
import { useSelector } from 'react-redux';
import TooltipCommon from '../common/TooltipCommon';
import AvatarCommon from '../common/AvatarCommon';

const category = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Thực đơn', link: '/thực-đơn' },
    { name: 'Đặt bàn' },
    { name: 'Shop' },
    { name: 'Liên hệ' },
];

function Header() {
    const { scrollPosition } = useScrollHandling();

    const authStore = useSelector((state) => state?.auth);
    const userStore = useSelector((state) => state?.user);

    const [fixedPosition, setFixedPosition] = useState(false);
    const [indexActiveCategory, setIsActiveCategory] = useState(null);
    const [isOpenModalMenu, setIsOpenModalMenu] = useState(false);
    const [isOpenTooltipUser, setIsOpenTooltipUser] = useState(false);
    const [isCloseTooltipAnimation, setIsCloseTooltipAnimation] =
        useState(false);

    useEffect(() => {
        setFixedPosition(scrollPosition > 80);
    }, [scrollPosition]);

    //handle events
    const handleHover = (index) => {
        setIsActiveCategory(index);
    };

    const handleCloseTooltip = () => {
        setIsCloseTooltipAnimation(true);
        setTimeout(
            () => {
                setIsCloseTooltipAnimation(false);
                setIsOpenTooltipUser(false);
            },

            200
        );
    };

    return (
        <div
            className={` font-cabin w-full shadow-header-shadow  ${
                fixedPosition
                    ? ' bg-white fixed z-50  mt-0 transition-transform ease-linear duration-500 text-black -top-[100px] translate-y-[100px]'
                    : ' text-white relative z-50'
            } `}
        >
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs
                                flex justify-between mx-auto
                                items-center py-4 px-3.5"
            >
                <Link to="/">
                    <div className="text-2xl text-yellow-primary">SAVOR.</div>
                </Link>
                <div className="flex items-center gap-6 max-md:hidden">
                    {category.map((item, index) => (
                        <Link key={index} to={item.link}>
                            <div
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={() => setIsActiveCategory(null)}
                                className="relative cursor-pointer"
                            >
                                <div>{item.name}</div>
                                <div
                                    className={`absolute bottom-0 h-[2px] ${
                                        indexActiveCategory === index
                                            ? 'w-full'
                                            : 'w-0'
                                    }  bg-yellow-primary transition-all ease-in-out duration-300`}
                                ></div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-transparent border-b-2 max-md:hidden">
                        <img
                            src={fixedPosition ? search_black : search_white}
                            alt="search"
                            className="h-7"
                        />
                        <input
                            type="text"
                            className="bg-transparent outline-none px-2 placeholder:text-gray-300"
                            placeholder="Tìm món ăn..."
                        />
                    </div>
                    <div>
                        <img
                            src={fixedPosition ? search_black : search_white}
                            alt="search"
                            className="md:hidden"
                        />
                    </div>
                    <div className="relative">
                        <img
                            src={fixedPosition ? bag_black : bag_white}
                            alt="bag_bold"
                            className="h-6"
                        />
                        <div className="absolute bg-yellow-primary rounded-full -top-2 left-1 translate-x-2 text-xs px-1.5 py-0.5">
                            0
                        </div>
                    </div>

                    {authStore?.isAuthenticated ? (
                        <AvatarCommon
                            isOpenTooltipUser={isOpenTooltipUser}
                            setIsOpenTooltipUser={setIsOpenTooltipUser}
                            handleCloseTooltip={handleCloseTooltip}
                            userStore={userStore}
                            isCloseTooltipAnimation={isCloseTooltipAnimation}
                        />
                    ) : (
                        <Link to="/login">
                            <div className="max-md:hidden cursor-pointer hover:text-yellow-primary">
                                Đăng nhập
                            </div>
                        </Link>
                    )}

                    <div
                        onClick={() => setIsOpenModalMenu(true)}
                        className="md:hidden cursor-pointer"
                    >
                        <img
                            src={fixedPosition ? menu_black : menu_white}
                            alt="menu"
                            className="h-7"
                        />
                    </div>

                    {/* modal menu */}
                    {isOpenModalMenu && (
                        <RightSideDrawModal
                            isOpenModalMenu={isOpenModalMenu}
                            setIsOpenModalMenu={setIsOpenModalMenu}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
