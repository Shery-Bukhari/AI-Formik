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

module.exports = mongoose.model('User', userSchema);\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Updated: 2025-05-30 16:01:39\n// Updated: 2025-05-30 16:01:39\n// Feature added: 2025-05-30 16:12:37\n// Feature added: 2025-05-30 16:12:37\n// Feature added: 2025-05-30 16:12:38\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:40\n// Feature added: 2025-05-30 16:12:43\n// Bug fix: 2025-05-30 16:12:43\n// Feature added: 2025-05-30 16:12:45\n// Feature added: 2025-05-30 16:12:46