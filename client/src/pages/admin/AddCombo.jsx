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
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ToastMsg from '@/components/common/ToastMsg';
import trash_red from '@/assets/icon/trash_red.svg';
import back_white from '@/assets/icon/back_white.svg';
import save_white from '@/assets/icon/save_white.svg';
import AddProductMenuAdminModal from '@/components/modals/AddProductMenuAdminModal';
import {
    getAllProducts,
    searchProductNameNoPage,
    // deleteProductSelectedInCombo,
    // setProductSelectedInCombo,
} from '@/redux/productSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVND';
import ConfirmRemoveModal from '@/components/modals/ConfirmRemoveModal';
import {
    addCombo,
    deleteProductSelectedInCombo,
    deleteProductTemp,
    getComboSlug,
    resetForm,
    setProductSelectedCombo,
    setProductSelectedInCombo,
    updateCombo,
} from '@/redux/comboSlice';
import FormatNumberToVND from '@/components/common/FormatNumberToVND';

const categories = [
    { name: 'Mặt hàng' },
    { name: 'Giá bán' },
    { name: 'Đơn vị' },
];

function AddCombo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [arrProductIdSelected, setArrProductIdSelected] = useState([]);

    const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
    const [
        isOpenModalConfirmRemoveProduct,
        setIsOpenModalConfirmRemoveProduct,
    ] = useState(false);

    const comboStore = useSelector((state) => state.combo);
    const authStore = useSelector((state) => state.auth);
    const productStore = useSelector((state) => state.product);
    const [productIdSelected, setProductIdSelected] = useState(null);
    const [productIdOldRemoveUpload, setProductIdOldRemoveUpload] = useState(
        []
    );

    console.log(productStore.productSelectedInComboAdd);

    useEffect(() => {
        dispatch(getAllProducts());
        if (slug) {
            dispatch(getComboSlug(slug));
        } else {
            dispatch(resetForm());
        }
    }, [dispatch]);

    const totalPriceOriginal = useMemo(() => {
        return comboStore.productSelectedInComboAdd.reduce(
            (acc, item) => acc + (item.promotion || item.selling),
            0
        );
    }, [comboStore.productSelectedInComboAdd]);

    useEffect(() => {
        if (!slug) {
            setArrProductIdSelected([]);
            dispatch(setProductSelectedInCombo([]));
        }
    }, [dispatch]);

    useEffect(() => {
        if (slug)
            setProductIdOldRemoveUpload(
                comboStore.arrProductOriginal.filter(
                    (item) =>
                        !comboStore.combo?.products?.some(
                            (a) => a._id === item._id
                        )
                )
            );
    }, [comboStore.combo?.products]);

    const formik = useFormik({
        initialValues: {
            ...comboStore.formComboValue,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Tên thực đơn không được để trống'),
            comboPrice: Yup.number().required('Giá combo không được để trống'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('comboPrice', values.comboPrice);
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
                    ? updateCombo({
                          formData,
                          comboId: comboStore.combo?._id,
                      })
                    : addCombo(formData)
            ).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        status: 'success',
                        msg: data.payload.message,
                    });

                    slug
                        ? (dispatch(getComboSlug(data.payload.data.slug)),
                          navigate(`/admin/combo/${data.payload.data.slug}`))
                        : dispatch(resetForm());
                }
            });
        },
    });

    const renderProductCombo = (category, products) => {
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
                                {item.unit.name}
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
            <div className="flex items-center mb-5 text-text-primary">
                <Link to="/admin/menus">
                    <span className="cursor-pointer">Combo</span>
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
                        {comboStore.combo?.name}
                    </span>
                ) : (
                    <span className="cursor-pointer text-yellow-primary">
                        Thêm combo
                    </span>
                )}
            </div>

            {/* content product */}
            <div className="flex gap-5 items-start max-md:flex-wrap ">
                {/* block inner imgs */}

                {/* form value product */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-2 w-full gap-5 max-md:w-full max-sm"
                >
                    <div className="max-sm:col-span-2 ">
                        <InputCommon
                            id="name"
                            label="Tên combo"
                            type="text"
                            placeholder="tên combo"
                            formik={formik}
                        />
                    </div>

                    <div className="max-sm:col-span-2 row-start-2 col-span-1">
                        <InputCommon
                            id="comboPrice"
                            label="Giá combo"
                            type="text"
                            placeholder="Giá combo"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2 row-start-2 col-span-1">
                        <div className="mb-2 text-text-primary">Giá gốc</div>
                        <input
                            className={`w-full px-4 py-3 bg-bg-tertiary 
                                         rounded-lg ease-linear duration-200 
                                        relative text-yellow-primary`}
                            value={FormatNumberToVND(totalPriceOriginal)}
                            disabled
                        />
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

                    {/* list dishes selected*/}
                    <div className="col-span-2 bg-bg-tertiary py-2 rounded-lg">
                        {comboStore.combo?.products?.length > 0 ||
                        productStore.productSelectedInComboAdd.length > 0 ? (
                            renderProductCombo(
                                ...(slug
                                    ? [categories, comboStore.combo?.products]
                                    : [
                                          categories,
                                          productStore.productSelectedInComboAdd,
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
                        setProductSelected={setProductSelectedCombo}
                        searchProductNameNoPage={searchProductNameNoPage}
                        setProductSelectedIn={setProductSelectedInCombo}
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
                                : deleteProductSelectedInCombo
                        }
                        dataRemove={productIdSelected}
                    />
                )}
            </div>
        </div>
    );
}

export default AddCombo;
