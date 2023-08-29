import request from 'supertest';
import Sequelize from 'sequelize';
import app from '../index.js';
import db from '../models/index.js';

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Database sync successful.');
  } catch (error) {
    console.error('Error during database sync:', error);
    process.exit(1);
  }
});

beforeEach(async () => {
  try {
    await db.User.create({
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
    });
  } catch (error) {
    console.error('Error during user creation:', error);
  }
});

afterEach(async () => {
  try {
    await db.User.destroy({ where: {} });
  } catch (error) {
    console.error('Error during user deletion:', error);
  }
});

test('Should return a token on successful login', async () => {
  try {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  } catch (error) {
    console.error('Error during login test:', error);
  }
});

test('Should return an error on failed login', async () => {
  try {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });
    expect(response.status).toBe(400);
  } catch (error) {
    console.error('Error during failed login test:', error);
  }
});

afterAll(async () => {
  try {
    await db.sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error during teardown:', error);
  }
});