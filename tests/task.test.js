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
});\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:31