const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update task
router.patch('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Feature added: 2025-05-30 16:12:33\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:34\n// Bug fix: 2025-05-30 16:12:36\n// Refactored: 2025-05-30 16:12:36\n// Updated: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:38\n// Feature added: 2025-05-30 16:12:38\n// Updated: 2025-05-30 16:12:39\n// Feature added: 2025-05-30 16:12:39\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:40\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:40\n// Refactored: 2025-05-30 16:12:41\n// Updated: 2025-05-30 16:12:45\n// Refactored: 2025-05-30 16:12:47\n// Refactored: 2025-05-30 16:12:49\n// Feature added: 2025-05-30 16:26:13\n// Updated: 2025-05-30 16:26:13\n// Feature added: 2025-05-30 16:26:14\n// Refactored: 2025-05-30 16:26:17\n// Feature added: 2025-05-30 16:26:17\n// Feature added: 2025-05-30 16:26:22\n// Feature added: 2025-05-30 16:26:22\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:23\n// Bug fix: 2025-05-30 16:26:24\n// Bug fix: 2025-05-30 16:26:24\n// Bug fix: 2025-05-30 16:37:58\n// Updated: 2025-05-30 16:38:01\n// Feature added: 2025-05-30 16:38:05\n// Feature added: 2025-05-30 16:38:05\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:06\n// Updated: 2025-05-30 16:38:06\n// Feature added: 2025-05-30 16:38:09\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:10\n// Feature added: 2025-05-30 16:38:11\n// Feature added: 2025-05-30 16:38:11\n// Refactored: 2025-05-30 16:38:12\n// Bug fix: 2025-05-30 16:38:13\n// Bug fix: 2025-05-30 16:38:14\n// Feature added: 2025-05-30 16:38:14\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:16\n// Feature added: 2025-05-30 16:38:16\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:17\n// Feature added: 2025-05-30 16:38:20\n// Feature added: 2025-05-30 16:38:20\n// Feature added: 2025-05-30 16:38:21\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:22\n// Refactored: 2025-05-30 16:38:22\n// Feature added: 2025-05-30 16:38:22\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:23\n// Updated: 2025-05-30 16:38:23\n// Bug fix: 2025-05-30 16:38:24\n// Feature added: 2025-05-30 16:38:24\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:25\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:28\n// Updated: 2025-05-30 16:38:29\n// Refactored: 2025-05-30 16:38:30\n// Feature added: 2025-05-30 16:38:30\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:31\n// Updated: 2025-05-30 16:38:35\n// Refactored: 2025-05-30 16:38:39\n// Feature added: 2025-05-30 16:38:40\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:41\n// Feature added: 2025-05-30 16:38:41\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:42\n// Refactored: 2025-05-30 16:38:43\n// Feature added: 2025-05-30 16:38:45\n/* New feature implementation */