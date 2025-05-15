const express = require('express');
const {
    getAllNotificationTypeAdmin,
    addNotification,
    setNotificationReaded,
    setNotifySingleReaded,
    deleteNotifySingle,
} = require('../Controllers/notificationController');

const router = express.Router();

router.get('/get-notification-admin', getAllNotificationTypeAdmin);
router.patch('/set-all-notify-readed', setNotificationReaded);
router.patch('/set-single-notify-readed/:id', setNotifySingleReaded);
router.delete('/delete-single-notify/:id', deleteNotifySingle);

router.post('/add-notifycation', addNotification);

module.exports = router;
