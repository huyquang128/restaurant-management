const express = require('express');
const {
    addReview,
    updateReview,
    respondToReview,
    findAllOrder,
} = require('../Controllers/reviewController');
const router = express.Router();
const { upload } = require('../Helper/cloudinary');

router.get('/get-all-review', findAllOrder);
router.post('/add-review', upload.none(), addReview);
router.patch('/update-review/:id', upload.none(), updateReview);
router.patch('/response-review/:id', upload.none(), respondToReview);

module.exports = router;
