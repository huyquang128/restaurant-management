import { useDispatch, useSelector } from 'react-redux';
import AvatarDefault from '@/components/common/AvatarDefault';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCommon from '@/components/common/InputCommon';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import Button from '@/components/common/Button/Button';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getUserByUsername } from '@/redux/userSlice';

function UserDetail() {
    const userStore = useSelector((state) => state.user);
    const username = useParams();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            ...userStore.formInfoUser,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được để trống'),
            username: Yup.string().required('Tài khoản không được để trống'),
            phone: Yup.number().required('Số điện thoại không được để trống'),
            // detailed: Yup.string().required('địa chỉ không được để trống'),
        }),
        onSubmit: async (values) => {
            // Submit form
        },
    });

    useEffect(() => {
        username && dispatch(getUserByUsername(username.username));
    }, [dispatch]);

    return (
        <div className=" mt-28 font-cabin ">
            {/* content primary */}
            <div className="bg-white pb-10 pt-5">
                <div
                    className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm 
                                max-xs:w-xs mx-auto gap-y-3"
                >
                    <div className="font-cabin text-text-primary">
                        {/* user */}
                        <div className="gap-4 border border-border-primary rounded-lg overflow-hidden">
                            {/* background */}
                            <div className="h-20 mb-5 bg-gradient-to-r from-[#84fab0]  to-[#8fd3f4]"></div>

                            {/* infomation user */}

                            <div className="flex  justify-between items-center px-5 mb-7">
                                <div className="flex gap-2 items-center ">
                                    <div>{AvatarDefault('huy')}</div>
                                    <div>
                                        <div className="text-lg font-semibold">
                                            user7
                                        </div>
                                        <div className="text-sm text-gray-primary">
                                            huy@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={formik.handleSubmit}
                                className="grid grid-cols-2 w-full gap-x-10 gap-y-5 max-md:w-full max-sm px-5 mb-5"
                            >
                                <div className="max-sm:col-span-2">
                                    <InputCommon
                                        id="name"
                                        label="Tên đầy đủ"
                                        type="text"
                                        placeholder="tên đầy đủ"
                                        formik={formik}
                                        client={true}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <InputCommon
                                        id="username"
                                        label="Tài khoản"
                                        type="text"
                                        placeholder="Tài khoản"
                                        formik={formik}
                                        client={true}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <InputCommon
                                        id="email"
                                        label="Email"
                                        type="text"
                                        placeholder="Email"
                                        formik={formik}
                                        client={true}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <InputCommon
                                        id="phone"
                                        label="Số điện thoại"
                                        type="text"
                                        placeholder="Số điện thoại"
                                        formik={formik}
                                        client={true}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <TextAreaCommon
                                        id="detailed"
                                        label="Địa chỉ chi tiết"
                                        type="text"
                                        placeholder="Địa chỉ chi tiết..."
                                        formik={formik}
                                        client={true}
                                    />
                                </div>

                                <div className="col-span-2 flex items-center justify-end">
                                    <div className="w-32 ">
                                        <Button
                                            title={'cập nhật'}
                                            bg="save"
                                            type="submit"
                                            text_color="white"
                                            // color_ring={productStore.isLoading}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
