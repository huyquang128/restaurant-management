/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import { categorySidebar } from '../common/categorySidebar';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function CategoryListContent({ ...props }) {
    const location = useLocation();
    const navigate = useNavigate();

    const authStore = useSelector((state) => state.auth);

    const [arrCategory, setCategoryArr] = useState([]);

    const { closeModal, type } = props;

    const handleCloseModalClickCategory = (link, item, index) => {
        navigate(link);
        if (type === 'sidebar-mobile') item.children ? '' : closeModal();

        if (item.children) {
            setCategoryArr((prev) =>
                arrCategory.includes(index)
                    ? arrCategory.filter((item) => item !== index)
                    : [...prev, index]
            );
        }
    };

    return (
        <>
            <div
                className="h-28 sticky z-20 bg-bg-secondary top-0  flex items-center 
                    justify-center border-b border-color-active"
            >
                <Link to="/admin/dashboard">
                    <h1
                        // onClick={() => closeModal()}
                        className=" text-yellow-primary font-oswald
                                      text-4xl  "
                    >
                        SAVOR.
                    </h1>
                </Link>
            </div>

            {/* list category */}
            <div className="">
                {categorySidebar.map((item, index) => (
                    <div key={index}>
                        <div
                            onClick={() =>
                                handleCloseModalClickCategory(
                                    item.link,
                                    item,
                                    index
                                )
                            }
                            className={`flex justify-between transition-all ease-in-out 
                                        duration-200 px-5 mx-2 py-4 cursor-pointer 
                                       
                             ${
                                 location.pathname === item.link
                                     ? 'bg-color-active border-l-4 border-yellow-primary '
                                     : ''
                             }`}
                        >
                            <div
                                className={`flex items-center justify-start gap-2 text-text-primary
                                                hover:translate-x-3 transition-all ease-in-out duration-200
                                               ${
                                                   location.pathname ===
                                                   item.link
                                                       ? 'text-yellow-primary translate-x-3'
                                                       : ''
                                               }`}
                            >
                                <img
                                    src={
                                        (authStore.theme === 'light' &&
                                            location.pathname === item.link &&
                                            item.icon_yellow) ||
                                        (authStore.theme === 'light' &&
                                            item.icon_black) ||
                                        (authStore.theme === 'dark' &&
                                            location.pathname === item.link &&
                                            item.icon_yellow) ||
                                        item.icon_white
                                    }
                                    alt=""
                                    className="h-5 -translate-y-[2px]"
                                />
                                <span className="">{item.name}</span>
                            </div>

                            {/* icon */}
                            {item.children && (
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? arr_down_black
                                            : arr_down_white
                                    }
                                    alt=""
                                    className=""
                                />
                            )}
                        </div>

                        {/* children */}
                        <AnimatePresence mode="wait">
                            {arrCategory.includes(index) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut',
                                    }}
                                    className="overflow-hidden mx-2 text-text-primary"
                                >
                                    {item.children?.map((a, index) => (
                                        <div
                                            onClick={() =>
                                                handleCloseModalClickCategory(
                                                    a.link,
                                                    a
                                                )
                                            }
                                            className={`py-4 pl-12 pr-6 text-text-primary
                                                cursor-pointer ${
                                                    location.pathname === a.link
                                                        ? 'text-yellow-primary bg-orange-100'
                                                        : 'opacity-70'
                                                }`}
                                            key={index}
                                        >
                                            {a.name}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CategoryListContent;
