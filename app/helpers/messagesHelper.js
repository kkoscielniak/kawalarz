/**
 * Gets random message from an array
 * @param {*} array array of messages
 * @return {*} random message from an array
 */
module.exports.getRandomMessage = array =>
  array[Math.floor(Math.random() * array.length)];
