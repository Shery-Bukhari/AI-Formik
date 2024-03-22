const express = require('express');
const path = require('path');
const { connectDB } = require('./config/database');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:37\n// Updated: 2025-05-30 16:01:38\n// Bug fix: 2025-05-30 16:12:35\n// Bug fix: 2025-05-30 16:12:37\n// Feature added: 2025-05-30 16:12:39\n// Bug fix: 2025-05-30 16:12:41\n// Bug fix: 2025-05-30 16:12:42\n// Bug fix: 2025-05-30 16:12:42\n// Feature added: 2025-05-30 16:12:43\n// Updated: 2025-05-30 16:12:45\n// Bug fix: 2025-05-30 16:12:47\n// Updated: 2025-05-30 16:12:47\n// Updated: 2025-05-30 16:12:48\n// Bug fix: 2025-05-30 16:26:07\n// Bug fix: 2025-05-30 16:26:11\n// Feature added: 2025-05-30 16:26:15\n// Bug fix: 2025-05-30 16:26:15\n// Bug fix: 2025-05-30 16:26:18\n// Updated: 2025-05-30 16:26:18\n// Updated: 2025-05-30 16:26:19