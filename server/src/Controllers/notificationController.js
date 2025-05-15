const Notification = require('../Models/notificationModel');

const addNotification = async (req, res) => {
    const { userId, message, type, typeSystem, relatedId, read } = req.body;
    try {
        const createNotification = new Notification({
            userId,
            message,
            type,
            relatedId,
            read,
        });

        await createNotification.save();

        return res
            .status(200)
            .json({ success: true, message: 'Tạo thông báo thành công!!!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

const getAllNotificationTypeAdmin = async (req, res) => {
    try {
        const getAllNotifiAdmin = await Notification.find({
            typeSystem: 'admin',
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Lấy thông báo thành công !!!',
            data: getAllNotifiAdmin,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

const setNotificationReaded = async (req, res) => {
    try {
        await Notification.updateMany({}, { read: true });

        return res.status(200).json({
            success: true,
            message: 'Lấy thông báo thành công !!!',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

const setNotifySingleReaded = async (req, res) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndUpdate(id, {
            $set: { read: true },
        });

        return res
            .status(200)
            .json({ success: true, message: 'Update successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

const deleteNotifySingle = async (req, res) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndDelete(id);

        return res
            .status(200)
            .json({ success: true, message: 'Update successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

module.exports = {
    addNotification,
    getAllNotificationTypeAdmin,
    setNotificationReaded,
    deleteNotifySingle,
    setNotifySingleReaded,
};
