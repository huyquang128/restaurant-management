/* eslint-disable react/prop-types */
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FormatVND from '../common/FormatVND';
import close_black_2 from '@/assets/icon/close_black_2.svg';
import lau from '@/assets/icon/lau.svg';
import CapitalizeFirstLetter from '../common/CapitalizeFirstLetter';
import Button from '../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCart, getProductCart } from '@/redux/cartSlice';
import { Link, useNavigate } from 'react-router';
import ColorRingAnimation from '../common/spinnerAnimation/ColorRingAnimation';
import BlockSetQuantityProduct from '../common/BlockSetQuantityProduct';

function CartModal({ ...props }) {
    const { isCloseModalAnimation, closeModal } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state.user);
    const cartStore = useSelector((state) => state.cart);

    const [quantityProdValue, setQuantityProdValue] = useState({});
    const [idProductCartValue, setIdProductCartValue] = useState();

    useEffect(() => {
        dispatch(getProductCart(userStore.user?._id)).then((data) => {
            if (data.payload?.success) {
                setQuantityProdValue((prev) => {
                    const updateValue = data.payload?.data.products.reduce(
                        (acc, item) => {
                            acc[item.product._id] = item.quantity;
                            return acc;
                        },
                        {}
                    );
                    return { ...prev, ...updateValue };
                });
            }
        });
    }, [dispatch]);

    const handleRemoveProduct = (productId) => {
        dispatch(
            deleteProductCart({
                userId: userStore.user?._id,
                productId,
            })
        ).then((data) => {
            if (data.payload?.success) {
                dispatch(getProductCart(userStore.user?._id));
            }
        });
        setIdProductCartValue(productId);
    };

    const handleToCart = () => {
        closeModal(), navigate('/cart');
    };

    return (
        <div className="fixed font-cabin top-0 z-50 left-0 bottom-0 right-0 flex justify-end bg-black bg-opacity-30">
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={
                    cartStore.isOpenCartModal && !isCloseModalAnimation
                        ? { opacity: 1, x: '0' }
                        : { opacity: 0, x: '100%' }
                }
                transition={{ duration: 0.3 }}
                className=" w-[480px] h-screen flex gap-1 "
            >
                <FontAwesomeIcon
                    onClick={closeModal}
                    icon={faXmark}
                    className="h-30 w-30 px-3 py-2.5 bg-gray-200 text-black mt-2 shadow-2xl 
                        rounded-full cursor-pointer "
                />
                <div className="bg-white flex-1 shadow-header-shadow relative">
                    <div className=" px-3 py-3 items-center">
                        <div className="font-semibold text-2xl">Giỏ hàng </div>
                    </div>

                    {/* show product in cart selected*/}
                    <div className=" overflow-y-scroll no-scrollbar h-full">
                        {cartStore?.carts?.products?.length <= 0 ? (
                            <div>
                                <div className="px-3 flex flex-col items-center gap-3 mt-20">
                                    <img src={lau} alt="" className="h-40" />
                                    <span className="text-lg text-gray-500">
                                        Chưa có món ăn nào trong giỏ...
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5 mt-10 px-10 ">
                                    <span
                                        onClick={() => (
                                            closeModal(), navigate('/')
                                        )}
                                        className="text-blue-500 underline hover:text-blue-400 
                                                        transition-colors ease-linear duration-300
                                                        cursor-pointer"
                                    >
                                        Trở về trang chủ
                                    </span>
                                    <Link>
                                        <span
                                            className="text-blue-500 underline hover:text-blue-400 
                                                            transition-colors ease-linear duration-300
                                                             cursor-pointer"
                                        >
                                            Khuyến mãi dành cho bạn
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            cartStore?.carts?.products?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex border-t border-gray-200 py-6 gap-5 px-3 "
                                >
                                    <img
                                        src={
                                            item.product.images &&
                                            item.product.images[0].url
                                        }
                                        alt=""
                                        className="h-24 w-20 object-cover"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div className="">
                                            {CapitalizeFirstLetter(
                                                item.product.name || 'đồ uống'
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="font-bold tex-ld">
                                                {FormatVND(
                                                    item.product.promotion
                                                )}
                                            </div>
                                            <div className="text-gray-500  line-through decoration-1">
                                                {FormatVND(
                                                    item.product.selling
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="border px-2 py-1 w-1/3 flex justify-between 
                                                    items-center cursor-pointer max-xs:w-2/4"
                                        >
                                            {/* action increase/decrease quanity product */}
                                            <BlockSetQuantityProduct
                                                productItem={item}
                                                quantityProdValue={
                                                    quantityProdValue
                                                }
                                                setQuantityProdValue={
                                                    setQuantityProdValue
                                                }
                                            />
                                        </div>
                                    </div>

                                    {cartStore.isLoadingDelProduct &&
                                    idProductCartValue === item._id ? (
                                        <ColorRingAnimation />
                                    ) : (
                                        <img
                                            src={close_black_2}
                                            alt=""
                                            className="h-8 cursor-pointer"
                                            onClick={() =>
                                                handleRemoveProduct(item._id)
                                            }
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/*  */}
                    <div
                        className="border-t border-gray-200 py-5 px-3 absolute bottom-0 right-0 left-0
                                    bg-white"
                    >
                        {cartStore?.carts?.products?.length > 0 && (
                            <>
                                <div className="flex justify-between mb-3 items-center">
                                    <div>TỔNG TIỀN:</div>
                                    <div className="text-yellow-primary font-bold text-lg">
                                        {cartStore.isLoading ? (
                                            <ColorRingAnimation />
                                        ) : (
                                            FormatVND(
                                                cartStore?.carts?.total || 0
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3 text-sm">
                                    <Button
                                        title="THANH TOÁN"
                                        bg="save"
                                        handleClick={handleToCart}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default CartModal;
