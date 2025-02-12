const { default: mongoose } = require('mongoose');
const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require('../Helper/cloudinary');
const Product = require('../Models/productModel');

const getProductsPageByCategory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const { id } = req.params;
    const pageSize = 8;

    try {
        const allProducts = await Product.find({ category: id })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalProducts = await Product.countDocuments();

        //sum page
        const totalPages = Math.ceil(totalProducts / pageSize);

        return res.json({
            success: true,
            data: allProducts,
            page: parseInt(page),
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching products',
        });
    }
};

const getAllProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;

    try {
        const allProducts = await Product.find()
            .populate('categoryDishes', 'name')
            .populate('unit', 'name')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalProducts = await Product.countDocuments();

        //sum page
        const totalPages = Math.ceil(totalProducts / pageSize);

        return res.json({
            success: true,
            data: allProducts,
            totalProducts,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while getting all products',
        });
    }
};

const getProductByNameSlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const product = await Product.findOne({ slug })
            .populate('categoryDishes', 'name')
            .populate('unit', 'name');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        return res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting product by name',
        });
    }
};

const addProduct = async (req, res) => {
    const {
        name,
        cost,
        promotion,
        selling,
        description,
        quantity,
        unit,
        categoryDishes,
        note,
    } = req.body;

    const images = req.files;

    try {
        const isNameExisted = await Product.findOne({ name }).collation({
            locale: 'en',
            strength: 2,
        });

        if (isNameExisted) {
            return res.status(400).json({
                success: false,
                message: 'Tên sản phẩm đã tồn tại',
            });
        }

        const imagesArr = Array.isArray(images) ? images : [images];

        const uploadCloud = imagesArr.map((img) => uploadToCloudinary(img));
        const resultUpload = await Promise.all(uploadCloud);

        const formatImg = resultUpload.map((item) => ({
            imageId: item.public_id,
            url: item.secure_url,
        }));

        const newProduct = new Product({
            name,
            cost: Number(cost),
            promotion: Number(promotion),
            selling: Number(selling),
            description,
            quantity: Number(quantity),
            unit,
            note,
            categoryDishes,
            images: formatImg,
        });

        await newProduct.save();
        res.json({
            success: true,
            message: 'Thêm sản phẩm thành công!!!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while add products',
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        cost,
        promotion,
        selling,
        description,
        quantity,
        unit,
        categoryDishes,
        note,
        images,
    } = req.body;
    const imgFile = req.files;

    try {
        const convertObjectId = new mongoose.Types.ObjectId(id);

        const isProductExisted = await Product.findOne({
            _id: convertObjectId,
        });
        if (!isProductExisted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }
        const jsonParser = JSON.parse(images);
        const imagesArr = Array.isArray(jsonParser) ? jsonParser : [jsonParser];
        const imagesFile = Array.isArray(imgFile) ? imgFile : [imgFile];

        //remove img old cloud
        const filterImg = isProductExisted.images.filter(
            (img) => !imagesArr.some((item) => item.imageId !== img.imageId)
        );
        if (filterImg.length <= 0)
            res.status(404).json({
                success: false,
                message: 'không tìm thấy ảnh nào để xóa',
            });

        const filterImgId = filterImg.map((img) =>
            removeFromCloudinary(img.imageId)
        );
        const results = await Promise.allSettled(filterImgId);

        results.forEach((result, index) => {
            if (result.value.result === 'not found') {
                return res
                    .status(401)
                    .json({ success: false, message: 'Xóa ảnh thất bại' });
            }
        });

        //upload new img cloud
        const uploadCloud = imagesFile.map((img) => uploadToCloudinary(img));
        const resultUpload = await Promise.all(uploadCloud);

        const formatImg = resultUpload.map((item) => ({
            imageId: item.public_id,
            url: item.secure_url,
        }));

        //update product
        const updateProduct = await Product.findByIdAndUpdate(
            {
                _id: convertObjectId,
            },
            {
                name,
                cost: Number(cost),
                promotion: Number(promotion),
                selling: Number(selling),
                description,
                quantity: Number(quantity),
                unit,
                note,
                categoryDishes,
                images: [...filterImg, ...formatImg],
            },
            {
                new: true,
            }
        );

        return res.json({
            success: true,
            message: 'Cập nhật sản phẩm thành công!!!',
            data: updateProduct,
        });
    } catch (error) {
        console.log(error);
        if (!res.headerSent) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while add products',
            });
        }
    }
};

const deleteProduct = async (req, res) => {
    const { ids } = req.body;
    try {
        const productArray = Array.isArray(ids) ? ids : [ids];

        // Xử lý xóa sản phẩm
        const result = await Product.deleteMany({ _id: { $in: productArray } });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm để xóa.',
            });
        }

        res.json({
            success: true,
            message: 'Xóa sản phẩm thành công!!!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while add products',
        });
    }
};

module.exports = {
    getProductsPageByCategory,
    getAllProduct,
    addProduct,
    deleteProduct,
    getProductByNameSlug,
    updateProduct,
};
