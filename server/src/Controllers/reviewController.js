const Notification = require('../Models/notificationModel');
const Product = require('../Models/productModel');
const Review = require('../Models/reviewModel');
const User = require('../Models/userModel');
const { getIO } = require('../sockets/socket');

const findAllOrder = async (req, res) => {
    try {
        const findReview = await Review.find()
            .populate({
                path: 'product',
                populate: {
                    path: 'categoryDishes',
                },
            })
            .populate('reviewer')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: findReview });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'server error!' });
    }
};

const addReview = async (req, res) => {
    const { reviewer, product, content, rating } = req.body;
    try {
        const createReview = new Review({
            reviewer,
            product,
            content,
            rating,
        });

        await createReview.save();

        const findUser = await User.findOne({ _id: reviewer });

        const createNotification = new Notification({
            userIdReceiver: '67f9325fc89ae9b38e5c8d02',
            customerIdSend: reviewer,
            nameCustomer: findUser.name || findUser.username,
            type: 'comment',
            relatedId: createReview._id,
        });

        await createNotification.save();

        getIO().emit('new_review', createReview);

        const result = await Product.findByIdAndUpdate(createReview.product, {
            $push: { reviews: createReview._id },
        });

        return res.status(200).json({ success: true, message: 'Đã đánh giá' });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'server error!' });
    }
};

// PUT /api/reviews/:id
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { reviewer, content, rating } = req.body;

    try {
        const review = await Review.findById(id);

        if (!review || review.reviewer.toString() !== reviewer) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized',
            });
        }

        review.content = content;
        review.rating = rating;
        review.lastEditedAt = new Date();

        await review.save();

        return res.status(200).json({ success: true, data: review });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server error!' });
    }
};

// PATCH /api/reviews/respond/:id
const respondToReview = async (req, res) => {
    const { id } = req.params;
    const { responder, content, emoji } = req.body;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res
                .status(404)
                .json({ success: false, message: 'Review not found' });
        }

        // if (review.response && review.response.content) {
        //     return res
        //         .status(403)
        //         .json({ success: false, message: 'Bạn đã phản hồi' });
        // }

        review.response = {
            responder,
            content,
            emoji,
            respondedAt: new Date(),
        };

        await review.save();

        return res.status(200).json({ success: true, data: review });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server error!' });
    }
};

// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    const { id } = req.params;
    const { reviewer } = req.body; // truyền user id từ frontend hoặc lấy từ token

    try {
        const review = await Review.findById(id);

        if (!review || review.reviewer.toString() !== reviewer) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized',
            });
        }

        review.isDeleted = true;
        await review.save();

        return res
            .status(200)
            .json({ success: true, message: 'Review deleted (soft)' });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Server error!' });
    }
};

module.exports = {
    addReview,
    respondToReview,
    updateReview,
    deleteReview,
    findAllOrder,
};
