/* eslint-disable no-prototype-builtins */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import star_yellow from '@/assets/icon/star_yellow.svg';
import mess_white from '@/assets/icon/mess_white.svg';
import like_white from '@/assets/icon/like_white.svg';
import haha from '@/assets/emoji/haha.svg';
import wow from '@/assets/emoji/wow.svg';
import cry from '@/assets/emoji/cry.svg';
import angry from '@/assets/emoji/angry.svg';
import { AnimatePresence } from 'framer-motion';
import SelectEmojiTooltip from '@/components/common/TooltipCommon/SelectEmoji';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAnglesDown,
    faChevronLeft,
    faChevronRight,
    faHeart,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReview, respondToReview } from '@/redux/reviewSlice';
import AvatarDefault from '@/components/common/AvatarDefault';
import CapitalizeWord from '@/components/common/CapitalizeWord';
import { formatTimeAgo } from '@/components/common/formatTimeAgo';
import { listStar } from '@/components/common/listStart';
import { motion } from 'framer-motion';
import ToastMsg from '@/components/common/ToastMsg';
import banner_2 from '@/assets/image/banner_2.webp';
import ReviewLoader from '@/components/common/loaderBlock/ReviewLoader';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';

const optSortReviews = [
    {
        name: 'Mới nhất',
        value: 'new',
    },
    {
        name: 'Cũ nhất',
        value: 'new',
    },
    {
        name: 'Sao tăng dần',
        value: 'new',
    },
    {
        name: 'Sao giảm dần',
        value: 'new',
    },
];

function ReviewAdmin() {
    const dispatch = useDispatch();
    const refTextArea = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const [visibleCount, setVisibleCount] = useState(4);

    const userStore = useSelector((state) => state.user?.user);

    const reviewStore = useSelector((state) => state.review);

    const [currentActiveLike, setCurrentActiveLike] = useState(null);

    const [emojiTypes, setEmojiTypes] = useState({});

    const [valueResponse, setValueResponse] = useState({});

    const [activeTextAeraRespon, setActiveTextAeraRespon] = useState([]);

    const [responded, setResponded] = useState(null);

    const [valueSortReview, setValueSortReview] = useState('Mới nhất');

    useEffect(() => {
        dispatch(getAllReview());
    }, [dispatch]);

    const hanldeClickLike = (index) => {
        setCurrentActiveLike((prev) => (prev === index ? null : index));
    };

    const getEmojiColorClass = useCallback(
        (itemResponseEmoji, selectedEmoji) => {
            const currentEmoji = selectedEmoji || itemResponseEmoji;

            switch (currentEmoji) {
                case 'like':
                    return 'text-blue-500';
                case 'heart':
                case 'angry':
                    return 'text-red-500';
                case 'haha':
                case 'wow':
                case 'cry':
                    return 'text-yellow-primary';
                default:
                    return '';
            }
        },
        [emojiTypes]
    );

    const getEmojiIcon = useCallback(
        (itemResponseEmoji, selectedEmoji) => {
            const currentEmoji = selectedEmoji || itemResponseEmoji;

            switch (currentEmoji) {
                case 'like':
                    return (
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="text-blue-500"
                        />
                    );
                case 'heart':
                    return (
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="text-red-500"
                        />
                    );
                case 'haha':
                    return <img src={haha} className="h-5" />;
                case 'wow':
                    return <img src={wow} className="h-5" />;
                case 'cry':
                    return <img src={cry} className="h-5" />;
                case 'angry':
                    return <img src={angry} className="h-5" />;

                default:
                    return <img src={like_white} alt="" className="h-7" />;
            }
        },
        [emojiTypes]
    );

    const getEmojiTitle = useCallback(
        (itemResponseEmoji, selectedEmoji) => {
            const currentEmoji = selectedEmoji || itemResponseEmoji;

            switch (currentEmoji) {
                case 'like':
                    return 'Thích';
                case 'heart':
                    return 'Yêu thích';
                case 'haha':
                    return 'haha';
                case 'wow':
                    return 'wow';
                case 'cry':
                    return 'Buồn';
                case 'angry':
                    return 'Phẫn nộ';

                default:
                    return 'like';
            }
        },
        [emojiTypes]
    );

    const sortReview = useMemo(() => {
        if (!Array.isArray(reviewStore.reviews)) return [];

        let arrSort;

        switch (valueSortReview) {
            case 'Mới nhất':
                arrSort =
                    [...reviewStore.reviews].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ) || [];
                break;
            case 'Cũ nhất':
                arrSort =
                    [...reviewStore.reviews].sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    ) || [];
                break;
            case 'Sao tăng dần':
                arrSort =
                    [...reviewStore.reviews].sort(
                        (a, b) => a.rating - b.rating
                    ) || [];
                break;
            case 'Sao giảm dần':
                arrSort =
                    [...reviewStore.reviews].sort(
                        (a, b) => b.rating - a.rating
                    ) || [];
                break;
            default:
                arrSort = [...reviewStore.reviews];
        }

        return arrSort;
    }, [valueSortReview, reviewStore.reviews]);

    const visibleReviews = sortReview.slice(0, visibleCount);

    const handleSelectEmoji = (index, type) => {
        setEmojiTypes((prev) => ({ ...prev, [index]: type }));
        setCurrentActiveLike(null);
    };

    const handleChangeValue = (e, index) => {
        setValueResponse((prev) => ({ ...prev, [index]: e.target.value }));
    };

    const arrStar = listStar.map((item, index) => index);

    const hanldeResponseReview = (id, index) => {
        const formData = new FormData();
        formData.append('responder', userStore._id);
        formData.append('content', valueResponse[index]);
        formData.append('emoji', emojiTypes[index]);

        dispatch(respondToReview({ id, formData })).then((data) => {
            if (data.payload.success) {
                ToastMsg({ msg: 'Đã trả lời' });
                dispatch(getAllReview());
                setResponded(null);
                setActiveTextAeraRespon((prev) =>
                    activeTextAeraRespon.filter((item) => item !== index)
                );
            }
        });
    };

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setVisibleCount((prev) => prev + 1);
        }, 1000);
    };

    return (
        <div className="font-cabin text-text-primary">
            <div className="mb-5 overflow-hidden">
                <div className="text-xl font-medium mb-10 text-text-primary">
                    Đánh giá
                </div>

                {/* slide đánh giá */}
                <Swiper
                    loop={true}
                    fadeEffect={{ crossFade: true }}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 32,
                        },
                        // when window width is >= 480px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        // when window width is >= 640px
                        1200: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        1440: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }}
                    navigation={{
                        prevEl: '.swiper-button-prev-review',
                        nextEl: '.swiper-button-next-review',
                    }}
                    modules={[Navigation, Autoplay]}
                    // onSlideChange={handleSlideChange}
                    className="swiper-wrapper-review"
                >
                    {reviewStore.reviews?.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="relative overflow-visible swiper-slide-review"
                        >
                            <img
                                src={item.product.images[0].url}
                                alt=""
                                className="h-36 w-36 rounded-full -top-4 
                                            shadow-img-shadow left-4 object-cover 
                                            absolute z-50"
                            />
                            <div
                                key={index}
                                className="grid grid-cols-2 bg-bg-secondary px-4 rounded-lg
                                         pb-4 "
                            >
                                <div
                                    className="col-start-2 h-32 flex flex-col justify-center items-start 
                                            gap-2 border-b border-border-primary mb-5"
                                >
                                    <span className="font-oswald font-medium ">
                                        {item.product.name.toUpperCase()}
                                    </span>
                                    <span className="text-[#a4e3ce] font-oswald ">
                                        {item.product.categoryDishes.name}
                                    </span>
                                </div>
                                <p className="col-span-2 mb-3 opacity-70 line-clamp-2 px-1">
                                    {CapitalizeFirstLetter(item.content)}
                                </p>
                                <div
                                    className="col-span-2 flex justify-between bg-[#5e6c93] text-white
                                            py-4 px-6 rounded-lg"
                                >
                                    <div className="flex gap-2">
                                        {AvatarDefault(
                                            item.reviewer?.name ||
                                                item.reviewer?.username
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                {CapitalizeWord(
                                                    item.reviewer?.name ||
                                                        item.reviewer?.username
                                                )}
                                            </span>
                                            <span className="opacity-70 text-sm">
                                                Người dùng
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={star_yellow}
                                            alt=""
                                            className="h-6 "
                                        />
                                        <span>{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* nút prev, next */}
            <div className="mb-10  flex justify-end">
                <div className="bg-bg-tertiary flex gap-2 p-2 rounded-lg">
                    <button
                        className="swiper-button-prev-review border-none outline-none transition-colors
                          ease-in-out duration-300 bg-color-active rounded-lg w-12 h-8 flex
                          justify-center items-center"
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="text-yellow-primary"
                        />
                    </button>
                    <button
                        className="swiper-button-next-review border-none outline-none transition-colors
                          ease-in-out duration-300 bg-color-active rounded-lg w-12 h-8 flex
                          justify-center items-center"
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-yellow-primary arr-right-banner"
                        />
                    </button>
                </div>
            </div>

            {/* đánh giá khác */}
            <div className="bg-bg-secondary p-5 rounded-lg">
                <div className="mb-5 flex justify-between items-center">
                    <div>
                        <div className="text-xl font-medium text-text-primary">
                            Các đánh giá khác
                        </div>
                        <div className=" opacity-80">
                            Khách hàng đánh giá về nhà hàng (
                            {reviewStore.reviews?.length} đánh giá)
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            value={valueSortReview}
                            onChange={(e) => setValueSortReview(e.target.value)}
                            className="bg-[#dff0fa] pl-4 pr-10 py-3 rounded-lg 
                                    flex items-center gap-3 cursor-pointer text-[#55afe2]
                                    appearance-none transition-all ease-linear duration-300
                                    border  focus::border-[#55afe2] outline-none text-center"
                        >
                            {optSortReviews.map((item, index) => (
                                <option name={item.name} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="text-[#55afe2] absolute right-5 top-1/2 -translate-y-1/2
                                "
                        />
                    </div>
                </div>

                {/* danh sách đánh giá khác */}
                <div>
                    {visibleReviews?.map((item, index) => {
                        const emoji = emojiTypes[index];

                        return (
                            <div
                                key={index}
                                className="flex gap-10 items-start border-t border-b 
                                        border-border-primary py-5 justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex gap-5">
                                        {AvatarDefault(
                                            item.reviewer?.name ||
                                                item.reviewer?.username
                                        )}
                                        <div className="flex-1">
                                            <div className="flex justify-between gap-1 px-2 mb-2 items-center">
                                                <div className="flex  gap-2">
                                                    <span className="font-medium text-lg">
                                                        {CapitalizeWord(
                                                            item.reviewer
                                                                ?.name ||
                                                                item.reviewer
                                                                    ?.username
                                                        )}
                                                    </span>
                                                    <span className="text-sm opacity-50 font-medium translate-y-1">
                                                        {formatTimeAgo(
                                                            item.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    {listStar.map(
                                                        (star, index) => (
                                                            <img
                                                                key={index}
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
                                            <p className="mb-2 opacity-70 font-medium px-2">
                                                {item.content}
                                            </p>

                                            <div className="flex font-medium mb-3">
                                                <span
                                                    onClick={() =>
                                                        hanldeClickLike(index)
                                                    }
                                                    className="cursor-pointer hover:bg-border-primary 
                                                            rounded-md relative"
                                                >
                                                    <motion.div
                                                        key={emoji}
                                                        initial={{
                                                            y: -30,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            y: 0,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className="flex items-center  gap-2 px-2 py-1 w-[103px] h-[36px]"
                                                    >
                                                        {getEmojiIcon(
                                                            item?.response
                                                                ?.emoji,
                                                            emoji
                                                        )}
                                                        <span
                                                            className={`opacity-70  font-medium ${getEmojiColorClass(
                                                                item?.response
                                                                    ?.emoji,
                                                                emoji
                                                            )}`}
                                                        >
                                                            {getEmojiTitle(
                                                                item?.response
                                                                    ?.emoji,
                                                                emoji
                                                            )}
                                                        </span>
                                                    </motion.div>

                                                    <AnimatePresence>
                                                        {currentActiveLike ===
                                                            index && (
                                                            <SelectEmojiTooltip
                                                                isOpenTooltip={
                                                                    true
                                                                }
                                                                index={index}
                                                                setEmojiType={(
                                                                    type
                                                                ) =>
                                                                    handleSelectEmoji(
                                                                        index,
                                                                        type
                                                                    )
                                                                }
                                                                setCurrentActiveLike={
                                                                    setCurrentActiveLike
                                                                }
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </span>

                                                {!item.response && (
                                                    <span
                                                        onClick={() =>
                                                            setActiveTextAeraRespon(
                                                                (prev) =>
                                                                    activeTextAeraRespon.includes(
                                                                        index
                                                                    )
                                                                        ? activeTextAeraRespon.filter(
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
                                                        className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-color-active rounded-md"
                                                    >
                                                        <img
                                                            src={mess_white}
                                                            alt=""
                                                        />
                                                        <span className="opacity-70 font-medium">
                                                            Trả lời
                                                        </span>
                                                    </span>
                                                )}
                                            </div>

                                            {item.response && (
                                                <div
                                                    key={item._id}
                                                    className=" flex justify-between px-2 border-l  border-border-primary
                                                                "
                                                >
                                                    <div className="flex items-start gap-4 mb-3 flex-1">
                                                        <img
                                                            src={banner_2}
                                                            alt=""
                                                            className="h-12 w-12  rounded-full object-cover"
                                                        />

                                                        {responded === index ? (
                                                            <AnimatePresence>
                                                                <motion.div
                                                                    initial={{
                                                                        y: -50,
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        y: 0,
                                                                        opacity: 1,
                                                                    }}
                                                                    exit={{
                                                                        y: -50,
                                                                        opacity: 0,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                    }}
                                                                    className="ml-3 relative flex-1"
                                                                >
                                                                    <textarea
                                                                        className="w-full px-4 py-3 bg-bg-four outline-1 
                                                                                outline outline-border-primary
                                                                                focus:outline-yellow-primary text-text-primary
                                                                                rounded-lg ease-linear duration-200 h-20 reset_textarea
                                                                                focus:bg-border-primary"
                                                                        placeholder="Trả lời...."
                                                                        value={
                                                                            valueResponse[
                                                                                index
                                                                            ] ||
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChangeValue(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                    ></textarea>
                                                                    <div className="flex justify-end gap-2 mt-3 text-sm">
                                                                        <div
                                                                            className="p-[0.7px] h-8 w-36 bg-gradient-to-r
                                                                        from-blue-300 via-violet-400 to-teal-200 rounded-lg
                                                                        "
                                                                        >
                                                                            <button
                                                                                onClick={() =>
                                                                                    setResponded(
                                                                                        null
                                                                                    )
                                                                                }
                                                                                className="bg-white rounded-lg h-full w-full text-blue-400
                                                                                    flex justify-center items-center"
                                                                            >
                                                                                HỦY
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            onClick={() =>
                                                                                hanldeResponseReview(
                                                                                    item._id,
                                                                                    index
                                                                                )
                                                                            }
                                                                            className="w-36 h-8 bg-blue-500 text-white rounded-lg
                                                                                hover:brightness-110"
                                                                        >
                                                                            <button
                                                                                className="flex justify-center items-center w-full h-full
                                                                                        "
                                                                            >
                                                                                CẬP
                                                                                NHẬT
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </AnimatePresence>
                                                        ) : (
                                                            <motion.div
                                                                initial={{
                                                                    y: -50,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    y: 0,
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    y: -50,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                                className="flex flex-col gap-1"
                                                            >
                                                                <div className="font-semibold flex gap-3 flex-1">
                                                                    <div>
                                                                        Nhà hàng
                                                                    </div>
                                                                    <span
                                                                        className="font-medium opacity-50 flex gap-1 items-center
                                                                                        text-sm mb-3 translate-y-0.5"
                                                                    >
                                                                        <div>
                                                                            {formatTimeAgo(
                                                                                item
                                                                                    .response
                                                                                    .respondedAt
                                                                            )}
                                                                        </div>
                                                                    </span>
                                                                </div>

                                                                <p className="opacity-70 mb-3">
                                                                    {
                                                                        item
                                                                            .response
                                                                            .content
                                                                    }
                                                                </p>
                                                                <div
                                                                    onClick={() => (
                                                                        setResponded(
                                                                            index
                                                                        ),
                                                                        setValueResponse(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [index]:
                                                                                    item
                                                                                        .response
                                                                                        .content,
                                                                            })
                                                                        )
                                                                    )}
                                                                    className="opacity-70 text-sm hover:underline cursor-pointer"
                                                                >
                                                                    Chỉnh sửa
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <AnimatePresence>
                                                {activeTextAeraRespon.includes(
                                                    index
                                                ) && (
                                                    <motion.div
                                                        initial={{
                                                            y: -50,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            y: 0,
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            y: -50,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className="ml-3 relative"
                                                    >
                                                        <textarea
                                                            className="w-full px-4 py-3 bg-gray-200 outline-1 outline outline-border-primary
                                                                  focus:outline-yellow-primary text-text-primary
                                                                  rounded-lg ease-linear duration-200 h-20 reset_textarea
                                                                  focus:bg-white"
                                                            placeholder="Trả lời...."
                                                            value={
                                                                valueResponse[
                                                                    index
                                                                ] || ''
                                                            }
                                                            onChange={(e) =>
                                                                handleChangeValue(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                        ></textarea>
                                                        <div className="flex justify-end gap-2 mt-3 text-sm">
                                                            <div
                                                                className="p-[0.7px] h-8 w-36 bg-gradient-to-r
                                                                        from-blue-300 via-violet-400 to-teal-200 rounded-lg
                                                                        "
                                                            >
                                                                <button
                                                                    onClick={() =>
                                                                        setActiveTextAeraRespon(
                                                                            (
                                                                                prev
                                                                            ) =>
                                                                                activeTextAeraRespon.filter(
                                                                                    (
                                                                                        item
                                                                                    ) =>
                                                                                        item !==
                                                                                        index
                                                                                )
                                                                        )
                                                                    }
                                                                    className="bg-white rounded-lg h-full w-full text-blue-400
                                                                                    flex justify-center items-center"
                                                                >
                                                                    HỦY
                                                                </button>
                                                            </div>
                                                            <div
                                                                onClick={() =>
                                                                    hanldeResponseReview(
                                                                        item._id,
                                                                        index
                                                                    )
                                                                }
                                                                className="w-36 h-8 bg-blue-500 text-white rounded-lg
                                                                                hover:brightness-110"
                                                            >
                                                                <button
                                                                    className="flex justify-center items-center w-full h-full
                                                                                        "
                                                                >
                                                                    TRẢ LỜI
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* sản phẩm và đánh giá */}
                                <div className="flex flex-col items-center gap-12 w-52">
                                    <div className="flex flex-col items-center gap-5">
                                        <img
                                            src={item.product.images[0].url}
                                            alt=""
                                            className="h-28 w-28 rounded-full shadow-lg object-cover 
                                            "
                                        />
                                        <span className="font-oswald">
                                            {item.product.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {isLoading && (
                        <div>
                            <div className="border-b">
                                <ReviewLoader />
                            </div>{' '}
                            <div className="border-b">
                                <ReviewLoader />
                            </div>{' '}
                            <div className="border-b">
                                <ReviewLoader />
                            </div>
                        </div>
                    )}
                </div>

                {/* act more */}
                {visibleCount < sortReview.length && (
                    <div
                        onClick={handleLoadMore}
                        className="flex justify-end mt-5"
                    >
                        <div
                            className="bg-[#2c9cdb] px-6  py-3 rounded-lg 
                                    flex items-center gap-3 cursor-pointer"
                        >
                            <span className="text-white">Xem thêm</span>
                            <FontAwesomeIcon
                                icon={faAnglesDown}
                                className="text-white"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewAdmin;
