const express = require('express');
const router = express.Router();

const {
    addProductCart,
    deleteProductCart,
    getAllProductsCartByUserId,
    updateQuantityProductCart,
} = require('../Controllers/cartController');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.get(
    '/get-products-cart/:userId',
    middlewareVerifyToken.verifyToken,
    getAllProductsCartByUserId
);
router.post(
    '/add-product-cart/:userId',
    middlewareVerifyToken.verifyToken,
    addProductCart
);
router.patch(
    '/update-quantity-product-cart/:cartId',
    middlewareVerifyToken.verifyToken,
    updateQuantityProductCart
);
router.delete(
    '/delete-product-cart/:userId',
    middlewareVerifyToken.verifyToken,
    deleteProductCart
);

module.exports = router;
