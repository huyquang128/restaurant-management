const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../Helper/redisClient');

const saveRefreshToken = async (userId, refreshToken) => {
    await redis.set(
        `refreshToken:${userId}`,
        refreshToken,
        'EX',
        365 * 24 * 60 * 60
    );
};

const verifyRefreshToken = async (userId, refreshToken) => {
    const storeToken = await redis.get(`refreshToken:${userId}`);
    return storeToken === refreshToken;
};

const removeRefreshToken = async (userId) => {
    await redis.del(`refreshToken:${userId}`);
};

const register = async (req, res) => {
    const { username, email, password, roleId } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email đã tồn tại',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: roleId,
        });

        await newUser.save();
        res.json({
            success: true,
            message: 'Đăng ký tài khoản thành công!!!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred sever',
        });
    }
};

const generateAccessTokenJwt = (user) => {
    const roleName =
        typeof user.role === 'string' ? user.role : user.role?.name;
    const accessToken = jwt.sign(
        {
            _id: user._id,
            role: roleName,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '30s' }
    );

    return accessToken;
};
const generateRefreshTokenJWT = (user) => {
    const roleName =
        typeof user.role === 'string' ? user.role : user.role?.name;
    const refreshToken = jwt.sign(
        {
            _id: user._id,
            role: roleName,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '365d' }
    );

    return refreshToken;
};

const login = async (req, res) => {
    const { email, password_Client } = req.body;
    try {
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Bạn chưa đăng ký tài khoản!!',
            });
        }
        const isMatch = await bcrypt.compare(password_Client, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu không đúng!!',
            });
        }

        const accessToken = generateAccessTokenJwt(user);
        const refreshToken = generateRefreshTokenJWT(user);

        //save refresh token to redis-cloud
        await saveRefreshToken(user._id, refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.json({
            success: true,
            message: 'Đăng nhập thành công!!!',
            accessToken,
            user: {
                _id: user._id,
                role: user.role.name,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred sever',
        });
    }
};

const refreshTokenJWT = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: 'Bạn chưa đăng nhập' });

    //verify the refresh token in redis-cloud
    const userId = jwt.decode(refreshToken)._id;
    const isValid = await verifyRefreshToken(userId, refreshToken);

    if (!isValid)
        return res.status(401).json({ message: 'Token không phải của bạn' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ message: 'Phiên đăng nhập đã hết hạn' });

        const newAccessToken = generateAccessTokenJwt(user);
        const newRefreshToken = generateRefreshTokenJWT(user);

        //update new refresh token
        saveRefreshToken(userId, newRefreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.json({
            success: true,
            message: 'Phiên đăng nhập mới đã tạo thành công!!!',
            accessToken: newAccessToken,
            user,
        });
    });
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const userId = jwt.decode(refreshToken)?._id;

    //remove refresh token from redis-cloud
    await removeRefreshToken(userId);

    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Đăng xuất thành công!!!' });
};

module.exports = { register, login, refreshTokenJWT, logout };
