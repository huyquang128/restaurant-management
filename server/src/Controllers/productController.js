const { default: mongoose } = require('mongoose');
const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require('../Helper/cloudinary');
const Product = require('../Models/productModel');
const CategoryDishes = require('../Models/categoryDishesModel');
const Review = require('../Models/reviewModel');
const redisClient = require('../Helper/redisClient');
const removeAccents = require('remove-accents');

const getProductsPageByCategory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const { id } = req.params;
    const pageSize = 6;

    try {
        const allProducts = await Product.find({ categoryDishes: id })
            .populate('unit')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalProducts = allProducts.length;

        //sum page
        const totalPages = Math.ceil(totalProducts / pageSize);

        return res.json({
            success: true,
            data: allProducts,
            totalPages,
            totalProducts,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching products',
        });
    }
};

const getAllProductPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

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

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryDishes', 'name')
            .populate('unit', 'name')
            .sort({ _id: -1 });

        return res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while getting all',
        });
    }
};

const getProductSold = async (req, res) => {
    try {
        const findProductSold = await Product.find()
            .sort({ sold: -1 })
            .limit(10);

        return res.json({
            success: true,
            data: findProductSold,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while getting all',
        });
    }
};

const getProductByNameSlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const product = await Product.findOne({ slug })
            .populate('categoryDishes', 'name')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'reviewer',
                },
            })
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
            name_no_accents: removeAccents(name),
            cost: Number(cost),
            promotion: Number(promotion),
            selling: Number(selling),
            description,
            quantity: Number(quantity),
            unit,
            note,
            images: formatImg,
        });

        await newProduct.save();
        res.json({
            success: true,
            message: 'Thêm sản phẩm thành công!!!',
            data: newProduct,
        });
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while add products',
            });
        }
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
        note,
        images,
    } = req.body;
    const imgFile = req.files;

    try {
        const convertObjectId = new mongoose.Types.ObjectId(id);

        const findProduct = await Product.findOne({
            _id: convertObjectId,
        });

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        //xử lý mảng chứa ảnh cũ cần xóa
        let filterImgOld = [];

        const jsonParser = JSON.parse(images);

        const objectIdImgOld = jsonParser.map(
            (imgIdOld) => new mongoose.Types.ObjectId(imgIdOld)
        );

        if (jsonParser.length > 0) {
            //xóa ảnh cũ trên cloudinary
            filterImgOld = findProduct.images.filter((img) =>
                objectIdImgOld.some((imgId) => imgId.equals(img._id))
            );

            if (filterImgOld.length <= 0)
                res.status(404).json({
                    success: false,
                    message: 'không tìm thấy ảnh nào để xóa',
                });

            const filterImgId = filterImgOld.map((img) =>
                removeFromCloudinary(img.imageId)
            );
            const results = await Promise.allSettled(filterImgId);

            results.forEach((result) => {
                if (result.value.result === 'not found') {
                    return res.status(401).json({
                        success: false,
                        message: 'Xóa ảnh thất bại',
                    });
                }
            });
        }

        //upload new img cloud
        const imagesFileNew = Array.isArray(imgFile) ? imgFile : [imgFile];

        const uploadCloud = imagesFileNew.map((img) => uploadToCloudinary(img));
        const resultUpload = await Promise.all(uploadCloud);

        const formatImg = resultUpload.map((item) => ({
            imageId: item.public_id,
            url: item.secure_url,
        }));

        //cập nhật sản phẩm
        //lọc lấy image còn lại không xóa
        const filterImg = findProduct.images.filter(
            (img) => !objectIdImgOld.some((imgId) => imgId.equals(img._id))
        );
        const updateProduct = await Product.findByIdAndUpdate(
            {
                _id: convertObjectId,
            },
            {
                name,
                name_no_accents: removeAccents(name),
                cost: Number(cost),
                promotion: Number(promotion),
                selling: Number(selling),
                description,
                quantity: Number(quantity),
                unit,
                note,
                images: [...filterImg, ...formatImg],
            },
            {
                new: true,
            }
        );
        if (!res.headersSent) {
            return res.json({
                success: true,
                message: 'Cập nhật sản phẩm thành công!!!',
                data: updateProduct,
            });
        }
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while add products',
            });
        }
    }
};

const deleteProduct = async (req, res) => {
    const { id, categoryId } = req.body;

    try {
        const findProduct = await Product.findById(id);

        await Promise.all(
            findProduct.images.map((item) => removeFromCloudinary(item.imageId))
        );

        await Product.deleteOne({ _id: id });

        await CategoryDishes.findByIdAndUpdate(categoryId, {
            $pull: { products: id },
        });

        const test = await Review.deleteMany({
            product: new mongoose.Types.ObjectId(id),
        });

        console.log('🚀 ~ deleteProduct ~ result:', test);

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

const searchProduct = async (req, res) => {
    const { q, page = 1 } = req.query;
    if (!q) return res.json([]);

    try {
        //loại bỏ dấu
        const q_no_accent = removeAccents(q);

        //kiểm tra trong redis trước
        const redisKey = `search:${q_no_accent}:page:${page}`;
        const redisResult = await redisClient.get(redisKey);

        if (redisResult) {
            return res.json(JSON.parse(redisResult));
        }

        const pageNumber = parseInt(page, 10);
        const limitNumber = 8;
        const skip = (pageNumber - 1) * limitNumber;

        //nếu không có trong redis tìm trong mongodb
        const results = await Product.find(
            {
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    {
                        name_no_accents: {
                            $regex: q_no_accent,
                            $options: 'i',
                        },
                    },
                ],
            },
            { name: 1, slug: 1, _id: 1, images: 1, selling: 1, promotion: 1 }
        )
            .populate('categoryDishes', 'name')
            .populate('unit', 'name')
            .skip(skip)
            .limit(limitNumber);

        //đếm tổng số sản phẩm phù hợp
        const totalProducts = await Product.countDocuments({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                {
                    name_no_accents: {
                        $regex: q_no_accent,
                        $options: 'i',
                    },
                },
            ],
        });

        const totalPages = Math.ceil(totalProducts / limitNumber);

        const response = {
            data: results,
            totalProducts,
            totalPages,
            currentPage: pageNumber,
            pageSize: limitNumber,
        };

        //lưu kết quả vào redis lần sau dùng
        await redisClient.set(
            redisKey,
            JSON.stringify(response),
            'EX',
            60 * 10
        );

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while searching products',
        });
    }
};

const searchAllProductNoPage = async (req, res) => {
    const { q } = req.query;
    try {
        const q_no_accent = removeAccents(q);

        //kiểm tra trong redis trước
        const redisKey = `searchAllProduct:${q_no_accent}`;
        const redisResult = await redisClient.get(redisKey);

        if (redisResult) {
            return res.json(JSON.parse(redisResult));
        }

        //lấy trong csdl
        const results = await Product.find(
            {
                $or: [
                    { name: { $regex: q, $options: 'i' } },
                    {
                        name_no_accents: { $regex: q_no_accent, $options: 'i' },
                    },
                ],
            },
            { name: 1, slug: 1, _id: 1, images: 1, selling: 1 }
        ).populate('unit', 'name');

        //lưu kết quả vào redis lần sau dùng
        await redisClient.set(redisKey, JSON.stringify(results), 'EX', 60 * 10);

        res.json({ data: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while searching products',
        });
    }
};

module.exports = {
    getProductsPageByCategory,
    getAllProductPage,
    addProduct,
    deleteProduct,
    getProductByNameSlug,
    updateProduct,
    searchProduct,
    getAllProducts,
    searchAllProductNoPage,
    getProductSold,
};
