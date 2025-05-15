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
        const foundOrder = await Order.findOne({ _id: orderId }).populate(
            'customer'
        );

        if (!foundOrder) {
            return res
                .status(401)
                .json({ sucess: false, message: 'Không tìm thấy đơn hàng!!!' });
        }

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

const vnpayIpn = (req, res) => {
    try {
        const verify = vnpay.verifyIpnCall({ ...req.query });
        if (!verify.isVerified) {
            return res.json(IpnFailChecksum);
        }

        // Find the order in your database
        // This is the sample order that you need to check the status, amount, etc.
        const foundOrder = {
            orderId: '123456',
            amount: 10000,
            status: 'pending',
        };

        // If the order is not found, or the order id is not matched
        // You can use the orderId to find the order in your database
        if (!foundOrder || verify.vnp_TxnRef !== foundOrder.orderId) {
            return res.json(IpnOrderNotFound);
        }

        // If the amount is not matched
        if (verify.vnp_Amount !== foundOrder.amount) {
            return res.json(IpnInvalidAmount);
        }

        // If the order is already confirmed
        if (foundOrder.status === 'completed') {
            return res.json(InpOrderAlreadyConfirmed);
        }

        // Update the order status to completed
        // Eg: Update the order status in your database
        foundOrder.status = 'completed';

        // Then return the success response to VNPay
        return res.json(IpnSuccess);
    } catch (error) {
        console.log(`verify error: ${error}`);
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
