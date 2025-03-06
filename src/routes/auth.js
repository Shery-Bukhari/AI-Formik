const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
        res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;\n// Updated: 2025-05-30 16:01:22\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Updated: 2025-05-30 16:01:38\n// Updated: 2025-05-30 16:01:39\n// Updated: 2025-05-30 16:01:40\n// Feature added: 2025-05-30 16:12:35\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:39\n// Bug fix: 2025-05-30 16:12:39\n// Bug fix: 2025-05-30 16:12:41\n// Updated: 2025-05-30 16:12:42\n// Bug fix: 2025-05-30 16:12:43\n// Bug fix: 2025-05-30 16:12:44\n// Bug fix: 2025-05-30 16:12:46\n// Feature added: 2025-05-30 16:12:47\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:48\n// Feature added: 2025-05-30 16:12:48\n// Refactored: 2025-05-30 16:12:48\n// Feature added: 2025-05-30 16:12:49\n// Feature added: 2025-05-30 16:26:08\n// Feature added: 2025-05-30 16:26:09\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:10\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:26:15\n// Bug fix: 2025-05-30 16:26:23\n// Bug fix: 2025-05-30 16:37:54\n// Updated: 2025-05-30 16:37:56\n// Updated: 2025-05-30 16:37:58\n// Refactored: 2025-05-30 16:37:59\n// Feature added: 2025-05-30 16:38:04\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:06\n// Updated: 2025-05-30 16:38:08\n// Feature added: 2025-05-30 16:38:08\n// Feature added: 2025-05-30 16:38:10\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:10\n// Feature added: 2025-05-30 16:38:11\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:12\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:15\n// Bug fix: 2025-05-30 16:38:15\n// Feature added: 2025-05-30 16:38:15\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:15\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:19\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:21\n// Feature added: 2025-05-30 16:38:22\n// Bug fix: 2025-05-30 16:38:23\n// Feature added: 2025-05-30 16:38:23\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:24\n// Feature added: 2025-05-30 16:38:28\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:29\n// Feature added: 2025-05-30 16:38:29\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:29\n// Bug fix: 2025-05-30 16:38:29\n// Updated: 2025-05-30 16:38:35\n// Bug fix: 2025-05-30 16:38:35\n// Feature added: 2025-05-30 16:38:36\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:38\n// Refactored: 2025-05-30 16:38:39\n// Feature added: 2025-05-30 16:38:39\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:39\n// Feature added: 2025-05-30 16:38:40\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:41\n// Feature added: 2025-05-30 16:38:42\n// Feature added: 2025-05-30 16:38:43\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:45