import home_4 from '@/assets/icon/home_4.svg';
import email_3 from '@/assets/icon/email_3.svg';
import phone_3 from '@/assets/icon/phone_3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCommon from '@/components/common/InputCommon';
import TextAreaCommon from '@/components/common/TextAreaCommon';
import Button from '@/components/common/Button/Button';

const arrContact = [
    {
        name: 'Ngõ 85 Lê văn hiến',
        icon: home_4,
    },
    {
        name: 'savor@gmail.com',
        icon: email_3,
    },
    {
        name: '0999999999',
        icon: phone_3,
    },
];

const iconSocial = [
    { icon: <FontAwesomeIcon icon={faFacebookF} /> },
    { icon: <FontAwesomeIcon icon={faTwitter} /> },
    { icon: <FontAwesomeIcon icon={faInstagram} /> },
];

function Contact() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            title: '',
            content: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được để trống'),
            email: Yup.string().required('email không được để trống'),

            phone: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('SĐT không được để trống'),
            title: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Tiêu đề không được để trống'),
            content: Yup.number()
                .min(0, 'Giá phải lớn hơn 0')
                .required('Nội dung không được để trống'),
        }),

        onSubmit: async (values) => {
            //handle submit
        },
    });
    return (
        <div className=" mt-28 font-cabin ">
            {/* content primary */}
            <div className="bg-white pb-10 pt-5">
                <div
                    className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                                   "
                >
                    <div className="grid grid-cols-2">
                        {/*  */}
                        <div className="flex flex-col gap-10">
                            <div className="text-2xl font-oswald text-yellow-primary ">
                                NHÀ HÀNG SAVOR
                            </div>
                            <div className="mb-10 flex flex-col gap-4">
                                {arrContact.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <img src={item.icon} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-5">
                                {iconSocial.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border h-8 w-8 rounded-full
                                              flex justify-center items-center
                                              "
                                    >
                                        <div className="text-yellow-primary">
                                            {item.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* inputs */}
                        <form
                            onSubmit={formik.handleSubmit}
                            className="grid grid-cols-1  gap-2 max-md:w-full max-sm
                                    bg-bg-tertiary p-4 rounded-lg shadow-header-shadow"
                        >
                            <InputCommon
                                id="name"
                                label="Tên của bạn"
                                type="text"
                                placeholder="Tên của bạn"
                                formik={formik}
                                no_label={true}
                            />
                            <InputCommon
                                id="email"
                                label="Email"
                                type="text"
                                placeholder="Email"
                                no_label={true}
                                formik={formik}
                            />
                            <InputCommon
                                id="phone"
                                label="Số điện thoại"
                                type="text"
                                placeholder="Số điện thoại"
                                formik={formik}
                                no_label={true}
                            />
                            <InputCommon
                                id="title"
                                label="Tiêu đề"
                                type="text"
                                placeholder="Tiêu đề"
                                formik={formik}
                                no_label={true}
                            />
                            <TextAreaCommon
                                id="content"
                                label="Nội dung"
                                type="text"
                                placeholder="Nội dung..."
                                formik={formik}
                                no_label={true}
                            ></TextAreaCommon>

                            <div className="flex justify-end mt-2">
                                <div className="w-36">
                                    <Button bg="save" title="Gửi thông tin" />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/*  */}
                    <div className="w-full mt-10 relative  overflow-hidden h-[219px]">
                        <video
                            className="h-full object-cover rounded-lg appearance-none"
                            autoPlay
                            loop
                            muted
                            playsinline
                        >
                            <source
                                src="https://storage.quannhautudo.com/Data/images/home/Bia-Web.mp4"
                                type="video/mp4"
                            ></source>
                        </video>
                        <div className="absolute flex inset-0 p-10 justify-between  items-center">
                            <div className="font-semibold">
                                <div className="text-5xl font-oswald  mb-2">
                                    SAVOR
                                </div>
                                <div className="text-3xl ">
                                    Đặt tiệc online, vô vàn ưu đãi
                                </div>
                            </div>
                            <button className="border-black border-2 px-5 py-2 rounded-lg font-semibold text-3xl">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
