const {
    uploadToCloudinary,
    removeFromCloudinary,
} = require('../Helper/cloudinary');
const SlideShow = require('../Models/slideShowModel');

const addSlide = async (req, res) => {
    const { titlePrimary, titleSecondary, order } = req.body;
    console.log(
        '🚀 ~ addSlide ~ titlePrimary, titleSecondary, order:',
        titlePrimary,
        titleSecondary,
        order
    );
    const imgSlide = req.file;
    console.log('🚀 ~ addSlide ~ imgSlide:', imgSlide);
    try {
        const uploadImg = await uploadToCloudinary(imgSlide);

        const resultImg = {
            imageId: uploadImg.public_id,
            url: uploadImg.secure_url,
        };

        const createSlideShow = new SlideShow({
            titlePrimary,
            titleSecondary,
            order,
            urlImg: resultImg,
        });

        await createSlideShow.save();

        return res
            .status(200)
            .json({ success: true, message: 'Thêm silde thành công!!!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Error' });
    }
};

const getAllSlide = async (req, res) => {
    try {
        const findSlide = await SlideShow.find();

        res.json({ success: true, data: findSlide });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting all categories Dishes',
        });
    }
};

const deleteSlide = async (req, res) => {
    const { slideIdOld } = req.body;
    try {
        const checkIsArr = Array.isArray(slideIdOld)
            ? slideIdOld
            : [slideIdOld];

        const delSlide = await SlideShow.deleteMany({
            _id: { $in: checkIsArr },
        });

        const findSlide = await SlideShow.find({
            _id: { $in: checkIsArr },
        });

        const resultRemoveImg = findSlide.map((item) =>
            removeFromCloudinary(item.img.imageId)
        );

        resultRemoveImg.forEach((result) => {
            if (result.value.result === 'not found') {
                return res.status(401).json({
                    success: false,
                    message: 'Xóa ảnh thất bại',
                });
            }
        });

        res.status(200).json({
            success: true,
            message: `Xóa ${delSlide.deletedCount} slide thành công`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting category Dishes',
        });
    }
};

module.exports = { addSlide, getAllSlide, deleteSlide };
