const { default: mongoose } = require('mongoose');
const CategoryDishes = require('../Models/categoryDishesModel');
const Product = require('../Models/productModel');
const Combo = require('../Models/comboModel');

const getComboPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const limit = 16;
        const skip = (page - 1) * limit;
        const findCombo = await Combo.find()
            .populate({
                path: 'products',
                populate: { path: 'unit' },
            })
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const totalCombo = await Combo.countDocuments();

        const totalPages = Math.ceil(totalCombo / limit);

        return res.json({
            success: true,
            data: findCombo,
            totalCombo,
            totalPages,
            currentPage: page,
            pageSize: limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting combo',
        });
    }
};

const getAllComboDishes = async (req, res) => {
    try {
        const findCombo = await Combo.find().populate('products');

        res.json({ success: true, data: findCombo });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting all categories Dishes',
        });
    }
};

const getComboSlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const findCombo = await Combo.findOne({ slug })
            .populate('products')
            .exec();

        if (!findCombo) {
            return res.status(404).json({
                success: false,
                message: 'Danh mục này không tồn tại',
            });
        }

        return res.json({
            success: true,
            data: findCombo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes by slug',
        });
    }
};

const addCombo = async (req, res) => {
    const { name, ids, comboPrice } = req.body;
    try {
        const arrParse = JSON.parse(ids);
        const checkIsArr = Array.isArray(arrParse) ? arrParse : [arrParse];
        const arrObjectId = checkIsArr.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        const createCombo = new Combo({
            name: name,
            products: arrObjectId,
            comboPrice,
        });

        await createCombo.save();

        // Truy vấn lại combo kèm thông tin sản phẩm
        const fullCombo = await Combo.findById(createCombo._id).populate(
            'products'
        );

        fullCombo.originalPrice = fullCombo.products.reduce((acc, item) => {
            return acc + item.promotion;
        }, 0);

        await fullCombo.save();

        if (arrObjectId.length > 0)
            await Product.updateMany(
                { _id: { $in: arrObjectId } },
                { $addToSet: { combo: fullCombo._id } } // Chỉ thêm nếu chưa có
            );

        return res.json({
            success: true,
            message: 'Thêm combo thành công',
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

const updateCombo = async (req, res) => {
    const { productIdOld, productIdNew, name } = req.body;
    const { comboId } = req.params;

    try {
        const findCombo = await Combo.findById(comboId).populate('products');

        if (!findCombo) {
            return res.status(404).json({
                success: false,
                message: 'Combo này không tồn tại',
            });
        }

        const productIdOldParse = JSON.parse(productIdOld);

        const productIdNewParse = JSON.parse(productIdNew);

        const checkProductIdNew = Array.isArray(productIdNewParse)
            ? productIdNewParse
            : [productIdNewParse];

        const checkProductIdOld = Array.isArray(productIdOldParse)
            ? productIdOldParse
            : [productIdOldParse];

        const arrObjectIdOld = checkProductIdOld.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        const arrObjectIdNew = checkProductIdNew.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        // Gỡ comboId khỏi mảng các product cũ
        await Product.updateMany(
            { _id: { $in: arrObjectIdOld } },
            { $pull: { combo: comboId } }
        );

        // Thêm comboId vào mảng các product mới
        await Product.updateMany(
            { _id: { $in: arrObjectIdNew } },
            { $addToSet: { combo: comboId } }
        );

        // Cập nhật lại danh sách sản phẩm trong combo (không bị trùng)
        const oldProductIdsToRemove = new Set(
            arrObjectIdOld.map((id) => id.toString())
        );
        const existingProducts = findCombo.products.filter(
            (item) => !oldProductIdsToRemove.has(item._id.toString())
        );

        // Gộp sản phẩm mới và không trùng
        const updatedProductsSet = new Set([
            ...existingProducts.map((p) => p._id.toString()),
            ...arrObjectIdNew.map((id) => id.toString()),
        ]);

        findCombo.products = Array.from(updatedProductsSet).map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        findCombo.name = name;

        await findCombo.save();

        return res.json({
            success: true,
            message: 'Cập nhật combo thành công',
            data: findCombo,
        });
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'Đã xảy ra lỗi khi cập nhật combo',
            });
        }
    }
};

const deleteCombo = async (req, res) => {
    const { comboIds } = req.body;

    try {
        const checkIsArr = Array.isArray(comboIds) ? comboIds : [comboIds];

        // Xóa combo trong collection Combo
        const delCategory = await Combo.deleteMany({
            _id: { $in: checkIsArr },
        });

        // Gỡ combo ra khỏi Product (nếu có)
        await Product.updateMany(
            { combo: { $in: checkIsArr } },
            { $pull: { combo: { $in: checkIsArr } } }
        );

        res.status(200).json({
            success: true,
            message: `Xóa ${delCategory.deletedCount} combo thành công`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa combo',
        });
    }
};

module.exports = {
    getComboPage,
    getAllComboDishes,
    getComboSlug,
    addCombo,
    updateCombo,
    deleteCombo,
};
