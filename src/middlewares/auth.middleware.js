import authProvider from '../providers/auth.provider.js';

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = await authProvider.decodeToken(token);
        req.user = decoded; // Attach decoded user information to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};