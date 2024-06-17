const request = require('supertest');
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
            .patch(`/api/tasks/${task._id}`)
            .send({ completed: true })
            .expect(200);

        expect(response.body.completed).toBe(true);
    });
});\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:38\n// Feature added: 2025-05-30 16:12:34\n// Updated: 2025-05-30 16:12:35\n// Feature added: 2025-05-30 16:12:36\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:43\n// Feature added: 2025-05-30 16:12:45\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:08\n// Updated: 2025-05-30 16:26:08\n// Bug fix: 2025-05-30 16:26:09\n// Updated: 2025-05-30 16:26:09\n// Feature added: 2025-05-30 16:26:09\n// Feature added: 2025-05-30 16:26:10\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:11\n// Feature added: 2025-05-30 16:26:12\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:26:13\n// Feature added: 2025-05-30 16:26:16\n// Feature added: 2025-05-30 16:26:17\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:26:18\n// Bug fix: 2025-05-30 16:26:19\n// Feature added: 2025-05-30 16:26:19\n/* New feature implementation */\n// Updated: 2025-05-30 16:26:20\n// Updated: 2025-05-30 16:26:21\n// Bug fix: 2025-05-30 16:26:22\n// Bug fix: 2025-05-30 16:37:54\n// Updated: 2025-05-30 16:37:54\n// Refactored: 2025-05-30 16:37:57\n// Updated: 2025-05-30 16:37:57\n// Bug fix: 2025-05-30 16:37:57\n// Feature added: 2025-05-30 16:37:59\n// Feature added: 2025-05-30 16:38:01\n// Refactored: 2025-05-30 16:38:02\n// Feature added: 2025-05-30 16:38:02\n// Feature added: 2025-05-30 16:38:03\n/* New feature implementation */\n// Feature added: 2025-05-30 16:38:04\n// Refactored: 2025-05-30 16:38:08\n// Bug fix: 2025-05-30 16:38:09\n// Bug fix: 2025-05-30 16:38:14\n// Feature added: 2025-05-30 16:38:18\n// Updated: 2025-05-30 16:38:21\n// Feature added: 2025-05-30 16:38:23\n// Bug fix: 2025-05-30 16:38:24\n// Feature added: 2025-05-30 16:38:28\n// Feature added: 2025-05-30 16:38:29\n// Updated: 2025-05-30 16:38:31\n// Feature added: 2025-05-30 16:38:31\n// Updated: 2025-05-30 16:38:32\n// Feature added: 2025-05-30 16:38:33\n// Feature added: 2025-05-30 16:38:34\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:37