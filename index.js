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
    content: `{
  "name": "taskmanager-pro",
  "version": "1.2.3",
  "description": "A modern task management application",
  "main": "generateCommits.js",
  "scripts": {
    "start": "node generateCommits.js",
    "test": "echo \\"No tests specified\\" && exit 0"
  },
  "dependencies": {
    "moment": "^2.29.4",
    "simple-git": "^3.19.1",
    "jsonfile": "^6.1.0"
  },
  "keywords": ["task", "management", "productivity"],
  "author": "Developer",
  "license": "MIT"
}`,
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

// Realistic commit messages with types
const commitMessages = [
  { message: "Initial project setup", type: "feature" },
  { message: "Add basic server configuration", type: "feature" },
  { message: "Implement user authentication", type: "feature" },
  { message: "Create task model and routes", type: "feature" },
  { message: "Add frontend components", type: "feature" },
  { message: "Fix authentication middleware", type: "fix" },
  { message: "Update database configuration", type: "update" },
  { message: "Add input validation", type: "feature" },
  { message: "Implement task filtering", type: "feature" },
  { message: "Fix CSS styling issues", type: "fix" },
  { message: "Add error handling", type: "feature" },
  { message: "Update package dependencies", type: "update" },
  { message: "Improve API response format", type: "refactor" },
  { message: "Add unit tests", type: "feature" },
  { message: "Fix memory leak in routes", type: "fix" },
  { message: "Optimize database queries", type: "refactor" },
  { message: "Add responsive design", type: "feature" },
  { message: "Update documentation", type: "update" },
  { message: "Fix security vulnerability", type: "fix" },
  { message: "Implement search functionality", type: "feature" },
  { message: "Add pagination support", type: "feature" },
  { message: "Fix date formatting bug", type: "fix" },
  { message: "Update webpack configuration", type: "update" },
  { message: "Add loading animations", type: "feature" },
  { message: "Refactor authentication logic", type: "refactor" },
  { message: "Fix CORS issues", type: "fix" },
  { message: "Add environment variables", type: "feature" },
  { message: "Implement user profile", type: "feature" },
  { message: "Fix task deletion bug", type: "fix" },
  { message: "Add data validation", type: "feature" },
  { message: "Update README with examples", type: "update" },
  { message: "Optimize bundle size", type: "refactor" },
  { message: "Fix mobile responsiveness", type: "fix" },
  { message: "Add database migrations", type: "feature" },
  { message: "Implement rate limiting", type: "feature" },
  { message: "Fix timezone handling", type: "fix" },
  { message: "Add keyboard shortcuts", type: "feature" },
  { message: "Update test coverage", type: "update" },
  { message: "Fix production build", type: "fix" },
  { message: "Add performance monitoring", type: "feature" },
  { message: "Refactor utility functions", type: "refactor" },
  { message: "Update UI components", type: "update" },
  { message: "Fix async/await patterns", type: "fix" },
  { message: "Add code comments", type: "update" },
  { message: "Implement caching layer", type: "feature" },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCommitMessage() {
  const commit = commitMessages[getRandomInt(0, commitMessages.length - 1)];
  return commit;
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

// MISSING FUNCTION - This was the cause of the error
const makeRealisticChanges = (filePath, changeType) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File ${filePath} does not exist, skipping...`);
      return false;
    }

    const currentContent = fs.readFileSync(filePath, "utf8");
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    let newContent = currentContent;

    // Make realistic changes based on commit type and file type
    switch (changeType) {
      case "feature":
        if (filePath.endsWith(".js")) {
          newContent += `\\n// Feature added: ${timestamp}`;
          // Simulate adding a new function or feature
          if (Math.random() > 0.5) {
            newContent += `\\n/* New feature implementation */`;
          }
        } else if (filePath.endsWith(".md")) {
          newContent += `\\n\\n## Update ${timestamp}\\nAdded new functionality.`;
        } else if (filePath.endsWith(".css")) {
          newContent += `\\n/* New styles added: ${timestamp} */`;
        }
        break;

      case "fix":
        if (filePath.endsWith(".js")) {
          newContent += `\\n// Bug fix: ${timestamp}`;
        } else if (filePath.endsWith(".md")) {
          newContent += `\\n\\n<!-- Fixed: ${timestamp} -->`;
        } else if (filePath.endsWith(".css")) {
          newContent += `\\n/* Bug fix: ${timestamp} */`;
        }
        break;

      case "refactor":
        if (filePath.endsWith(".js")) {
          newContent += `\\n// Refactored: ${timestamp}`;
        } else if (filePath.endsWith(".md")) {
          newContent += `\\n\\n### Refactoring - ${timestamp}`;
        }
        break;

      case "update":
      default:
        if (filePath.endsWith(".js")) {
          newContent += `\\n// Updated: ${timestamp}`;
        } else if (filePath.endsWith(".md")) {
          newContent += `\\n\\n<!-- Updated: ${timestamp} -->`;
        } else if (filePath.endsWith(".css")) {
          newContent += `\\n/* Updated: ${timestamp} */`;
        } else if (filePath.endsWith(".html")) {
          newContent += `\\n<!-- Updated: ${timestamp} -->`;
        } else {
          newContent += `\\n# Updated: ${timestamp}`;
        }
        break;
    }

    // Write the updated content
    fs.writeFileSync(filePath, newContent);
    return true;
  } catch (error) {
    console.warn(`⚠️  Could not modify ${filePath}:`, error.message);
    return false;
  }
};

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

async function setupGitConfig() {
  try {
    // Set basic git config if not already set
    await git.addConfig("user.name", "GitHub User", false, "global");
    await git.addConfig("user.email", "user@example.com", false, "global");
    console.log("🔧 Git config set");
  } catch (error) {
    console.warn("⚠️ Could not set git config:", error.message);
  }
}

const initializeRepo = async () => {
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
      console.log("🔧 Git repository initialized");
      await setupGitConfig();

      // Create and commit initial files
      createFiles();
      await git.add("./*");
      await git.commit("Initial commit", undefined, {
        "--date": moment().subtract(1, "year").format(),
      });
      console.log("✅ Created initial commit");
    }

    // Check if main branch exists before trying to create it
    const branches = await git.branchLocal();
    if (!branches.all.includes("main")) {
      await git.checkoutLocalBranch("main");
    } else {
      await git.checkout("main"); // Just switch to main if it exists
    }

    return true;
  } catch (error) {
    console.error("❌ Git initialization failed:", error.message);
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

  if (!dryRun) {
    const repoReady = await initializeRepo();
    if (!repoReady) return;
  }

  const now = moment();
  const startDate = moment().subtract(years, "years");
  let totalCommits = 0;

  // Generate commits in chronological order
  for (
    let currentDate = moment(startDate);
    currentDate.isBefore(now);
    currentDate.add(1, "day")
  ) {
    if (skipWeekends && shouldSkipWeekend(currentDate)) continue;

    // Randomly decide if we should commit today
    const shouldCommit = Math.random() > 0.7;
    if (!shouldCommit) continue;

    const commitsToday = getRandomInt(1, 3);

    for (let i = 0; i < commitsToday; i++) {
      const commitDate = moment(currentDate)
        .hour(getRandomInt(9, 17))
        .minute(getRandomInt(0, 59))
        .second(0);

      if (commitDate.isAfter(now)) continue;

      const formattedDate = commitDate.format();
      const commitInfo = getRandomCommitMessage();

      if (dryRun) {
        console.log(
          `[DRY RUN] Would commit: "${commitInfo.message}" on ${formattedDate}`
        );
        totalCommits++;
        continue;
      }

      try {
        // Modify a random file
        const targetFile =
          projectFiles[getRandomInt(0, projectFiles.length - 1)];
        const fileModified = makeRealisticChanges(
          targetFile.path,
          commitInfo.type
        );

        if (fileModified) {
          // Track commit in data.json
          jsonfile.writeFileSync(FILE_PATH, {
            date: formattedDate,
            commit: totalCommits + 1,
            file: targetFile.path,
            type: commitInfo.type,
          });

          await git.add("./*");
          await git.commit(commitInfo.message, undefined, {
            "--date": formattedDate,
          });

          console.log(
            `✅ [${totalCommits + 1}] ${commitInfo.message} - ${formattedDate}`
          );
          totalCommits++;
        }
      } catch (error) {
        console.warn(`⚠️ Commit failed for ${formattedDate}:`, error.message);
      }
    }
  }

  console.log(`\n🎯 Generated ${totalCommits} commits over ${years} years`);

  if (!dryRun) {
    try {
      const remotes = await git.getRemotes(true);
      if (remotes.length > 0) {
        console.log("📤 Pushing to remote repository...");
        await git.push(["-u", "origin", "main"]);
        console.log("🎉 All commits successfully pushed to GitHub!");
      } else {
        console.log("⚠️ No remote configured. Add remote and push manually:");
        console.log("   git remote add origin <your-repo-url>");
        console.log("   git push -u origin main");
      }
    } catch (error) {
      console.error("❌ Push failed:", error.message);
    }
  }
};

// Export for module usage
module.exports = { makeCommits, createFiles };

// Run if called directly
if (require.main === module) {
  // Check if required dependencies are installed
  const requiredPackages = ["moment", "simple-git", "jsonfile"];
  const missingPackages = [];

  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
    } catch (error) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.error("❌ Missing required packages:", missingPackages.join(", "));
    console.log(
      "📦 Install them with: npm install " + missingPackages.join(" ")
    );
    process.exit(1);
  }

  const config = {
    years: 4,
    maxCommitsPerMonth: 6,
    minCommitsPerMonth: 2,
    skipWeekends: true,
    dryRun: false, // Set to true to preview without actual commits
  };

  makeCommits(config).catch(console.error);
}
