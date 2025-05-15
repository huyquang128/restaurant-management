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
import { useDispatch, useSelector } from 'react-redux';
import AvatarCommon from '../common/AvatarCommon';
import SearchModal from '../modals/SearchModal';
import CartModal from '../modals/CartModal';
import { getProductCart, setIsOpenCartModal } from '@/redux/cartSlice';
import SetTableNow from '../modals/SetTableNow';
import { useUnderlinePosition } from '../hooks/useUnderlinePosition';
import { motion } from 'framer-motion';
import UnderLineCategoryCommon from '../common/UnderLineCategoryCommon';

const category = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Thực đơn', link: '/menu' },
    { name: 'Ưu đãi', link: '/special-offer' },
    { name: 'Liên hệ', link: '/contact' },
    { name: 'Đặt bàn' },
];

function Header() {
    const dispatch = useDispatch();

    const { scrollPosition } = useScrollHandling();

    const authStore = useSelector((state) => state?.auth);
    const userStore = useSelector((state) => state?.user);
    const productStore = useSelector((state) => state.product);
    const cartStore = useSelector((state) => state.cart);

    const [fixedPosition, setFixedPosition] = useState(false);
    const [indexActiveCategory, setIsActiveCategory] = useState(0);

    //state open modal menu
    const [isOpenModalMenu, setIsOpenModalMenu] = useState(false);
    const [isOpenTooltipUser, setIsOpenTooltipUser] = useState(false);
    const [isCloseTooltipAnimation, setIsCloseTooltipAnimation] =
        useState(false);

    //state modal search
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [isCloseSearchModalAnimation, setIsCloseSearchModalAnimation] =
        useState(false);
    const [charSearch, setCharSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    //state modal cart
    const [isCloseCartModal, setIsCloseCartModal] = useState(false);

    useEffect(() => {
        setFixedPosition(scrollPosition > 80);
    }, [scrollPosition]);

    useEffect(() => {
        userStore.user && dispatch(getProductCart(userStore.user?._id));
    }, [dispatch, userStore.user?._id]);

    const { itemsRef, underlineProps } = useUnderlinePosition(
        indexActiveCategory,
        [category] // phụ thuộc vào danh mục
    );

    //handle events
    const handleHover = (index) => {
        setIsActiveCategory(index);
    };

    const handleCloseTooltip = () => {
        setIsCloseTooltipAnimation(true);
        setTimeout(() => {
            setIsCloseTooltipAnimation(false);
            setIsOpenTooltipUser(false);
        }, 200);
    };

    const closeModalSearch = () => {
        setIsCloseSearchModalAnimation(true);
        setTimeout(() => {
            setIsCloseSearchModalAnimation(false);
            setIsOpenSearchModal(false);
        }, 300);
    };

    const closeCartModal = () => {
        setIsCloseCartModal(true);
        setTimeout(() => {
            setIsCloseCartModal(false);
            dispatch(setIsOpenCartModal(false));
        }, 300);
    };

    return (
        <div>
            <div
                className={` font-cabin z-30  w-full shadow-header-shadow   ${
                    fixedPosition
                        ? ' bg-white fixed mt-0  transition-transform ease-linear duration-500 text-black -top-[100px] translate-y-[100px]'
                        : ' text-white relative'
                } `}
            >
                <div
                    className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs
                                    flex justify-between mx-auto
                                    items-center py-4 px-3.5"
                >
                    <Link to="/">
                        <div className="text-2xl text-yellow-primary font-oswald">
                            SAVOR.
                        </div>
                    </Link>
                    <div className="flex items-center gap-4 max-md:hidden relative brightness-125">
                        {category.map((item, index) => (
                            <Link key={index} to={item.link}>
                                <div
                                    ref={(el) => (itemsRef.current[index] = el)}
                                    onClick={() => handleHover(index)}
                                    className="relative cursor-pointer "
                                >
                                    <div
                                        className={`px-1 ${
                                            indexActiveCategory === index
                                                ? 'text-yellow-primary'
                                                : ''
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                </div>

                                {/* Single underline line that moves */}
                                <UnderLineCategoryCommon
                                    underlineProps={underlineProps}
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 justify-center">
                        <img
                            onClick={() => setIsOpenSearchModal(true)}
                            src={fixedPosition ? search_black : search_white}
                            alt="search"
                            className="cursor-pointer"
                        />
                        <div
                            className="relative cursor-pointer"
                            onClick={() => dispatch(setIsOpenCartModal(true))}
                        >
                            <img
                                src={fixedPosition ? bag_black : bag_white}
                                alt="bag_bold"
                                className="h-6"
                            />
                            <div className="absolute bg-yellow-primary rounded-full -top-2 left-1 translate-x-2 text-xs px-1.5 py-0.5">
                                {cartStore.carts?.products.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                ) || 0}
                            </div>
                        </div>
                        {authStore?.isAuthenticated ? (
                            <AvatarCommon
                                isOpenTooltipUser={isOpenTooltipUser}
                                setIsOpenTooltipUser={setIsOpenTooltipUser}
                                handleCloseTooltip={handleCloseTooltip}
                                userStore={userStore}
                                isCloseTooltipAnimation={
                                    isCloseTooltipAnimation
                                }
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
                    </div>
                </div>
            </div>

            {/* modal */}
            {isOpenModalMenu && (
                <RightSideDrawModal
                    isOpenModalMenu={isOpenModalMenu}
                    setIsOpenModalMenu={setIsOpenModalMenu}
                />
            )}

            {isOpenSearchModal && (
                <SearchModal
                    isOpenModal={isOpenSearchModal}
                    closeModal={closeModalSearch}
                    isCloseModalAnimation={isCloseSearchModalAnimation}
                    arr={productStore.productsSearch?.data}
                    isLoading={productStore.isLoadingSearch}
                    charSearch={charSearch}
                    setCharSearch={setCharSearch}
                    currentPage={currentPage}
                />
            )}

            {cartStore.isOpenCartModal && (
                <CartModal
                    isCloseModalAnimation={isCloseCartModal}
                    closeModal={closeCartModal}
                />
            )}
        </div>
    );
}

export default Header;
