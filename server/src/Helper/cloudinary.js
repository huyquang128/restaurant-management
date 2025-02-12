const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

const storage = multer.memoryStorage();

//upload to cloudinary
const uploadToCloudinary = async (image) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: 'restaurant_management',
            },
            (error, imageResult) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(imageResult);
                }
            }
        );
        stream.end(image.buffer);
    });
};

//remove img to cloudinary
const removeFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw error;
    }
};

const upload = multer({
    storage,
});

module.exports = {
    uploadToCloudinary,
    upload,
    removeFromCloudinary,
};
