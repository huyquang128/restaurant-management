const CategoryDishes = require('../Models/categoryDishesModel');

const getCategoryDishes = async (req, res) => {
    try {
        const categoryDishes = await CategoryDishes.find().sort({ _id: -1 });
        res.json({
            success: true,
            data: categoryDishes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

const addCategoryDishes = async (req, res) => {
    const { name } = req.body;
    try {
        const isCategoryDishesExisted = await CategoryDishes.findOne({
            name,
        }).collation({ locale: 'vi', strength: 2 });

        if (isCategoryDishesExisted) {
            return res.status(400).json({
                success: false,
                message: 'Danh mục này đã tồn tại',
            });
        }

        const categoryDishes = new CategoryDishes({
            name: name,
        });

        await categoryDishes.save();
        return res.json({
            success: true,
            message: 'Thêm thành công danh mục',
        });
    } catch (error) {
        console.error(error); // Log lỗi để kiểm tra
        if (!res.headersSent) {
            // Kiểm tra nếu phản hồi chưa được gửi
            return res.status(500).json({
                success: false,
                message: 'An error occurred while getting category Dishes',
            });
        }
    }
};

const deleteCategoryDishes = async (req, res) => {
    const { id } = req.body;
    try {
        await CategoryDishes.findByIdAndDelete({ id });
        res.status(200).json({
            success: true,
            message: 'Xóa thành công danh mục',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

module.exports = { getCategoryDishes, addCategoryDishes, deleteCategoryDishes };
