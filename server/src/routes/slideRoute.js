const express = require('express');
const {
    getAllSlide,
    addSlide,
    deleteSlide,
} = require('../Controllers/slideShowController');
const { upload } = require('../Helper/cloudinary');
const router = express.Router();

router.get('/get-all-slide', getAllSlide);
router.post('/add-slide', upload.single('imgSlide'), addSlide);
router.delete('/remove-slide', deleteSlide);

module.exports = router;
