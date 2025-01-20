import AuthCommon from '@/components/common/AuthCommon';
import ToastMsg from '@/components/common/ToastMsg';
import { register } from '@/redux/authSlice';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username là bắt buộc'),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email là bắt buộc'),
            password: Yup.string()
                .min(6, 'Mật khẩu tối thiểu 6 ký tự')
                .required('Mật khẩu là bắt buộc'),
        }),
        onSubmit: async (values) => {
            dispatch(register(values))
                .then((data) => {
                    if (data.payload?.success) {
                        ToastMsg({
                            status: 'success',
                            msg: data.payload?.message,
                        });
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    });
    return (
        <>
            <AuthCommon type="register" formik={formik} />
        </>
    );
}

export default Register;
