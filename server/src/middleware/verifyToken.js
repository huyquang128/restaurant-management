const jwt = require('jsonwebtoken');

const middlewareVerifyToken = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        console.log('🚀 ~ token:', token);
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json({ message: 'Token không hợp lệ' });
                }

                req.user = user;
                next();
            });
        } else {
            res.status(401).json({ message: 'Bạn chưa đăng nhập' });
        }
    },

    verifyTokenAdmin: (req, res, next) => {
        middlewareVerifyToken.verifyToken(req, res, () => {
            const user = req.user;
            if (user._id == req.params.id || user.role === 'admin') {
                next();
            } else {
                res.status(403).json({
                    message: 'Bạn không có quyền truy cập',
                });
            }
        });
    },
};

module.exports = middlewareVerifyToken;
