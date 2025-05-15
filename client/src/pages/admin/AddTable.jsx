/* eslint-disable no-unused-vars */
import arr_right_white from '@/assets/icon/arr_right_white.svg';
import arr_right_black from '@/assets/icon/arr_right_black.svg';
import lau from '@/assets/icon/lau.svg';
import add_white from '@/assets/icon/add_white.svg';
import { Link, useNavigate, useParams } from 'react-router';
import InputCommon from '@/components/common/InputCommon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategoryDishes,
    deleteProductTemp,
    getCategoryDishesSlug,
    resetForm,
    updateCategoryDishes,
} from '@/redux/categoryDishesSlice';
import ToastMsg from '@/components/common/ToastMsg';
import trash_red from '@/assets/icon/trash_red.svg';
import back_white from '@/assets/icon/back_white.svg';
import save_white from '@/assets/icon/save_white.svg';
import AddProductMenuAdminModal from '@/components/modals/AddProductMenuAdminModal';
import {
    deleteProductSelectedInCategory,
    getAllProducts,
    searchProductNameNoPage,
    setProductSelectedInCategory,
} from '@/redux/productSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVND';
import ConfirmRemoveModal from '@/components/modals/ConfirmRemoveModal';

import { setProductSelectedCategory } from '@/redux/categoryDishesSlice';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import SelectOptCommon from '@/components/common/SelectOptCommon';
import { listTimeSetTable } from '@/components/common/listTimeSetTable';

const categories = [
    { name: 'Mặt hàng' },
    { name: 'Giá bán' },
    { name: 'Đơn vị' },
];

function AddTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [arrProductIdSelected, setArrProductIdSelected] = useState([]);

    const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
    const [
        isOpenModalConfirmRemoveProduct,
        setIsOpenModalConfirmRemoveProduct,
    ] = useState(false);

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const authStore = useSelector((state) => state.auth);
    const productStore = useSelector((state) => state.product);
    const orderStore = useSelector((state) => state.order);

    const [productIdSelected, setProductIdSelected] = useState(null);
    const [productIdOldRemoveUpload, setProductIdOldRemoveUpload] = useState(
        []
    );

    useEffect(() => {
        dispatch(getAllProducts());
        if (slug) {
            dispatch(getCategoryDishesSlug(slug));
        } else {
            dispatch(resetForm());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!slug) {
            setArrProductIdSelected([]);
            dispatch(setProductSelectedInCategory([]));
        }
    }, []);

    useEffect(() => {
        if (slug)
            setProductIdOldRemoveUpload(
                categoryDishesStore.arrProductOriginal.filter(
                    (item) =>
                        !categoryDishesStore.category_dishes?.products?.some(
                            (a) => a._id === item._id
                        )
                )
            );
    }, [categoryDishesStore.category_dishes?.products]);

    const formik = useFormik({
        initialValues: {
            ...orderStore.formValueOrder,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nameCustomer: Yup.string().required(
                'Tên khách hàng không được để trống'
            ),
            phoneCustomer: Yup.number().required('SĐT không được để trống'),
            addressRestaurant: Yup.string().required(
                'Địa chỉ nhà hàng không được để trống'
            ),
            quantityCustomer: Yup.string().required('Số lượng khách hàng'),
            diningTime: Yup.string().required(
                'Thời gian dùng bữa không được để trống'
            ),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            const arrProductId = arrProductIdSelected.map((item) => item._id);

            if (slug) {
                const result = productIdOldRemoveUpload.map((item) => item._id);
                formData.append('productIdOld', JSON.stringify(result));
                formData.append('productIdNew', JSON.stringify(arrProductId));
            } else {
                formData.append('ids', JSON.stringify(arrProductId));
            }

            dispatch(
                slug
                    ? updateCategoryDishes({
                          formData,
                          categoryId: categoryDishesStore.category_dishes?._id,
                      })
                    : addCategoryDishes(formData)
            ).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        status: 'success',
                        msg: data.payload.message,
                    });

                    slug
                        ? (dispatch(
                              getCategoryDishesSlug(data.payload.data.slug)
                          ),
                          navigate(`/admin/menus/${data.payload.data.slug}`))
                        : dispatch(resetForm());
                }
            });
        },
    });

    const renderProductCategoryDishes = (category, products) => {
        return (
            <div className="">
                <div className="col-span-2 border-b border-border-primary py-2 grid grid-cols-12 text-text-primary mx-4">
                    {category.map((item, index) => (
                        <div
                            className={`${
                                index === 2
                                    ? 'col-span-2 text-center'
                                    : 'col-span-4'
                            }`}
                            key={index}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="col-span-2 overflow-y-scroll h-72 ">
                    {products?.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 items-center text-text-primary py-4 border-b
                             mx-4 cursor-pointer border-border-primary"
                        >
                            <div className="col-span-4 flex items-center gap-2">
                                <img
                                    src={item.images[0].url}
                                    alt=""
                                    className="h-20 w-16 rounded-lg object-cover"
                                />
                                <div className="">
                                    {CapitalizeFirstLetter(item.name)}
                                </div>
                            </div>
                            <div className="col-span-4">
                                {FormatVND(item.promotion || item.selling)}
                            </div>
                            <div className="col-span-2 text-center">
                                {item.unit?.name || ''}
                            </div>
                            <div
                                onClick={() => (
                                    setIsOpenModalConfirmRemoveProduct(true),
                                    setProductIdSelected(item._id)
                                )}
                                className="col-span-2 flex justify-end cursor-pointer"
                            >
                                <img src={trash_red} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="font-cabin">
            {/* link */}
            <div className="flex justify-between">
                <div className="flex items-center mb-5 text-text-primary">
                    <Link to="/admin/menus">
                        <span className="cursor-pointer">Đặt bàn</span>
                    </Link>
                    <img
                        src={
                            authStore.theme === 'light'
                                ? arr_right_black
                                : arr_right_white
                        }
                        alt=""
                        className="h-5"
                    />
                    {slug ? (
                        <span className="cursor-pointer text-yellow-primary">
                            {categoryDishesStore.category_dishes?.name}
                        </span>
                    ) : (
                        <span className="cursor-pointer text-yellow-primary">
                            Thêm bàn
                        </span>
                    )}
                </div>
                <div>
                    <Link to={'/admin/set-table/add-table/select-table'}>
                        <Button
                            bg="add"
                            title="Chọn bàn"
                            type="button"
                            icon={add_white}
                        />
                    </Link>
                </div>
            </div>

            {/* content product */}
            <div className="flex gap-5 items-start max-md:flex-wrap ">
                {/* block inner imgs */}

                {/* form value product */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-2 w-full gap-5 max-md:w-full max-sm"
                >
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="nameCustomer"
                            label="Họ và tên khách hàng"
                            type="text"
                            placeholder="Họ và tên khách hàng"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="tableSelected"
                            label="Chọn bàn"
                            type="text"
                            placeholder="Chọn bàn"
                            formik={formik}
                            disabled
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="phoneCustomer"
                            label="Số điện thoại"
                            type="text"
                            placeholder="Số điện thoại"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="addressRestaurant"
                            label="Địa chỉ nhà hàng"
                            type="text"
                            placeholder="Địa chỉ nhà hàng"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="quantityCustomer"
                            label="Số lượng khách"
                            type="text"
                            placeholder="Số lượng khách"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="diningTime"
                            label="Ngày nhận bàn"
                            type="text"
                            placeholder="Ngày nhận bàn"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <SelectOptCommon
                            id="name"
                            label="Giờ nhận bàn"
                            type="text"
                            placeholder="Giờ nhận bàn"
                            formik={formik}
                            list_opt={listTimeSetTable}
                        />
                    </div>

                    <div className="max-md:col-span-2">
                        <TextAreaCommon
                            id="note"
                            label="Ghi chú"
                            type="text"
                            placeholder="Ghi chú"
                            formik={formik}
                        ></TextAreaCommon>
                    </div>
                    <div
                        onClick={() => setIsOpenModalAddProduct(true)}
                        className="w-44  col-span-2"
                    >
                        <Button
                            bg="add"
                            title="Thêm mặt hàng"
                            type="button"
                            icon={add_white}
                        />
                    </div>
                    {/* list dishes */}
                    <div className="col-span-2 bg-bg-tertiary py-2 rounded-lg">
                        {categoryDishesStore.category_dishes?.products?.length >
                            0 ||
                        productStore.productSelectedInCategoryAdd.length > 0 ? (
                            renderProductCategoryDishes(
                                ...(slug
                                    ? [
                                          categories,
                                          categoryDishesStore.category_dishes
                                              ?.products,
                                      ]
                                    : [
                                          categories,
                                          productStore.productSelectedInCategoryAdd,
                                      ])
                            )
                        ) : (
                            <div className="py-10 col-span-2 flex flex-col items-center gap-4">
                                <img src={lau} alt="" className="h-32" />
                                <div className="text-yellow-primary">
                                    Hãy thêm món ăn và thực đơn của bạn.
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                        <div className="cursor-pointer w-28">
                            {slug ? (
                                <div className="w-28">
                                    <Button
                                        title="Xóa"
                                        bg="delete"
                                        type="button"
                                        text_color="white"
                                        color_ring={productStore.isLoading}
                                    />
                                </div>
                            ) : (
                                <div
                                    onClick={() => navigate(-1)}
                                    className="cursor-pointer w-28"
                                >
                                    <Button
                                        title="Quay lại"
                                        bg="exit"
                                        type="button"
                                        text_color="white"
                                        icon={back_white}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-32">
                            <Button
                                title={slug ? 'cập nhật' : 'Lưu'}
                                bg="save"
                                type="submit"
                                icon={save_white}
                                color_ring={productStore.isLoading}
                            />
                        </div>
                    </div>
                </form>

                {/* modal */}
                {isOpenModalAddProduct && (
                    <AddProductMenuAdminModal
                        isOpenModal={isOpenModalAddProduct}
                        setIsOpenModal={setIsOpenModalAddProduct}
                        arrProductIdSelected={arrProductIdSelected}
                        setArrProductIdSelected={setArrProductIdSelected}
                        setProductSelected={setProductSelectedCategory}
                        searchProductNameNoPage={searchProductNameNoPage}
                        setProductSelectedIn={setProductSelectedInCategory}
                    />
                )}

                {isOpenModalConfirmRemoveProduct && (
                    <ConfirmRemoveModal
                        isOpenModal={isOpenModalConfirmRemoveProduct}
                        setIsOpenModal={setIsOpenModalConfirmRemoveProduct}
                        title="Mặt hàng"
                        type="del-product-category"
                        funcCallApiDelete={
                            slug
                                ? deleteProductTemp
                                : deleteProductSelectedInCategory
                        }
                        dataRemove={productIdSelected}
                    />
                )}
            </div>
        </div>
    );
}

export default AddTable;
