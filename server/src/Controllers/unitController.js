const Unit = require('../Models/unitModels');

const getUnit = async (req, res) => {
    try {
        const units = await Unit.find();
        res.json({
            success: true,
            data: units,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting units',
        });
    }
};

const addUnit = async (req, res) => {
    const { name } = req.body;
    try {
        const isNameExisted = await Unit.findOne({ name }).collection({
            locate: 'en',
            strength: 2,
        });

        if (isNameExisted) {
            return res.status(400).json({
                success: false,
                message: 'Tên đơn vị tính đã tồn tại',
            });
        }

        const unit = new Unit({ name });
        await unit.save();

        return res.json({
            success: true,
            message: 'Thêm đơn vị tính thành công!!!',
        });
    } catch (error) {
        if (!res.headerSend) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding unit',
            });
        }
    }
};

const deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
        await Unit.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Xóa đơn vị tính thành công!!!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting unit',
        });
    }
};

module.exports = {
    addUnit,
    getUnit,
    deleteUnit,
};
