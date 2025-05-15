const express = require('express');
const {
    addTable,
    updateStatusTable,
    updateStatusTableWhenInUse,
    deleteSetTable,
} = require('../Controllers/tableController');

const middlewareVerifyToken = require('../middleware/verifyToken');

const router = express.Router();

//router private
router.post('/add-table', addTable);
router.patch(
    '/update-status-table/:tableId',
    middlewareVerifyToken.verifyTokenAdmin,
    updateStatusTable
);
router.patch(
    '/update-status-in-use-table/:tableId',
    middlewareVerifyToken.verifyTokenAdmin,
    updateStatusTableWhenInUse
);
router.delete(
    '/delete-set-table/:tableId',
    middlewareVerifyToken.verifyTokenAdmin,
    deleteSetTable
);

module.exports = router;
