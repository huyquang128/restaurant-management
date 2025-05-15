import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';
import banner_1 from '@/assets/image/banner_1.jpg';
import edit_blue from '@/assets/icon/edit_blue.svg';
import trash_red from '@/assets/icon/trash_red.svg';
import show_green from '@/assets/icon/show_green.svg';

import { getAllSlide, getSlidePage, removeSlide } from '@/redux/slideShowSlice';

function ManagementSlideShow() {
    const dispatch = useDispatch();
    const slideStore = useSelector((state) => state.slide);
    const authStore = useSelector((state) => state.auth);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllSlide());
    }, [dispatch]);

    return (
        <div className="font-cabin text-text-primary">
            <div
                className="text-xl font-medium mb-5 text-text-primary flex 
                    justify-between flex-wrap items-center"
            >
                <h2>Danh sách Slide hiển thị chính</h2>
                <div className="">
                    <Link to="/admin/system/management-slide-show/detail">
                        <Button
                            icon={add_white}
                            title="Thêm Slide"
                            bg="add"
                            text_color="white"
                            bg_border="black"
                        />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {slideStore.slide?.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-5 bg-bg-secondary p-5 rounded-lg
                                    justify-between hover:shadow-header-shadow
                                    transition-shadow ease-linear duration-300"
                    >
                        <div className="flex gap-5 ">
                            <div className="relative h-52 w-52">
                                <img
                                    src={item.urlImg.url}
                                    alt=""
                                    className="h-full w-full object-cover rounded-lg"
                                />
                                <div
                                    className="w-8 h-8 bg-yellow-primary text-white  flex 
                                         justify-center items-center rounded-full font-bold text-lg
                                         absolute -top-2 -right-2"
                                >
                                    {item.order}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 flex-1">
                                <span className="font-semibold text-xl line-clamp-2 text-yellow-primary">
                                    {item.titlePrimary}
                                </span>
                                <span className="opacity-75 line-clamp-5 mb-5 ">
                                    {item.titleSecondary}
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <div
                                className={`h-10 w-10 bg-bg-green rounde-lg flex 
                                            justify-center items-center rounded-lg
                                            mb-4 cursor-pointer 
                                            transition-all duration-300 ease-linear
                                            ${
                                                authStore.theme === 'light'
                                                    ? ' hover:brightness-90'
                                                    : ' hover:brightness-125'
                                            }`}
                            >
                                <img src={show_green} alt="" className="w-5" />
                            </div>
                            <div
                                className={`h-10 w-10 bg-bg-blue rounde-lg flex 
                                            justify-center items-center rounded-lg
                                            mb-4 cursor-pointer 
                                            transition-all duration-300 ease-linear
                                            ${
                                                authStore.theme === 'light'
                                                    ? ' hover:brightness-90'
                                                    : ' hover:brightness-125'
                                            }`}
                            >
                                <img src={edit_blue} alt="" className="w-5" />
                            </div>
                            <div
                                className={`h-10 w-10 bg-bg-red rounde-lg flex 
                                            justify-center items-center rounded-lg
                                            mb-4 cursor-pointer 
                                            transition-all duration-300 ease-linear
                                            ${
                                                authStore.theme === 'light'
                                                    ? ' hover:brightness-90'
                                                    : ' hover:brightness-125'
                                            }`}
                            >
                                <img src={trash_red} alt="" className="w-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagementSlideShow;
