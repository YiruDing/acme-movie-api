const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/api/movies', async (req, res, next) => {
  try {
    // res.send(await Movie.findAll());
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
console.log('Hi');

module.exports = app;
