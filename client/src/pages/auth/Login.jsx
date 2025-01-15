import AuthCommon from '@/components/common/AuthCommon';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
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
            console.log(values);
        },
    });

    return (
        <>
            <AuthCommon type="login" formik={formik} />
        </>
    );
}

export default Login;
