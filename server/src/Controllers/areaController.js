const Area = require('../Models/areaModel');


const getAreaAll = async (req, res) => {
    try {
        const areas = await Area.find().populate('tables');
        return res.json({ success: true, data: areas });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'An error has occurred' });
    }
};

const addAreaName = async (req, res) => {
    const { name } = req.body;
    try {
        const area = new Area({ name });
        await area.save();
        return res.json({ success: true, data: area });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'An error has occurred' });
    }
};

const deleteArea = async (req, res) => {
    const { id } = req.params;
    try {
        await Area.findByIdAndDelete(id);
        return res.json({ success: true });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'An error has occurred' });
    }
};

module.exports = {
    getAreaAll,
    deleteArea,
    addAreaName,
};
