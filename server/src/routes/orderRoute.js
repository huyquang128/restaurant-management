const express = require('express');
const router = express.Router();
const { upload } = require('../Helper/cloudinary');
const middlewareVerifyToken = require('../middleware/verifyToken');

const {
    addOrder,
    getOrderByUser,
    getAllOrder,
    getOrderById,
    updateQuantityProductOrder,
    deleteProductOrder,
    addProductToOrder,
    updateStatusPayment,
    getAllOrderPage,
    updateDepositOrder,
    getAllOrderPageStatusPending,
    getAllOrderPageStatusPaid,
    getAllOrderPageStatusCanceled,
    getRevenue,
    getRevenueProfitReport,
} = require('../Controllers/orderController');

router.get(
    '/get-order-by-user/:userId',
    middlewareVerifyToken.verifyToken,
    getOrderByUser
);

router.get(
    '/get-all-orders',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllOrder
);

router.get(
    '/get-order-by-id/:orderId',
    middlewareVerifyToken.verifyTokenAdmin,
    getOrderById
);

router.post('/add-order', upload.none(), addOrder);

router.post(
    '/update-quantity-dishes-order/:orderId',
    middlewareVerifyToken.verifyTokenAdmin,
    updateQuantityProductOrder
);
router.delete(
    '/delete-dishes-order/:orderId',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteProductOrder
);

router.post(
    '/add-product-order/:orderId',
    middlewareVerifyToken.verifyTokenAdmin,
    addProductToOrder
);

router.post(
    '/update-status-payment-order/:orderId',
    middlewareVerifyToken.verifyTokenAdmin,
    updateStatusPayment
);
router.post('/add-method-payment/:orderId', addOrder);

router.get(
    '/get-order-page',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllOrderPage
);

router.get(
    '/get-order-page-pending',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllOrderPageStatusPending
);

router.get(
    '/get-order-page-paid',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllOrderPageStatusPaid
);

router.get(
    '/get-order-page-canceled',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllOrderPageStatusCanceled
);

router.get('/get-renevue', getRevenue);

router.patch('/update-deposit/:orderId', updateDepositOrder);

router.get('/get-reports-renevue-profit', getRevenueProfitReport);
module.exports = router;
