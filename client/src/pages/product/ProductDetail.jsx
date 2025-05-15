import { listStar } from '@/components/common/listStart';
import ReviewModal from '@/components/modals/ReviewModal';
import {
    faChevronRight,
    faHeart,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import check_green_2 from '@/assets/icon/check_green_2.svg';
import Button from '@/components/common/Button/Button';
import edit_white from '@/assets/icon/edit_white.svg';
import star_gray from '@/assets/icon/star_gray.svg';
import star_yellow from '@/assets/icon/star_yellow.svg';
import { useUnderlinePosition } from '@/components/hooks/useUnderlinePosition';
import UnderLineCategoryCommon from '@/components/common/UnderLineCategoryCommon';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '@/redux/productSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import renderAverageStar from '@/components/common/RenderAverageStar';
import { formatTimeAgo } from '@/components/common/formatTimeAgo';
import ToastMsg from '@/components/common/ToastMsg';
import { AnimatePresence } from 'framer-motion';
import haha from '@/assets/emoji/haha.svg';
import wow from '@/assets/emoji/wow.svg';
import cry from '@/assets/emoji/cry.svg';
import angry from '@/assets/emoji/angry.svg';
import happy from '@/assets/icon/happy.svg';
import banner_2 from '@/assets/image/banner_2.webp';
import { motion } from 'framer-motion';
import ProductDetailCardCommon from '@/components/common/CardCommon/ProductDetailCardCommon';

const category = [
    {
        name: 'Mô tả',
    },
    {
        name: 'Đánh giá - nhận xét từ khách hàng',
    },
];

function ProductDetail() {
    const location = useLocation();
    const productDetail = location.state;
    const dispatch = useDispatch();

    const { productSelected } = useSelector((state) => state.product);
    const userStore = useSelector((state) => state.user?.user);

    const [indexActiveCategory, setIsActiveCategory] = useState(0);

    const [isShowReviewModal, setIsShowReviewModal] = useState(false);

    const [reviewExixted, setReviewExisted] = useState(false);

    const { itemsRef, underlineProps } = useUnderlinePosition(
        indexActiveCategory,
        [category] // phụ thuộc vào danh mục
    );

    const [ratingProcessBar, setRatingProcessBar] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    const [reviewUpdate, setReviewUpdate] = useState(null);

    const [statusChange, setStatusChange] = useState(false);

    const [showMoreReview, setShowMoreReview] = useState([]);

    const arrStar = listStar.map((item, index) => index);

    useEffect(() => {
        dispatch(getProductBySlug(productDetail.slug)).then((data) => {
            if (data.payload.success) {
                setReviewExisted(
                    data.payload.data.reviews.some(
                        (item) => item.reviewer._id === userStore?._id
                    )
                );

                const ratings = [5, 4, 3, 2, 1];

                const totalReviews = data.payload.data.reviews.length;

                const ratingProcess = ratings.map((star) => {
                    const count = data.payload.data.reviews.filter(
                        (item) => item.rating === star
                    ).length;
                    const percent =
                        totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return { star, count, percent };
                });

                const totalRating = data.payload.data.reviews.reduce(
                    (sum, item) => sum + item.rating,
                    0
                );

                setReviewUpdate(
                    data.payload.data.reviews.find(
                        (item) => item.reviewer._id === userStore?._id
                    )
                );

                setAverageRating(
                    totalReviews > 0 ? totalRating / totalReviews : 0
                );

                setRatingProcessBar(ratingProcess);
            }
        });
    }, [dispatch, userStore?._id, statusChange]);

    //sắp xếp đánh giá của chính chủ lên đầu.
    const arrUserReviewTop = useMemo(() => {
        if (!productSelected) return null;

        const filterArrayInnerUser =
            productSelected.reviews?.filter(
                (item) => item.reviewer._id === userStore?._id
            ) || [];

        const remainArray =
            productSelected.reviews?.filter(
                (item) => item.reviewer._id !== userStore?._id
            ) || [];

        const combinedReviews = [...filterArrayInnerUser, ...remainArray];

        return {
            ...productSelected,
            reviews: combinedReviews,
        };
    }, [userStore?._id, productSelected, reviewExixted, statusChange]);

    return (
        <div className="bg-white">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-full 
                            max-xs:px-3 max-xs:mx-0 mx-auto
                           font-cabin mt-28 pt-5 pb-10"
            >
                {/* link */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>

                    {location.pathname
                        .split('/')
                        .slice(1)
                        .map((item, index) => (
                            <Link to="/menu" key={index}>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-xs mr-2"
                                />
                                <span
                                    className={`${
                                        location.pathname
                                            .split('/')
                                            .slice(-1)
                                            .join('') === item &&
                                        'text-yellow-primary'
                                    }`}
                                >
                                    {item}
                                </span>
                            </Link>
                        ))}
                </div>

                <ProductDetailCardCommon itemProduct={productDetail} />

                {/* category description && reviews */}
                <div className="mt-10 flex gap-10 text-2xl font-medium relative">
                    {category.map((item, index) => (
                        <div
                            ref={(el) => (itemsRef.current[index] = el)}
                            key={index}
                            onClick={() => setIsActiveCategory(index)}
                            className={`cursor-pointer ${
                                indexActiveCategory === index
                                    ? 'text-yellow-primary'
                                    : 'opacity-50'
                            }`}
                        >
                            {item.name}
                        </div>
                    ))}

                    <UnderLineCategoryCommon underlineProps={underlineProps} />
                </div>

                {/* đánh giá và mô tả */}
                <div className="flex gap-5 mt-5 justify-between">
                    {indexActiveCategory === 1 ? (
                        <div className="flex-1 border  rounded-lg py-5">
                            <div className="flex justify-between  items-center mb-5 px-5">
                                <div className="text-xl font-medium text-text-primary">
                                    Đánh giá
                                </div>
                                <div>
                                    <Button
                                        bg="save"
                                        title={
                                            reviewExixted
                                                ? 'Chỉnh sửa đánh giá'
                                                : 'Viết đánh giá'
                                        }
                                        icon={edit_white}
                                        handleClick={() => {
                                            if (
                                                new Date() >
                                                new Date(
                                                    reviewUpdate?.editableUntil
                                                )
                                            ) {
                                                ToastMsg({
                                                    msg: 'Đã quá 24h để chỉnh sửa đánh giá',
                                                    status: 'error',
                                                });
                                            } else {
                                                setIsShowReviewModal(true);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {arrUserReviewTop?.reviews?.length > 0 ? (
                                //tổng hợp đánh giá
                                <div className="">
                                    <div className="flex justify-between items-center border-b px-5 pb-4">
                                        <div>
                                            <div className="font-oswald text-4xl font-bold mb-2">
                                                {(
                                                    Math.round(
                                                        averageRating.toFixed(
                                                            1
                                                        ) * 2
                                                    ) / 2
                                                ).toFixed(1)}
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                {renderAverageStar(
                                                    averageRating
                                                )}
                                            </div>
                                            <div className="opacity-70">
                                                (
                                                {
                                                    arrUserReviewTop?.reviews
                                                        ?.length
                                                }{' '}
                                                đánh giá )
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 ">
                                            {ratingProcessBar.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span className="w-9">
                                                            {item.star} sao
                                                        </span>
                                                        <div className="flex bg-gray-300 w-52 rounded-full translate-y-[1px]">
                                                            <div className="flex-1 h-1.5 bg-gray-200 rounded">
                                                                <div
                                                                    className="h-full bg-yellow-400 rounded"
                                                                    style={{
                                                                        width: `${item.percent}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <span className="min-w-3 text-center">
                                                            {item.count}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* nội dung mô tả && đánh giá */}
                                    <div className="mt-5 px-5">
                                        {arrUserReviewTop?.reviews?.map(
                                            (item, index) => (
                                                <div
                                                    key={item._id}
                                                    className="py-4 "
                                                >
                                                    <div className=" flex justify-between ">
                                                        <div className="flex items-start gap-4 mb-3">
                                                            <div
                                                                className="h-12 w-12 bg-blue-500 rounded-full
                                                                flex justify-center items-center text-white
                                                                font-bold"
                                                            >
                                                                {CapitalizeFirstLetter(
                                                                    item.reviewer.username.slice(
                                                                        0,
                                                                        1
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <div className="font-semibold flex gap-3 ">
                                                                    <div>
                                                                        {item
                                                                            .reviewer
                                                                            ._id ===
                                                                        userStore._id ? (
                                                                            <div className="flex gap-2">
                                                                                <span>
                                                                                    Bạn
                                                                                </span>
                                                                                <img
                                                                                    src={
                                                                                        check_green_2
                                                                                    }
                                                                                    alt="check"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            CapitalizeFirstLetter(
                                                                                item
                                                                                    .reviewer
                                                                                    .username
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <span
                                                                        className="font-medium opacity-50 flex gap-1 items-center
                                                                            text-sm mb-3 translate-y-0.5"
                                                                    >
                                                                        <div>
                                                                            {formatTimeAgo(
                                                                                item.createdAt
                                                                            )}
                                                                        </div>
                                                                    </span>
                                                                </div>

                                                                <p className="opacity-70 mb-2">
                                                                    {CapitalizeFirstLetter(
                                                                        item.content
                                                                    )}
                                                                    .
                                                                </p>

                                                                <div className="relative">
                                                                    <img
                                                                        src={
                                                                            banner_2
                                                                        }
                                                                        alt=""
                                                                        className="h-7 w-7  rounded-full object-cover"
                                                                    />
                                                                    {item
                                                                        ?.response
                                                                        ?.emoji ===
                                                                        'like' && (
                                                                        <div
                                                                            className="h-5 w-5 bg-white shadow-header-shadow
                                                                                        absolute -bottom-1 left-4 flex justify-center items-center
                                                                                        rounded-full"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faThumbsUp
                                                                                }
                                                                                className="text-blue-500 text-xs"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {item
                                                                        ?.response
                                                                        ?.emoji ===
                                                                        'heart' && (
                                                                        <div
                                                                            className="h-5 w-5 bg-white shadow-header-shadow
                                                                                        absolute -bottom-1 left-4 flex justify-center items-center
                                                                                        rounded-full"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faHeart
                                                                                }
                                                                                className="text-red-500 text-xs"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <img
                                                                        src={
                                                                            (item
                                                                                ?.response
                                                                                ?.emoji ===
                                                                                'haha' &&
                                                                                haha) ||
                                                                            (item
                                                                                ?.response
                                                                                ?.emoji ===
                                                                                'wow' &&
                                                                                wow) ||
                                                                            (item
                                                                                ?.response
                                                                                ?.emoji ===
                                                                                'cry' &&
                                                                                cry) ||
                                                                            (item
                                                                                ?.response
                                                                                ?.emoji ===
                                                                                'angry' &&
                                                                                angry) ||
                                                                            ''
                                                                        }
                                                                        alt=""
                                                                        className="h-4 absolute -bottom-1 left-4"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 my-3">
                                                            {listStar.map(
                                                                (
                                                                    star,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            arrStar
                                                                                .slice(
                                                                                    0,
                                                                                    index +
                                                                                        1
                                                                                )
                                                                                .includes(
                                                                                    item.rating
                                                                                )
                                                                                ? star.star
                                                                                : star.star_yellow
                                                                        }
                                                                        className="h-4"
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* nhà hàng trả lời */}
                                                    {item.response && (
                                                        <div
                                                            onClick={() =>
                                                                setShowMoreReview(
                                                                    (prev) =>
                                                                        showMoreReview.includes(
                                                                            index
                                                                        )
                                                                            ? showMoreReview.filter(
                                                                                  (
                                                                                      item
                                                                                  ) =>
                                                                                      item !==
                                                                                      index
                                                                              )
                                                                            : [
                                                                                  ...prev,
                                                                                  index,
                                                                              ]
                                                                )
                                                            }
                                                            className="hover:underline cursor-pointer transition-all 
                                                                ease-linear duration-300 text-sm opacity-80 mb-3"
                                                        >
                                                            {!showMoreReview.includes(
                                                                index
                                                            )
                                                                ? 'Xem'
                                                                : 'Ẩn'}{' '}
                                                            phản hồi từ nhà hàng
                                                        </div>
                                                    )}
                                                    <AnimatePresence>
                                                        {showMoreReview.includes(
                                                            index
                                                        ) && (
                                                            <motion.div
                                                                initial={{
                                                                    y: -15,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    y: 0,
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    y: -15,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                                key={item._id}
                                                                className=" flex justify-between px-8 border-l "
                                                            >
                                                                <div className="flex items-start gap-4 mb-3">
                                                                    <img
                                                                        src={
                                                                            banner_2
                                                                        }
                                                                        alt=""
                                                                        className="h-12 w-12  rounded-full object-cover"
                                                                    />
                                                                    <div className="flex flex-col gap-1">
                                                                        <div className="font-semibold flex gap-3 ">
                                                                            <div>
                                                                                Nhà
                                                                                hàng
                                                                            </div>
                                                                            <span
                                                                                className="font-medium opacity-50 flex gap-1 items-center
                                                                        text-sm mb-3 translate-y-0.5"
                                                                            >
                                                                                <div>
                                                                                    {formatTimeAgo(
                                                                                        item.createdAt
                                                                                    )}
                                                                                </div>
                                                                            </span>
                                                                        </div>

                                                                        <p className="opacity-70">
                                                                            {CapitalizeFirstLetter(
                                                                                item
                                                                                    ?.response
                                                                                    ?.content
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>Chưa có đánh giá</div>
                            )}
                        </div>
                    ) : (
                        <div className="border p-5 rounded-lg">
                            <div className="font-semibold mb-5 text-xl">
                                Mô tả
                            </div>
                            <div>{productDetail?.description}</div>
                        </div>
                    )}
                </div>
                {/* gợi ý mặt hàng*/}
                <div className="mt-10">
                    <h3 className="text-center text-2xl font-medium">
                        Mặt hàng liên quan
                    </h3>
                </div>

                {/* review modal */}
                <AnimatePresence>
                    {isShowReviewModal && (
                        <ReviewModal
                            isShowReviewModal={isShowReviewModal}
                            setIsShowReviewModal={setIsShowReviewModal}
                            productName={productDetail.name}
                            productId={productDetail?._id}
                            reviewExixted={reviewExixted}
                            reviewUpdate={reviewUpdate}
                            statusChange={statusChange}
                            setStatusChange={setStatusChange}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProductDetail;
