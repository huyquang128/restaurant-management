const express = require('express');
const router = express.Router();

const {
    addProduct,
    deleteProduct,
    getProductsPageByCategory,
    getAllProduct,
    getProductByNameSlug,
    updateProduct,
} = require('../Controllers/productController');
const { upload } = require('../Helper/cloudinary');
const middlewareVerifyToken = require('../middleware/verifyToken');

//router public
router.get('/get-products-by-category/:id', getProductsPageByCategory);
router.get('/get-all-products', getAllProduct);
router.get('/get-product-by-slug/:slug', getProductByNameSlug);

//router private
router.post(
    '/add-product',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.array('images', 10),
    addProduct
);

router.put(
    '/update-product/:id',
    upload.array('images', 10),
    middlewareVerifyToken.verifyTokenAdmin,
    updateProduct
);

router.delete(
    '/delete-product',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteProduct
);

module.exports = router;
