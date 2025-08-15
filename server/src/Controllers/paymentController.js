const {
    ProductCode,
    IpnFailChecksum,
    IpnOrderNotFound,
    IpnInvalidAmount,
    InpOrderAlreadyConfirmed,
    IpnUnknownError,
    IpnSuccess,
} = require('vnpay');
const { vnpay } = require('../Helper/paymentMethod');
const Order = require('../Models/orderModel');

const getUrlPaymentVNPAY = async (req, res) => {
    const { orderId } = req.params;
    const { methodStatus } = req.body;
    try {
        // Check if the order already confirmed
        const foundOrder = await Order.findById(orderId).populate('customer');

        if (!foundOrder) {
            return res
                .status(401)
                .json({ sucess: false, message: 'Không tìm thấy đơn hàng!!!' });
        }

        foundOrder.paymentStatus = methodStatus;

        const urlString = vnpay.buildPaymentUrl({
            vnp_Amount:
                methodStatus === 'partial'
                    ? Math.ceil(foundOrder.totalPrice / 2)
                    : foundOrder.totalPrice,
            vnp_IpAddr: '127.0.0.1',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán cho đơn của khách hàng ${
                foundOrder.customer.name || foundOrder.customer.username
            }`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: `http://localhost:3000/api/v1/payment/vnpay-return`,
        });

        return res.json({ success: true, paymentUrl: urlString });
    } catch (error) {
        console.error(error);
    }
};

const vnpayIpn = async (req, res) => {
    try {
        const verify = vnpay.verifyIpnCall({ ...req.query });
        if (!verify.isVerified) {
            return res.json(IpnFailChecksum);
        }

        const orderId = verify.vnp_TxnRef;
        const paidAmount = Number(verify.vnp_Amount); // đơn vị là VND * 100

        // Tìm đơn hàng thật từ DB
        const foundOrder = await Order.findById(orderId);
        if (!foundOrder) {
            return res.json(IpnOrderNotFound);
        }

        const expectedAmount =
            foundOrder.paymentStatus === 'partial'
                ? Math.ceil(foundOrder.totalPrice / 2) * 100
                : foundOrder.totalPrice * 100;

        if (paidAmount !== expectedAmount) {
            return res.json(IpnInvalidAmount);
        }

        if (foundOrder.paymentStatus === 'paid') {
            return res.json(InpOrderAlreadyConfirmed);
        }

        // Cập nhật trạng thái thanh toán
        foundOrder.paymentStatus = 'paid';
        await foundOrder.save();

        return res.json(IpnSuccess);
    } catch (error) {
        console.error('IPN error:', error);
        return res.json(IpnUnknownError);
    }
};

const vnpayReturn = (req, res) => {
    try {
        const queryData = req.query;

        const verify = vnpay.verifyReturnUrl(queryData);
        if (!verify.isVerified) {
            return res.redirect(
                'http://localhost:5173/payment-result?status=failed'
            );
        }

        if (
            queryData.vnp_ResponseCode === '00' &&
            queryData.vnp_TransactionStatus === '00'
        ) {
            return res.redirect(
                `http://localhost:5173/payment-result?status=success&orderId=${queryData.vnp_TxnRef}&amount=${queryData.vnp_Amount}`
            );
        } else {
            return res.redirect(
                `http://localhost:5173/payment-result?status=failed&orderId=${queryData.vnp_TxnRef}`
            );
        }
    } catch (error) {
        console.error('Error processing VNPay return:', error);
        return res.redirect(
            'http://localhost:5173/payment-result?status=failed'
        );
    }
};

module.exports = { getUrlPaymentVNPAY, vnpayIpn, vnpayReturn };
