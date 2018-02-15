const jokes = require('../model/jokes');

const getRandomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};

module.exports.getRandomJoke = getRandomJoke;
