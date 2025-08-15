const { default: mongoose } = require('mongoose');
const CategoryDishes = require('../Models/categoryDishesModel');
const Product = require('../Models/productModel');

const getCategoryDishes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const limit = 16;
        const skip = (page - 1) * limit;
        const categoryDishes = await CategoryDishes.find()
            .populate({
                path: 'products',
                populate: { path: 'unit' },
            })
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const totalCategory = await CategoryDishes.countDocuments();

        const totalPages = Math.ceil(totalCategory / limit);

        return res.json({
            success: true,
            data: categoryDishes,
            totalCategory,
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

const getAllCategoriesDishes = async (req, res) => {
    try {
        const categoryDishes = await CategoryDishes.find().populate({
            path: 'products',
            populate: {
                path: 'reviews',
            },
        });

        res.json({ success: true, data: categoryDishes });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting all categories Dishes',
        });
    }
};

const getCattegoryDishesSlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const categoryDishes = await CategoryDishes.findOne({ slug })
            .populate('products')
            .exec();

        if (!categoryDishes) {
            return res.status(404).json({
                success: false,
                message: 'Danh mục này không tồn tại',
            });
        }

        return res.json({
            success: true,
            data: categoryDishes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes by slug',
        });
    }
};

const addCategoryDishes = async (req, res) => {
    const { name, ids } = req.body;
    try {
        const arrParse = JSON.parse(ids);
        const checkIsArr = Array.isArray(arrParse) ? arrParse : [arrParse];
        const arrObjectId = checkIsArr.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

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
            products: arrObjectId,
        });

        await categoryDishes.save();

        if (arrObjectId.length > 0)
            await Product.updateMany(
                { _id: { $in: arrObjectId } },
                { $set: { categoryDishes: categoryDishes._id } } // Chỉ thêm nếu chưa có
            );

        return res.json({
            success: true,
            message: 'Thêm menu thành công',
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

const updateCategoryDishes = async (req, res) => {
    const { productIdOld, productIdNew, name } = req.body;
    const { categoryId } = req.params;

    try {
        const findCategoryDishes = await CategoryDishes.findById(categoryId);

        if (!findCategoryDishes) {
            return res.status(404).json({
                success: false,
                message: 'Danh mục này không tồn tại',
            });
        }

        const productIdOldParse = JSON.parse(productIdOld);
        const productIdNewParse = JSON.parse(productIdNew);

        const checkProductIdOld = Array.isArray(productIdOldParse)
            ? productIdOldParse
            : [productIdOldParse];

        const checkProductIdNew = Array.isArray(productIdNewParse)
            ? productIdNewParse
            : [productIdNewParse];

        const arrObjectIdOld = checkProductIdOld.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        const arrObjectIdNew = checkProductIdNew.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        // xóa danh mục id cũ tại product
        await Product.updateMany(
            { _id: { $in: arrObjectIdOld } },
            { $unset: { categoryDishes: '' } }
        );

        //thêm danh mục id mới tại product
        await Product.updateMany(
            { _id: { $in: arrObjectIdNew } },
            { $set: { categoryDishes: categoryId } }
        );

        // Lọc sản phẩm đã xóa ra khỏi danh mục
        const objecIdFilter = (findCategoryDishes.products =
            findCategoryDishes.products.filter(
                (item) => !arrObjectIdOld.some((id) => item.equals(id))
            ));

        findCategoryDishes.products = [...objecIdFilter, ...arrObjectIdNew];
        findCategoryDishes.name = name;

        await findCategoryDishes.save();

        return res.json({
            success: true,
            message: 'Cập nhật menu thành công',
            data: findCategoryDishes,
        });
    } catch (error) {
        console.log(error);
        if (!req.headersSent) {
            // Kiểm tra nếu phản hồi chưa được gửi
            return res.status(500).json({
                success: false,
                message: 'An error occurred while getting category Dishes',
            });
        }
    }
};

const deleteCategoryDishes = async (req, res) => {
    const { categoryIds } = req.body;
    try {
        const checkIsArr = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const delCategory = await CategoryDishes.deleteMany({
            _id: { $in: checkIsArr },
        });

        // Xóa danh mục này tại product
        await Product.updateMany(
            { categoryDishes: { $in: checkIsArr } },
            { $set: { categoryDishes: null } }
        );

        res.status(200).json({
            success: true,
            message: `Xóa ${delCategory.deletedCount} menu thành công`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

module.exports = {
    getCategoryDishes,
    addCategoryDishes,
    updateCategoryDishes,
    deleteCategoryDishes,
    getCattegoryDishesSlug,
    getAllCategoriesDishes,
};
