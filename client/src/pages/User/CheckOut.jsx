import { getProductCart } from '@/redux/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '@/components/common/FormatVND';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/common/Button/Button';
import { getOrderByUser, getUrlPaymentVNPay } from '@/redux/orderSlice';

const listCategorySetTable = [
    { name: 'STT' },
    { name: 'Món ăn' },
    { name: 'Giá bán' },
    { name: 'Số lượng' },
    { name: 'Thành tiền' },
];

const methodPayment = [
    {
        name: 'method_payment',
        title: 'Thanh toán qua ví VNPAY',
        value: 'banking',
    },
];

const formPayment = [
    { name: 'form_payment', title: 'Thanh toán toàn bộ', value: 'all' },
    { name: 'form_payment', title: 'Đặt cọc một phần', value: 'partial' },
];

function CheckOut() {
    const dispatch = useDispatch();

    const userStore = useSelector((state) => state.user);
    const cartStore = useSelector((state) => state.cart);
    const orderStore = useSelector((state) => state.order);

    const [methodPaymentValue, setMethodPaymentValue] = useState('banking');

    const [formPaymentValue, setFormPaymentValue] = useState('partial');

    useEffect(() => {
        userStore.user &&
            (dispatch(getProductCart(userStore.user._id)),
            dispatch(getOrderByUser(userStore.user._id)));
    }, [dispatch, userStore.user?._id]);

    const priceProduct = (quantity, price) => {
        const result = FormatVND(quantity * price);

        return result;
    };

    const handlePayment = () => {
        dispatch(
            getUrlPaymentVNPay({
                orderId: orderStore.order?._id,
                methodStatus: formPaymentValue,
            })
        ).then((data) => {
            if (data.payload.success) {
                orderStore.urlPaymentVNPay &&
                    window.open(orderStore.urlPaymentVNPay, '_self');
            }
        });
    };

    return (
        <div className="bg-white w-full mt-28 font-cabin pt-2 pb-20">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm 
                        max-xs:w-xs mx-auto max-xs:px-3"
            >
                <div className="flex gap-2 items-center mb-5">
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs"
                    />
                    <span className="text-yellow-primary ">Check out</span>
                </div>

                <h2 className="text-center text-lg font-semibold mb-4">
                    Thanh toán trước cho đơn đặt bàn
                </h2>

                {/* block inner info order set table */}

                <div className="grid grid-cols-3 gap-5">
                    {/*  */}
                    <div
                        className="border border-color-active rounded-md
                        col-span-2"
                    >
                        <h3 className="bg-color-active p-3 text-yellow-primary">
                            Thông tin đơn đặt bàn
                        </h3>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Tên người đặt bàn</span>
                            <span>:</span>
                            <span>{orderStore.order?.nameCustomer}</span>
                        </div>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Số điện thoại</span>
                            <span>:</span>
                            <span>{orderStore.order?.phoneCustomer}</span>
                        </div>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Số người</span>
                            <span>:</span>
                            <span>{orderStore.order?.quantityCustomer}</span>
                        </div>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Thời gian dùng bữa</span>
                            <span>:</span>
                            <span>{orderStore.order?.diningTime}</span>
                        </div>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Đặt bàn ngày</span>
                            <span>:</span>
                            <span>{orderStore.order?.dateSetTable}</span>
                        </div>

                        <div className="flex items-center gap-2 p-3">
                            <span className="w-48">Cở sở nhà hàng</span>
                            <span>:</span>
                            <span>{orderStore.order?.addressRestaurant}</span>
                        </div>
                    </div>

                    {/* payment */}
                    <div className="border border-color-active rounded-md h-[450px]">
                        <h3 className="bg-color-active p-3 text-yellow-primary text-center">
                            Thanh toán
                        </h3>
                        {cartStore?.carts?.products?.length > 0 && (
                            <div className="p-3">
                                <div className="flex gap-2 mb-2 justify-between">
                                    <span>Tạm tính: </span>
                                    <span>
                                        {FormatVND(cartStore.carts?.total || 0)}
                                    </span>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <span>Khuyến mãi: </span>
                                    <span></span>
                                </div>
                                <div className="flex gap-2 border-t pt-3 justify-between font-bold">
                                    <span>Tổng cộng(VAT): </span>
                                    <span className="text-red-500  ">
                                        {FormatVND(cartStore.carts?.total || 0)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* method payment */}
                        <div className="border-t pb-3">
                            <div className=" p-3">
                                <div className="font-medium">
                                    Hình thức thanh toán
                                </div>
                                <div>
                                    {formPayment.map((item, index) => (
                                        <label
                                            key={index}
                                            htmlFor={item.value}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                id={item.value}
                                                name={item.name}
                                                value={item.value}
                                                checked={
                                                    item.value ===
                                                    formPaymentValue
                                                }
                                                onChange={() =>
                                                    setFormPaymentValue(
                                                        item.value
                                                    )
                                                }
                                            />
                                            <span>{item.title}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="p-3 border-t">
                                <div className="font-medium mb-3">
                                    Phương thức thanh toán
                                </div>
                                <div>
                                    {methodPayment.map((item, index) => (
                                        <label
                                            key={index}
                                            htmlFor={item.value}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                id={item.value}
                                                name={item.name}
                                                value={item.value}
                                                checked={
                                                    item.value ===
                                                    methodPaymentValue
                                                }
                                                onChange={() =>
                                                    setMethodPaymentValue(
                                                        item.value
                                                    )
                                                }
                                            />
                                            <span>{item.title}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="px-3 mt-3">
                                <Button
                                    bg="save"
                                    title="Thanh toán"
                                    handleClick={handlePayment}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div
                        className="border border-color-active rounded-md
                        col-span-2"
                    >
                        <h3 className="bg-color-active p-3 text-yellow-primary">
                            Thực đơn đặt trước
                        </h3>

                        {/* category set table */}
                        {cartStore?.carts?.products?.length > 0 && (
                            <div className="grid grid-cols-12 py-2">
                                {listCategorySetTable.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${
                                            (index === 0 && 'col-span-1') ||
                                            (index === 1 &&
                                                'col-span-4 text-start') ||
                                            (index === 2 && 'col-span-2') ||
                                            (index === 3 && 'col-span-2') ||
                                            (index === 4 && 'col-span-3')
                                        } text-center`}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* list dishes */}
                        <div className="mb-4">
                            {cartStore.carts?.products?.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 items-center py-4 text-center
                                                        border-t border-color-active"
                                >
                                    <div>{index + 1}</div>
                                    <div className="flex items-center col-span-4">
                                        <img
                                            src={
                                                item.product.images &&
                                                item.product.images[0].url
                                            }
                                            alt=""
                                            className="h-12"
                                        />
                                        <span>{item.product.name}</span>
                                    </div>
                                    <div className="col-span-2">
                                        {FormatVND(item.price)}
                                    </div>
                                    <div className="col-span-2">
                                        {item.quantity}
                                    </div>
                                    <div className="col-span-3">
                                        {priceProduct(
                                            item.quantity,
                                            item.price
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
