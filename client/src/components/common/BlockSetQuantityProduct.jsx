/* eslint-disable react/prop-types */
import { getProductCart, updateQuantityProductCart } from '@/redux/cartSlice';
import { getOrderById, updateQuantityProductOrder } from '@/redux/orderSlice';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

function BlockSetQuantityProduct({ ...props }) {
    const {
        productItem,
        quantityProdValue,
        setQuantityProdValue,
        type,
        orderId,
    } = props;

    const dispatch = useDispatch();

    const userStore = useSelector((state) => state.user);
    const cartStore = useSelector((state) => state.cart);

    //deplay số lần call api
    const debounceUpdateQuantityProduct = debounce((productId, quantity) => {
        type === 'quantityProductOrder'
            ? dispatch(
                  updateQuantityProductOrder({
                      orderId,
                      productId: productItem.product._id,
                      quantity,
                  })
              ).then((data) => {
                  if (data.payload?.success) {
                      dispatch(getOrderById(orderId));
                  }
              })
            : dispatch(
                  updateQuantityProductCart({
                      cartId: cartStore.carts?._id,
                      productId,
                      quantity,
                  })
              ).then((data) => {
                  if (data.payload?.success) {
                      dispatch(getProductCart(userStore.user?._id));
                  }
              });
    }, 500);

    const handleIncreaseQuantityProduct = (item) => {
        setQuantityProdValue((prev) => {
            const newQuantity = prev[item.product._id] + 1;

            debounceUpdateQuantityProduct(item._id, newQuantity);

            return {
                ...prev,
                [item.product._id]: newQuantity,
            };
        });
    };

    const handleDecreaseQuantityProduct = (item) => {
        setQuantityProdValue((prev) => {
            const newQuantity = prev[item.product._id] - 1;

            debounceUpdateQuantityProduct(item._id, newQuantity);

            return {
                ...prev,
                [item.product._id]: newQuantity,
            };
        });
    };

    return (
        <>
            <FontAwesomeIcon
                icon={faMinus}
                onClick={() => handleDecreaseQuantityProduct(productItem)}
                className={`${
                    quantityProdValue[productItem.product._id] === 1
                        ? 'opacity-0  pointer-events-none'
                        : ''
                } cursor-pointer`}
            />
            <input
                type="number"
                className="w-2/3 outline-none text-center 
                            peer "
                value={quantityProdValue[productItem.product._id] || 1}
                onWheel={(e) => e.currentTarget.blur()} // ngăn cuộn chuột thay đổi trong input
                onChange={(e) => setQuantityProdValue(e.target.value)}
                disabled
            />
            <FontAwesomeIcon
                icon={faPlus}
                onClick={() => handleIncreaseQuantityProduct(productItem)}
                className=" cursor-pointer"
            />
        </>
    );
}

export default BlockSetQuantityProduct;
