const User = require('../Models/userModel');
const Cart = require('../Models/cartModel');
const Product = require('../Models/productModel');

const getAllProductsCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const checkUserIdExisted = await User.findOne({ _id: userId });

        if (!checkUserIdExisted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng!!!',
            });
        }

        const getCart = await Cart.findOne({ user: userId })
            .populate({
                path: 'products.product',
                select: 'name selling promotion images', // Chỉ lấy các trường cần thiết
            })
            .populate('user');

        if (!getCart) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giỏ hàng!!!',
            });
        }
        return res.json({
            success: true,
            data: getCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting all products from cart',
        });
    }
};

const addProductCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity, price } = req.body;

    try {
        let updateCart;

        //check user existed
        const checkUserIdExisted = await User.findOne({ _id: userId });
        if (!checkUserIdExisted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng!!!',
            });
        }

        //check product existed
        const checkProductIdExisted = await Product.findById({
            _id: productId,
        });

        if (!checkProductIdExisted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm!!!',
            });
        }

        //nếu đã tồn tại thì update
        updateCart = await Cart.findOneAndUpdate(
            { user: userId, 'products.product': productId },
            { $inc: { 'products.$.quantity': quantity } },
            { new: true }
        );

        if (!updateCart) {
            //nếu đã có user thì chỉ cần thêm sản phẩm
            updateCart = await Cart.findOneAndUpdate(
                {
                    user: userId,
                },
                {
                    $push: {
                        products: { product: productId, quantity, price },
                    },
                },
                { new: true, upsert: true }
            );
        }

        //tính tổng giá tất cả sản phẩm
        updateCart.total = updateCart.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );

        await updateCart.save();

        return res.json({
            success: true,
            message: 'Thêm món ăn vào giỏ thành công',
            data: updateCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding product to cart',
        });
    }
};

const updateQuantityProductCart = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        let updateProduct;

        updateProduct = await Cart.findByIdAndUpdate(
            { _id: cartId },
            { $set: { 'products.$[elem].quantity': quantity } },
            { arrayFilters: [{ 'elem._id': productId }], new: true }
        );

        updateProduct.total = updateProduct.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );
        await updateProduct.save();

        return res.json({
            success: true,
            message: 'Cập nhật số lượng món ăn thành công',
            data: updateProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:
                'An error occurred while updating quantity of product in cart',
        });
    }
};

const deleteProductCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    try {
        let updateCart;

        updateCart = await Cart.findOneAndUpdate(
            { user: userId, 'products._id': productId },
            { $pull: { products: { _id: productId } } },
            { new: true }
        );
        updateCart.total = updateCart.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );

        await updateCart.save();

        return res.json({
            success: true,
            message: 'Xóa món ăn thành công',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting product from cart',
        });
    }
};

module.exports = {
    getAllProductsCartByUserId,
    addProductCart,
    deleteProductCart,
    updateQuantityProductCart,
};
