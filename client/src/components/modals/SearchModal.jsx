/* eslint-disable react/prop-types */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchCommon from '../common/SearchCommon';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { searchProductName } from '@/redux/productSlice';
import FormatVND from '../common/FormatVND';
import { debounce } from 'lodash';
import { Link, useNavigate } from 'react-router';

function SearchModal({ ...props }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isOpenModal,
        isCloseModalAnimation,
        closeModal,
        arr,
        isLoading,
        charSearch,
        setCharSearch,
        currentPage,
    } = props;

    const debouncedSearch = debounce((currentPage, searchText) => {
        if (searchText.length > 0) {
            dispatch(searchProductName({ page: currentPage, q: searchText }));
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(currentPage, charSearch);
        return () => debouncedSearch.cancel();
    }, [charSearch]);

    const result = useMemo(() => {
        return arr?.slice(0, 4);
    }, [arr]);

    const handleSeeMore = () => {
        closeModal();
        navigate(`/admin/search?q=${charSearch}&page=${currentPage}`);
    };

    return (
        <div
            className="fixed z-30 top-0 bottom-0 right-0 left-0 bg-black bg-opacity-35
                    "
        >
            <motion.div
                initial={{ y: '-100%', opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { y: '0%', opacity: 1 }
                        : { y: '-100%', opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-secondary px-10 max-sm:px-4 py-12 max-sm:py-4 shadow-header-shadow min-h-60"
            >
                <div
                    className="flex justify-between items-start max-sm:flex-col-reverse
                                max-sm:items-end"
                >
                    <h1 className="text-3xl text-yellow-primary max-sm:hidden">
                        SAVOR.
                    </h1>

                    <div className="w-5/12 max-sm:w-full max-lg:w-6/12 max-md:w-7/12  ">
                        <SearchCommon
                            charSearch={charSearch}
                            setCharSearch={setCharSearch}
                            isLoading={isLoading}
                        />

                        {/* result search */}
                        {charSearch.length > 0 && (
                            <div className="h-full">
                                {result?.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/admin/product-items/${item.slug}`}
                                    >
                                        <div
                                            key={item._id}
                                            className="flex justify-between text-text-primary items-center border-b py-5
                                            cursor-pointer px-3 "
                                        >
                                            <div className="flex flex-col">
                                                <div className="font-semibold hover:text-yellow-primary text-lg">
                                                    {item.name}
                                                </div>
                                                <div className="flex gap-3 items-center text-sm">
                                                    <span>
                                                        {FormatVND(
                                                            item.promotion
                                                        )}
                                                    </span>
                                                    <span className="line-through text-gray-400 ">
                                                        {FormatVND(
                                                            item.selling
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-20 w-16 overflow-hidden rounded-lg ">
                                                <img
                                                    src={item.images[0]?.url}
                                                    alt=""
                                                    className="h-full w-full  object-cover hover:scale-105 transition-transform ease-linear duration-300"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {charSearch.length <= 0 && (
                            <div className="text-center text-text-primary cursor-pointer mt-5 ">
                                Tìm các mặt hàng: Lẩu, Đồ uống, Nước ngọt,...
                            </div>
                        )}

                        {arr?.length > 0 && charSearch.length > 0 && (
                            <div
                                onClick={handleSeeMore}
                                className="text-center text-text-primary cursor-pointer mt-5 hover:text-yellow-primary"
                            >
                                Xem tất cả sản phẩm
                            </div>
                        )}
                    </div>
                    <div className="max-sm:mb-5">
                        <FontAwesomeIcon
                            onClick={closeModal}
                            icon={faXmark}
                            className="h-30 w-30 px-3 py-2.5 bg-gray-200 text-black mt-2 shadow-2xl 
                                    rounded-full cursor-pointer hover:bg-gray-300"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default SearchModal;
