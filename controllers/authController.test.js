import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../index.js';
import db from '../models/index.js';

const sequelize = new Sequelize(/* your db config */);

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Database sync successful.');
  } catch (error) {
    console.error('Error during database sync:', error);
  }
  
  await db.User.create({
    username: 'testuser',
    password: bcrypt.hashSync('testpassword', 10),
    email: 'test@example.com',
  });
});

test('Should return a token on successful login', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      username: 'testuser',
      password: 'testpassword',
    });
  
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

test('Should return an error on failed login', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      username: 'testuser',
      password: 'wrongpassword',
    });
  
  expect(response.status).toBe(400);
});

test('Should hash the password before storing in the database', async () => {
  const plainPassword = 'testpassword';
  
  const newUser = await db.User.create({
    username: 'hashTestUser',
    password: bcrypt.hashSync(plainPassword, 10),
    email: 'hashTest@example.com',
  });
  
  const storedUser = await db.User.findByPk(newUser.id);
  
  expect(storedUser.password).not.toBe(plainPassword);
  
  const isMatching = await bcrypt.compare(plainPassword, storedUser.password);
  expect(isMatching).toBe(true);
  
  await db.User.destroy({ where: { id: newUser.id } });
});

afterAll(async () => {
  await db.User.destroy({ where: {} });
  await db.sequelize.close();
});