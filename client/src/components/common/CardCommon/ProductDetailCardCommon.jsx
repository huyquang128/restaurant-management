/* eslint-disable react/prop-types */
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import fb from '@/assets/icon/fb.svg';
import FormatVND from '../FormatVND';
import CapitalizeFirstLetter from '../CapitalizeFirstLetter';
import next_black from '@/assets/icon/next_black.svg';
import { Link } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart, setIsOpenCartModal } from '@/redux/cartSlice';
import ToastMsg from '../ToastMsg';
import imgIcon from '@/assets/icon/imgIcon.svg';

function ProductDetailCardCommon({ ...props }) {
    const { type, itemProduct, modal, onClose } = props;

    const userStore = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [quantityProdValue, setQuantityProdValue] = useState(1);

    //handle order dishes
    const handleOrderDishes = (productId, price) => {
        dispatch(
            addProductCart({
                userId: userStore?.user?._id,
                productId,
                quantity: quantityProdValue,
                price,
            })
        ).then((data) => {
            if (data.payload?.success) {
                ToastMsg({
                    msg: data.payload.message,
                });
            }
            dispatch(setIsOpenCartModal(true));
        });
    };

    return (
        <div
            className={` ${
                modal
                    ? 'flex-wrap overflow-y-scroll h-[600px] no-scrollbar rounded-lg'
                    : 'flex gap-2 max-md:flex-wrap'
            } `}
        >
            <div className="relative ">
                <img
                    src={itemProduct?.images[0]?.url}
                    alt=""
                    className={` object-cover ${
                        modal
                            ? 'w-full h-[300px] rounded-tl-lg rounded-tr-lg border-b  '
                            : 'w-[400px] h-[400px]  max-md:w-[300px] max-md:h-[300px]  '
                    }`}
                />
                <div
                    className="absolute flex items-center gap-2 bottom-3 left-4 
                                bg-black text-white
                                px-3 rounded-2xl py-1"
                >
                    <img src={imgIcon} alt="" className="h-4" />
                    <div className=" text-xs">1 / 1</div>
                </div>
            </div>
            <div className="flex-1 p-5 ">
                <h2 className="text-xl font-medium">{itemProduct?.name}</h2>

                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <span className="text-yellow-primary mr-4">
                            {FormatVND(itemProduct?.promotion)}
                        </span>
                        <span className=" text-gray-secondary line-through decoration-1">
                            {FormatVND(itemProduct?.selling)}
                        </span>
                    </div>
                    {modal && (
                        <div
                            className="border px-4 py-1.5 w-[112px] flex justify-between 
                                    items-center cursor-pointer rounded-lg"
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                onClick={() =>
                                    setQuantityProdValue(quantityProdValue - 1)
                                }
                                className={`${
                                    quantityProdValue === 1
                                        ? 'opacity-0  pointer-events-none'
                                        : ''
                                }`}
                            />
                            <input
                                type="text"
                                className="w-2/3 outline-none text-center"
                                value={quantityProdValue || 1}
                                onChange={(e) =>
                                    setQuantityProdValue(e.target.value)
                                }
                            />
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={() =>
                                    setQuantityProdValue(quantityProdValue + 1)
                                }
                            />
                        </div>
                    )}
                </div>
                <div className="dots-menu"></div>
                <div className="mt-4 mb-3 font-cabin ">
                    Mô tả: {itemProduct?.description}
                </div>

                <div className="mb-5 opacity-80">
                    Trong quá trình dùng món, nếu quý khách có bất cứ vấn đề gì
                    có thể liên hệ trực tiếp bộ phận CSKH, Quản lý hoặc Giám sát
                    để được hỗ trợ & xử lý nhanh nhất.
                </div>
                {!modal && (
                    <div className="mb-4">
                        Đơn vị tính:{' '}
                        <span className="text-gray-primary">
                            {CapitalizeFirstLetter(
                                itemProduct?.unit?.name || ''
                            )}
                        </span>
                    </div>
                )}

                {!modal ? (
                    <div className={` flex gap-3 ${modal ? '' : 'mb-5'}`}>
                        <div
                            className="border px-3 py-4 w-1/3 flex justify-between 
                                            items-center cursor-pointer"
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                onClick={() =>
                                    setQuantityProdValue(quantityProdValue - 1)
                                }
                                className={`${
                                    quantityProdValue === 1
                                        ? 'opacity-0  pointer-events-none'
                                        : ''
                                }`}
                            />
                            <input
                                type="text"
                                className="w-2/3 outline-none text-center"
                                value={quantityProdValue || 1}
                                onChange={(e) =>
                                    setQuantityProdValue(e.target.value)
                                }
                            />
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={() =>
                                    setQuantityProdValue(quantityProdValue + 1)
                                }
                            />
                        </div>

                        <Button
                            handleClick={() =>
                                handleOrderDishes(
                                    itemProduct?._id,
                                    itemProduct?.promotion
                                )
                            }
                            title="ĐẶT MÓN"
                            bg="save"
                        />
                    </div>
                ) : (
                    <div
                        className="absolute z-20  bg-white bottom-2 
                                    right-5 left-5 "
                    >
                        <div className="">
                            <Button
                                handleClick={() =>
                                    handleOrderDishes(
                                        itemProduct?._id,
                                        itemProduct?.promotion
                                    )
                                }
                                title="ĐẶT MÓN"
                                bg="save"
                            />
                        </div>

                        <Link
                            to={`/menu/${itemProduct?.slug}`}
                            state={itemProduct}
                        >
                            <div
                                onClick={onClose}
                                className="mt-2 cursor-pointer font-cabin underline flex justify-end items-center"
                            >
                                Xem chi tiết mặt hàng{' '}
                                <img
                                    src={next_black}
                                    alt=""
                                    className="h-4 ml-1 translate-y-[1px]"
                                />
                            </div>
                        </Link>
                    </div>
                )}

                {!modal && (
                    <>
                        <div className="mt-4 flex items-center">
                            Chia sẻ:{' '}
                            <img src={fb} alt="" className="h-5 ml-5" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductDetailCardCommon;
