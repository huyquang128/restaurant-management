import AvatarCommon from '../common/AvatarCommon';
import bell_black from '@/assets/icon/bell_black.svg';
import bell_white from '@/assets/icon/bell_white.svg';
import bell_blue from '@/assets/icon/bell_blue.svg';
import search_black from '@/assets/icon/search_black.svg';
import search_white from '@/assets/icon/search_white.svg';
import menu_black from '@/assets/icon/menu_black.svg';
import menu_white from '@/assets/icon/menu_white.svg';
import sun_black from '@/assets/icon/sun_black.svg';
import sun_white from '@/assets/icon/sun_white.svg';
import moon_white from '@/assets/icon/moon_white.svg';
import circle_white from '@/assets/icon/circle_white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdminModal from '../modals/SidebarAdminModal';
import { categorySidebar } from '../common/categorySidebar';
import SearchCommon from '../common/SearchCommon';
import SearchModal from '../modals/SearchModal';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeModeTooltip from '../tooltipsContent/ThemeModeTooltip';
import NotifacationAdmin from '../tooltipsContent/NotificationAdmin';
import socket from '@/sockets/socket';
import { getAllNotificationTypeAdmin } from '@/redux/notificationSlice';
import ToastMsg from '../common/ToastMsg';
import setting_red from '@/assets/icon/setting_red.svg';
import { useNavigate } from 'react-router';

function HeaderAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state?.user);
    const authStore = useSelector((state) => state?.auth);
    const productStore = useSelector((state) => state.product);

    const [isCheckNotificationNew, setIsCheckNotificationNew] = useState(false);

    const [isOpenTooltipUser, setIsOpenTooltipUser] = useState(false);
    const [isCloseTooltipAnimation, setIsCloseTooltipAnimation] =
        useState(false);

    const [isOpenTooltipNotification, setIsOpenTooltipNotification] =
        useState(false);

    //state tooltip theme
    const [isOpenTooltipThemeMode, setIsOpenTooltipThemeMode] = useState(false);

    //state modal sider bar
    const [isOpenSidebarModal, setIsOpenSidebarModal] = useState(false);
    const [isCloseModalSidebarAnimation, setIsCloseModalSidebarAnimation] =
        useState(false);

    //state modal search
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [isCloseSearchModalAnimation, setIsCloseSearchModalAnimation] =
        useState(false);
    const [charSearch, setCharSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const notificationStore = useSelector((state) => state.notification);

    useEffect(() => {
        dispatch(getAllNotificationTypeAdmin());
    }, [dispatch]);

    useEffect(() => {
        // Lắng nghe sự kiện từ server
        socket.on('new_order', (data) => {
            data && setIsCheckNotificationNew(true);
            ToastMsg({ msg: 'Bạn có đơn hàng mới!', status: 'order_new' });
            dispatch(getAllNotificationTypeAdmin());
        });

        socket.on('new_review', (data) => {
            data && setIsCheckNotificationNew(true);
            ToastMsg({ msg: 'Bạn có đánh giá mới' });
            dispatch(getAllNotificationTypeAdmin());
        });

        // Cleanup khi component bị unmount
        return () => {
            socket.off('new_order');
            socket.off('new_review');
        };
    }, [dispatch]);

    //handle events
    const handleCloseTooltipUser = () => {
        setIsCloseTooltipAnimation(true);
        setTimeout(() => {
            setIsCloseTooltipAnimation(false);
            setIsOpenTooltipUser(false);
        }, 200);
    };

    const closeModalSidebar = () => {
        setIsCloseModalSidebarAnimation(true);
        setTimeout(() => {
            setIsCloseModalSidebarAnimation(false);
            setIsOpenSidebarModal(false);
        }, 300);
    };

    const closeModalSearch = () => {
        setIsCloseSearchModalAnimation(true);
        setTimeout(() => {
            setIsCloseSearchModalAnimation(false);
            setIsOpenSearchModal(false);
        }, 300);
    };

    const getImage = () => {
        if (authStore.theme === 'light') return sun_white;
        if (authStore.theme === 'dark') return moon_white;
        return circle_white;
    };

    return (
        <div
            className="flex items-center bg-bg-primary justify-between
                          font-cabin rounded-lg text-text-primary 
                        fixed top-0 z-40 right-0 left-64 max-md:left-0 py-6 pr-5
                              hover:shadow-header-shadow h-20 gap-28"
        >
            <div className=" flex gap-5 items-center flex-1 ">
                <img
                    onClick={() => setIsOpenSidebarModal(true)}
                    src={authStore.theme === 'light' ? menu_black : menu_white}
                    alt=""
                    className="cursor-pointer h-7 md:hidden pl-5"
                />
                {/* search */}
                <div
                    onClick={() => setIsOpenSearchModal(true)}
                    className="cursor-pointer w-full flex-1"
                >
                    <img
                        src={
                            authStore.theme === 'light'
                                ? search_black
                                : search_white
                        }
                        alt=""
                        className="h-7 sm:hidden"
                    />
                </div>

                <div
                    onClick={() => setIsOpenSearchModal(true)}
                    className=" max-sm:hidden w-full"
                >
                    <SearchCommon />
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="flex gap-6 items-center border-r-2 border-border-primary pr-4">
                    {/* notify - bell */}
                    <div className="relative cursor-pointer">
                        <div
                            onClick={() =>
                                setIsOpenTooltipNotification(
                                    !isOpenTooltipNotification
                                )
                            }
                            className="h-10 w-10 bg-bg-blue rounded-lg flex justify-center 
                                        items-center relative"
                        >
                            <img src={bell_blue} alt="" className="" />
                            {setIsCheckNotificationNew && (
                                <div
                                    onClick={() =>
                                        setIsOpenTooltipNotification(
                                            !isOpenTooltipNotification
                                        )
                                    }
                                    className="bg-blue-400 h-6 w-6 text-xs flex justify-center 
                                                items-center rounded-full text-white absolute -top-3  -right-3 border-2 border-bg-secondary"
                                >
                                    {
                                        notificationStore.notifications.filter(
                                            (item) => !item.read
                                        ).length
                                    }
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {isOpenTooltipNotification && (
                                <NotifacationAdmin
                                    isOpenTooltip={isOpenTooltipNotification}
                                    setIsCheckNotificationNew={
                                        setIsCheckNotificationNew
                                    }
                                    setIsOpenTooltipNotification={
                                        setIsOpenTooltipNotification
                                    }
                                    isCheckNotificationNew={
                                        isCheckNotificationNew
                                    }
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* theme mode btn */}
                    <div
                        onClick={() =>
                            setIsOpenTooltipThemeMode(!isOpenTooltipThemeMode)
                        }
                        className=" relative cursor-pointer h-10 w-10 bg-bg-gray rounded-lg flex justify-center 
                                        items-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={authStore.theme}
                                src={getImage()}
                                alt=""
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        <AnimatePresence>
                            {isOpenTooltipThemeMode && (
                                <ThemeModeTooltip
                                    isOpenTooltip={isOpenTooltipThemeMode}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* setting */}
                    <div
                        onClick={() => navigate('/admin/setting')}
                        className=" relative cursor-pointer h-10 w-10 bg-bg-red rounded-lg flex justify-center 
                                        items-center"
                    >
                        <img src={setting_red} alt="" />
                    </div>
                </div>

                <AvatarCommon
                    isOpenTooltipUser={isOpenTooltipUser}
                    setIsOpenTooltipUser={setIsOpenTooltipUser}
                    handleCloseTooltip={handleCloseTooltipUser}
                    userStore={userStore}
                    isCloseTooltipAnimation={isCloseTooltipAnimation}
                    type="admin"
                />
            </div>

            {/* modal */}
            {isOpenSidebarModal && (
                <SidebarAdminModal
                    isOpenrModal={isOpenSidebarModal}
                    isCloseModalAnimation={isCloseModalSidebarAnimation}
                    closeModal={closeModalSidebar}
                    arr={categorySidebar}
                    type="sidebar-mobile"
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
        </div>
    );
}

export default HeaderAdmin;
