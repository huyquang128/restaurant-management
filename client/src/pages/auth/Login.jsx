import AuthCommon from '@/components/common/AuthCommon';
import { login } from '@/redux/authSlice';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '@/redux/userSlice';
import ToastMsg from '@/components/common/ToastMsg';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('email là bắt buộc'),
            password: Yup.string()
                .min(6, 'Mật khẩu tối thiểu 6 ký tự')
                .required('Mật khẩu là bắt buộc'),
        }),

        onSubmit: async (values) => {
            const formData = {
                email: values.email,
                password_Client: values.password,
            };
            dispatch(login(formData))
                .then((data) => {
                    if (data.payload?.success) {
                        const decodedToken = jwtDecode(
                            data.payload.accessToken
                        );

                        const id = decodedToken._id;
                        dispatch(getUserById(id));
                        if (decodedToken.role === 'admin') {
                            ToastMsg({
                                status: 'success',
                                msg: data.payload?.message,
                            });
                            navigate('/admin/dashboard');
                        } else {
                            ToastMsg({
                                status: 'success',
                                msg: data.payload?.message,
                            });
                            navigate('/');
                        }
                    } else {
                        ToastMsg({
                            status: 'error',
                            msg: 'Tên tài khoản mật khẩu không đúng',
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    });

    return (
        <>
            <AuthCommon type="login" formik={formik} />
        </>
    );
}

export default Login;
