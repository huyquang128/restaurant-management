const express = require('express');
const {
    addRole,
    getRoleUser,
    getAllRole,
    getRoleByName,
    updatePermessions,
} = require('../Controllers/roleController');
const router = express.Router();

router.post('/add-role', addRole);
router.get('/get-role-user', getRoleUser);
router.get('/get-all-role', getAllRole);
router.get('/get-role-name/:name', getRoleByName);
router.patch('/update-permessions-role/:roleId', updatePermessions);

module.exports = router;
