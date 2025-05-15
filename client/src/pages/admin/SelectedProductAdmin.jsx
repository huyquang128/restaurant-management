import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import { getAllCategoriesDishes } from '@/redux/categoryDishesSlice';
import Button from '@/components/common/Button/Button';
import add_white from '@/assets/icon/add_white.svg';
import FormatVND from '@/components/common/FormatVND';
import { useNavigate, useParams } from 'react-router';
import {
    addProductToOrder,
    deleteProductOrder,
    getOrderById,
} from '@/redux/orderSlice';
import trash_red from '@/assets/icon/trash_red.svg';
import ButtonExit from '@/components/common/Button/ButtonExit';
import BlockSetQuantityProduct from '@/components/common/BlockSetQuantityProduct';
import ToastMsg from '@/components/common/ToastMsg';

function SelectedProductAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderId } = useParams();

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const orderStore = useSelector((state) => state.order);

    const [quantityProdValue, setQuantityProdValue] = useState({});

    const [currentMenuId, setCurrentMenuId] = useState(0);

    useEffect(() => {
        dispatch(getAllCategoriesDishes());
        dispatch(getOrderById(orderId)).then((data) => {
            if (data.payload?.success) {
                setQuantityProdValue((prev) => {
                    const updateValue = data.payload?.data.dishes.reduce(
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

    const handleRemoveDishes = (productId) => {
        dispatch(deleteProductOrder({ orderId, productId })).then((data) => {
            if (data.payload.success) {
                dispatch(getOrderById(orderId));
            }
        });
    };

    const handleAddDishToOrder = (productId, price) => {
        dispatch(addProductToOrder({ orderId, productId, price })).then(
            (data) => {
                if (data.payload.success) {
                    dispatch(getOrderById(orderId)).then((data) => {
                        if (data.payload.success) {
                            setQuantityProdValue((prev) => {
                                const updateValue =
                                    data.payload?.data.dishes.reduce(
                                        (acc, item) => {
                                            acc[item.product._id] =
                                                item.quantity;
                                            return acc;
                                        },
                                        {}
                                    );
                                return { ...prev, ...updateValue };
                            });
                        }
                    });
                }
            }
        );
    };

    const handleSave = () => {
        ToastMsg({
            msg: '📝 Đã lưu!',
        }),
            navigate(-1);
    };

    return (
        <div className="text-text-primary font-cabin">
            <h2 className="text-2xl font-medium mb-5 ">Đặt món ăn</h2>
            {/* list menu */}
            <div className="flex gap-2 mb-5 ">
                {categoryDishesStore.category_dishes?.map((item, index) => (
                    <div
                        className={`px-3 cursor-pointer py-2 ${
                            currentMenuId === index
                                ? 'bg-color-active text-yellow-primary'
                                : ''
                        }  rounded-lg transition-colors ease-linear duration-300`}
                        key={item._id}
                        onClick={() => setCurrentMenuId(index)}
                    >
                        {CapitalizeFirstLetter(item.name || '')}
                    </div>
                ))}
            </div>

            {/* list product in menu */}
            <div
                className="grid grid-cols-5 gap-5 max-lg:grid-cols-2 
                            max-sm:grid-cols-1"
            >
                {/*  */}
                <div
                    className="col-span-3 grid grid-cols-2 gap-5
                                max-lg:col-span-5"
                >
                    {categoryDishesStore.category_dishes &&
                        categoryDishesStore.category_dishes[
                            currentMenuId
                        ]?.products?.map((item, index) => (
                            <div
                                key={index}
                                className="flex rounded-lg overflow-hidden border border-border-primary
                                                hover:shadow-header-shadow transition-shadow ease-linear duration-300"
                            >
                                <img
                                    src={item.images && item.images[0].url}
                                    alt=""
                                    className="h-32 w-32 object-cover "
                                />
                                <div className="flex bg-bg-tertiary px-2 flex-col justify-between flex-1 py-1">
                                    <div className="">
                                        <div>
                                            {CapitalizeFirstLetter(
                                                item.name || ''
                                            )}
                                        </div>
                                        <div>{FormatVND(item.selling)}</div>
                                    </div>

                                    <div className="flex justify-end py-1">
                                        <div className="w-20">
                                            <Button
                                                title="Đặt"
                                                bg="add"
                                                icon={add_white}
                                                handleClick={() =>
                                                    handleAddDishToOrder(
                                                        item._id,
                                                        item.selling
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* info order current */}
                <div
                    className="border border-border-primary  rounded-md col-span-2 
                                max-lg:col-span-5 overflow:hidden"
                >
                    <div
                        className="grid grid-cols-8 p-3 bg-color-active 
                                    text-yellow-primary font-semibold"
                    >
                        <div className="col-span-3">Mặt hàng</div>
                        <div className="col-span-2 text-center">SL</div>
                        <div className="col-span-2 text-center">Thành tiền</div>
                    </div>

                    <div className="">
                        {orderStore.order?.dishes?.map((item) => (
                            <div
                                key={item._id}
                                className="grid grid-cols-8 p-4  
                                             items-center border-t border-border-primary"
                            >
                                <div
                                    className="col-span-3 flex flex-col
                                                "
                                >
                                    <span className="font-semibold">
                                        {CapitalizeFirstLetter(
                                            item.product.name || ''
                                        )}
                                    </span>
                                    <span className="text-gray-primary text-sm">
                                        {FormatVND(item.product.selling)}
                                    </span>
                                </div>
                                <div className="col-span-2 text-center ">
                                    <BlockSetQuantityProduct
                                        productItem={item}
                                        quantityProdValue={quantityProdValue}
                                        setQuantityProdValue={
                                            setQuantityProdValue
                                        }
                                        type="quantityProductOrder"
                                        orderId={orderId}
                                    />
                                </div>
                                <div className="col-span-2 text-center font-medium">
                                    {FormatVND(item.quantity * item.price)}
                                </div>
                                <div
                                    onClick={() =>
                                        handleRemoveDishes(item.product._id)
                                    }
                                    className="flex justify-center cursor-pointer hover:scale-110"
                                >
                                    <img
                                        src={trash_red}
                                        alt=""
                                        className="h-5"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* total price order  */}
                    <div
                        className="border-t border-border-primary p-4 flex justify-between
                                    font-semibold text-lg"
                    >
                        <span>Tổng tiền:</span>
                        <span className="text-yellow-primary">
                            {FormatVND(orderStore.order?.totalPrice)}
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-4">
                        <ButtonExit />
                        <div className="flex gap-3 ">
                            <div className="w-32">
                                <Button
                                    title="Lưu lại"
                                    bg="save"
                                    handleClick={handleSave}
                                />
                            </div>
                            {orderStore.order?.tableSeleted?.status ===
                                'in_use' && (
                                <Button title="Thanh toán" bg="delete" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectedProductAdmin;
