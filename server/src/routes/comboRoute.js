const express = require('express');

const router = express.Router();

const middlewareVerifyToken = require('../middleware/verifyToken');

const { upload } = require('../Helper/cloudinary');
const {
    getComboSlug,
    getAllComboDishes,
    getComboPage,
    addCombo,
    updateCombo,
    deleteCombo,
} = require('../Controllers/comboController');

// router public
router.get('/get-combo-page', getComboPage);
router.get('/get-all-combo', getAllComboDishes);
router.get('/get-combo-slug/:slug', getComboSlug);

//route private
router.post(
    '/add-combo',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.none(),
    addCombo
);
router.put(
    '/update-combo/:comboId',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.none(),
    updateCombo
);
router.delete(
    '/remove-combo',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteCombo
);

module.exports = router;
