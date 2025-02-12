const express = require('express');

const router = express.Router();

const {
    getCategoryDishes,
    addCategoryDishes,
    deleteCategoryDishes,
} = require('../Controllers/categoryDishesController');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.get('/get-all-category-dishes', getCategoryDishes);
router.post(
    '/add-category-dishes',
    middlewareVerifyToken.verifyTokenAdmin,
    addCategoryDishes
);
router.delete(
    '/remove-category-dishes/:id',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteCategoryDishes
);

module.exports = router;
