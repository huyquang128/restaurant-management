const express = require('express');
const {
    addPost,
    getPostBySlug,
    getPostPage,
    deletePost,
    uploadImgCloud,
    updatePost,
} = require('../Controllers/postController');
const router = express.Router();
const { upload } = require('../Helper/cloudinary');

router.post('/add-post', upload.none(), addPost);
router.post('/update-post/:id', upload.none(), updatePost);
router.get('/get-post-slug/:slug', getPostBySlug);
router.get('/get-post-page/:type', getPostPage);
router.delete('/delete-post/:id', deletePost);
router.post('/upload-img-post', upload.single('image'), uploadImgCloud);

module.exports = router;
