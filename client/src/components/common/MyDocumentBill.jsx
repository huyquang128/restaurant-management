import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    BlobProvider,
    Font,
} from '@react-pdf/renderer';
import RobotoRegular from '../../../public/font/Roboto/Roboto-Regular.ttf';
import RobotoBold from '../../../public/font/Roboto/Roboto-Bold.ttf';
import RobotoMeidum from '../../../public/font/Roboto/Roboto-Medium.ttf';
import FormatVND from './FormatVND';
import { useParams } from 'react-router';
import { useEffect, useMemo } from 'react';
import { getOrderById } from '@/redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import formatFullDate from './formatFullDate';
import codeOrderId from './codeOrderId';
// Register font
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: RobotoRegular,
            fontWeight: 'normal',
        },
        {
            src: RobotoBold,
            fontWeight: 'bold',
        },
        {
            src: RobotoMeidum,
            fontWeight: 'medium',
        },
    ],
});

Font.register({
    family: 'Roboto-bold',
    src: RobotoBold,
});
// Create Document Component
const MyDocumentBill = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();

    const orderStore = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch]);

    const totalPrice = useMemo(() => {
        const result = orderStore.order?.dishes?.reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);

        return result;
    }, [orderStore.order]);
    // Create styles
    const styles = StyleSheet.create({
        page: { padding: 20, backgroundColor: '#f9fafb' },
        title: {
            fontSize: 20,
            fontWeight: '900',
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        title2: {
            fontSize: 14,
            fontWeight: '300',
            color: '#0000FF',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        wrap: { border: '1px solid #ccc', padding: 20, borderRadius: 8 },
        sectionTitle: {
            display: 'flex',
            flexDirection: 'columns',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
        },

        sectionInfo1: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
        },
        sectionInfo2: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            alignItems: 'center',
        },
        sectionInfo3: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
            gap: '20px',
        },
        sectionInfo4: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            gap: '20px',
            backgroundColor: '#EEEEEE',
            padding: '0 10px',
            borderRadius: '8px',
            fontWeight: 'bold',
        },
        sectionInfo5: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            padding: '0 10px',
            borderBottom: '0.5 solid #ddd',
        },
        sectionInfo6: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            gap: '20px',
        },
        sectionInfo7: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        sectionChild1: {
            flex: 2,
            fontSize: 12,
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        sectionChild2: {
            flex: 1,
            fontSize: 12,
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        sectionChild3: {
            flex: 1,
            fontSize: 12,
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        sectionChild4: {
            flex: 1,
            fontSize: 12,
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        sectionChild5: {
            flex: 1,
            fontSize: 18,
            color: '#111827',
            marginBottom: 15,
            fontFamily: 'Roboto',
            marginTop: 20,
            fontWeight: 600,
        },

        text: { fontSize: 12, color: '#111827', fontFamily: 'Roboto' },
        textSecond: {
            fontSize: 12,
            color: '#666666',
            fontFamily: 'Roboto',
            width: 50,
        },
        text3: {
            fontSize: 12,
            color: '#666666',
            fontFamily: 'Roboto',
            width: 50,
            alignContent: 'center',
        },
        text4: {
            fontSize: 12,
            color: '#666666',
            fontFamily: 'Roboto',
        },
        textEnd: {
            fontSize: 15,
            color: '#666666',
            fontFamily: 'Roboto',
            marginTop: 20,
        },
        table: { display: 'table', width: '100%', marginTop: 20 },
        tableRow: { flexDirection: 'row' },
        tableCell: { padding: 5, borderWidth: 1, borderColor: '#d1d5db' },
    });

    const MyPDF = () => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.wrap}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>SAVOR</Text>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.text}>
                                Ngõ 85 Lê văn hiến, bắc từ liêm, hà nội
                            </Text>
                            <Text style={styles.text}>
                                ĐT: 0123456789 - 0912371722
                            </Text>
                            <Text style={styles.text}>
                                -------------------------------------
                            </Text>
                            <Text style={styles.title}>HÓA ĐƠN THANH TOÁN</Text>
                        </View>
                    </View>

                    {/* Thông tin người dùng */}
                    <View style={styles.sectionInfo1}>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Ngày in: </Text>
                            <Text style={styles.text}>
                                {orderStore.order?.updatedAt
                                    ? formatFullDate(
                                          orderStore.order?.updatedAt
                                      )
                                    : '---'}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Mã ĐH:{' '}
                            {orderStore.order?._id
                                ? codeOrderId(orderStore.order?._id)
                                : '----'}
                        </Text>
                    </View>
                    <View style={styles.sectionInfo2}>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Khu: </Text>
                            <Text style={styles.text}>
                                {orderStore.order?.tableSeleted?.area.name}
                            </Text>
                        </Text>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Bàn: </Text>
                            <Text style={styles.text}>
                                {orderStore.order?.tableSeleted.name}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionInfo2}>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Giờ vào: </Text>
                            <Text style={styles.text}>21:23</Text>
                        </Text>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Giờ ra: </Text>
                            <Text style={styles.text}>
                                {orderStore.order?.updatedAt
                                    ? formatFullDate(
                                          orderStore.order?.updatedAt
                                      )
                                    : '---'}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.sectionInfo2}>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Thu ngân: </Text>
                            <Text style={styles.text}>Admin</Text>
                        </Text>
                        <Text style={styles.sectionInfo3}>
                            <Text style={styles.textSecond}>Khách hàng: </Text>
                            <Text style={styles.text}>
                                {orderStore.order?.nameCustomer ||
                                    orderStore.order?.customer.username}
                            </Text>
                        </Text>
                    </View>

                    {/* Thông tin đơn hàng */}
                    <View style={styles.sectionInfo4}>
                        <Text style={styles.sectionChild1}>Sản phẩm</Text>
                        <Text style={styles.sectionChild2}>Đơn giá</Text>
                        <Text style={styles.sectionChild3}>SL</Text>
                        <Text style={styles.sectionChild4}>Thành tiền</Text>
                    </View>
                    {orderStore.order?.dishes?.map((item, index) => (
                        <View key={index} style={styles.sectionInfo5}>
                            <Text style={styles.sectionChild1}>
                                {item.product?.name}
                            </Text>
                            <Text style={styles.sectionChild2}>
                                {FormatVND(item?.price)}
                            </Text>
                            <Text style={styles.sectionChild3}>
                                {item.quantity}
                            </Text>
                            <Text style={styles.sectionChild4}>
                                {FormatVND(item?.quantity * item?.price)}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.sectionInfo6}>
                        <Text style={styles.sectionChild1}>Tổng cộng:</Text>
                        <Text style={styles.sectionChild4}></Text>
                        <Text style={styles.sectionChild3}></Text>
                        <Text style={styles.sectionChild5}>
                            {FormatVND(totalPrice)}
                        </Text>
                    </View>

                    {/*  */}
                    <View style={styles.sectionInfo7}>
                        <Text style={styles.textEnd}>
                            Cảm ơn quý khách hẹn gặp lại
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
    return (
        <BlobProvider document={<MyPDF />}>
            {({ url, loading }) =>
                loading ? (
                    <p>Đang tạo hóa đơn...</p>
                ) : (
                    <div>
                        <h2>Xem Hóa Đơn</h2>
                        {/* Hiển thị PDF ngay trên giao diện */}
                        <iframe
                            src={url}
                            width="100%"
                            height="100%"
                            title="PDF Viewer"
                            className="fixed top-0 right-0 bottom-0 left-0 z-50 "
                        />
                        {/* Tải hóa đơn PDF */}
                        <br />
                        <a href={url} download="hoadon.pdf">
                            Tải hóa đơn PDF
                        </a>
                    </div>
                )
            }
        </BlobProvider>
    );
};

export default MyDocumentBill;
