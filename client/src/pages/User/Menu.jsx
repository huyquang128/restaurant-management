import banner_1 from '@/assets/image/banner_1.jpg';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import show_pass_white from '@/assets/icon/show_pass_white.svg';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import add_white from '@/assets/icon/add_white.svg';
import star_black from '@/assets/icon/star_black.svg';
import star_yellow from '@/assets/icon/star_yellow.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategoriesDishes,
    getAllCategoriesDishesPages,
} from '@/redux/categoryDishesSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVND';
import Button from '@/components/common/Button/Button';
import TooltipCommon from '@/components/common/TooltipCommon';
import FastView from '@/components/tooltipsContent/FastView';
import ProductDetailModal from '@/components/modals/ProductDetailModal';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import {
    getProductBySlug,
    getProductsPageByCategory,
    setProductSeleted,
} from '@/redux/productSlice';
import RotatingLinesCommon from '@/components/common/spinnerAnimation/RotatingLinesCommon';
import SortDishesTooltip from '@/components/tooltipsContent/SortDishesTooltip';
import { useUnderlinePosition } from '@/components/hooks/useUnderlinePosition';
import UnderLineCategoryCommon from '@/components/common/UnderLineCategoryCommon';
import { AnimatePresence } from 'framer-motion';
import { showModal } from '@/redux/modalSlice';

const valueSort = [
    { title: 'Giá: Tăng dần', value: 'asc' },
    { title: 'Giá: Giảm dần', value: 'desc' },
    { title: 'Tên: A-Z', value: 'az' },
    { title: 'Tên: Z-A', value: 'za' },
    { title: 'Bán chạy nhất', value: 'bestSelling' },
];

function Menu() {
    const dispatch = useDispatch();
    const location = useLocation();

    const decodedString = decodeURIComponent(location.pathname.split('/')[1]);

    const [activeCategory, setActiveCategory] = useState(0);
    const [activeProductAct, setActiveProductAct] = useState(null);
    const [categories, setCategories] = useState([]);

    //state modal product detail
    const [isOpenModalAProductDetail, setIsOpenModalAProductDetail] =
        useState(false);

    //state tooltip show sort dishes
    const [isOpenTooltipShowSortDishes, setIsOpenTooltipShowSortDishes] =
        useState(false);
    const [
        isCloseTooltipAnimationShowSortDishes,
        setIsCloseTooltipAnimationShowSortDishes,
    ] = useState(false);

    //page number state
    const [currentPage, setCurrentPage] = useState(1);

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const productStore = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAllCategoriesDishes()).then((data) => {
            if (data.payload?.success) {
                setCategories(data.payload.data);
            }
        });
    }, [dispatch]);

    //gạch chân animation
    const { itemsRef, underlineProps } = useUnderlinePosition(
        activeCategory,
        [categoryDishesStore.category_dishes] // phụ thuộc vào danh mục
    );

    //sắp xếp mặt hàng
    const sortProducts =
        productStore.products?.data &&
        [...productStore.products.data].sort(
            (a, b) =>
                (productStore.valueSortDishes === 'asc' &&
                    a.promotion - b.promotion) ||
                (productStore.valueSortDishes === 'desc' &&
                    b.promotion - a.promotion) ||
                (productStore.valueSortDishes === 'az' &&
                    a.name.localeCompare(b.name)) ||
                (productStore.valueSortDishes === 'za' &&
                    b.name.localeCompare(a.name)) ||
                b.sold - a.sold
        );

    //handle events
    const handleHoverProduct = (index) => {
        setActiveProductAct(index);
    };

    const handleOutSide = () => {
        setActiveProductAct(null);
    };

    const closeTooltipSortDishes = () => {
        setIsCloseTooltipAnimationShowSortDishes(true);
        setTimeout(() => {
            setIsCloseTooltipAnimationShowSortDishes(false);
            setIsOpenTooltipShowSortDishes(false);
        }, 300);
    };

    return (
        <>
            <div className=" mt-28 ">
                {/* content primary */}
                <div className="bg-white pb-10 pt-5">
                    <div
                        className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                                   font-cabin "
                    >
                        {/* link redirect */}
                        <div className="flex gap-2 items-center mb-5">
                            <Link to="/">
                                <span>Trang chủ</span>
                            </Link>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-xs"
                            />
                            <span className="text-yellow-primary">
                                {decodedString}
                            </span>
                        </div>
                        {/* list menu category */}
                        <div className="flex items-center gap-5 mb-5 relative">
                            {categoryDishesStore.category_dishes?.map(
                                (item, index) => (
                                    <div key={index}>
                                        <div
                                            ref={(el) =>
                                                (itemsRef.current[index] = el)
                                            }
                                            className="cursor-pointer relative"
                                            onClick={() =>
                                                setActiveCategory(index)
                                            }
                                        >
                                            <div
                                                className={`${
                                                    activeCategory === index
                                                        ? 'text-yellow-primary'
                                                        : ''
                                                }`}
                                            >
                                                {CapitalizeFirstLetter(
                                                    item.name
                                                )}
                                            </div>
                                        </div>
                                        <UnderLineCategoryCommon
                                            underlineProps={underlineProps}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        <div className="flex justify-between items-center mb-5 ">
                            <div className="text-gray-primary max-md:hidden">
                                Hiển thị {productStore.products?.page}-8 trên{' '}
                                {productStore.products?.totalPages} kết quả
                            </div>
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() =>
                                    setIsOpenTooltipShowSortDishes(true)
                                }
                            >
                                <span>Sắp xếp theo</span>
                                <div
                                    className="border px-3 py-2 border-gray-300 w-[157px] flex  bg-bg-tertiary relative
                                                justify-between"
                                >
                                    <span>
                                        {valueSort.map(
                                            (item) =>
                                                productStore.valueSortDishes ===
                                                    item.value && item.title
                                        )}
                                    </span>
                                    <img src={arr_down_black} alt="" />
                                    {isOpenTooltipShowSortDishes && (
                                        <TooltipCommon
                                            isOpenTooltip={
                                                isOpenTooltipShowSortDishes
                                            }
                                            isCloseTooltipAnimation={
                                                isCloseTooltipAnimationShowSortDishes
                                            }
                                            content={<SortDishesTooltip />}
                                            type="sort-dishes"
                                            handleOutSide={
                                                closeTooltipSortDishes
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* list dishes */}
                        <div
                            className="grid grid-cols-2 gap-x-6 gap-y-10 font-oswald
                                        max-md:grid-cols-1 max-sm:grid-cols-1 "
                        >
                            {productStore.isLoading ? (
                                <div className="flex justify-center col-span-4">
                                    <RotatingLinesCommon />
                                </div>
                            ) : (
                                sortProducts?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg overflow-hidden hover:shadow-header-shadow transition-shadow
                                                    ease-linear duration-300 border"
                                        onMouseEnter={() =>
                                            handleHoverProduct(index)
                                        }
                                        onMouseLeave={handleOutSide}
                                    >
                                        <div className="flex ">
                                            {/* img product */}
                                            <div className="relative overflow-hidden h-44 w-[176px]">
                                                <div className="w-[176px]">
                                                    {/* <Link
                                                        to={`/menu/${item.slug}`}
                                                        state={item}
                                                    > */}
                                                    <img
                                                        src={
                                                            item.images &&
                                                            item.images[0].url
                                                        }
                                                        alt=""
                                                        className="h-full object-cover w-[176px]"
                                                    />
                                                    {/* </Link> */}
                                                </div>
                                                <div
                                                    className="absolute top-0 right-0  bottom-0 left-0 flex flex-col gap-5
                                                                    justify-center items-center cursor-pointer w-[176px]"
                                                    style={{
                                                        background: `${
                                                            activeProductAct ===
                                                            index
                                                                ? 'rgba(0,0,0,0.1)'
                                                                : 'transparent'
                                                        }`,
                                                    }}
                                                >
                                                    <div
                                                        className={`transition-all ease-linear duration-300 ${
                                                            activeProductAct ===
                                                            index
                                                                ? 'translate-y-14 opacity-100'
                                                                : 'translate-y-16 opacity-0'
                                                        } flex gap-2 items-center`}
                                                    >
                                                        <div
                                                            onClick={() => (
                                                                setIsOpenModalAProductDetail(
                                                                    true
                                                                ),
                                                                dispatch(
                                                                    showModal({
                                                                        type: 'PRODUCT_DETAIL_MODAL',
                                                                        props: {},
                                                                    })
                                                                ),
                                                                dispatch(
                                                                    getProductBySlug(
                                                                        item?.slug
                                                                    )
                                                                )
                                                            )}
                                                            className="font-cabin"
                                                        >
                                                            <Button
                                                                title="ĐẶT MÓN"
                                                                icon={add_white}
                                                                bg="save"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* info product */}
                                            <div className="flex-1">
                                                <h3 className="text-lg text-center flex justify-between items-center mb-3 mt-2 px-4">
                                                    <span className="text-start">
                                                        {CapitalizeFirstLetter(
                                                            item.name
                                                        )}
                                                    </span>
                                                    <div className="flex gap-1">
                                                        <img
                                                            src={star_yellow}
                                                            alt="star"
                                                            className="h-3"
                                                        />{' '}
                                                        <img
                                                            src={star_yellow}
                                                            alt="star"
                                                            className="h-3"
                                                        />{' '}
                                                        <img
                                                            src={star_yellow}
                                                            alt="star"
                                                            className="h-3"
                                                        />{' '}
                                                        <img
                                                            src={star_yellow}
                                                            alt="star"
                                                            className="h-3"
                                                        />{' '}
                                                        <img
                                                            src={star_yellow}
                                                            alt="star"
                                                            className="h-3"
                                                        />
                                                    </div>
                                                </h3>
                                                <p className="line-clamp-2 font-cabin  text-text-gray px-4 opacity-70">
                                                    Nước cam ép 320ml được làm
                                                    hoàn toàn từ cam tươi tự
                                                    nhiên. Uống nước cam sẽ góp
                                                    phần giúp cải thiện hệ miễn
                                                    dịch, giúp tăng khả năng
                                                    miễn dịch, chống lại bệnh
                                                    cúm và cảm lạnh.
                                                </p>
                                                <div className="flex justify-start items-center gap-2 mt-3 px-4 pb-4">
                                                    <p className=" text-center">
                                                        {FormatVND(
                                                            item.promotion
                                                        )}
                                                    </p>
                                                    <p className="text-gray-secondary text-center line-through decoration-1">
                                                        {FormatVND(
                                                            item.selling
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="px-4 font-cabin opacity-70">
                                                    Đã bán {item.sold || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="mt-20">
                        {categories.length > 0 && (
                            <PaginationCommon
                                totalProducts={
                                    categoryDishesStore.category_dishes
                                        ?.totalCategory
                                }
                                getPageFunc={getProductsPageByCategory}
                                pageSize={
                                    categoryDishesStore.categoryDishesStore
                                        ?.pageSize
                                }
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                dataUpload={{
                                    id: categories[activeCategory]?._id,
                                    pageNumber: currentPage,
                                }}
                                type="order"
                                funcCallApiGet={getAllCategoriesDishesPages}
                                id={categories[activeCategory]?._id}
                            />
                        )}
                    </div>
                    {/* MODAL */}
                </div>
            </div>
        </>
    );
}

export default Menu;
