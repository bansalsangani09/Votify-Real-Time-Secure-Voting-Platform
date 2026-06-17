import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = '30d';

export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

export default {
    generateAccessToken,
    verifyAccessToken
};
