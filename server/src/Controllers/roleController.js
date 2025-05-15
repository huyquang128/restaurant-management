const Role = require('../Models/roleModel');

const addRole = async (req, res) => {
    const { name, description, permissions } = req.body;
    try {
        const parseArr = description && JSON.parse(permissions);

        const createRole = new Role({
            name,
            description,
            permissions: parseArr,
        });
        await createRole.save();

        return res
            .status(200)
            .json({ success: true, message: 'Tạo Role thành công!!!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};

const getAllRole = async (req, res) => {
    try {
        const findRoleUser = await Role.find({ name: { $ne: 'user' } }).sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            message: 'Lấy vai trò thành công',
            data: findRoleUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};

const getRoleUser = async (req, res) => {
    try {
        const findRoleUser = await Role.findOne({ name: 'user' });
        return res.status(200).json({
            success: true,
            message: 'Lấy vai trò user thành công',
            data: findRoleUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};

const getRoleStaff = async (req, res) => {
    try {
        const findRoleStaff = await Role.findOne({ name: 'staff' });
        return res.status(200).json({
            success: true,
            message: 'Lấy vai trò Staff thành công',
            data: findRoleStaff,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};
const getRoleByName = async (req, res) => {
    const { name } = req.params;
    try {
        const findRoleUser = await Role.findOne({ name });
        return res.status(200).json({
            success: true,
            message: 'Lấy vai trò thành công',
            data: findRoleUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};

const updatePermessions = async (req, res) => {
    const { roleId } = req.params;
    const { permissions } = req.body;
    try {
        const arrParse = JSON.parse(permissions);
        const findRoleUser = await Role.findOneAndUpdate(
            { _id: roleId },
            {
                $set: { permissions: arrParse },
            },
            {
                new: true,
            }
        );
        return res.status(200).json({
            success: true,
            message: 'Cập nhật vai trò thành công!!!',
            data: findRoleUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'error' });
    }
};

module.exports = {
    addRole,
    getRoleUser,
    getAllRole,
    getRoleByName,
    updatePermessions,
};
