const router = require('express').Router();

const jokes = require('../model/jokes');

/**
 * Sends welcome message
 */
router.get('/', (req, res) => {
  res.send('Kawalarz API v1.0');
});

/**
 * Fetches a random joke from an array
 */
router.get('/joke', (req, res) => {
  const jokeToSend = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(jokeToSend);
});

module.exports = router;
