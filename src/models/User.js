const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Updated: 2025-05-30 16:01:39\n// Updated: 2025-05-30 16:01:39\n// Feature added: 2025-05-30 16:12:37\n// Feature added: 2025-05-30 16:12:37\n// Feature added: 2025-05-30 16:12:38\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:40\n// Feature added: 2025-05-30 16:12:43\n// Bug fix: 2025-05-30 16:12:43\n// Feature added: 2025-05-30 16:12:45\n// Feature added: 2025-05-30 16:12:46\n// Feature added: 2025-05-30 16:12:47\n// Refactored: 2025-05-30 16:12:48\n// Bug fix: 2025-05-30 16:26:08\n// Refactored: 2025-05-30 16:26:12\n// Feature added: 2025-05-30 16:26:14\n/* New feature implementation */\n// Updated: 2025-05-30 16:26:15\n// Feature added: 2025-05-30 16:26:16\n/* New feature implementation */\n// Refactored: 2025-05-30 16:26:18\n// Bug fix: 2025-05-30 16:26:24\n// Feature added: 2025-05-30 16:37:55\n/* New feature implementation */\n// Feature added: 2025-05-30 16:37:56\n// Feature added: 2025-05-30 16:37:58\n/* New feature implementation */\n// Feature added: 2025-05-30 16:37:58\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:04\n// Bug fix: 2025-05-30 16:38:04\n// Feature added: 2025-05-30 16:38:04\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:04\n// Feature added: 2025-05-30 16:38:04\n// Feature added: 2025-05-30 16:38:05\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:05\n// Feature added: 2025-05-30 16:38:08\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:12\n// Updated: 2025-05-30 16:38:12\n// Feature added: 2025-05-30 16:38:14\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:15\n// Feature added: 2025-05-30 16:38:16\n// Bug fix: 2025-05-30 16:38:18\n// Feature added: 2025-05-30 16:38:19\n// Feature added: 2025-05-30 16:38:24\n// Bug fix: 2025-05-30 16:38:25\n// Feature added: 2025-05-30 16:38:25\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:25\n// Feature added: 2025-05-30 16:38:28\n// Feature added: 2025-05-30 16:38:31\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:32\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:32\n// Feature added: 2025-05-30 16:38:32\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:33\n// Bug fix: 2025-05-30 16:38:34\n// Feature added: 2025-05-30 16:38:35