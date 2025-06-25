import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not Authorized. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        let message = 'Not Authorized. Invalid token.';
        if (error.name === 'TokenExpiredError') {
            message = 'Not Authorized. Token expired. Login again.';
        }
        return res.json({ success: false, message });
    }
};

export { userAuth };