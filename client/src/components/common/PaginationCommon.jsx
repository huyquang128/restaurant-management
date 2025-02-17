/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import arr_right_black from '@/assets/icon/arr_right_black.svg';
import arr_right_white from '@/assets/icon/arr_right_white.svg';
import arr_left_white from '@/assets/icon/arr_left_white.svg';
import arr_left_black from '@/assets/icon/arr_left_black.svg';
import { useSearchParams } from 'react-router';

function PaginationCommon({ ...props }) {
    const {
        totalProducts,
        getPageFunc,
        pageSize,
        setIsCheckedAll,
        setArrActive,
        currentPage,
        setCurrentPage,
        dataUpload,
    } = props;

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const authStore = useSelector((state) => state.auth);

    const onChangePage = (page) => {
        setCurrentPage(page);
        setSearchParams({ page });
    };

    //hook
    useEffect(() => {
        dispatch(getPageFunc(dataUpload)).then((data) => {
            if (data.payload?.success) {
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
                            <button className="bg-bg-tertiary px-2 py-2 rounded-lg cursor-pointer">
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
                            <button className="bg-bg-tertiary px-2 py-2 rounded-lg cursor-pointer">
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
                            className={`px-4 py-2 bg-bg-tertiary ${
                                authStore.theme === 'light'
                                    ? 'text-black-base'
                                    : 'text-white'
                            }  rounded-lg ${
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
