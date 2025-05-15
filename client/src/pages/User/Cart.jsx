import FormatVND from '@/components/common/FormatVND';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { vi } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import trash_red from '@/assets/icon/trash_red.svg';
import lau from '@/assets/icon/lau.svg';
import { useEffect, useState } from 'react';
import { deleteProductCart, getProductCart } from '@/redux/cartSlice';
import BlockSetQuantityProduct from '@/components/common/BlockSetQuantityProduct';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import arr_right_2_yellow from '@/assets/icon/arr_right_2_yellow.svg';
import arr_left_2_yellow from '@/assets/icon/arr_left_2_yellow.svg';
import calendar_black from '@/assets/icon/calendar_black.svg';
import SelectOptCommon from '@/components/common/SelectOptCommon';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import InputCommon from '@/components/common/InputCommon';
import { format } from 'date-fns';
import Button from '@/components/common/Button/Button';
import { addOrder } from '@/redux/orderSlice';
import ToastMsg from '@/components/common/ToastMsg';
import socket from '@/sockets/socket';

const listPromotion = [{ name: 'Đầy tiền, không cần ưu đãi' }];

const listTimeSetTable = [
    { name: '02:00 PM' },
    { name: '02:30 PM' },
    { name: '03:00 PM' },
    { name: '03:30 PM' },
    { name: '04:00 PM' },
    { name: '04:30 PM' },
    { name: '05:00 PM' },
    { name: '05:30 PM' },
    { name: '06:00 PM' },
    { name: '06:30 PM' },
    { name: '07:00 PM' },
    { name: '07:30 PM' },
    { name: '08:00 PM' },
    { name: '08:30 PM' },
    { name: '09:00 PM' },
    { name: '09:30 PM' },
    { name: '10:00 PM' },
    { name: '10:30 PM' },
];

const listAddressRestaurant = [{ name: 'Cở sở 1: Đại học mỏ đỉa chất' }];

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const listCategorySetTable = [
    { name: 'STT' },
    { name: 'Món ăn' },
    { name: 'Giá bán' },
    { name: 'Số lượng' },
    { name: 'Thành tiền' },
];

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state.user);
    const cartStore = useSelector((state) => state.cart);

    const [quantityProdValue, setQuantityProdValue] = useState({});

    const [startDate, setStartDate] = useState(new Date());

    const priceProduct = (quantity, price) => {
        const result = FormatVND(quantity * price);

        return result;
    };

    //call api get product cart
    useEffect(() => {
        userStore.user &&
            dispatch(getProductCart(userStore.user._id)).then((data) => {
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
    }, [dispatch, userStore.user?._id]);

    //validate info customer
    const formik = useFormik({
        initialValues: {
            nameCustomer: '',
            phoneCustomer: '',
            addressRestaurant: '',
            quantityCustomer: '',
            diningTime: '',
            promotion: '',
            note: '',
        },
        validationSchema: Yup.object({
            nameCustomer: Yup.string().required('Vui lòng nhập tên của bạn'),
            phoneCustomer: Yup.string().required('Vui lòng nhập SĐT của bạn'),
            addressRestaurant: Yup.string().required('Vui lòng chọn cơ sở'),
            quantityCustomer: Yup.number()
                .integer()
                .min(1, 'Số lượng phải lớn hơn 0')
                .required('Vui lòng chọn số lượng khách'),
            diningTime: Yup.string().required('Vui lòng khung giờ'),
        }),
        onSubmit: async (values) => {
            // handle submit form
            let listProducts;

            listProducts = cartStore?.carts?.products?.map(
                ({ _id, ...item }) => item
            );

            const formData = new FormData();
            formData.append('customer', userStore.user?._id);
            formData.append('nameCustomer', values.nameCustomer);
            formData.append('phoneCustomer', values.phoneCustomer);
            formData.append('dishes', JSON.stringify(listProducts));
            formData.append('addressRestaurant', values.addressRestaurant);
            formData.append('quantityCustomer', values.quantityCustomer);
            formData.append('diningTime', values.diningTime);
            formData.append('totalPrice', cartStore.carts?.total);
            formData.append('note', values.note);
            formData.append(
                'dateSetTable',
                startDate.toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    // hour: '2-digit',
                    // minute: '2-digit',
                    // second: '2-digit',
                })
            );

            dispatch(addOrder(formData)).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        msg: 'Đặt bàn thành công !!!',
                    });
                    navigate('/cart/checkout');
                }
            });
        },
    });

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
    };

    return (
        <div className="bg-white w-full mt-28 font-cabin pt-2 pb-20">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm 
                            max-xs:w-xs mx-auto max-xs:px-3"
            >
                {/* link route */}
                <div className="flex gap-2 items-center mb-5">
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs"
                    />
                    <span className="text-yellow-primary">Đặt bàn</span>
                </div>

                <div className="text-lg font-semibold mb-4">Đặt bàn</div>

                {/* category set table */}
                {cartStore?.carts?.products?.length > 0 && (
                    <div className="grid grid-cols-12 py-2 border-b border-gray-200">
                        {listCategorySetTable.map((item, index) => (
                            <div
                                key={index}
                                className={`${
                                    (index === 0 && 'col-span-1') ||
                                    (index === 1 && 'col-span-4 text-start') ||
                                    (index === 2 && 'col-span-2') ||
                                    (index === 3 && 'col-span-2') ||
                                    (index === 4 && 'col-span-2')
                                } text-center`}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}

                {/* list dishes */}
                <div className="mb-4">
                    {cartStore?.carts?.products?.length <= 0 ? (
                        <div className="px-3 flex flex-col items-center gap-3 py-20">
                            <img src={lau} alt="" className="h-40" />
                            <span className="text-lg text-gray-500">
                                Chưa có món ăn nào trong giỏ...
                            </span>
                        </div>
                    ) : (
                        cartStore.carts?.products?.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 items-center py-4 text-center border-b border-gray-200"
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
                                    <div className="flex justify-center items-center">
                                        <div className="w-24 ">
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
                                </div>
                                <div className="col-span-2">
                                    {priceProduct(item.quantity, item.price)}
                                </div>
                                <div
                                    onClick={() =>
                                        handleRemoveProduct(item._id)
                                    }
                                    className="flex justify-center cursor-pointer hover:scale-105 
                                            transition-transform ease-linear duration-100"
                                >
                                    <img src={trash_red} alt="" />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* block total price */}
                {cartStore?.carts?.products?.length > 0 && (
                    <div className="mb-10 flex justify-between">
                        <div></div>
                        <div className="w-4/12">
                            <div className="flex gap-2 mb-2 justify-between">
                                <span>Tạm tính: </span>
                                <span>
                                    {FormatVND(cartStore.carts?.total || 0)}
                                </span>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <span>Khuyến mãi: </span>
                                <span></span>
                            </div>
                            <div className="flex gap-2 justify-between font-bold">
                                <span>Tổng cộng(VAT): </span>
                                <span className="text-red-500  ">
                                    {FormatVND(cartStore.carts?.total || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <form
                    onSubmit={formik.handleSubmit}
                    className="border border-color-active rounded-lg grid grid-cols-3 p-4"
                >
                    <h3 className="text-center mb-10 text-xl font-medium text-yellow-primary col-span-3">
                        Thông tin đặt bàn
                    </h3>

                    {/* info user while set table */}
                    <div className="col-span-3 gap-x-10 gap-y-3 mb-5">
                        <div
                            className=" border-l-4 pl-2 border-yellow-500 leading-4 font-medium
                                            mb-3"
                        >
                            Thông tin của bạn
                        </div>
                        <div className="cols-span-1">
                            <InputCommon
                                id="nameCustomer"
                                label="Họ tên"
                                type="text"
                                placeholder="Tên của bạn"
                                formik={formik}
                            />
                        </div>
                        <div>
                            <InputCommon
                                id="phoneCustomer"
                                label="Số điện thoại"
                                type="text"
                                placeholder="Số điện thoại"
                                formik={formik}
                            />
                        </div>
                    </div>

                    {/* info restaurant while set table*/}
                    <div className="col-span-3 grid grid-cols-3 gap-x-10 gap-y-3">
                        <div
                            className="col-span-3 border-l-4 pl-2 border-yellow-500 leading-4
                                             font-medium  mb-3"
                        >
                            Thông tin đặt bàn
                        </div>
                        <div className="col-span-3">
                            <SelectOptCommon
                                id="addressRestaurant"
                                label="Lựa chọn cơ sở"
                                formik={formik}
                                list_opt={listAddressRestaurant}
                            />
                        </div>
                        <div>
                            <InputCommon
                                id="quantityCustomer"
                                label="Số lượng khách"
                                type="text"
                                placeholder="Số lượng khách"
                                formik={formik}
                            />
                        </div>

                        {/* date set table */}
                        <div className="">
                            <div className="mb-2">Ngày đặt</div>
                            <div className="w-full relative">
                                <div>
                                    <div>
                                        <div>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) =>
                                                    setStartDate(date)
                                                }
                                                className="custom-input-date "
                                                wrapperClassName="w-full block"
                                                dateFormat="dd 'tháng' M"
                                                locale={vi}
                                                renderCustomHeader={({
                                                    date,
                                                    decreaseMonth,
                                                    increaseMonth,
                                                    prevMonthButtonDisabled,
                                                    nextMonthButtonDisabled,
                                                }) => (
                                                    <div className="bg-white">
                                                        <div className="flex justify-between items-center px-4 rounded-t-lg">
                                                            <button
                                                                onClick={
                                                                    decreaseMonth
                                                                }
                                                                disabled={
                                                                    prevMonthButtonDisabled
                                                                }
                                                                className=" px-2"
                                                            >
                                                                <img
                                                                    src={
                                                                        arr_left_2_yellow
                                                                    }
                                                                    alt=""
                                                                />
                                                            </button>
                                                            <div className="font-cabin">
                                                                <span className="text-lg text-yellow-primary mr-7">
                                                                    {`Tháng ${format(
                                                                        date,
                                                                        'MM'
                                                                    )}`}
                                                                </span>
                                                                <span className="text-sm absolute translate-y-[2px] -translate-x-5 text-gray-500">
                                                                    {` ${format(
                                                                        date,
                                                                        'yyyy'
                                                                    )}`}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={
                                                                    increaseMonth
                                                                }
                                                                disabled={
                                                                    nextMonthButtonDisabled
                                                                }
                                                                className="text-gray-700 px-2"
                                                            >
                                                                <img
                                                                    src={
                                                                        arr_right_2_yellow
                                                                    }
                                                                    alt=""
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-7 text-center  py-1">
                                                            {weekDays.map(
                                                                (
                                                                    day,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-yellow-primary font-medium"
                                                                    >
                                                                        {day}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={calendar_black}
                                    alt=""
                                    className="absolute top-1/2 -translate-y-1/2 right-2"
                                />
                            </div>
                        </div>
                        <div>
                            <SelectOptCommon
                                label="Khung giờ"
                                id="diningTime"
                                formik={formik}
                                list_opt={listTimeSetTable}
                            />
                        </div>
                        <div className="col-span-3">
                            <SelectOptCommon
                                label="Chọn ưu đãi"
                                id="promotion"
                                formik={formik}
                                list_opt={listPromotion}
                            />
                        </div>
                        <div className="col-span-3">
                            <TextAreaCommon
                                id="note"
                                label="Lời nhắn với nhà hàng"
                                type="text"
                                placeholder="Lời nhắn với nhà hàng..."
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div
                        className="mt-5 col-start-2"
                        // onClick={() => navigate('/cart/checkout')}
                    >
                        <Button title="Đặt bàn" bg="save" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cart;
