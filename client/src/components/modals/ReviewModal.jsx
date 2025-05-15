/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import StarTooltip from '../tooltipsContent/StarTooltip';
import Button from '../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { listStar } from '../common/listStart';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, updateReview } from '@/redux/reviewSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ToastMsg from '../common/ToastMsg';
import TextAreaCommon from '../common/TextAreaCommon';
import { getProductBySlug } from '@/redux/productSlice';
import star_yellow from '@/assets/icon/star_yellow.svg';

function ReviewModal({ ...props }) {
    const {
        setIsShowReviewModal,
        productName,
        productId,
        reviewExixted,
        reviewUpdate,
        statusChange,
        setStatusChange,
    } = props;
    const dispatch = useDispatch();

    const { _id } = useSelector((state) => state.user?.user);
    const { productSelected } = useSelector((state) => state.product);

    // const { contentReviewer } = useSelector((state) => state.review);

    const [selectedStar, setSelectedStar] = useState(null);

    const [showStarTooltip, setShowStarTooltip] = useState(null);

    const [arrInnerStar, setArrInnerStar] = useState([]);

    const [initialValues, setInitialValues] = useState({ contentReviewer: '' });

    const [reviewEnd, setReviewEnd] = useState(false);

    const arrStar = listStar.map((item, index) => index);

    useEffect(() => {
        reviewUpdate &&
            (setArrInnerStar(() => [...arrStar.slice(0, reviewUpdate.rating)]),
            setSelectedStar(reviewUpdate.rating),
            setInitialValues(() => ({
                contentReviewer: reviewUpdate.content,
            })));
    }, []);

    const formik = useFormik({
        initialValues: {
            ...initialValues,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            contentReviewer: Yup.string().required(
                'Nội dung không được để trống'
            ),
        }),

        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('reviewer', _id);
            !reviewExixted && formData.append('product', productId);
            formData.append('content', values.contentReviewer);
            formData.append('rating', selectedStar + 1);

            reviewExixted
                ? dispatch(
                      updateReview({ id: reviewUpdate._id, formData })
                  ).then((data) => {
                      if (data.payload.success) {
                          ToastMsg({ msg: 'Đã cập nhật đánh giá' });
                          dispatch(getProductBySlug(productSelected.slug));
                          setStatusChange(true);
                          setReviewEnd(true);
                      }
                  })
                : dispatch(addReview(formData)).then((data) => {
                      if (data.payload.success) {
                          ToastMsg({ msg: 'Bạn đã đánh giá' });
                          dispatch(getProductBySlug(productSelected.slug));
                          setStatusChange(true);
                          setReviewEnd(true);
                      }
                  });
        },
    });

    const handleHoverStar = (index) => {
        setShowStarTooltip(index);
    };

    const handleLeaveStar = (index) => {
        setShowStarTooltip(null);
        // setArrInnerStar([]);
    };

    const handleClickStar = (index) => {
        setShowStarTooltip(index);
        setSelectedStar(index);
        setArrInnerStar((pre) => [...arrStar.slice(0, index + 1)]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex 
                        justify-center items-center 
                        bg-black bg-opacity-65 z-40"
        >
            <div
                className="bg-white w-[500px] 
                            max-sm:w-11/12 px-8 py-5 rounded-md
                             "
            >
                <AnimatePresence>
                    {reviewEnd ? (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-7 text-sm"
                        >
                            <img src={star_yellow} alt="" className="h-24" />
                            <div className="text-xl text-center">
                                Cảm ơn bạn đã gửi đánh giá của bạn!
                            </div>
                            <div
                                onClick={() => (
                                    setStatusChange(false),
                                    setIsShowReviewModal(false),
                                    setReviewEnd(false)
                                )}
                                className="bg-black-primary text-white py-3 w-full 
                                    text-center rounded-3xl cursor-pointer hover:brightness-150"
                            >
                                Tiếp tục đặt bàn
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex justify-end ">
                                <div
                                    onClick={() => setIsShowReviewModal(false)}
                                    className="hover:bg-color-active h-7 w-7 rounded-full 
                                    flex justify-center items-center cursor-pointer
                                    transition-colors duration-200 ease-linear"
                                >
                                    <FontAwesomeIcon
                                        icon={faX}
                                        className="text-gray-500 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 ">
                                <h1 className="font-medium text-xl mb-4 text-center">
                                    Đánh giá
                                </h1>
                                <div className="mb-4 text-center">
                                    Bạn có hài lòng về mặt hàng{' '}
                                    <span className="text-yellow-primary font-oswald">
                                        {productName}
                                    </span>{' '}
                                    ?
                                </div>
                                <div className="flex gap-5 justify-center mb-10 text-center">
                                    {listStar.map((star, index) => (
                                        <motion.div
                                            transition={{ duration: 0.3 }}
                                            onClick={() =>
                                                handleClickStar(index)
                                            }
                                            onMouseEnter={() =>
                                                handleHoverStar(index)
                                            }
                                            onMouseLeave={() =>
                                                handleLeaveStar(index)
                                            }
                                            key={index}
                                            className="relative cursor-pointer "
                                        >
                                            <img
                                                src={
                                                    arrInnerStar.includes(index)
                                                        ? star.star_yellow
                                                        : star.star
                                                }
                                                alt=""
                                                className="h-8"
                                            />
                                            {showStarTooltip === index && (
                                                <StarTooltip
                                                    descriptionStar={
                                                        star.description
                                                    }
                                                    emoji={star.emoji}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                                <form
                                    className=""
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="mb-5">
                                        <TextAreaCommon
                                            id="contentReviewer"
                                            label="Nội dung đánh giá"
                                            type="text"
                                            placeholder="Nội dung đánh giá..."
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            title="Bình luận"
                                            bg="save"
                                            type="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                {/* )} */}
            </div>
        </motion.div>
    );
}

export default ReviewModal;
