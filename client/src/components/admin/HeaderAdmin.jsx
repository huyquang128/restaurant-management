import AvatarCommon from '../common/AvatarCommon';
import bell_black from '@/assets/icon/bell_black.svg';
import bell_white from '@/assets/icon/bell_white.svg';
import search_black from '@/assets/icon/search_black.svg';
import search_white from '@/assets/icon/search_white.svg';
import menu_black from '@/assets/icon/menu_black.svg';
import menu_white from '@/assets/icon/menu_white.svg';
import sun_white from '@/assets/icon/sun_white.svg';
import sun_black from '@/assets/icon/sun_black.svg';
import moon_black from '@/assets/icon/moon_black.svg';
import moon_white from '@/assets/icon/moon_white.svg';
import circle_white from '@/assets/icon/circle_white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TooltipCommon from '../common/TooltipCommon';
import ThemeMode from '../tooltipsContent/ThemeMode';
import SidebarAdminModal from '../modals/SidebarAdminModal';
import { categorySidebar } from '../common/categorySidebar';
import SearchCommon from '../common/SearchCommon';
import SearchModal from '../modals/SearchModal';

function HeaderAdmin() {
    const userStore = useSelector((state) => state?.user);
    const authStore = useSelector((state) => state?.auth);
    const productStore = useSelector((state) => state.product);

    const [isOpenTooltipUser, setIsOpenTooltipUser] = useState(false);
    const [isCloseTooltipAnimation, setIsCloseTooltipAnimation] =
        useState(false);

    //state tooltip theme
    const [isOpenTooltipThemeMode, setIsOpenTooltipThemeMode] = useState(false);
    const [
        isCloseTooltipAnimationThemeMode,
        setIsCloseTooltipAnimationThemeMode,
    ] = useState(false);

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

    //handle events
    const handleCloseTooltipUser = () => {
        setIsCloseTooltipAnimation(true);
        setTimeout(() => {
            setIsCloseTooltipAnimation(false);
            setIsOpenTooltipUser(false);
        }, 200);
    };

    const handleCloseTooltipThemeMode = () => {
        setIsCloseTooltipAnimationThemeMode(true);
        setTimeout(() => {
            setIsCloseTooltipAnimationThemeMode(false);
            setIsOpenTooltipThemeMode(false);
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

    return (
        <div
            className="flex items-center bg-bg-secondary justify-between
                        mx-4 p-5 font-cabin rounded-lg text-text-primary"
        >
            <div className=" flex gap-5 items-center">
                <img
                    onClick={() => setIsOpenSidebarModal(true)}
                    src={authStore.theme === 'light' ? menu_black : menu_white}
                    alt=""
                    className="cursor-pointer h-7 md:hidden"
                />
                <div className="xs:hidden">
                    <img
                        src={
                            authStore.theme === 'light'
                                ? search_black
                                : search_white
                        }
                        alt=""
                        className="h-7 "
                    />
                </div>
                <div
                    onClick={() => setIsOpenSearchModal(true)}
                    className="max-xs:hidden"
                >
                    <SearchCommon />
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="relative">
                    <img
                        src={
                            authStore.theme === 'light'
                                ? bell_black
                                : bell_white
                        }
                        alt=""
                    />
                    <div className="h-1.5 w-1.5 bg-red-600 rounded-full absolute top-1.5 right-1"></div>
                </div>

                <AvatarCommon
                    isOpenTooltipUser={isOpenTooltipUser}
                    setIsOpenTooltipUser={setIsOpenTooltipUser}
                    handleCloseTooltip={handleCloseTooltipUser}
                    userStore={userStore}
                    isCloseTooltipAnimation={isCloseTooltipAnimation}
                    type="admin"
                />

                {/* theme mode btn */}
                <div
                    onClick={() => setIsOpenTooltipThemeMode(true)}
                    className="flex gap-2 items-center cursor-pointer hover:brightness-105 relative"
                >
                    <img
                        src={
                            (authStore.theme === 'light' && sun_black) ||
                            (authStore.theme === 'dark' && moon_white) ||
                            (authStore.theme === 'device' && circle_white)
                        }
                        alt=""
                    />
                    <FontAwesomeIcon
                        icon={faSortDown}
                        className="-translate-y-1"
                    />
                    {isOpenTooltipThemeMode && (
                        <TooltipCommon
                            isOpenTooltip={isOpenTooltipThemeMode}
                            isCloseTooltipAnimation={
                                isCloseTooltipAnimationThemeMode
                            }
                            handleOutSide={handleCloseTooltipThemeMode}
                            type="themeMode"
                            content={<ThemeMode />}
                        />
                    )}
                </div>
            </div>

            {/* modal */}
            {isOpenSidebarModal && (
                <SidebarAdminModal
                    isOpenrModal={isOpenSidebarModal}
                    isCloseModalAnimation={isCloseModalSidebarAnimation}
                    closeModal={closeModalSidebar}
                    arr={categorySidebar}
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
