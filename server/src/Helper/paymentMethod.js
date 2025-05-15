const { VNPay, ignoreLogger, HashAlgorithm } = require('vnpay');
// import { VNPay, ignoreLogger } from 'vnpay';

const vnpay = new VNPay({
    tmnCode: process.env.VNPAY_TMN_CODE ?? '2QXUI4B4',
    secureSecret: process.env.VNPAY_SECURE_SECRET ?? 'secret',
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true, // optional
    hashAlgorithm: HashAlgorithm.SHA512, // optional

    /**
     * Use enableLog if you want to log
     * Disable it, then no logger will be used in any method
     */
    enableLog: true, // optional

    /**
     * Use ignoreLogger if you don't want to log console globally,
     * Then you still re-use loggerFn in each method that allow you to log
     */
    loggerFn: ignoreLogger, // optional
});

module.exports = { vnpay };
