const User = require('../Models/userModel');

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({ success: true, data: user });
    } catch (error) {
        // Bắt tất cả lỗi và gửi response lỗi
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while getting user by ID',
            });
        }
    }
};

module.exports = { getUserById };
