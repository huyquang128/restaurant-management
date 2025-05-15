const express = require('express');
const router = express.Router();

const { upload } = require('../Helper/cloudinary');

const {
    getUserById,
    getAllUserRole,
    getUserPage,
    deleteUsers,
    getStaffPage,
    getAllStaffRole,
    addStaff,
} = require('../Controllers/userController');

const middlewareVerifyToken = require('../middleware/verifyToken');

router.get(
    '/get-user-by-id/:id',
    middlewareVerifyToken.verifyToken,
    getUserById
);

router.get(
    '/get-all-user-role',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllUserRole
);

router.get(
    '/get-user-page',
    middlewareVerifyToken.verifyTokenAdmin,
    getUserPage
);

router.get(
    '/get-all-staff-role',
    middlewareVerifyToken.verifyTokenAdmin,
    getAllStaffRole
);

router.get(
    '/get-staff-page',
    middlewareVerifyToken.verifyTokenAdmin,

    getStaffPage
);

router.post(
    '/add-staff',
    middlewareVerifyToken.verifyTokenAdmin,
    upload.none(),
    addStaff
);

router.delete('/remove-user/', middlewareVerifyToken.verifyToken, deleteUsers);

module.exports = router;
