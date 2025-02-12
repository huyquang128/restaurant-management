import SearchCommon from '@/components/common/SearchCommon';
import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import import_white from '@/assets/icon/import_white.svg';
import export_white from '@/assets/icon/export_white.svg';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '@/redux/productSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVnd';
import PaginationCommon from '@/components/common/PaginationCommon';
import { RotatingLines } from 'react-loader-spinner';
import BlockRemoveCommon from '@/components/common/BlockRemoveCommon';
import avatar_default_dishes from '@/assets/icon/avatar_default_dishes.svg';

const categories = [
    { name: 'Mặt hàng' },
    { name: 'Danh mục' },
    { name: 'Giá thành' },
    { name: 'Đơn vị tính' },
    { name: 'Ghi chú' },
];

function ProductsAdmin() {
    const productStore = useSelector((state) => state.product);

    const [arrActive, setArrActive] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isAnimationCloseBlockRemove, setIsAnimationCloseBlockRemove] =
        useState(false);
    const [isShowBlockRemove, setIsShowBlockRemove] = useState(false);

    useEffect(() => {
        setIsCheckedAll(
            arrActive?.length === productStore.products?.data.length
        );

        if (arrActive?.length > 0) {
            setIsShowBlockRemove(true);
        } else {
            hiddenBlockRemove();
        }
    }, [arrActive]);

    //handle Events
    const hiddenBlockRemove = () => {
        setIsAnimationCloseBlockRemove(true);
        setTimeout(() => {
            setIsAnimationCloseBlockRemove(false);
            setIsShowBlockRemove(false);
        }, 500);
    };

    const handleActiveProduct = (productId) => {
        setArrActive((prevProductId) =>
            arrActive.includes(productId)
                ? arrActive.filter(
                      (activeProductId) => activeProductId !== productId
                  )
                : [...prevProductId, productId]
        );
    };

    const handleCheckedAll = () => {
        setIsCheckedAll(!isCheckedAll);
        setArrActive(
            isCheckedAll
                ? []
                : productStore.products?.data.map((product) => product._id)
        );
    };

    return (
        <div className="font-cabin ">
            <div className="text-xl font-medium mb-5 text-text-primary">
                MẶT HÀNG
            </div>
            <div className="flex justify-between mb-5 flex-wrap">
                <Link to="/admin/product-items/add-product">
                    <Button
                        icon={add_white}
                        title="Thêm mặt hàng"
                        bg="black"
                        text_color="white"
                        bg_border="black"
                    />
                </Link>
                <div className="flex gap-2 max-sm:mt-10">
                    <Button
                        icon={import_white}
                        title="Import"
                        bg="green"
                        text_color="white"
                        bg_border="green"
                    />
                    <Button
                        icon={export_white}
                        title="Export"
                        bg="green"
                        text_color="white"
                        bg_border="green"
                    />
                </div>
            </div>

            {/* search product */}
            <div className="mb-5 flex justify-between text-text-primary items-center max-sm:flex-col-reverse max-sm:items-start">
                <div className="max-sm:mt-10">
                    Hiển thị ({' '}
                    {productStore.products
                        ? productStore.products?.data?.length +
                          ' / ' +
                          productStore.products?.totalProducts
                        : 0}
                    ) mặt hàng
                </div>
                <SearchCommon />
            </div>

            {/* act remove product selected */}
            {isShowBlockRemove ? (
                <BlockRemoveCommon
                    arr={arrActive}
                    isShowBlock={isShowBlockRemove}
                    isAnimationHide={isAnimationCloseBlockRemove}
                    handleHideBlock={hiddenBlockRemove}
                    funcCallApiDelete={deleteProduct}
                    funcCallApiGet={getAllProducts}
                />
            ) : (
                <div className="h-12 w-full mb-5 text-text-primary">
                    ( Toàn bộ sản phẩm)
                </div>
            )}

            <div>
                {/* list category */}
                <div className="grid grid-cols-12 items-center">
                    <input
                        type="checkbox"
                        name=""
                        onChange={handleCheckedAll}
                        checked={isCheckedAll}
                        id=""
                        className="h-4 cursor-pointer"
                    />
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className={`text-text-primary ${
                                (index === 0 && 'col-span-3') ||
                                (index === 1 && 'col-span-2 text-center') ||
                                (index === 2 && 'col-span-2 text-center') ||
                                (index === 3 && 'col-span-2 text-center') ||
                                (index === 4 && 'col-span-2 text-center')
                            }`}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* list product item */}
                {productStore.isLoading ? (
                    <div className="flex justify-center py-10 ">
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                ) : (
                    <div
                        className={`${
                            productStore.products?.data.length < 8
                                ? 'mb-40'
                                : ''
                        }`}
                    >
                        {productStore.products?.data?.map((item, index) => (
                            <div
                                onClick={() => handleActiveProduct(item._id)}
                                key={index}
                                className={`grid grid-cols-12 bg-bg-tertiary text-text-primary my-3 py-2
                                        rounded-lg items-center cursor-pointer hover:bg-color-active 
                                        ${
                                            arrActive.includes(item._id)
                                                ? 'bg-color-active'
                                                : ''
                                        }`}
                            >
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    checked={arrActive.includes(item._id)}
                                    className="h-4 cursor-pointer"
                                    readOnly
                                />

                                <div className="col-span-3 hover:text-yellow-primary">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={
                                                item.images.length > 0
                                                    ? item.images[0]?.url
                                                    : avatar_default_dishes
                                            }
                                            alt=""
                                            className={`h-14 w-12 rounded-lg ${
                                                item.images.length > 0
                                                    ? 'object-cover'
                                                    : 'p-1 -translate-y-1.5'
                                            }`}
                                        />
                                        <Link
                                            to={`/admin/product-items/${item.slug}`}
                                        >
                                            <span className="">
                                                {CapitalizeFirstLetter(
                                                    item.name
                                                )}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center">
                                    {CapitalizeFirstLetter(
                                        item.categoryDishes?.name
                                    )}
                                </div>
                                <div className="col-span-2 text-center">
                                    {FormatVND(item.selling)}
                                </div>
                                <div className="col-span-2 text-center">
                                    {CapitalizeFirstLetter(item.unit?.name)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* pagination */}
            <div className="mt-10">
                <PaginationCommon
                    totalProducts={productStore.products?.totalProducts}
                    getPageFunc={getAllProducts}
                    pageSize={productStore.products?.pageSize}
                    setIsCheckedAll={setIsCheckedAll}
                    setArrActive={setArrActive}
                />
            </div>
        </div>
    );
}

export default ProductsAdmin;
