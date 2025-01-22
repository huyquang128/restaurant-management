const express = require('express');
const router = express.Router();

const {
    register,
    login,
    refreshTokenJWT,
    logout,
} = require('../Controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshTokenJWT);
router.post('/logout', logout);

module.exports = router;
