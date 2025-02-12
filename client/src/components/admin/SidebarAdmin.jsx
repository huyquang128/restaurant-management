import { Link } from 'react-router';

import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import { useSelector } from 'react-redux';
import { categorySidebar } from '../common/categorySidebar';


function SidebarAdmin() {
    const authStore = useSelector((state) => state?.auth);

    return (
        <div className="w-56 bg-bg-secondary font-cabin min-h-screen overflow-y-scroll no-scrollbar max-md:hidden fixed h-full transition-colors ease-linear duration-300">
            <h1 className="text-center py-6 text-2xl text-yellow-primary border-b border-gray-100 ">
                SAVOR.
            </h1>
            <div className="">
                {categorySidebar.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between px-5 py-4 cursor-pointer"
                    >
                        <div className="flex items-center justify-start gap-2 text-text-primary">
                            <img
                                src={
                                    authStore.theme === 'light'
                                        ? item.icon_black
                                        : item.icon_white
                                }
                                alt=""
                                className="h-5 -translate-y-[2px]"
                            />
                            <Link to={item.link}>{item.name}</Link>
                        </div>
                        <img
                            src={
                                authStore.theme === 'light'
                                    ? arr_down_black
                                    : arr_down_white
                            }
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SidebarAdmin;
