/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import { useEffect } from 'react';
import arr_left_white from '@/assets/icon/arr_left_white.svg';
import angles_right_black from '@/assets/icon/angles_right_black.svg';
import angles_right_white from '@/assets/icon/angles_right_white.svg';
import angles_left_black from '@/assets/icon/angles_left_black.svg';
import angles_left_white from '@/assets/icon/angles_left_white.svg';

function PaginationCommon({ ...props }) {
    const {
        totalProducts,
        getPageFunc,
        pageSize,
        currentPage,
        setCurrentPage,
        dataUpload,
        setIsCheckedAll,
        setArrActive,
        type,
        id,
        idChange,
    } = props;

    const dispatch = useDispatch();
    // const [searchParams, setSearchParams] = useSearchParams();

    const authStore = useSelector((state) => state.auth);

    const onChangePage = (page) => {
        setCurrentPage(page);
        // setSearchParams({ page });
    };

    //hook
    useEffect(() => {
        dispatch(getPageFunc(dataUpload)).then((data) => {
            if (data.payload?.success) {
                type !== 'product' && setIsCheckedAll(false);
                type !== 'product' && setArrActive([]);
                type !== 'order' && setIsCheckedAll(false);
                type !== 'order' && setArrActive([]);
            }
        });
    }, [dispatch, currentPage, id, idChange]);

    return (
        <div
            className="flex items-center justify-center mb-10 
                          bg-bg-secondary rounded-lg overflow-hidden"
        >
            <Pagination
                current={currentPage} // Trang hiện tại
                total={totalProducts} // Tổng mục (tổng số sản phẩm)
                pageSize={pageSize} // Số mục trên mỗi trang
                onChange={onChangePage} // Hàm xử lý khi chuyển trang
                className="flex gap-1 items-center  "
                showLessItems
                itemRender={(page, type, originalElement) => {
                    if (type === 'prev') {
                        return (
                            <button
                                className={`px-2 py-2 rounded cursor-pointer
                                 ${
                                     authStore.theme === 'light'
                                         ? 'bg-white text-black-base'
                                         : 'bg-bg-secondary text-white'
                                 }`}
                            >
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? angles_left_black
                                            : angles_left_white
                                    }
                                    alt="prev"
                                />
                            </button>
                        );
                    }
                    if (type === 'next') {
                        return (
                            <button
                                className={`px-2 py-2 rounded cursor-pointer ${
                                    authStore.theme === 'light'
                                        ? 'bg-white text-black-base'
                                        : 'bg-bg-secondary text-white'
                                }`}
                            >
                                <img
                                    src={
                                        authStore.theme === 'light'
                                            ? angles_right_black
                                            : angles_right_white
                                    }
                                    alt="prev"
                                    className=""
                                />
                            </button>
                        );
                    }
                    if (type === 'jump-prev' || type === 'jump-next') {
                        return <span className="text-text-first">...</span>;
                    }

                    return (
                        <button
                            className={`px-4 py-2 transition-colors ease-linear duration-300 ${
                                authStore.theme === 'light'
                                    ? 'text-black-base'
                                    : 'text-white'
                            }   ${
                                currentPage === page
                                    ? 'bg-color-active text-yellow-primary'
                                    : 'bg-bg-secondary'
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
