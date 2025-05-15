import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch3D from '@/components/common/ToggleSwitch3D';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCommon from '@/components/common/InputCommon';
import ButtonRemove from '@/components/common/Button/ButtonRemove';
import ButtonSave from '@/components/common/Button/ButtonSave';
import { useEffect, useState } from 'react';
import {
    getRoleName,
    setArrPermessions,
    updatePermessions,
} from '@/redux/roleSlice';
import { useParams } from 'react-router';
import ToastMsg from '@/components/common/ToastMsg';

const arrCategory = [
    { name: 'Thống kê' },
    { name: 'Hóa đơn' },
    { name: 'Đặt bàn' },
    { name: 'Mặt hàng' },
    { name: 'Thực đơn' },
    { name: 'Combo' },
    { name: 'Nhân viên' },
    { name: 'Khách hàng' },
    { name: 'Khuyến mãi' },
    { name: 'Bài viết' },
    { name: 'Hệ thống' },
    { name: 'Thiết lập nhà hàng' },
];
function AccessControl() {
    const dispatch = useDispatch();
    const { name } = useParams();

    // const [isOn, setIsOn] = useState(false);

    const roleStore = useSelector((state) => state.role);

    console.log(roleStore?.selectedCategories);

    useEffect(() => {
        dispatch(getRoleName(name));
    }, [dispatch, name]);

    const formik = useFormik({
        initialValues: {
            ...roleStore.formValueRole,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Tên vai trò không được để trống'),
        }),
        onSubmit: async (values) => {
            if (name === 'admin')
                return ToastMsg({
                    msg: 'Không thể thay đổi quyền hạn ADMIN',
                    status: 'error',
                });
            else {
                name
                    ? dispatch(
                          updatePermessions({
                              roleId: roleStore.role._id,
                              permissions: JSON.stringify(
                                  roleStore.selectedCategories
                              ),
                          })
                      ).then((data) => {
                          if (data.payload.success) {
                              ToastMsg({ msg: `${data.payload.message}` });
                              dispatch(getRoleName(name));
                          }
                      })
                    : '';
            }
        },
    });

    const handleRemove = () => {
        if (name === 'admin') {
            return ToastMsg({
                msg: 'Không thể xóa ADMIN',
                status: 'error',
            });
        }
    };

    const handleSelectedCategory = (name) => {
        dispatch(setArrPermessions(name));
    };

    return (
        <div className="font-cabin text-text-primary">
            <div className="">
                <div className="text-xl font-medium mb-5">
                    Phân quyền người dùng
                </div>
            </div>

            {/* list role */}

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                    <InputCommon
                        id="name"
                        label="Tên vai trò"
                        type="text"
                        placeholder="tên vai trò"
                        formik={formik}
                    />
                </div>

                <div
                    className="grid grid-cols-2 gap-8 
                            rounded-md mb-5 bg-bg-tertiary p-10"
                >
                    <div className="font-medium text-gray-primary col-span-2">
                        Quyền hạn vai trò của nhân viên khi đăng nhập quản trị
                        web hoặc ứng dụng bán hàng.
                    </div>

                    {arrCategory.map((item, index) => (
                        <div key={index} className="flex gap-2 justify-center">
                            <ToggleSwitch3D
                                isOn={roleStore.selectedCategories?.includes(
                                    item.name
                                )}
                                handleClick={() =>
                                    handleSelectedCategory(item.name)
                                }
                            />
                            <span className="w-40">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <div>
                        <ButtonRemove handleClick={handleRemove} />
                    </div>
                    <div>
                        <ButtonSave />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccessControl;
