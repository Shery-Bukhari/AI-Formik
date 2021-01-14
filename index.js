const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const git = simpleGit();
const FILE_PATH = "./data.json";

// Realistic project structure
const projectFiles = [
  {
    path: "README.md",
    content: `# TaskManager Pro

A modern task management application built with JavaScript.

## Features
- Create and manage tasks
- User authentication
- Real-time updates
- Responsive design

## Installation
\`\`\`bash
npm install
npm start
\`\`\`

## License
MIT License`,
  },
  {
    path: ".gitignore",
    content: `node_modules/
.env
.DS_Store
dist/
build/
*.log
coverage/
.nyc_output/`,
  },
  {
    path: "package.json",
    content: JSON.stringify(
      {
        name: "taskmanager-pro",
        version: "1.2.3",
        description: "A modern task management application",
        main: "src/index.js",
        scripts: {
          start: "node src/index.js",
          test: "jest",
          build: "webpack --mode production",
          dev: "webpack serve --mode development",
        },
        dependencies: {
          express: "^4.18.2",
          mongoose: "^7.0.3",
          jsonwebtoken: "^9.0.0",
        },
        devDependencies: {
          jest: "^29.5.0",
          webpack: "^5.76.0",
        },
        keywords: ["task", "management", "productivity"],
        author: "Developer",
        license: "MIT",
      },
      null,
      2
    ),
  },
  {
    path: "public/index.html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskManager Pro</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>TaskManager Pro</h1>
        </header>
        <main>
            <div id="task-container"></div>
        </main>
    </div>
    <script src="bundle.js"></script>
</body>
</html>`,
  },
  {
    path: "public/styles.css",
    content: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f5;
    color: #333;
}

header {
    background: #007bff;
    color: white;
    padding: 1rem;
    text-align: center;
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}`,
  },
  {
    path: "src/index.js",
    content: `const express = require('express');
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
    console.log(\`Server running on port \${PORT}\`);
});`,
  },
  {
    path: "src/models/Task.js",
    content: `const mongoose = require('mongoose');

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

module.exports = mongoose.model('Task', taskSchema);`,
  },
  {
    path: "src/models/User.js",
    content: `const mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userSchema);`,
  },
  {
    path: "src/routes/tasks.js",
    content: `const express = require('express');
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

module.exports = router;`,
  },
  {
    path: "src/routes/auth.js",
    content: `const express = require('express');
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

module.exports = router;`,
  },
  {
    path: "src/middleware/auth.js",
    content: `const jwt = require('jsonwebtoken');

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
};`,
  },
  {
    path: "src/config/database.js",
    content: `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager');
        console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };`,
  },
  {
    path: "src/utils/helpers.js",
    content: `const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const validateEmail = (email) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
};

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

module.exports = {
    formatDate,
    validateEmail,
    generateId,
    debounce
};`,
  },
  {
    path: "tests/task.test.js",
    content: `const request = require('supertest');
const app = require('../src/index');
const Task = require('../src/models/Task');

describe('Task Routes', () => {
    beforeEach(async () => {
        await Task.deleteMany({});
    });

    test('Should create a new task', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            priority: 'high'
        };

        const response = await request(app)
            .post('/api/tasks')
            .send(taskData)
            .expect(201);

        expect(response.body.title).toBe(taskData.title);
        expect(response.body.completed).toBe(false);
    });

    test('Should fetch all tasks', async () => {
        await Task.create({
            title: 'Test Task 1',
            description: 'First test task'
        });

        const response = await request(app)
            .get('/api/tasks')
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('Test Task 1');
    });

    test('Should update task completion status', async () => {
        const task = await Task.create({
            title: 'Test Task',
            completed: false
        });

        const response = await request(app)
            .patch(\`/api/tasks/\${task._id}\`)
            .send({ completed: true })
            .expect(200);

        expect(response.body.completed).toBe(true);
    });
});`,
  },
  {
    path: "tests/auth.test.js",
    content: `const request = require('supertest');
const app = require('../src/index');
const User = require('../src/models/User');

describe('Auth Routes', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('Should register a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201);

        expect(response.body.user.username).toBe(userData.username);
        expect(response.body.token).toBeDefined();
    });

    test('Should login existing user', async () => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        await user.save();

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            })
            .expect(200);

        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe('test@example.com');
    });
});`,
  },
  {
    path: "webpack.config.js",
    content: `const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: './public',
        port: 8080
    }
};`,
  },
];

// Realistic commit messages
const commitMessages = [
  "Initial project setup",
  "Add basic server configuration",
  "Implement user authentication",
  "Create task model and routes",
  "Add frontend components",
  "Fix authentication middleware",
  "Update database configuration",
  "Add input validation",
  "Implement task filtering",
  "Fix CSS styling issues",
  "Add error handling",
  "Update package dependencies",
  "Improve API response format",
  "Add unit tests",
  "Fix memory leak in routes",
  "Optimize database queries",
  "Add responsive design",
  "Update documentation",
  "Fix security vulnerability",
  "Implement search functionality",
  "Add pagination support",
  "Fix date formatting bug",
  "Update webpack configuration",
  "Add loading animations",
  "Refactor authentication logic",
  "Fix CORS issues",
  "Add environment variables",
  "Implement user profile",
  "Fix task deletion bug",
  "Add data validation",
  "Update README with examples",
  "Optimize bundle size",
  "Fix mobile responsiveness",
  "Add database migrations",
  "Implement rate limiting",
  "Fix timezone handling",
  "Add keyboard shortcuts",
  "Update test coverage",
  "Fix production build",
  "Add performance monitoring",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCommitMessage() {
  return commitMessages[getRandomInt(0, commitMessages.length - 1)];
}

function shouldSkipWeekend(date, skipWeekends = true) {
  if (!skipWeekends) return false;
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
}

function getValidDate(year, month, day) {
  const date = moment().year(year).month(month).date(day);
  // Check if the date is valid (handles Feb 30th, etc.)
  if (!date.isValid()) {
    return moment().year(year).month(month).date(28);
  }
  return date;
}

const createDirectories = () => {
  const directories = [
    "public",
    "src",
    "src/models",
    "src/routes",
    "src/middleware",
    "src/config",
    "src/utils",
    "src/client",
    "tests",
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

const createFiles = () => {
  console.log("📁 Creating project structure...");

  createDirectories();

  let createdCount = 0;
  for (const file of projectFiles) {
    const dir = path.dirname(file.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Only create file if it doesn't exist
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content);
      createdCount++;
    }
  }

  console.log(`✅ Created ${createdCount} files`);
};

const initializeRepo = async () => {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
      console.log("🔧 Git repository initialized");
    }

    // Check if remote exists
    const remotes = await git.getRemotes(true);
    if (remotes.length === 0) {
      console.log("⚠️  Warning: No remote origin configured. Add one with:");
      console.log("   git remote add origin <your-repo-url>");
    }

    return true;
  } catch (error) {
    console.error("❌ Git initialization failed:", error.message);
    return false;
  }
};

const modifyFileContent = (filePath) => {
  try {
    const currentContent = fs.readFileSync(filePath, "utf8");
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    // Add a realistic comment based on file type
    if (filePath.endsWith(".js")) {
      fs.appendFileSync(filePath, `\\n// Updated: ${timestamp}`);
    } else if (filePath.endsWith(".md")) {
      fs.appendFileSync(filePath, `\\n\\n<!-- Updated: ${timestamp} -->`);
    } else if (filePath.endsWith(".css")) {
      fs.appendFileSync(filePath, `\\n/* Updated: ${timestamp} */`);
    } else if (filePath.endsWith(".html")) {
      fs.appendFileSync(filePath, `\\n<!-- Updated: ${timestamp} -->`);
    } else {
      fs.appendFileSync(filePath, `\\n# Updated: ${timestamp}`);
    }

    return true;
  } catch (error) {
    console.warn(`⚠️  Could not modify ${filePath}:`, error.message);
    return false;
  }
};

const makeCommits = async ({
  years = 4,
  maxCommitsPerMonth = 5,
  minCommitsPerMonth = 1,
  skipWeekends = true,
  dryRun = false,
}) => {
  console.log("🚀 Starting commit generation...");
  console.log(`📊 Configuration:
  - Years: ${years}
  - Max commits per month: ${maxCommitsPerMonth}
  - Min commits per month: ${minCommitsPerMonth}
  - Skip weekends: ${skipWeekends}
  - Dry run: ${dryRun}`);

  if (!dryRun) {
    const repoReady = await initializeRepo();
    if (!repoReady) return;

    createFiles();
  }

  const now = moment();
  const startYear = now.year() - years;
  let totalCommits = 0;

  for (let year = startYear; year <= now.year(); year++) {
    const endMonth = year === now.year() ? now.month() : 11;

    // Reduce activity in older years for realism
    const activityMultiplier = year < now.year() - 2 ? 0.6 : 1;
    const adjustedMaxCommits = Math.ceil(
      maxCommitsPerMonth * activityMultiplier
    );

    for (let month = 0; month <= endMonth; month++) {
      const commitsThisMonth = getRandomInt(
        minCommitsPerMonth,
        adjustedMaxCommits
      );
      let monthlyCommits = 0;

      for (
        let attempt = 0;
        attempt < commitsThisMonth * 3 && monthlyCommits < commitsThisMonth;
        attempt++
      ) {
        const day = getRandomInt(1, 28); // Safe day range for all months
        const hour = getRandomInt(9, 18); // Working hours
        const minute = getRandomInt(0, 59);

        const date = getValidDate(year, month, day)
          .hour(hour)
          .minute(minute)
          .second(0);

        // Skip if date is in the future
        if (date.isAfter(now)) continue;

        // Skip weekends if configured to do so
        if (shouldSkipWeekend(date, skipWeekends)) continue;

        const formattedDate = date.format();
        const commitMessage = getRandomCommitMessage();

        if (dryRun) {
          console.log(
            `[DRY RUN] Would commit: "${commitMessage}" on ${formattedDate}`
          );
          monthlyCommits++;
          totalCommits++;
          continue;
        }

        try {
          // Randomly select and modify a file
          const targetFile =
            projectFiles[getRandomInt(0, projectFiles.length - 1)];
          const fileModified = modifyFileContent(targetFile.path);

          if (fileModified) {
            // Update data.json for commit tracking
            const data = {
              date: formattedDate,
              commit: totalCommits + 1,
              file: targetFile.path,
            };
            jsonfile.writeFileSync(FILE_PATH, data);

            await git.add("./*");
            await git.commit(commitMessage, undefined, {
              "--date": formattedDate,
            });

            console.log(
              `✅ [${totalCommits + 1}] ${commitMessage} - ${formattedDate}`
            );
            monthlyCommits++;
            totalCommits++;
          }
        } catch (error) {
          console.warn(
            `⚠️  Commit failed for ${formattedDate}:`,
            error.message
          );
        }
      }
    }
  }

  console.log(`\\n🎯 Generated ${totalCommits} commits over ${years} years`);

  if (!dryRun) {
    try {
      const remotes = await git.getRemotes(true);
      if (remotes.length > 0) {
        console.log("📤 Pushing to remote repository...");
        await git.push();
        console.log("🎉 All commits successfully pushed to GitHub!");
      } else {
        console.log("⚠️  No remote configured. Add remote and push manually:");
        console.log("   git remote add origin <your-repo-url>");
        console.log("   git push -u origin main");
      }
    } catch (error) {
      console.error("❌ Push failed:", error.message);
      console.log("💡 You can push manually with: git push");
    }
  }
};

// Export for module usage
module.exports = { makeCommits, createFiles };

// Run if called directly
if (require.main === module) {
  const config = {
    years: 4,
    maxCommitsPerMonth: 6,
    minCommitsPerMonth: 2,
    skipWeekends: true,
    dryRun: false, // Set to true to preview without actual commits
  };

  makeCommits(config).catch(console.error);
}
