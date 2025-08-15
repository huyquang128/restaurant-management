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

const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username }).select('-password');
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

const getAllUserRole = async (req, res) => {
    try {
        const user = await User.find({
            role: '67f92ecde3ab28670d2d15b1',
        }).select('-password');
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

const getAllStaffRole = async (req, res) => {
    try {
        const findStaff = await User.find({
            role: '67f8da61dbec70a833d372a2',
        });
        //.select('-password');
        if (!findStaff) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({ success: true, data: findStaff });
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

const getUserPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const limit = 8;
        const skip = (page - 1) * limit;
        const findUser = await User.find({ role: '67f92ecde3ab28670d2d15b1' })
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const totalUser = await User.countDocuments();

        const totalPages = Math.ceil(totalUser / limit);

        return res.json({
            success: true,
            data: findUser,
            totalUser,
            totalPages,
            currentPage: page,
            pageSize: limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

const getStaffPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const limit = 16;
        const skip = (page - 1) * limit;
        const findStaff = await User.find({ role: '67f8da61dbec70a833d372a2' })
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const totalStaff = await User.countDocuments();

        const totalPages = Math.ceil(totalStaff / limit);

        return res.json({
            success: true,
            data: findStaff,
            totalStaff,
            totalPages,
            currentPage: page,
            pageSize: limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

const deleteUsers = async (req, res) => {
    const { userIds } = req.body;
    try {
        const checkIsArr = Array.isArray(userIds) ? userIds : [userIds];

        const delUser = await User.deleteMany({
            _id: { $in: checkIsArr },
        });

        res.status(200).json({
            success: true,
            message: `Xóa ${delUser.deletedCount} người dùng thành công`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred ',
        });
    }
};

const addStaff = async (req, res) => {
    const {
        username,
        email,
        password,
        city,
        district,
        ward,
        detailed,
        name,
        phone,
        dateOfBirth,
    } = req.body;
    try {
        const createStaff = new User({
            username,
            email,
            password,
            dateOfBirth,
            address: [{ city, district, ward, detailed }],
            name,
            phone,
            role: '67f8da61dbec70a833d372a2',
        });
        await createStaff.save();
        return res
            .status(200)
            .json({ success: true, message: 'Thêm nhân viên thành công!!!' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred ',
        });
    }
};

module.exports = {
    getUserById,
    getAllUserRole,
    deleteUsers,
    getUserPage,
    getStaffPage,
    getAllStaffRole,
    addStaff,
    getUserByUsername,
};
