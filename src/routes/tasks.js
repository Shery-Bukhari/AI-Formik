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

module.exports = router;\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Feature added: 2025-05-30 16:12:33\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:34\n// Bug fix: 2025-05-30 16:12:36\n// Refactored: 2025-05-30 16:12:36\n// Updated: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:38\n// Feature added: 2025-05-30 16:12:38\n// Updated: 2025-05-30 16:12:39\n// Feature added: 2025-05-30 16:12:39\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:40\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:40\n// Refactored: 2025-05-30 16:12:41\n// Updated: 2025-05-30 16:12:45\n// Refactored: 2025-05-30 16:12:47\n// Refactored: 2025-05-30 16:12:49\n// Feature added: 2025-05-30 16:26:13\n// Updated: 2025-05-30 16:26:13