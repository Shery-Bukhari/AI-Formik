const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:25