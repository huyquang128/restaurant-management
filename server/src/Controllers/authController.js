const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const register = async (req, res) => {
    const { username, email, password } = req.body;
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
    const accessToken = jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '30s' }
    );

    return accessToken;
};
const generateRefreshTokenJWT = (user) => {
    const refreshToken = jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '365d' }
    );

    return refreshToken;
};

const login = async (req, res) => {
    const { email, password_Client } = req.body;
    try {
        const user = await User.findOne({ email });
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
        refreshTokens.push(refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });

        // const { password, ...orther } = user._doc;

        res.json({
            success: true,
            message: 'Đăng nhập thành công!!!',
            accessToken,
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

    if (!refreshTokens.includes(refreshToken))
        return res.status(401).json({ message: 'Token không phải của bạn' });

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ message: 'Phiên đăng nhập đã hết hạn' });

        const newAccessToken = generateAccessTokenJwt(user);
        const newRefreshToken = generateRefreshTokenJWT(user);

        refreshTokens.push(newRefreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });

        res.json({
            success: true,
            message: 'Phiên đăng nhập mới đã tạo thành công!!!',
            accessToken: newAccessToken,
        });
    });
};

const logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Đăng xuất thành công!!!' });
};

module.exports = { register, login, refreshTokenJWT, logout };
