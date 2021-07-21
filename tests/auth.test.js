const request = require('supertest');
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
});\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:34\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:38\n// Updated: 2025-05-30 16:01:38\n// Bug fix: 2025-05-30 16:12:33\n// Feature added: 2025-05-30 16:12:35\n// Updated: 2025-05-30 16:12:38\n// Bug fix: 2025-05-30 16:12:38\n// Feature added: 2025-05-30 16:12:38\n// Updated: 2025-05-30 16:12:40\n// Feature added: 2025-05-30 16:12:41\n/* New feature implementation */\n// Feature added: 2025-05-30 16:12:45\n// Feature added: 2025-05-30 16:12:45\n// Feature added: 2025-05-30 16:12:47\n// Feature added: 2025-05-30 16:26:09\n// Updated: 2025-05-30 16:26:15\n// Refactored: 2025-05-30 16:26:19\n// Bug fix: 2025-05-30 16:26:19\n// Refactored: 2025-05-30 16:26:20\n// Updated: 2025-05-30 16:26:21\n// Bug fix: 2025-05-30 16:26:22\n// Refactored: 2025-05-30 16:37:55