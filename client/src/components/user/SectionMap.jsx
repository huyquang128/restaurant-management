import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ToastMsg from '../common/ToastMsg';

function SectionMap() {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className="bg-white w-full pt-20 ">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
            max-xs:px-3"
            >
                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={
                        inView
                            ? { opacity: 1, y: '0%' }
                            : { opacity: 0, y: '-100%' }
                    }
                    transition={{ duration: 1.5 }}
                    className="text-center mb-10 font-oswald text-4xl"
                >
                    Liên hệ với chúng tôi
                </motion.div>{' '}
                <div className="flex mb-10 max-sm:flex-wrap">
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={
                            inView
                                ? { opacity: 1, x: '0%' }
                                : { opacity: 0, x: '-100%' }
                        }
                        transition={{ duration: 1.5 }}
                        className="w-1/2 px-10 font-cabin max-sm:w-full
                                    max-sm:px-0 max-sm:mb-10"
                    >
                        <p className=" mb-4 text-gray-primary">
                            Chúng tôi mong nhận được phản hồi từ khách hàng, du
                            khách và những người đến từ SAVOR. Chúng tôi thực sự
                            đánh giá cao việc bạn dành thời gian để liên lạc.
                            Vui lòng điền vào mẫu dưới đây.
                        </p>
                        <div className="mb-2">
                            Address:{' '}
                            <span className="text-gray-primary">
                                Ngõ 85 Lê văn hiến, Bắc từ liêm, Hà nội
                            </span>
                        </div>
                        <div className="mb-2">
                            Phone:{' '}
                            <span className="text-gray-primary">
                                (+84) 0123 456 789
                            </span>
                        </div>
                        <div>
                            Email:{' '}
                            <span className="text-gray-primary">
                                Yourdomain@savor.com
                            </span>
                        </div>
                    </motion.div>

                    {/*  */}
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={
                            inView
                                ? { opacity: 1, x: '0%' }
                                : { opacity: 0, x: '100%' }
                        }
                        transition={{ duration: 1.5 }}
                        className="grid grid-cols-4 w-1/2 gap-5 max-sm:w-full"
                    >
                        <input
                            type="text"
                            className="col-span-2 h-10 border p-2"
                            placeholder="Tên"
                        />
                        <input
                            type="text"
                            className="col-span-2 h-10 border p-2"
                            placeholder="Email"
                        />
                        <textarea
                            name=""
                            id=""
                            className="col-span-4 border h-40 p-3"
                            placeholder="Nội dung"
                        ></textarea>
                        <button
                            onClick={() => ToastMsg({ msg: 'Đã gửi tin nhắn' })}
                            className="bg-black text-white font-cabin col-span-4 py-4"
                        >
                            Gửi tin nhắn
                        </button>
                    </motion.div>
                </div>
            </div>
            <motion.iframe
                initial={{ opacity: 0, y: '50%' }}
                animate={
                    inView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '50%' }
                }
                transition={{ duration: 1.5 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.978938930704!2d105.77133657503268!3d21.073503380586963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345531c92631b9%3A0xfd09beafb5ef493d!2zTmcuIDg1IFAuIEzDqiBWxINuIEhp4bq_biwgxJDhu6ljIFRo4bqvbmcsIELhuq9jIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1736772600315!5m2!1svi!2s"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}

export default SectionMap;
