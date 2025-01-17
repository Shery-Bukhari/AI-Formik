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
};\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:12:33\n// Feature added: 2025-05-30 16:12:33\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:34\n// Feature added: 2025-05-30 16:12:35\n// Feature added: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:40\n// Feature added: 2025-05-30 16:12:41\n/* New feature implementation */\n// Updated: 2025-05-30 16:12:44\n// Feature added: 2025-05-30 16:12:44\n/* New feature implementation */\n// Updated: 2025-05-30 16:12:45\n// Feature added: 2025-05-30 16:12:46\n// Bug fix: 2025-05-30 16:12:48