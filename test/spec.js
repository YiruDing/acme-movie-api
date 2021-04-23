const { expect } = require('chai');
const { syncAndSeed } = require('../db');
const app = require('supertest')(require('../app'));

describe('Routes', () => {
  describe('GET /', () => {
    it('show information about the api', async () => {
      const res = await app.get('/');
      expect(res.status).to.equal(200);
    });
  });
});
