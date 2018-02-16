const jokes = require('../model/jokes');

/**
 * Returns random joke
 * @return {object} random joke from json
 */
const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

module.exports.getRandomJoke = getRandomJoke;
