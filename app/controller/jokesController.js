const jokes = require('../model/jokes');

const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

module.exports.getRandomJoke = getRandomJoke;
