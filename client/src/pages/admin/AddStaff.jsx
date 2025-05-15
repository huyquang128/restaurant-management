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

import ToastMsg from '@/components/common/ToastMsg';
import trash_red from '@/assets/icon/trash_red.svg';
import back_white from '@/assets/icon/back_white.svg';
import save_white from '@/assets/icon/save_white.svg';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVND';
import ConfirmRemoveModal from '@/components/modals/ConfirmRemoveModal';
import { GetProvincesFromVn } from '@/redux/citySlice';
import { getAllRole } from '@/redux/roleSlice';
import SelectOptCity from '@/components/common/SelectOptCity';
import {
    GetDistrictByProvinceApi,
    GetWardByDistrictApi,
} from '@/api/cityVnService';
import { addStaff } from '@/redux/userSlice';

function AddStaff() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();

    const categoryDishesStore = useSelector((state) => state.categoryDishes);
    const authStore = useSelector((state) => state.auth);
    const userStore = useSelector((state) => state.user);
    const roleStore = useSelector((state) => state.role);

    const [arrProvinces, setArrProvinces] = useState([]);
    const [arrDistrict, setArrDistrict] = useState([]);
    const [arrWard, setArrWard] = useState([]);

    const [valueProvince, setValueProvince] = useState(null);
    const [valueDistrict, setValueDistrict] = useState(null);
    const [valueWard, setValueWard] = useState(null);

    const [nameProvince, setNameProvince] = useState(null);
    const [nameDistrict, setNameDistrict] = useState(null);
    const [nameWard, setNameWard] = useState(null);

    useEffect(() => {
        dispatch(getAllRole());
        dispatch(GetProvincesFromVn()).then((data) => {
            setArrProvinces(data.payload);
        });
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getAllProducts());
    //     if (slug) {
    //         dispatch(getCategoryDishesSlug(slug));
    //     } else {
    //         dispatch(resetForm());
    //     }
    // }, [dispatch]);

    useEffect(() => {
        if (valueProvince) {
            const fetchApi = async () => {
                const response = await GetDistrictByProvinceApi(valueProvince);
                setArrDistrict(response.districts);
            };

            fetchApi();
        }
    }, [valueProvince]);

    useEffect(() => {
        if (valueDistrict) {
            const fetchApi = async () => {
                const response = await GetWardByDistrictApi(valueDistrict);
                setArrWard(response.wards);
            };

            fetchApi();
        }
    }, [valueDistrict]);

    const formik = useFormik({
        initialValues: {
            ...userStore.formInfoUser,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            username: Yup.string().required('Tên tài khoản là bắt buộc'),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email là bắt buộc'),
            password: Yup.string()
                .min(6, 'Mật khẩu tối thiểu 6 ký tự')
                .required('Mật khẩu là bắt buộc'),
            name: Yup.string().required('Tên người dùng được để trống'),
            phone: Yup.number()
               
                .required('Số điện thoại không được để trống'),
        }),
        onSubmit: async (values) => {
            console.log('values: ', values);

            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('name', values.name);
            formData.append('phone', values.phone);
            formData.append('city', nameProvince);
            formData.append('district', nameDistrict);
            formData.append('ward', nameWard);
            formData.append('detailed', values.detailed);

            dispatch(addStaff(formData)).then((data) => {
                if (data.payload.success) {
                    ToastMsg({ msg: `${data.payload.message}` });
                }
            });
        },
    });

    const handleSelectedCity = (e) => {
        setValueProvince(e.target.value);

        const selectedOption = e.target.options[e.target.selectedIndex];

        setNameProvince(selectedOption.getAttribute('data-name'));
    };

    const handleSelectedDistrict = (e) => {
        setValueDistrict(e.target.value);
        const selectedOption = e.target.options[e.target.selectedIndex];

        setNameDistrict(selectedOption.getAttribute('data-name'));
    };

    const handleSelectedWard = (e) => {
        setValueWard(e.target.value);
        const selectedOption = e.target.options[e.target.selectedIndex];

        setNameWard(selectedOption.getAttribute('data-name'));
    };

    return (
        <div className="font-cabin">
            {/* link */}
            <div className="flex items-center mb-5 text-text-primary">
                <Link to="/admin/menus">
                    <span className="cursor-pointer">Nhân viên</span>
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
                        Thêm nhân viên
                    </span>
                )}
            </div>

            {/* content product */}
            <div className="flex gap-5 items-start max-md:flex-wrap ">
                {/* block inner imgs */}

                {/* form value product */}
                <form
                    onSubmit={formik.handleSubmit}
                    className=" w-full gap-5 max-md:w-full max-sm"
                >
                    {/* value form */}
                    <div className=" grid grid-cols-2 max-sm:col-span-2 gap-5">
                        <InputCommon
                            id="username"
                            label="Tên tài khoản"
                            type="text"
                            placeholder="tên tài khoản"
                            formik={formik}
                        />
                        <InputCommon
                            id="email"
                            label="Email"
                            type="text"
                            placeholder="Email"
                            formik={formik}
                        />
                        <InputCommon
                            id="password"
                            autoComplete="password"
                            label="Mật khẩu"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            formik={formik}
                        />
                        <InputCommon
                            id="name"
                            label="Tên nhân viên"
                            type="text"
                            placeholder="Tên nhân viên"
                            formik={formik}
                        />
                        <InputCommon
                            id="phone"
                            label="Số điện thoại"
                            type="text"
                            placeholder="Số điện thoại"
                            formik={formik}
                        />
                        <div className="">
                            <div className="mb-2 text-text-primary">
                                Vai trò
                            </div>
                            <div className={`transition-all`}>
                                <input
                                    className="w-full px-4 py-3 bg-bg-tertiary outline-1 outline 
                                               outline-bg-tertiary focus:outline-yellow-primary
                                               text-text-primary rounded-lg ease-linear duration-200 
                                            relative cursor-not-allowed"
                                    value="Nhân viên"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-3 gap-5">
                            <SelectOptCity
                                label="Tỉnh / Thành phố"
                                id="city"
                                arr={arrProvinces}
                                handleChange={handleSelectedCity}
                            />

                            <SelectOptCity
                                label="Quận / Huyện"
                                id="district"
                                arr={arrDistrict}
                                handleChange={handleSelectedDistrict}
                            />

                            <SelectOptCity
                                label="Xã / Phường"
                                id="ward"
                                arr={arrWard}
                                handleChange={handleSelectedWard}
                            />
                        </div>
                        <div className="col-span-2">
                            <InputCommon
                                id="detailed"
                                label="Địa chỉ chi tiết"
                                type="text"
                                placeholder="Địa chỉ chi tiết"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between mt-5">
                        <div className="cursor-pointer w-28">
                            {slug ? (
                                <div className="w-28">
                                    <Button
                                        title="Xóa"
                                        bg="delete"
                                        type="button"
                                        text_color="white"
                                        color_ring={userStore.isLoading}
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
                                color_ring={userStore.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStaff;
