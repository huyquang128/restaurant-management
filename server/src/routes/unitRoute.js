const express = require('express');
const {
    getUnit,
    addUnit,
    deleteUnit,
} = require('../Controllers/unitController');
const router = express.Router();

router.get('/get-all-unit', getUnit);
router.post('/add-unit', addUnit);
router.delete('/delete-unit', deleteUnit);

module.exports = router;
