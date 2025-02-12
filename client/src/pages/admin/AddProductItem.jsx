/* eslint-disable no-unused-vars */
import arr_right_white from '@/assets/icon/arr_right_white.svg';
import arr_right_black from '@/assets/icon/arr_right_black.svg';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import InputCommon from '@/components/common/InputCommon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectOptCommon from '@/components/common/SelectOptCommon';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import circle_close_white from '@/assets/icon/circle_close_white.svg';
import avatar_default_dishes from '@/assets/icon/avatar_default_dishes.svg';
import AddCategoryModal from '@/components/modals/AddCategoryModal';
import AddUnitModal from '@/components/modals/AddUnitModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesDishes } from '@/redux/categoryDishesSlice';
import { getAllUnit } from '@/redux/unitSlice';
import arr_left_black from '@/assets/icon/arr_left_black.svg';
import arr_left_white from '@/assets/icon/arr_left_white.svg';
import {
    addProduct,
    deleteImgProduct,
    getProductBySlug,
    resetUrlImgProduct,
    setImgSelected,
    setFormProductValue,
    setUrlImgProduct,
    updateProduct,
} from '@/redux/productSlice';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import ToastMsg from '@/components/common/ToastMsg';
import BlockRemoveCommon from '@/components/common/BlockRemoveCommon';
import { ThreeDots } from 'react-loader-spinner';
import SpinnerCommon from '@/components/common/SpinnerCommon';

function AddProductItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalUnit, setIsOpenModalUnit] = useState(false);
    const [isAnimationCloseBlockRemove, setIsAnimationCloseBlockRemove] =
        useState(false);
    const [isShowBlockRemove, setIsShowBlockRemove] = useState(false);
    const [isStatusSaveProduct, setIsStatusSaveProduct] = useState(false);
    const [fileImgUploadNew, setFileImgUploadNew] = useState([]);

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const unitStore = useSelector((state) => state.unit);
    const authStore = useSelector((state) => state.auth);
    const productStore = useSelector((state) => state.product);
    console.log('selected: ', productStore.arrImgSelected);

    useEffect(() => {
        dispatch(getAllCategoriesDishes());
        dispatch(getAllUnit());
        if (slug) {
            dispatch(getProductBySlug(slug));
        } else {
            dispatch(
                setFormProductValue({
                    formValue: {
                        nameProduct: '',
                        categoryDishes: '',
                        unit: '',
                        quantity: '',
                        note: '',
                        promotion: '',
                        selling: '',
                        description: '',
                        cost: '',
                    },
                    urlImgProducts: [],
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        if (productStore.arrImgSelected.length > 0) {
            setIsShowBlockRemove(true);
        } else {
            hiddenBlockRemove();
        }
    }, [productStore.arrImgSelected]);

    // useEffect(() => {
    //     if (productStore.urlImgProducts.length > 0 && !isStatusSaveProduct) {
    //         const imageIds = productStore.urlImgProducts.map(
    //             (img) => img.imageId
    //         );
    //         dispatch(deleteImage(imageIds));
    //     }
    // }, [dispatch, isStatusSaveProduct]);

    // useEffect(() => {
    //     const handleDeleteImageBeforeReload = () => {
    //         if (
    //             productStore.urlImgProducts.length > 0 &&
    //             !isStatusSaveProduct
    //         ) {
    //             const imageIds = productStore.urlImgProducts.map(
    //                 (img) => img.imageId
    //             );
    //             dispatch(deleteImage(imageIds));
    //         }
    //     };

    //     window.addEventListener('beforeunload', handleDeleteImageBeforeReload);

    //     return () => {
    //         window.removeEventListener(
    //             'beforeunload',
    //             handleDeleteImageBeforeReload
    //         );
    //     };
    // }, [productStore.urlImgProducts]);

    // validate form
    const formik = useFormik({
        initialValues: {
            ...productStore.formProductValue,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nameProduct: Yup.string().required(
                'Tên mặt hàng không được để trống'
            ),
            categoryDishes: Yup.string().required(
                'Loại mặt hàng không được để trống'
            ),
            unit: Yup.string().required('Đơn vị không được để trống'),
            quantity: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Số lượng không được để trống'),
            promotion: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Giá khuyến mãi không được để trống'),
            selling: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Giá bán không được để trống'),
            cost: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Giá vốn không được để trống'),
        }),
        onSubmit: async (values) => {
            // Submit form
            let result;
            if (productStore.products) {
                result = productStore.products.data.find(
                    (item) => item.slug === slug
                );
            }

            const formData = new FormData();
            formData.append('name', values.nameProduct);
            formData.append('cost', values.cost);
            formData.append('promotion', values.promotion);
            formData.append('selling', values.selling);
            formData.append('description', values.description);
            formData.append('quantity', values.quantity);
            formData.append('note', values.note);
            formData.append('unit', values.unit);
            formData.append('categoryDishes', values.categoryDishes);

            slug &&
                formData.append(
                    'images',
                    JSON.stringify(
                        productStore.urlImgProducts.filter((img) => img._id)
                    )
                );

            fileImgUploadNew.map((img) => {
                formData.append('images', img);
            });

            dispatch(
                slug
                    ? updateProduct({
                          formData,
                          id: productStore.currentProductId,
                      })
                    : addProduct(formData)
            ).then((data) => {
                if (data.payload?.success) {
                    ToastMsg({
                        status: 'success',
                        msg: data.payload.message,
                        type: 'detailedNotification',
                        data: {
                            img: productStore.urlImgProducts[0],
                            nameProduct: values.nameProduct,
                            selling: values.selling,
                        },
                    });
                    setIsStatusSaveProduct(true);
                    formik.resetForm();
                    slug
                        ? (dispatch(getProductBySlug(data.payload.data.slug)),
                          navigate(
                              `/admin/product-items/${data.payload.data.slug}`
                          ))
                        : dispatch(resetUrlImgProduct());
                } else {
                    ToastMsg({
                        status: 'error',
                        msg: productStore.error,
                    });
                }
            });
        },
    });

    //handle events
    const handleImgUpload = (event) => {
        setIsShowBlockRemove(false);
        const files = Array.from(event.target.files);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const objectUrl = URL.createObjectURL(file);

            dispatch(
                setUrlImgProduct({
                    imageId: file.name,
                    url: objectUrl,
                })
            );
            setFileImgUploadNew([file, ...fileImgUploadNew]);
        }
    };

    const hiddenBlockRemove = () => {
        setIsAnimationCloseBlockRemove(true);
        setTimeout(() => {
            setIsAnimationCloseBlockRemove(false);
            setIsShowBlockRemove(false);
        }, 500);
    };

    const handleClickSelectedImg = (indexImg) => {
        setIsShowBlockRemove(true);
        dispatch(setImgSelected(indexImg));
    };

    const removeFileImgUploadNew = (arrImgSelected) => {
        setFileImgUploadNew(
            fileImgUploadNew.filter(
                (file, index) => !arrImgSelected.includes(index)
            )
        );
    };

    return (
        <div className="font-cabin">
            {/* link */}
            <div className="flex items-center mb-5 text-text-primary">
                <span onClick={() => navigate(-1)} className="cursor-pointer">
                    Mặt hàng
                </span>
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
                        {productStore.formProductValue.nameProduct}
                    </span>
                ) : (
                    <span className="cursor-pointer text-yellow-primary">
                        Thêm mặt hàng
                    </span>
                )}
            </div>

            {/* block opt remove imgs */}
            {isShowBlockRemove ? (
                <BlockRemoveCommon
                    arr={productStore.arrImgSelected}
                    isShowBlock={isShowBlockRemove}
                    isAnimationHide={isAnimationCloseBlockRemove}
                    handleHideBlock={hiddenBlockRemove}
                    funcCallApiDelete={deleteImgProduct}
                    funcCallApiGet={getProductBySlug}
                    title="ảnh"
                    type="delete-image"
                    slug={slug}
                    currentId={productStore.currentProductId}
                    arrRemove={productStore.arrImgSelected}
                    removeFileImgUploadNew={removeFileImgUploadNew}
                />
            ) : (
                <div className="h-12 w-full mb-5 text-text-primary">
                    {slug
                        ? '( Thay các thông tin cho sản phẩm sản phẩm của bạn )'
                        : '( Thêm các thông tin cho sản phẩm sản phẩm của bạn )'}
                </div>
            )}

            {/* content product */}
            <div className="flex gap-5 items-start max-md:flex-wrap ">
                {/* block inner imgs */}
                <div className="w-1/3 bg-bg-tertiary text-center px-5 py-10 rounded-lg max-md:w-full">
                    <div className="flex justify-center overflow-hidden rounded-lg mb-8">
                        <img
                            src={
                                productStore.urlImgProducts?.length > 0
                                    ? productStore.urlImgProducts[0].url
                                    : avatar_default_dishes
                            }
                            alt=""
                            className="w-32 h-32 rounded-lg p-1 border object-cover"
                        />
                    </div>
                    <label
                        htmlFor="imgProduct"
                        className="bg-yellow-primary px-3 py-2.5 rounded-lg text-white cursor-pointer hover:brightness-105"
                    >
                        Chọn ảnh mặt hàng
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name=""
                        id="imgProduct"
                        className="hidden"
                        onChange={handleImgUpload}
                    />

                    <div className="flex justify-center mt-5">
                        {productStore.urlImgProducts?.length <= 0 &&
                            productStore.isLoading && (
                                <SpinnerCommon Type={ThreeDots} />
                            )}
                    </div>

                    {/* block inner img selected */}
                    {productStore.urlImgProducts?.length > 0 ? (
                        <div className="mt-5 text-text-primary justify-center font-medium flex gap-2 items-center">
                            <span>ảnh đã chọn: </span>
                        </div>
                    ) : (
                        <div className="mt-10 text-gray-400 text-sm">
                            Chọn ảnh chất lượng cao để hiển thị rõ ràng hơn.
                        </div>
                    )}
                    <div className="flex gap-5 flex-wrap justify-center items-center mt-5 ">
                        {productStore.urlImgProducts.length > 0 &&
                            productStore.urlImgProducts.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleClickSelectedImg(index)
                                    }
                                    className={`flex justify-center cursor-pointer`}
                                >
                                    <img
                                        src={item.url}
                                        alt=""
                                        className={`rounded-lg transition-all outline outline-transparent ease-in-out duration-500 h-24 w-20  object-cover 
                                ${
                                    productStore.arrImgSelected.includes(index)
                                        ? 'outline-yellow-primary'
                                        : 'outline-transparent'
                                }`}
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                {/* form value product */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-2 w-2/3 gap-5 max-md:w-full max-sm"
                >
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="nameProduct"
                            label="Tên sản phẩm"
                            type="text"
                            placeholder="tên sản phẩm"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <SelectOptCommon
                            label="Loại mặt hàng"
                            id="categoryDishes"
                            formik={formik}
                            list_opt={
                                categoryDishesStore &&
                                categoryDishesStore.category_dishes
                            }
                            type="add"
                            setisopenmodal={setIsOpenModal}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <SelectOptCommon
                            label="Đơn vị tính"
                            id="unit"
                            formik={formik}
                            list_opt={unitStore && unitStore.units}
                            type="add"
                            setisopenmodal={setIsOpenModalUnit}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="quantity"
                            label="Số lượng"
                            type="text"
                            placeholder="Số lượng"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <TextAreaCommon
                            id="note"
                            label="Ghi chú"
                            type="text"
                            placeholder="Ghi chú..."
                            formik={formik}
                        />
                    </div>

                    <div className="max-sm:col-span-2">
                        <TextAreaCommon
                            id="description"
                            label="Mô tả sản phẩm"
                            type="text"
                            placeholder="Mô tả sản phẩm..."
                            formik={formik}
                        />
                    </div>

                    {/* <SelectOptCommon label="Loại mặt hàng" formik={formik} /> */}
                    <div className="col-span-2 max-md:w-full text-xl text-text-primary transition-all ease-linear duration-300">
                        Giá mặt hàng
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="promotion"
                            label="Giá khuyến mãi"
                            type="text"
                            placeholder="Giá khuyến mãi"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="selling"
                            label="Giá bán"
                            type="text"
                            placeholder="Giá bán"
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <InputCommon
                            id="cost"
                            label="Giá vốn"
                            type="text"
                            placeholder="Giá bán"
                            formik={formik}
                        />
                    </div>

                    <div className="col-span-2 flex items-center justify-between">
                        <div className="flex items-center cursor-pointer">
                            <img
                                src={
                                    authStore.theme === 'light'
                                        ? arr_left_black
                                        : arr_left_white
                                }
                                alt=""
                            />
                            <span
                                onClick={() => navigate(-1)}
                                className="text-text-primary hover:text-yellow-primary"
                            >
                                Quay lại
                            </span>
                        </div>
                        <div className="w-32 ">
                            <Button
                                title={slug ? 'cập nhật' : 'Lưu'}
                                bg="black"
                                type="submit"
                                text_color="white"
                                color_ring={
                                    productStore.isLoading ? true : false
                                }
                            />
                        </div>
                    </div>
                </form>

                {/* modal */}
                {isOpenModal && (
                    <AddCategoryModal
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                    />
                )}

                {isOpenModalUnit && (
                    <AddUnitModal
                        isOpenModal={isOpenModalUnit}
                        setIsOpenModal={setIsOpenModalUnit}
                    />
                )}
            </div>
        </div>
    );
}

export default AddProductItem;
