/* eslint-disable no-unused-vars */
import arr_right_white from '@/assets/icon/arr_right_white.svg';
import arr_right_black from '@/assets/icon/arr_right_black.svg';
import { Link, useNavigate, useParams } from 'react-router';
import InputCommon from '@/components/common/InputCommon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectOptCommon from '@/components/common/SelectOptCommon';
import Button from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import lau from '@/assets/icon/lau.svg';
import AddCategoryModal from '@/components/modals/AddCategoryModal';
import AddUnitModal from '@/components/modals/AddUnitModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesDishes } from '@/redux/categoryDishesSlice';
import { getAllUnit } from '@/redux/unitSlice';
import back_white from '@/assets/icon/back_white.svg';
import image_default from '@/assets/icon/image_default.svg';
import {
    addProduct,
    deleteImgProduct,
    getProductBySlug,
    resetUrlImgProduct,
    setImgSelected,
    setFormProductValue,
    setUrlImgProduct,
    updateProduct,
    setImgSelectedRemoved,
} from '@/redux/productSlice';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import ToastMsg from '@/components/common/ToastMsg';
import BlockRemoveCommon from '@/components/common/BlockRemoveCommon';
import { ThreeDots } from 'react-loader-spinner';
import SpinnerCommon from '@/components/common/SpinnerCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { addSlide } from '@/redux/slideShowSlice';

const arrSttSlide = [
    { name: 'Hiển thị thứ 1', _id: 1 },
    { name: 'Hiển thị thứ 2', _id: 2 },
    { name: 'Hiển thị thứ 3', _id: 3 },
    { name: 'Hiển thị thứ 4', _id: 4 },
];
function SlideShowDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const slideStore = useSelector((state) => state.slide);
    const [urlImgView, setUrlImgView] = useState(null);
    const [fileImgSelected, setFileImgSelected] = useState(null);
    console.log('🚀 ~ SlideShowDetail ~ fileImgSelected:', fileImgSelected);

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
            ...slideStore.formSlideValue,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            titlePrimary: Yup.string().required(
                'Nội dung chính không được để trống'
            ),
            titleSecondary: Yup.string().required(
                'Nội dung phụ không được để trống'
            ),
            order: Yup.number().required('Thứ tự hiển thị không được để trống'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('titlePrimary', values.titlePrimary);
            formData.append('titleSecondary', values.titleSecondary);
            formData.append('order', values.order);
            formData.append('imgSlide', fileImgSelected);

            // call api
            !fileImgSelected
                ? ToastMsg({ msg: 'Bạn chưa chọn ảnh', status: 'error' })
                : dispatch(addSlide(formData)).then((data) => {
                      if (data.payload.success) {
                          ToastMsg({ msg: 'Thêm slide thành công!!!' });
                          navigate('/admin/system/management-slide-show');
                      }
                  });
        },
    });

    //handle events
    const handleImgUpload = (event) => {
        const objectUrl = URL.createObjectURL(event.target.files[0]);
        setFileImgSelected(event.target.files[0]);
        setUrlImgView(objectUrl);
    };

    return (
        <div className="font-cabin">
            {/* link */}
            {/* <div className="flex items-center mb-5 text-text-primary">
                <Link to="/admin/product-items">
                    <span className="cursor-pointer">Mặt hàng</span>
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
                        {productStore.formProductValue.nameProduct}
                    </span>
                ) : (
                    <span className="cursor-pointer text-yellow-primary">
                        Thêm mặt hàng
                    </span>
                )}
            </div> */}

            {/* block opt remove imgs */}

            {/* content product */}
            <div className="flex gap-5 items-start max-md:flex-wrap ">
                {/* block inner imgs */}
                <div className="w-1/3 bg-bg-secondary text-center px-5 py-10 rounded-lg max-md:w-full">
                    <div className="flex justify-center  rounded-lg mb-8">
                        {urlImgView ? (
                            <div className="relative">
                                <img
                                    src={urlImgView || ''}
                                    alt=""
                                    className={`w-52 h-52 rounded-lg object-cover
                                              border-yellow-primary border-border-primary`}
                                />
                                <div className="absolute -top-2 -right-2">
                                    <div
                                        onClick={() => (
                                            setUrlImgView(null),
                                            setFileImgSelected(null)
                                        )}
                                        className="h-6 w-6 bg-red-400 cursor-pointer
                                                 text-white rounded-full shadow-header-shadow"
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={image_default}
                                alt=""
                                className={`w-32 h-32 rounded-lg object-cover
                                        p-4 border-2 border-dashed border-yellow-primary`}
                            />
                        )}
                    </div>
                    <label
                        htmlFor="imgProduct"
                        className="bg-yellow-primary px-3 py-2.5 rounded-lg text-white cursor-pointer hover:brightness-105"
                    >
                        Chọn ảnh
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name=""
                        id="imgProduct"
                        className="hidden"
                        onChange={handleImgUpload}
                    />

                    {!urlImgView && (
                        <div className="mt-10 opacity-70 text-sm">
                            Chọn ảnh chất lượng cao để hiển thị tốt nhất.
                        </div>
                    )}
                </div>

                {/* form value product */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-2 w-2/3 gap-5 max-md:w-full max-sm"
                >
                    <div className="max-sm:col-span-2">
                        <TextAreaCommon
                            id="titlePrimary"
                            label="Nội dung chính"
                            type="text"
                            placeholder="Nội dung chính..."
                            formik={formik}
                        />
                    </div>

                    <div className="col-span-1">
                        <TextAreaCommon
                            id="titleSecondary"
                            label="Nội dung phụ"
                            type="text"
                            placeholder="Nội dung phụ..."
                            formik={formik}
                        />
                    </div>
                    <div className="max-sm:col-span-2">
                        <SelectOptCommon
                            label="Thứ tự hiển thị"
                            id="order"
                            formik={formik}
                            list_opt={arrSttSlide}
                        />
                    </div>

                    {/* <SelectOptCommon label="Loại mặt hàng" formik={formik} /> */}

                    <div className="col-span-2 flex items-center justify-between">
                        <div className="">
                            {slug ? (
                                <div className="w-28">
                                    <Button
                                        title="Xóa"
                                        bg="delete"
                                        type="button"
                                        text_color="white"
                                        color_ring={slideStore.isLoading}
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
                        <div className="w-32 ">
                            <Button
                                title={slug ? 'cập nhật' : 'Lưu'}
                                bg="save"
                                type="submit"
                                text_color="white"
                                color_ring={slideStore.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SlideShowDetail;
