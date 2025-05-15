const jwt = require('jsonwebtoken');

const middlewareVerifyToken = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.token;

        if (!authHeader) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
        }

        // check token parts (thành phần mã)
        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }

        const accessToken = tokenParts[1];

        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }

            if (!user || !user._id) {
                if (!res.headersSent) {
                    return res
                        .status(401)
                        .json({ message: 'Token không hợp lệ hoặc thiếu _id' });
                }
            }
            
            req.user = user;
            next();
        });
    },

    //check token + quyền admin
    verifyTokenAdmin: (req, res, next) => {
        middlewareVerifyToken.verifyToken(req, res, () => {
            const user = req.user;

            if (!user || !user._id) {
                if (!res.headersSent) {
                    return res.status(401).json({
                        message: 'Token không hợp lệ hoặc thiếu _id',
                    });
                }
            }

            if (user._id === req.params.id || user.role === 'admin') {
                return next();
            }

            return res.status(403).json({
                message: 'Bạn không có quyền truy cập',
            });
        });
    },

    checkRole: (...allowedRoles) => {
        return (req, res, next) => {
            middlewareVerifyToken.verifyToken(req, res, () => {
                if (
                    allowedRoles.includes(req.user.role) ||
                    req.user._id === req.params.id
                ) {
                    return next();
                }
                return res.status(403).json({
                    message: 'Bạn không có quyền truy cập',
                });
            });
        };
    },
};

module.exports = middlewareVerifyToken;
