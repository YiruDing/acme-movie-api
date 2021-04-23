const { expect } = require('chai');
const { syncAndSeed } = require('../db');

const app = require('supertest')(require('../app'));

describe('Routes', () => {
  beforeEach(() => syncAndSeed());
  describe('GET /', () => {
    it('show information about the api', async () => {
      const res = await app.get('/');
      expect(res.status).to.equal(200);
    });
  });
  describe('GET /api/movies', () => {
    it('gets all the movies', async () => {
      const res = await app.get('/api/movies');
      expect(res.status).to.equal(200);
    });
  });
});
