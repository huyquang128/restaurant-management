/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import { categorySidebar } from '../common/categorySidebar';

function CategoryListContent({ ...props }) {
    const location = useLocation();
    const navigate = useNavigate();

    const authStore = useSelector((state) => state.auth);

    const { closeModal } = props;

    const handleCloseModalClickCategory = (link, item) => {
        navigate(link);
        !item.children && closeModal();
    };

    return (
        <>
            <Link to="/admin/dashboard">
                <h1
                    onClick={() => closeModal()}
                    className="text-center py-6 text-2xl text-yellow-primary"
                >
                    SAVOR.
                </h1>
            </Link>
            <div className="overflow-y-scroll">
                {categorySidebar.map((item, index) => (
                    <div key={index}>
                        <div
                            className={`flex justify-between transition-all ease-in-out duration-200 px-5 mx-2 py-4 cursor-pointer
                         ${
                             location.pathname === item.link
                                 ? 'bg-color-active border-l-4 border-yellow-primary '
                                 : ''
                         }`}
                        >
                            <div
                                onClick={() =>
                                    handleCloseModalClickCategory(
                                        item.link,
                                        item
                                    )
                                }
                                className={`flex items-center justify-start gap-2 text-text-primary
                                            hover:translate-x-3 transition-all ease-in-out duration-200
                                           ${
                                               location.pathname === item.link
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
                                <span>{item.name}</span>
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
                        {location.pathname === item.link && (
                            <div
                                className={` transition-all ease-in-out duration-200 mx-2  cursor-pointer`}
                            >
                                {item.children &&
                                    item.children.map((a, index) => (
                                        <div className="py-4 px-16" key={index}>
                                            {a.name}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default CategoryListContent;
