const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:37