import AuthCommon from '@/components/common/AuthCommon';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
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
            console.log(values);
        },
    });
    return (
        <>
            <AuthCommon type="register" formik={formik} />
        </>
    );
}

export default Register;
