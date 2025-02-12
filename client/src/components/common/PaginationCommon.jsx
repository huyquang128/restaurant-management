/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import arr_right_black from '@/assets/icon/arr_right_black.svg';
import arr_right_white from '@/assets/icon/arr_right_white.svg';
import arr_left_white from '@/assets/icon/arr_left_white.svg';
import arr_left_black from '@/assets/icon/arr_left_black.svg';

function PaginationCommon({
    totalProducts,
    getPageFunc,
    pageSize,
    setIsCheckedAll,
    setArrActive,
}) {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const authStore = useSelector((state) => state.auth);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    //hook
    useEffect(() => {
        dispatch(getPageFunc(currentPage)).then((data) => {
            if (data.payload.success) {
                setIsCheckedAll(false);
                setArrActive([]);
            }
        });
    }, [dispatch, currentPage]);

    return (
        <div className="flex justify-center cursor-pointer mb-10">
            <Pagination
                current={currentPage} // Trang hiện tại
                total={totalProducts} // Tổng mục (tổng số sản phẩm)
                pageSize={pageSize} // Số mục trên mỗi trang
                onChange={onChangePage} // Hàm xử lý khi chuyển trang
                className="flex gap-3 items-center"
                showLessItems
                itemRender={(page, type, originalElement) => {
                    if (type === 'prev') {
                        return (
                            <button className="border border-gray-200 px-2 py-2 rounded-md cursor-pointer">
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? arr_left_black
                                            : arr_left_white
                                    }
                                    alt=""
                                />
                            </button>
                        );
                    }
                    if (type === 'next') {
                        return (
                            <button className="border border-gray-200 px-2 py-2 rounded-md cursor-pointer">
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? arr_right_black
                                            : arr_right_white
                                    }
                                    alt=""
                                />
                            </button>
                        );
                    }
                    if (type === 'jump-prev' || type === 'jump-next') {
                        return <span className="text-text-first">...</span>;
                    }
                    return (
                        <button
                            className={`px-4 py-2 border ${
                                authStore.theme === 'light'
                                    ? 'text-black-base'
                                    : 'text-white'
                            } border-gray-300 rounded-md ${
                                currentPage === page
                                    ? 'bg-orange-200 text-yellow-600'
                                    : ''
                            }`}
                        >
                            {page}
                        </button>
                    );
                }}
            />
        </div>
    );
}

export default PaginationCommon;
