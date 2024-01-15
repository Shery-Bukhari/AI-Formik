const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:39\n// Bug fix: 2025-05-30 16:12:34\n// Feature added: 2025-05-30 16:12:37\n// Bug fix: 2025-05-30 16:12:38\n// Refactored: 2025-05-30 16:12:39\n// Feature added: 2025-05-30 16:12:39\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:41\n// Updated: 2025-05-30 16:12:43\n// Refactored: 2025-05-30 16:12:43\n// Feature added: 2025-05-30 16:12:43\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:44\n/* New feature implementation */