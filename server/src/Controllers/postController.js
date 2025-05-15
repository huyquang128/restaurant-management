const { uploadToCloudinary } = require('../Helper/cloudinary');
const Post = require('../Models/postModel');

const uploadImgCloud = async (req, res) => {
    const image = req.file;
    try {
        const uploadCloud = await uploadToCloudinary(image);

        const formatImg = {
            imageId: uploadCloud.public_id,
            url: uploadCloud.secure_url,
        };

        return res.status(200).json({ success: true, data: formatImg });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

const addPost = async (req, res) => {
    const { userId, title, type, content } = req.body;
    try {
        const createPost = new Post({
            user: userId,
            title,
            content,
            type,
        });
        await createPost.save();

        return res
            .status(200)
            .json({ success: true, message: 'Đăng bài thành công!!!' });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { userId, title, type, content } = req.body;
    try {
        await Post.findByIdAndUpdate(
            id,
            {
                $set: { userId, title, type, content },
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Cập nhật thành công thành công!!!',
        });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

const getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const findPost = await Post.findOne({ slug });
        return res.status(200).json({ success: true, data: findPost });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

const getPostPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const { type } = req.params;
    try {
        const limit = 10;
        const skip = (page - 1) * limit;
        const findPost = await Post.find({ type })
            .skip(skip)
            .sort({ createdAt: -1 });

        const totalPosts = findPost.length;

        const totalPages = Math.ceil(totalPosts / limit);

        return res.json({
            success: true,
            data: findPost,
            totalPosts,
            totalPages,
            currentPage: page,
            pageSize: limit,
        });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);

        return res
            .status(200)
            .json({ success: true, message: 'Đã xóa bài viết' });
    } catch (error) {
        return res.status(500).json('sever error');
    }
};

module.exports = {
    addPost,
    getPostBySlug,
    getPostPage,
    deletePost,
    uploadImgCloud,
    updatePost,
};
