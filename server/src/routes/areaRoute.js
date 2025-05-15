const express = require('express');
const {
    getAreaAll,
    addAreaName,
    deleteArea,
} = require('../Controllers/areaController');
const router = express.Router();

// router public
router.get('/get-all-area', getAreaAll);

//router private
router.post('/add-area-name', addAreaName);
router.delete('/delete-area', deleteArea);

module.exports = router;
