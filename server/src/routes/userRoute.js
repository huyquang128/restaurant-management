const express = require('express');
const router = express.Router();

const { getUserById } = require('../Controllers/userController');
const middlewareVerifyToken = require('../middleware/verifyToken');

router.get(
    '/get-user-by-id/:id',
    middlewareVerifyToken.verifyToken,
    getUserById
);

module.exports = router;
