const express = require('express');
const router = express.Router();

const {
    getUrlPaymentVNPAY,
    vnpayIpn,
    vnpayReturn,
} = require('../Controllers/paymentController');

router.post('/vnpay-url/:orderId', getUrlPaymentVNPAY);
router.get('/vnpay-ipn', vnpayIpn);
router.get('/vnpay-return', vnpayReturn);

module.exports = router;
