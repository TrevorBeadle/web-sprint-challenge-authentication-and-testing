const request = require('supertest');
const server = require('../api/server');

afterAll(async () => {
  await db.destroy();
})