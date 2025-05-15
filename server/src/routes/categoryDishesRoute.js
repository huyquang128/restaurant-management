const express = require('express');

const router = express.Router();

const {
    getCategoryDishes,
    addCategoryDishes,
    deleteCategoryDishes,
    updateCategoryDishes,
    getCattegoryDishesSlug,
    getAllCategoriesDishes,
} = require('../Controllers/categoryDishesController');
const middlewareVerifyToken = require('../middleware/verifyToken');
const { upload } = require('../Helper/cloudinary');

// router public
router.get('/get-all-category-dishes-page', getCategoryDishes);
router.get('/get-all-category-dishes', getAllCategoriesDishes);
router.get('/get-category-slug/:slug', getCattegoryDishesSlug);

//route private
router.post(
    '/add-category-dishes',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.none(),
    addCategoryDishes
);
router.put(
    '/update-category-dishes/:categoryId',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.none(),
    updateCategoryDishes
);
router.delete(
    '/remove-category-dishes/',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteCategoryDishes
);

module.exports = router;
